import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
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
            console.log("Order ID:", razorpay_order_id);

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
