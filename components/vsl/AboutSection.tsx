"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import Image from 'next/image';

export default function AboutSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const credentials = [
        {
            title: "CEO/Founder @ MineAcademy.org",
            description: "550k revenue, 1M+ app downloads, #1 in the niche",
        },
        {
            title: "(Ex) COO @ SourceHacker.com",
            description: "1.3M revenue, 3k successful students",
        },
    ];

    return (
        <section
            ref={ref}
            className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
        >
            <div className="container max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                        Why Work With Me?
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Unlike gurus who are like a walking webinar, I've built software and consulting businesses that need no hyped up, "greatest opportunity" kind of marketing.
                    </p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-10 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-gray-800/50"
                    >
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                My Credentials
                            </h3>
                            <div className="space-y-6">
                                {credentials.map((credential, index) => (
                                    <div key={index} className="flex">
                                        <div className="flex-shrink-0 mr-4">
                                            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                                                <Star className="h-5 w-5 text-yellow-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white">{credential.title}</h4>
                                            <p className="text-gray-400">{credential.description}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex">
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">That's it!</h4>
                                        <p className="text-gray-400">I don't run 15 businesses or claim to be a guru with dozens of ventures. I prefer to focus deeply on one business and take a few private clients on the side who I can truly help transform.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 30 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-800/50"
                    >
                        <div className="relative h-[370px] overflow-hidden">
                            <Image
                                src="/photoshoot-2.webp"
                                alt="My Story and Values"
                                layout="fill"
                                objectFit="cover"
                                className="object-center"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* New Sections Container */}
                <div className="mb-16 space-y-16">
                    {/* Section 1: Image Left, Text Right */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-gray-900/50 via-gray-900/50 to-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-800/40"
                    >
                        <div className="md:w-1/2 w-full flex-shrink-0">
                            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src="./lms.webp"
                                    alt="Software Development Interface"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <h3 className="text-2xl font-bold text-white mb-4">I built Skool and Hyros before they existed</h3>
                            <p className="text-gray-400 mb-3">
                                I started MineAcademy through niche online forums and organic marketing before Hyros and Skool.
                            </p>
                            <p className="text-gray-400 mb-4">
                                I built custom billing, learning portal and multi-channel attribution tracking system and all done in-house.
                            </p>
                            <a
                                href="https://github.com/kangarko"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium inline-flex items-center gap-1"
                            >
                                Check out my GitHub profile here
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Section 2: Text Left, Image Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 30 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-bl from-gray-900/50 via-gray-900/50 to-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-800/40"
                    >
                        <div className="md:w-1/2 w-full md:order-1 order-2">
                            <h3 className="text-2xl font-bold text-white mb-4">Sam Ovens invited me to a call</h3>
                            <p className="text-gray-400 mb-3">
                                After enrolling in Uplevel Consulting I was invited to a private call with Sam to show him our own platform and give suggestions for Skool, before it became popular.
                            </p>
                        </div>
                        <div className="md:w-1/2 w-full flex-shrink-0 md:order-2 order-1">
                            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                                <iframe
                                    src="https://www.youtube.com/embed/62zsYKLWO1Y"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-900 rounded-xl p-8 md:p-10 shadow-2xl border border-gray-800/50"
                >
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                My Coaching Philosophy
                            </h3>
                            <p className="text-gray-300 mb-6">
                                I grew up in a poor Slovakian household, so I understand financial struggles firsthand. That's why every six months, I accept two clients at a reduced rate.
                            </p>
                            <p className="text-gray-300 mb-6">
                                What I look for is simple: the right attitude and work ethic. If you're willing to wake up and do the work, I'm happy to guide you. But I expect honesty - if you screw up, just tell me. I've had my own demons to overcome, but honesty is the key.
                            </p>
                            <p className="text-yellow-400 font-medium">
                                Fair warning: If you won't do the work, I'll fire you and find someone else who will.
                            </p>
                        </div>
                        <div className="aspect-square relative rounded-xl overflow-hidden">
                            <img
                                src="./matej.webp"
                                alt="Matej Pacan"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}