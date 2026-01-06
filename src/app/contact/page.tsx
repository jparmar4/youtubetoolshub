import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
    title: "Contact Support - 24/7 Creator Assistance",
    description: "Need help? Contact the YouTube Tools Hub support team. We're here 24/7 to assist with tool usage, billing, or feature requests.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return <ContactForm />;
}
