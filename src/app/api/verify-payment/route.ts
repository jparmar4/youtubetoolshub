import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { auth } from "@/auth";
import { db } from "@/lib/db";

const PLAN_IDS = {
  monthly: "plan_RoHllplN8oKLO6",
  yearly: "plan_RoHnfy0vCII0Gq",
} as const;

type RazorpaySubscription = {
  plan_id?: string;
  current_start?: number;
  current_end?: number;
  notes?: { user_email?: string };
};

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ success: false, error: "Payment gateway not configured" }, { status: 503 });
    }

    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = await request.json();
    if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
      return NextResponse.json({ success: false, error: "Missing payment verification data" }, { status: 400 });
    }

    const signatureBody = `${razorpay_payment_id}|${razorpay_subscription_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(signatureBody)
      .digest("hex");
    const expected = Buffer.from(expectedSignature, "utf8");
    const received = Buffer.from(razorpay_signature, "utf8");

    if (expected.length !== received.length || !crypto.timingSafeEqual(expected, received)) {
      return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const subscription = await razorpay.subscriptions.fetch(razorpay_subscription_id) as unknown as RazorpaySubscription;
    const planType = subscription.plan_id === PLAN_IDS.yearly
      ? "yearly"
      : subscription.plan_id === PLAN_IDS.monthly
        ? "monthly"
        : null;

    if (!planType || subscription.notes?.user_email !== session.user.email) {
      return NextResponse.json({ success: false, error: "Subscription does not match this account" }, { status: 400 });
    }
    if (!subscription.current_start || !subscription.current_end) {
      return NextResponse.json({ success: false, error: "Subscription has no active billing period" }, { status: 400 });
    }

    const startDate = new Date(subscription.current_start * 1000);
    const endDate = new Date(subscription.current_end * 1000);
    const planName = planType === "yearly" ? "pro-yearly" : "pro-monthly";

    await db.sql`
      INSERT INTO subscriptions (user_email, plan, status, start_date, end_date, payment_id)
      VALUES (${session.user.email}, ${planName}, 'active', ${startDate.toISOString()}, ${endDate.toISOString()}, ${razorpay_payment_id})
      ON CONFLICT (user_email)
      DO UPDATE SET
        plan = ${planName},
        status = 'active',
        start_date = ${startDate.toISOString()},
        end_date = ${endDate.toISOString()},
        payment_id = ${razorpay_payment_id}
    `;

    return NextResponse.json({
      success: true,
      message: "Subscription verified successfully",
      paymentId: razorpay_payment_id,
      subscriptionId: razorpay_subscription_id,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ success: false, error: "Failed to verify payment" }, { status: 500 });
  }
}
