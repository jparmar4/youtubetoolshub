"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { FaPaperPlane, FaEnvelope, FaCheck, FaClock, FaQuestionCircle, FaBug, FaLightbulb, FaHandshake } from "react-icons/fa";

const contactReasons = [
    { icon: FaQuestionCircle, title: "General Inquiry", description: "Questions about our tools or services", color: "from-blue-400 to-blue-500" },
    { icon: FaBug, title: "Bug Report", description: "Found something not working right?", color: "from-red-400 to-red-500" },
    { icon: FaLightbulb, title: "Feature Request", description: "Have an idea for a new tool?", color: "from-yellow-400 to-orange-500" },
    { icon: FaHandshake, title: "Partnership", description: "Business or collaboration inquiries", color: "from-purple-400 to-purple-500" },
];

const faqs = [
    { q: "How quickly will I get a response?", a: "We typically respond within 24-48 hours during business days." },
    { q: "Is there phone support?", a: "Currently we only offer email support to provide better, documented responses." },
    { q: "Can I request a custom tool?", a: "Yes! We love hearing ideas from creators. Send us your suggestions." },
];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real implementation, this would send the form data
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden hero-gradient-light dark:hero-gradient py-16 lg:py-20">
                <div className="absolute inset-0 bg-dots opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 text-white mb-6 shadow-lg">
                            <FaEnvelope className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Have questions, feedback, or ideas? We&apos;d love to hear from you!
                            Our team is here to help you succeed.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Reasons */}
            <section className="py-12 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {contactReasons.map((reason, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedReason(reason.title)}
                                className={`text-left p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${selectedReason === reason.title
                                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                        : "border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700"
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center text-white mb-4`}>
                                    <reason.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{reason.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{reason.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-12">

                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Contact Information
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Whether you have a question about our tools, need help with something,
                                    or just want to share feedback, we&apos;re here to help.
                                </p>
                            </div>

                            {/* Email Card */}
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                                        <FaEnvelope className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email Us</p>
                                        <a
                                            href={`mailto:${siteConfig.contact.email}`}
                                            className="text-lg font-semibold text-gray-900 dark:text-white hover:text-red-500 transition-colors"
                                        >
                                            {siteConfig.contact.email}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                                        <FaClock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            Response Time
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            We typically respond within <strong>24-48 hours</strong> during business days.
                                            For urgent matters, include &quot;URGENT&quot; in your subject line.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* FAQs */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Frequently Asked Questions
                                </h3>
                                <div className="space-y-4">
                                    {faqs.map((faq, i) => (
                                        <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">{faq.q}</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                                {submitted ? (
                                    <div className="text-center py-16">
                                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                                            <FaCheck className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                            Message Sent Successfully!
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                                            Thanks for reaching out! We&apos;ve received your message and will get back to you within 24-48 hours.
                                        </p>
                                        <Button
                                            variant="outline"
                                            onClick={() => setSubmitted(false)}
                                        >
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Send Us a Message
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                                            Fill out the form below and we&apos;ll get back to you as soon as possible.
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <Input
                                                    label="Your Name"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                                <Input
                                                    type="email"
                                                    label="Email Address"
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>

                                            <Input
                                                label="Subject"
                                                placeholder={selectedReason || "How can we help?"}
                                                defaultValue={selectedReason}
                                                required
                                            />

                                            <Textarea
                                                label="Your Message"
                                                placeholder="Tell us more about your question, feedback, or idea..."
                                                rows={6}
                                                required
                                            />

                                            <Button type="submit" className="w-full" size="lg">
                                                <FaPaperPlane className="mr-2" />
                                                Send Message
                                            </Button>

                                            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                                                By submitting, you agree to our{" "}
                                                <a href="/privacy-policy" className="text-red-500 hover:underline">Privacy Policy</a>
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
