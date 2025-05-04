"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle } from "lucide-react";
import CallToActionButton from "./CallToActionButton";

const caseStudies = [
    {
        id: "beginner",
        name: "Mikolaj",
        role: "Software Developer to Coach",
        title: "Beginner: $0 to $27k/mo in 90 Days",
        metrics: [
            { label: "Revenue", value: "$27,273/mo" },
            { label: "Profit", value: "$13,875/mo" },
            { label: "Timeframe", value: "3 Months" },
        ],
        highlights: [
            "Zero prior business experience",
            "VSL funnel",
            "High-paying retainer clients",
            "Had to pause ads due to demand"
        ],
        description: "Mikolaj worked a 9-5 job as a computer programmer with zero business experience. He'd never closed a client, made a VSL, or written an ad before. He picked a challenging niche – helping high school students prepare for exams and overcome procrastination. In 3 months, Mikolaj first build a VSL funnel and went from 0 to over $12,000/mo from 10 high-paying, retainer clients and then he went onto building an automated webinar funnel scaling past $27k/mo.",
        image: "./mikolaj.png"
    },
    {
        id: "advanced",
        name: "Peter",
        role: "Agency Owner to Purpose-Driven Entrepreneur",
        title: "Advanced: $0 to $1.3M in 13 Months",
        metrics: [
            { label: "Revenue", value: "$1.3M" },
            { label: "Profit", value: "$500K" },
            { label: "Timeframe", value: "13 Months" },
        ],
        highlights: [
            "Complete market pivot",
            "Automated webinar funnel",
            "Purchased property in Budapest",
            "Sustainable business model"
        ],
        description: "Peter left his marketing agency to build SourceHacker.com, helping people overcome trauma. He entered a new market with and launched from 0 with no prior niche experience. I helped him rebuild his team and optimize his funnel. In 13 months, Peter collected $1.2M in revenue, of which $500k was profit, allowing him to purchase a penthouse in Budapest.",
        image: "./peter.jpg"
    }
];

const TabButton = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`relative px-8 py-4 rounded-lg font-medium transition-all duration-300 ${isActive
            ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400"
            : "hover:bg-gray-800/50 text-gray-400 hover:text-white"
            }`}
    >
        {isActive && (
            <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        )}
        <span className="relative z-10">{children}</span>
    </button>
);
export default function CaseStudies() {
    const [activeTab, setActiveTab] = useState("beginner");
    const { ref: sectionRef, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden"
        >
            <div className="container max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                        Results For All Experience Levels*
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        *Your results will vary based on factors such as work ethic, emotional baggage, ego, persistence, market conditions, and more.
                    </p>
                </motion.div>

                <div className="flex justify-center mb-12">
                    <div className="flex gap-4">
                        {caseStudies.map((study) => (
                            <TabButton
                                key={study.id}
                                isActive={activeTab === study.id}
                                onClick={() => setActiveTab(study.id)}
                            >
                                {study.name}
                            </TabButton>
                        ))}
                    </div>
                </div>

                <div className="relative mb-16">
                    {caseStudies.map((study) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{
                                opacity: activeTab === study.id ? 1 : 0,
                                scale: activeTab === study.id ? 1 : 0.95,
                                display: activeTab === study.id ? "block" : "none"
                            }}
                            transition={{ duration: 0.4 }}
                            className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
                        >
                            <div className="grid md:grid-cols-2 gap-8 p-8">
                                <div>
                                    <div className="mb-8">
                                        <span className="text-yellow-400 font-medium text-sm tracking-wider uppercase mb-2 block">
                                            {study.role}
                                        </span>
                                        <h3 className="text-2xl font-bold mb-4">{study.title}</h3>
                                        <p className="text-gray-400">{study.description}</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {study.metrics.map((metric, index) => (
                                            <div key={index} className="bg-gray-800/50 rounded-lg p-4 text-center">
                                                <div className="text-xl font-bold text-yellow-400 mb-1">{metric.value}</div>
                                                <div className="text-sm text-gray-400">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <ul className="space-y-3">
                                        {study.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-center gap-3 text-gray-300">
                                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="relative">
                                    <div className="aspect-[4/5] rounded-xl overflow-hidden">
                                        <img
                                            src={study.image}
                                            alt={study.name}
                                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center"
                >
                    <CallToActionButton />
                </motion.div>
            </div>
        </section>
    );
}