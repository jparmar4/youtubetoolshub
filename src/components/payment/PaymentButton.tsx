"use client";

import { FaCrown } from "react-icons/fa";

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
    const handlePayment = () => {
        // Open Razorpay payment link in a new tab
        window.open(PAYMENT_LINKS[plan], "_blank");
    };

    return (
        <button
            onClick={handlePayment}
            className={`flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-lg shadow-red-500/25 ${className}`}
        >
            <FaCrown className="w-4 h-4" />
            {plan === "yearly" ? "Get Pro Yearly" : "Get Pro Monthly"}
        </button>
    );
}
