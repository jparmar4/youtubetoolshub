import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay lazily to avoid build-time errors
function getRazorpay() {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || "",
        key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });
}

export async function POST(request: Request) {
    try {
        // Check if keys are configured
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { success: false, error: "Payment gateway not configured" },
                { status: 500 }
            );
        }

        const { plan } = await request.json();

        // Define pricing
        const pricing: Record<string, { amount: number; currency: string; name: string }> = {
            monthly: { amount: 79900, currency: "INR", name: "Pro Monthly" }, // ₹799
            yearly: { amount: 699900, currency: "INR", name: "Pro Yearly" },  // ₹6999 (save ~27%)
        };

        const selectedPlan = pricing[plan] || pricing.monthly;

        const razorpay = getRazorpay();
        const order = await razorpay.orders.create({
            amount: selectedPlan.amount, // Amount in paise
            currency: selectedPlan.currency,
            receipt: `receipt_${Date.now()}`,
            notes: {
                plan: plan,
                description: selectedPlan.name,
            },
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            amount: selectedPlan.amount,
            currency: selectedPlan.currency,
            name: selectedPlan.name,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create order" },
            { status: 500 }
        );
    }
}

// Force dynamic rendering
export const dynamic = "force-dynamic";
