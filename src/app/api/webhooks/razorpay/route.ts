import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { planIdToCanonical } from "@/lib/razorpay-plans";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error("[Razorpay Webhook] RAZORPAY_WEBHOOK_SECRET is not configured");
        return NextResponse.json(
            { error: "Webhook secret not configured" },
            { status: 500 }
        );
    }

    const signature = req.headers.get("x-razorpay-signature");
    if (!signature) {
        return NextResponse.json(
            { error: "Missing x-razorpay-signature header" },
            { status: 400 }
        );
    }

    const rawBody = await req.text();

    const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

    const isMatch =
        signature.length === expectedSignature.length &&
        crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));

    if (!isMatch) {
        console.warn("[Razorpay Webhook] Invalid webhook signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
        const eventData = JSON.parse(rawBody);
        const event = eventData.event;
        const payload = eventData.payload;

        console.log(`[Razorpay Webhook] Received event: ${event}`);

        if (event === "subscription.charged") {
            const subscription = payload?.subscription?.entity;
            const payment = payload?.payment?.entity;

            // notes.user_email is set server-side at subscription creation and is
            // the only trustworthy owner. payment.email is whatever the payer
            // typed at checkout — never grant Pro based on it.
            const userEmail = subscription?.notes?.user_email;
            const currentEnd = subscription?.current_end; // Unix timestamp
            const planId = subscription?.plan_id;
            const paymentId = payment?.id;

            // Canonical plan vocabulary — same names verify-payment writes.
            // Unknown plan IDs (another product in the same Razorpay account,
            // or a rotation the code hasn't learned yet) are skipped instead of
            // defaulting to pro-monthly, which would silently grant Pro.
            const planName = planIdToCanonical(planId);
            if (!planName) {
                console.warn(
                    `[Razorpay Webhook] Unrecognized plan_id "${planId}" — skipping charged event`,
                );
                return NextResponse.json({ status: "ok" });
            }

            if (userEmail && currentEnd) {
                const endDate = new Date(currentEnd * 1000).toISOString();

                await db.sql`
                    INSERT INTO subscriptions (user_email, plan, status, start_date, end_date, payment_id)
                    VALUES (${userEmail.toLowerCase()}, ${planName}, 'active', CURRENT_TIMESTAMP, ${endDate}, ${paymentId || null})
                    ON DUPLICATE KEY UPDATE
                        status = 'active',
                        end_date = VALUES(end_date),
                        payment_id = COALESCE(VALUES(payment_id), subscriptions.payment_id);
                `;

                console.log(`[Razorpay Webhook] Renewed subscription for ${userEmail} until ${endDate}`);
            }
        } else if (event === "subscription.cancelled" || event === "subscription.halted") {
            const subscription = payload?.subscription?.entity;
            const userEmail = subscription?.notes?.user_email;

            if (userEmail) {
                await db.sql`
                    UPDATE subscriptions
                    SET status = 'cancelled'
                    WHERE user_email = ${userEmail.toLowerCase()};
                `;
                console.log(`[Razorpay Webhook] Cancelled subscription for ${userEmail}`);
            }
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("[Razorpay Webhook] Error processing event:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}
