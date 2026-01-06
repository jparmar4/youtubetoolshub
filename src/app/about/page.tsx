import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaRocket, FaBolt, FaStar, FaCheck, FaUsers, FaHeart, FaShieldAlt, FaLightbulb, FaArrowRight } from "react-icons/fa";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "About YouTube Tools Hub - Our Mission to Help Creators Grow (2026)",
    description: "YouTube Tools Hub provides free AI-powered tools for creators. Learn about our mission to democratize video growth with SEO, specialized tools, and expert content.",
    alternates: {
        canonical: "/about",
    },
};

const features = [
    {
        icon: FaBolt,
        title: "AI-Powered Generation",
        description: "Generate titles, descriptions, tags, and content ideas using advanced AI technology that understands YouTube SEO.",
        gradient: "from-yellow-400 to-orange-500",
    },
    {
        icon: FaLightbulb,
        title: "Thumbnail Tools",
        description: "Download thumbnails, generate text ideas, and create eye-catching visuals that boost your click-through rate.",
        gradient: "from-blue-400 to-purple-500",
    },
    {
        icon: FaStar,
        title: "Analytics & Calculators",
        description: "Calculate earnings, engagement rates, and compare title effectiveness with data-driven insights.",
        gradient: "from-green-400 to-emerald-500",
    },
    {
        icon: FaRocket,
        title: "Content Planning",
        description: "Generate content calendars, video ideas, and trending topics tailored specifically for your niche.",
        gradient: "from-red-400 to-pink-500",
    },
];

const values = [
    { icon: FaCheck, title: "100% Free", description: "No hidden costs or premium paywalls for essential features" },
    { icon: FaUsers, title: "No Account Required", description: "Start using tools instantly without signing up" },
    { icon: FaLightbulb, title: "AI-Powered", description: "Leverage cutting-edge AI for better results" },
    { icon: FaShieldAlt, title: "Privacy First", description: "We don't store your data or track your usage" },
];

const stats = [
    { value: "16+", label: "Free Tools" },
    { value: "50K+", label: "Creators Helped" },
    { value: "100%", label: "Free Forever" },
    { value: "24/7", label: "Available" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/30 blur-[100px] rounded-full -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-200/30 blur-[100px] rounded-full -z-10" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-bold border border-purple-200 mb-8 uppercase tracking-wider">
                            <FaHeart className="w-3 h-3 text-purple-600" />
                            Made for Creators, by Creators
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">{siteConfig.name}</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            We&apos;re on a mission to empower every YouTube creator with powerful,
                            free tools that help them grow their channel and reach their audience.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto relative z-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center bg-white border border-slate-100/60 rounded-2xl p-8 shadow-xl shadow-purple-900/5 hover:-translate-y-1 transition-transform duration-300">
                                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 tracking-tight">{stat.value}</div>
                                <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                            Our Mission
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed font-light">
                            We believe every creator deserves access to powerful tools that can help them grow
                            their YouTube channel. That&apos;s why we built <span className="font-semibold text-purple-700">{siteConfig.name}</span> – a comprehensive
                            suite of <strong className="font-semibold text-slate-900">free, AI-powered tools</strong> designed
                            specifically for YouTube creators of all sizes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            What We Offer
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            A complete toolkit designed to streamline your YouTube workflow
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-0 group-hover:bg-purple-50 transition-colors" />

                                <div className="relative z-10">
                                    <div className={`w-14 h-14 mb-8 rounded-2xl bg-gradient-to-br ${feature.gradient.replace('from-yellow-400', 'from-purple-500').replace('from-blue-400', 'from-fuchsia-500').replace('from-green-400', 'from-violet-500').replace('from-red-400', 'from-indigo-500').replace('to-orange-500', 'to-indigo-500').replace('to-purple-500', 'to-purple-600').replace('to-emerald-500', 'to-fuchsia-600').replace('to-pink-500', 'to-violet-600')} flex items-center justify-center text-white shadow-lg`}>
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-2xl text-slate-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Why Choose {siteConfig.name}?
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            We&apos;re committed to providing the best experience for creators
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <div
                                key={i}
                                className="text-center p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform">
                                    <value.icon className="w-7 h-7" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-slate-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/40 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/40 blur-[120px] rounded-full" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Ready to Grow Your Channel?
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        Join thousands of creators who use our free tools to save time and grow their audience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/tools">
                            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 border-none font-bold shadow-lg shadow-white/10">
                                Explore All Tools
                                <FaArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-white/10 hover:border-white">
                                Get in Touch
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
