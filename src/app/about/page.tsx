import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import { FaRocket, FaCheck, FaUsers, FaHeart, FaShieldAlt, FaArrowRight, FaBrain, FaChartPie, FaMagic } from "react-icons/fa";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "About YouTube Tools Hub - Empowering the AI-Native Creator 2026",
    description: "Learn about YouTube Tools Hub—the world's most advanced suite of free AI-powered tools for creators. Our mission is to democratize YouTube growth for everyone.",
    keywords: ["about youtube tools hub", "creator mission 2026", "free ai tools for creators", "democratizing youtube growth", "youtube tools origin story"],
    alternates: {
        canonical: "/about",
    },
};

const features = [
    {
        icon: FaBrain,
        title: "AI-Team Integration",
        description: "Our tools don't just generate text; they act as an 'AI Team'—providing creative direction, SEO expertise, and data analysis in real-time.",
        gradient: "from-purple-500 to-indigo-600",
    },
    {
        icon: FaMagic,
        title: "Creative Automation",
        description: "From thumbnail prompts to video scripts, we automate the heavy lifting so you can focus on what matters: your unique voice.",
        gradient: "from-fuchsia-500 to-pink-600",
    },
    {
        icon: FaChartPie,
        title: "ROI-Focused Analytics",
        description: "We bridge the gap between 'Views' and 'Business' by providing monetization tools that show your true earning potential in 2026.",
        gradient: "from-emerald-500 to-teal-600",
    },
    {
        icon: FaRocket,
        title: "Algorithmic Agility",
        description: "Our AI is updated weekly to match the latest YouTube algorithm shifts, ensuring your metadata is always optimized for maximum reach.",
        gradient: "from-blue-500 to-cyan-600",
    },
];

const values = [
    { icon: FaCheck, title: "100% Free Forever", description: "No hidden costs, no 'pro' badges, and no paywalled features for our core suite." },
    { icon: FaUsers, title: "Frictionless Access", description: "Start using tools instantly without the friction of account creation or logins." },
    { icon: FaBrain, title: "State-of-the-Art AI", description: "We use the latest LLMs and computer vision models tailored for video creators." },
    { icon: FaShieldAlt, title: "Zero Data Footprint", description: "We believe in privacy. Your data remains yours; we don't store or sell user usage." },
];

const stats = [
    { value: `${tools.length}+`, label: "AI-Powered Tools" },
    { value: "100K+", label: "Creators Empowered" },
    { value: "Zero", label: "Monthly Fees" },
    { value: "2026", label: "Ready" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            <div className="nebula-bg" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/40 backdrop-blur-md text-purple-700 text-xs font-black border border-white/60 mb-8 uppercase tracking-[0.2em] shadow-sm">
                            <FaHeart className="w-3 h-3 text-pink-500 animate-pulse" />
                            Empowering the 1% and the 99%
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-8 tracking-tighter font-outfit">
                            Our Mission for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600">Creators</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit">
                            We believe that professional-grade growth tools shouldn't be a luxury. In 2026, we are democratizing the YouTube algorithm for everyone—from the first-time uploader to the global media house.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {stats.map((stat, i) => (
                            <div key={i} className="glass-premium rounded-3xl p-10 text-center border-white/40 group hover:border-purple-500/30 transition-all duration-500">
                                <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter font-outfit group-hover:scale-110 transition-transform">{stat.value}</div>
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-32 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 font-outfit leading-tight text-center lg:text-left">
                                The <span className="text-purple-600">AI-Native</span> Workflow
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-outfit text-center lg:text-left">
                                Content creation is evolving. In 2026, successful creators aren't just experts at filming; they are experts at <strong>Leverage</strong>. <span className="font-semibold text-purple-700">{siteConfig.name}</span> provides that leverage.
                            </p>
                            <div className="space-y-6">
                                {values.map((val, i) => (
                                    <div key={i} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                                            <val.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{val.title}</h3>
                                            <p className="text-slate-500">{val.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square glass-premium rounded-[3rem] p-4 relative overflow-hidden group shadow-2xl">
                                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-purple-500/20 to-transparent p-12 flex flex-col justify-end">
                                    <h3 className="text-3xl font-black text-slate-900 mb-2 font-outfit">E-E-A-T Ready</h3>
                                    <p className="text-slate-600 font-medium">Expertise, Experience, Authoritativeness, and Trustworthiness—are at the core of every tool we build.</p>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                                    <FaBrain className="w-96 h-96" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-outfit tracking-tight">
                            Tools for Every Stage
                        </h2>
                        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-outfit">
                            Our suite covers the entire lifecycle of a viral video.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group glass-premium border-white/40 rounded-[2.5rem] p-10 md:p-12 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                            >
                                <div className="relative z-10 text-center md:text-left">
                                    <div className={`w-16 h-16 mb-8 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-black text-3xl text-slate-900 mb-6 font-outfit tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 text-lg leading-relaxed font-outfit font-medium">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden mx-4 md:mx-8 mb-8 rounded-[4rem]">
                <div className="absolute inset-0 bg-slate-900" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/40 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/40 blur-[150px] rounded-full" />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 py-12">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-10 font-outfit tracking-tighter">
                        Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Future</span> of Creation
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-outfit">
                        Start using professional tools today—absolutely free, no sign-up needed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/tools">
                            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 border-none font-bold shadow-2xl px-10 py-8 text-lg rounded-full">
                                Explore All Tools
                                <FaArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-white/10 hover:border-white px-10 py-8 text-lg rounded-full backdrop-blur-sm">
                                Get in Touch
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
