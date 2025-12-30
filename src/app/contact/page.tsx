"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { FaPaperPlane, FaEnvelope, FaCheck, FaClock, FaQuestionCircle, FaBug, FaLightbulb, FaHandshake, FaExclamationCircle, FaSpinner } from "react-icons/fa";

const contactReasons = [
    { icon: FaQuestionCircle, title: "General Inquiry", description: "Questions about our tools or services", color: "from-blue-500 to-cyan-500" },
    { icon: FaBug, title: "Bug Report", description: "Found something not working right?", color: "from-rose-500 to-red-500" },
    { icon: FaLightbulb, title: "Feature Request", description: "Have an idea for a new tool?", color: "from-amber-400 to-orange-500" },
    { icon: FaHandshake, title: "Partnership", description: "Business or collaboration inquiries", color: "from-purple-500 to-fuchsia-500" },
];

const faqs = [
    { q: "How quickly will I get a response?", a: "We typically respond within 24-48 hours during business days." },
    { q: "Is there phone support?", a: "Currently we only offer email support to provide better, documented responses." },
    { q: "Can I request a custom tool?", a: "Yes! We love hearing ideas from creators. Send us your suggestions." },
];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [honeypot, setHoneypot] = useState(""); // Spam protection

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    subject: subject || selectedReason,
                    message,
                    website: honeypot, // Honeypot field for spam protection
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
                // Reset form
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
                setSelectedReason("");
            } else {
                setError(data.error || "Failed to send message. Please try again.");
            }
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-200/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white mb-8 shadow-2xl shadow-fuchsia-900/10 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                            <FaEnvelope className="w-9 h-9" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Have questions, feedback, or ideas? We&apos;d love to hear from you!
                            Our team is here to help you succeed.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Reasons */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactReasons.map((reason, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedReason(reason.title)}
                                className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${selectedReason === reason.title
                                    ? "border-purple-500 bg-purple-50 shadow-purple-200"
                                    : "border-slate-100 bg-white hover:border-purple-200 hover:shadow-purple-100"
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                    <reason.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{reason.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{reason.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-12">

                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                    Contact Information
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Whether you have a question about our tools, need help with something,
                                    or just want to share feedback, we&apos;re here to help.
                                </p>
                            </div>

                            {/* Email Card */}
                            <div className="p-8 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500" />
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                                        <FaEnvelope className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-1">Email Us</p>
                                        <a
                                            href={`mailto:${siteConfig.contact.email}`}
                                            className="text-lg font-bold text-slate-900 hover:text-purple-600 transition-colors"
                                        >
                                            {siteConfig.contact.email}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                        <FaClock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">
                                            Response Time
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            We typically respond within <strong>24-48 hours</strong> during business days.
                                            For urgent matters, include &quot;URGENT&quot; in your subject line.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* FAQs */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">
                                    Frequently Asked Questions
                                </h3>
                                <div className="space-y-4">
                                    {faqs.map((faq, i) => (
                                        <div key={i} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                                {submitted ? (
                                    <div className="text-center py-16">
                                        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-50 flex items-center justify-center shadow-lg shadow-green-900/5 animate-bounce-slow">
                                            <FaCheck className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-900 mb-4">
                                            Message Sent!
                                        </h3>
                                        <p className="text-xl text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
                                            Thanks for reaching out! We&apos;ve received your message and will get back to you within 24-48 hours.
                                        </p>
                                        <Button
                                            onClick={() => setSubmitted(false)}
                                            variant="outline"
                                            className="border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50"
                                        >
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                            Send Us a Message
                                        </h2>
                                        <p className="text-slate-600 mb-8">
                                            Fill out the form below and we&apos;ll get back to you as soon as possible.
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Honeypot field - hidden for spam protection */}
                                            <input
                                                type="text"
                                                name="website"
                                                value={honeypot}
                                                onChange={(e) => setHoneypot(e.target.value)}
                                                style={{ display: "none" }}
                                                tabIndex={-1}
                                                autoComplete="off"
                                            />

                                            {/* Error Message */}
                                            {error && (
                                                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600">
                                                    <FaExclamationCircle className="w-5 h-5 flex-shrink-0" />
                                                    <p>{error}</p>
                                                </div>
                                            )}

                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <Input
                                                    label="Your Name"
                                                    placeholder="John Doe"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    disabled={isLoading}
                                                    className="bg-slate-50 border-slate-200 focus:border-purple-500 transition-colors"
                                                />
                                                <Input
                                                    type="email"
                                                    label="Email Address"
                                                    placeholder="john@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    disabled={isLoading}
                                                    className="bg-slate-50 border-slate-200 focus:border-purple-500 transition-colors"
                                                />
                                            </div>

                                            <Input
                                                label="Subject"
                                                placeholder={selectedReason || "How can we help?"}
                                                value={subject || selectedReason}
                                                onChange={(e) => setSubject(e.target.value)}
                                                required
                                                disabled={isLoading}
                                                className="bg-slate-50 border-slate-200 focus:border-purple-500 transition-colors"
                                            />

                                            <Textarea
                                                label="Your Message"
                                                placeholder="Tell us more about your question, feedback, or idea..."
                                                rows={6}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                required
                                                disabled={isLoading}
                                                className="bg-slate-50 border-slate-200 focus:border-purple-500 transition-colors"
                                            />

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white border-0 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 transition-all hover:-translate-y-0.5"
                                                size="lg"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <FaSpinner className="mr-2 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaPaperPlane className="mr-2" />
                                                        Send Message
                                                    </>
                                                )}
                                            </Button>

                                            <p className="text-center text-slate-400 text-sm">
                                                By submitting, you agree to our{" "}
                                                <a href="/privacy-policy" className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors">Privacy Policy</a>
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
