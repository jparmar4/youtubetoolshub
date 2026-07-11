import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";

/** Escape HTML special characters to prevent injection in email templates */
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
    try {
        // Rate limiting: 5 submissions per IP per hour
        const ip = getRequestIp(req.headers);
        const rl = enforceRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
        if (!rl.allowed) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
            );
        }

        const { name, email, subject, message, website } = await req.json();

        // Honeypot spam protection - if this hidden field has a value, it's a bot
        if (website) {
            return NextResponse.json(
                { error: "Spam detected" },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate input lengths
        if (name.length > 100 || subject.length > 200 || message.length > 5000) {
            return NextResponse.json(
                { error: "Input too long" },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // Check environment variables
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        if (!emailUser || !emailPass) {
            console.error("Email configuration missing:", {
                EMAIL_USER: !!emailUser,
                EMAIL_PASS: !!emailPass
            });
            return NextResponse.json(
                { error: "Email service not configured (Missing Server Environment Variables)" },
                { status: 500 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send email
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: "support@youtubetoolshub.com",
            replyTo: email,
            subject: `[Contact Form] ${subject} - from ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #FF0000, #FF4136); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 10px 10px; }
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; color: #555; }
                        .value { margin-top: 5px; }
                        .message-box { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #FF0000; }
                        .footer { margin-top: 20px; text-align: center; color: #888; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2 style="margin: 0;">📧 New Contact Form Submission</h2>
                            <p style="margin: 5px 0 0 0; opacity: 0.9;">YouTube Tools Hub</p>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">👤 Name:</div>
                                <div class="value">${escapeHtml(name)}</div>
                            </div>
                            <div class="field">
                                <div class="label">📧 Email:</div>
                                <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
                            </div>
                            <div class="field">
                                <div class="label">📋 Subject:</div>
                                <div class="value">${escapeHtml(subject)}</div>
                            </div>
                            <div class="field">
                                <div class="label">💬 Message:</div>
                                <div class="message-box">${escapeHtml(message).replace(/\n/g, "<br>")}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This message was sent via the contact form on YouTube Tools Hub.</p>
                            <p>Reply directly to this email to respond to the sender.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        return NextResponse.json(
            { success: true, message: "Message sent successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
