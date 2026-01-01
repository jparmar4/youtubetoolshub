"use client";

import { FaCrown, FaSpinner } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PaymentButtonProps {
    plan: "monthly" | "yearly";
    className?: string;
}

// Razorpay type definition
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PaymentButton({ plan, className = "" }: PaymentButtonProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!session) {
            router.push(`/sign-in?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            return;
        }

        setLoading(true);

        try {
            const res = await loadRazorpay();
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                setLoading(false);
                return;
            }

            // Create Subscription
            const response = await fetch("/api/create-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan }),
            });

            const data = await response.json();

            if (!data.success) {
                alert("Error creating subscription: " + data.error);
                setLoading(false);
                return;
            }

            const options = {
                key: data.keyId,
                subscription_id: data.subscriptionId,
                name: "Youtube Tools Hub",
                description: `Pro ${plan.charAt(0).toUpperCase() + plan.slice(1)} Subscription`,
                handler: async function (response: any) {
                    // Verify Payment
                    const verifyRes = await fetch("/api/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_subscription_id: response.razorpay_subscription_id,
                            razorpay_signature: response.razorpay_signature,
                            userEmail: session.user?.email, // Pass email to link subscription
                            planType: plan // Pass plan type to store
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        alert("Payment Successful! Your subscription is active.");
                        router.push("/dashboard"); // Redirect to dashboard
                        router.refresh();
                    } else {
                        alert("Payment verification failed: " + verifyData.error);
                    }
                },
                theme: {
                    color: "#7c3aed", // Purple
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Payment error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
        >
            {loading ? (
                <FaSpinner className="w-5 h-5 animate-spin" />
            ) : (
                <FaCrown className="w-5 h-5 mb-0.5" />
            )}
            {plan === "yearly" ? "Get Pro Yearly" : "Get Pro Monthly"}
        </button>
    );
}
