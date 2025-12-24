import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    // Initialize Supabase client
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

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
            const { error: subError } = await supabase
                .from('subscriptions')
                .upsert({
                    user_email: userEmail,
                    plan: 'pro-monthly', // You might want to pass this from frontend
                    status: 'active',
                    start_date: startDate.toISOString(),
                    end_date: endDate.toISOString(),
                    payment_id: razorpay_payment_id
                });

            if (subError) {
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
