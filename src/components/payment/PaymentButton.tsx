"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaCrown, FaSpinner, FaCheck } from "react-icons/fa";

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    prefill: {
        name?: string;
        email?: string;
    };
    theme: {
        color: string;
    };
    handler: (response: RazorpayResponse) => void;
    modal?: {
        ondismiss?: () => void;
    };
}

interface RazorpayInstance {
    open: () => void;
}

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface PaymentButtonProps {
    plan: "monthly" | "yearly";
    className?: string;
}

export default function PaymentButton({ plan, className = "" }: PaymentButtonProps) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const loadRazorpayScript = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!session?.user?.email) {
            window.location.href = "/sign-in?redirect=/pricing";
            return;
        }

        setLoading(true);

        try {
            // Load Razorpay script
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                alert("Failed to load payment gateway. Please try again.");
                setLoading(false);
                return;
            }

            // Create order
            const response = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error);
            }

            // Open Razorpay checkout
            const options: RazorpayOptions = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount: data.amount,
                currency: data.currency,
                name: "YouTube Tools Hub",
                description: data.name,
                order_id: data.orderId,
                prefill: {
                    name: session.user.name || "",
                    email: session.user.email,
                },
                theme: {
                    color: "#DC2626",
                },
                handler: async (response: RazorpayResponse) => {
                    // Verify payment
                    const verifyRes = await fetch("/api/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...response,
                            userEmail: session.user?.email,
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        setSuccess(true);
                        // Store premium status
                        localStorage.setItem("yt_tools_pro", "true");
                        localStorage.setItem("yt_tools_payment_id", response.razorpay_payment_id);

                        // Redirect to success page or reload
                        setTimeout(() => {
                            window.location.href = "/tools?upgraded=true";
                        }, 2000);
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                modal: {
                    ondismiss: () => {
                        setLoading(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <button
                disabled
                className={`flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-6 rounded-xl font-medium ${className}`}
            >
                <FaCheck className="w-4 h-4" />
                Payment Successful!
            </button>
        );
    }

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {loading ? (
                <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    <FaCrown className="w-4 h-4" />
                    {plan === "yearly" ? "Get Pro Yearly" : "Get Pro Monthly"}
                </>
            )}
        </button>
    );
}
