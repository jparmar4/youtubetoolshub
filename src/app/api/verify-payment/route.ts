import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    // Initialize DB
    // db is automatically initialized via import

    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            userEmail,
        } = await request.json();

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isValid = expectedSignature === razorpay_signature;

        if (isValid) {
            // Payment verified successfully
            // TODO: Save subscription to database
            // TODO: Send confirmation email
            console.log("Payment verified for:", userEmail);
            console.log("Payment ID:", razorpay_payment_id);

            // Determine Plan Duration (Simple heuristic or pass it in body)
            // For now, defaulting to 1 month from now for standard upgrades
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 30); // Default to monthly

            // Insert/Update Subscription
            try {
                // Ensure date format is compatible
                const startDateStr = startDate.toISOString();
                const endDateStr = endDate.toISOString();

                await db.sql`
                    INSERT INTO subscriptions (user_email, plan, status, start_date, end_date, payment_id)
                    VALUES (${userEmail}, 'pro-monthly', 'active', ${startDateStr}, ${endDateStr}, ${razorpay_payment_id})
                    ON CONFLICT (user_email)
                    DO UPDATE SET 
                        plan = 'pro-monthly', 
                        status = 'active', 
                        start_date = ${startDateStr}, 
                        end_date = ${endDateStr}, 
                        payment_id = ${razorpay_payment_id}
                `;
            } catch (subError) {
                console.error("Failed to record subscription:", subError);
                // We still return success to frontend but log this critical error
            }

            return NextResponse.json({
                success: true,
                message: "Payment verified successfully",
                paymentId: razorpay_payment_id,
            });
        } else {
            return NextResponse.json(
                { success: false, error: "Invalid signature" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json(
            { success: false, error: "Failed to verify payment" },
            { status: 500 }
        );
    }
}
