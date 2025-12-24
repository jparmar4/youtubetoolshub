import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - YouTube Tools Hub",
    description: "Contact the YouTube Tools Hub team. Get support, report bugs, or suggest features for our free YouTube tools.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
