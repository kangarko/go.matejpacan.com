"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function OfferSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section
            ref={ref}
            className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container max-w-5xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                        Limited-Time Opportunity
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Every six months, I take on 2 people at a significantly reduced rate. Maybe you live in a cheaper country, have had some bad circumstances, or simply can't afford my regular rates.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-900 rounded-xl p-8 md:p-10 shadow-2xl border border-gray-800/50 hover:border-gray-700/50 transition-colors"
                >
                    <div className="grid md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="font-heading text-2xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                How Does It Work
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
                                        <span className="text-green-400">✓</span>
                                    </span>
                                    <span>1x Weekly 1-on-1 coaching call (60 minutes)</span>
                                </li>
                                <li className="flex">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
                                        <span className="text-green-400">✓</span>
                                    </span>
                                    <span>Direct email access (business hours)</span>
                                </li>
                                <li className="flex">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
                                        <span className="text-green-400">✓</span>
                                    </span>
                                    <span>Personalized strategy development</span>
                                </li>
                                <li className="flex">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
                                        <span className="text-green-400">✓</span>
                                    </span>
                                    <span>Copy and funnel reviews</span>
                                </li>
                                <li className="flex">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
                                        <span className="text-green-400">✓</span>
                                    </span>
                                    <span>SaaS integration guidance (when applicable)</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-heading text-2xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Who This Is For
                            </h3>
                            <ul className="space-y-4 mb-8">
                                <li className="flex">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
                                        <span className="text-green-400">✓</span>
                                    </span>
                                    <span>Coaches, consultants, and course creators who want a profitable business that changes lives.</span>
                                </li>
                                <li className="flex">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
                                        <span className="text-green-400">✓</span>
                                    </span>
                                    <span>People with strong work ethic who will implement between sessions.</span>
                                </li>
                                <li className="flex">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mr-4 group-hover:bg-red-500/20 transition-colors">
                                        <span className="text-red-400">✗</span>
                                    </span>
                                    <span>No dropshipping, crypto, or adult offers. Most people know if they are selling crap, if you are one of them, don't bother.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}