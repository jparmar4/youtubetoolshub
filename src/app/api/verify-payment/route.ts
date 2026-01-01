import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    // Initialize DB
    // db is automatically initialized via import

    try {
        const {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
            userEmail,
            planType
        } = await request.json();

        // Verify signature for Subscription
        // Signature = HMAC_SHA256(payment_id + "|" + subscription_id, secret)
        const body = razorpay_payment_id + "|" + razorpay_subscription_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isValid = expectedSignature === razorpay_signature;

        if (isValid) {
            console.log("Subscription Payment verified for:", userEmail);
            console.log("Subscription ID:", razorpay_subscription_id);

            // Determine Start/End Dates based on plan
            const startDate = new Date();
            const endDate = new Date();

            if (planType === 'yearly') {
                endDate.setFullYear(endDate.getFullYear() + 1);
            } else {
                endDate.setMonth(endDate.getMonth() + 1); // Default monthly
            }

            // Insert/Update Subscription
            try {
                // Ensure date format is compatible
                const startDateStr = startDate.toISOString();
                const endDateStr = endDate.toISOString();
                const planName = planType === 'yearly' ? 'pro-yearly' : 'pro-monthly';

                await db.sql`
                    INSERT INTO subscriptions (user_email, plan, status, start_date, end_date, payment_id)
                    VALUES (${userEmail}, ${planName}, 'active', ${startDateStr}, ${endDateStr}, ${razorpay_payment_id})
                    ON CONFLICT (user_email)
                    DO UPDATE SET 
                        plan = ${planName}, 
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
                message: "Subscription verified successfully",
                paymentId: razorpay_payment_id,
                subscriptionId: razorpay_subscription_id
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
