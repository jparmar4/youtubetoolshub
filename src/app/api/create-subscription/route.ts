import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@/auth";

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, error: "Authentication required" },
                { status: 401 }
            );
        }

        const { plan } = await request.json();

        // Plan IDs provided by user
        const planIds = {
            monthly: "plan_RoHllplN8oKLO6",
            yearly: "plan_RoHnfy0vCII0Gq",
        };

        const selectedPlanId = planIds[plan as keyof typeof planIds];

        if (!selectedPlanId) {
            return NextResponse.json(
                { success: false, error: "Invalid plan selected" },
                { status: 400 }
            );
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        // Create Subscription
        // Note: 'total_count' is optional (default usually infinite/until cancelled)
        // We set it to something large or omit it for indefinite subscriptions usually.
        // But for clarity, we just let it be default.
        const subscription = await razorpay.subscriptions.create({
            plan_id: selectedPlanId,
            customer_notify: 1,
            total_count: 120, // 10 years or similar
            notes: {
                user_email: session.user.email,
                plan_type: plan
            }
        });

        return NextResponse.json({
            success: true,
            subscriptionId: subscription.id,
            keyId: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error("Error creating subscription:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create subscription" },
            { status: 500 }
        );
    }
}
