import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaRocket, FaBolt, FaStar, FaCheck, FaUsers, FaHeart, FaShieldAlt, FaLightbulb, FaArrowRight } from "react-icons/fa";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about YouTube Tools Hub - your all-in-one platform for YouTube creators with free tools powered by AI.",
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
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden hero-gradient-light dark:hero-gradient py-20 lg:py-28">
                <div className="absolute inset-0 bg-dots opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium mb-6">
                            <FaHeart className="w-3 h-3" />
                            Made for Creators, by Creators
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            About <span className="gradient-text">{siteConfig.name}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            We&apos;re on a mission to empower every YouTube creator with powerful,
                            free tools that help them grow their channel and reach their audience.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            We believe every creator deserves access to powerful tools that can help them grow
                            their YouTube channel. That&apos;s why we built {siteConfig.name} – a comprehensive
                            suite of <strong className="text-gray-900 dark:text-white">free, AI-powered tools</strong> designed
                            specifically for YouTube creators of all sizes. Whether you&apos;re just starting out or
                            managing multiple channels, our tools are here to help you succeed.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            What We Offer
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            A complete toolkit designed to streamline your YouTube workflow
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose {siteConfig.name}?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            We&apos;re committed to providing the best experience for creators
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <div
                                key={i}
                                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 hover:shadow-lg transition-shadow"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white">
                                    <value.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 hero-gradient-light dark:hero-gradient">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Ready to Grow Your Channel?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of creators who use our free tools to save time and grow their audience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/tools">
                            <Button size="lg">
                                Explore All Tools
                                <FaArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg">
                                Get in Touch
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
