"use client";

import { FaCrown } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PaymentButtonProps {
    plan: "monthly" | "yearly";
    className?: string;
}

// Razorpay payment links
const PAYMENT_LINKS = {
    monthly: "https://rzp.io/rzp/6pFKWNy3",
    yearly: "https://rzp.io/rzp/mWZIGSXB",
};

export default function PaymentButton({ plan, className = "" }: PaymentButtonProps) {
    const { data: session } = useSession();
    const router = useRouter();

    const handlePayment = () => {
        if (!session) {
            router.push(`/sign-in?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            return;
        }

        // Open Razorpay payment link in a new tab
        window.open(PAYMENT_LINKS[plan], "_blank");
    };

    return (
        <button
            onClick={handlePayment}
            className={`flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
        >
            <FaCrown className="w-5 h-5 mb-0.5" />
            {plan === "yearly" ? "Get Pro Yearly" : "Get Pro Monthly"}
        </button>
    );
}
