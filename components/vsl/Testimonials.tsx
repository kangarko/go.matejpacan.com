"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote } from "lucide-react";
import Image from 'next/image';

export default function Testimonials() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const testimonials = [
        {
            name: "Alex Becker",
            role: "CEO of Hyros.com",
            image: "/alex.jpg",
            quote: "I could literally land a $100-$150k a year job with the coding skills I've picked up learning game dev. I know Matej Pacan has an offer like this.",
        }
    ];

    return (
        <section
            ref={ref}
            className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px]"></div>
            </div>
            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-1 gap-8 md:gap-12">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                            className="group"
                        >
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                                <div className="flex-shrink-0">
                                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-yellow-500/20 group-hover:border-yellow-500/30 transition-colors duration-500 shadow-lg">
                                        <Image 
                                            src={testimonial.image} 
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <Quote className="h-8 w-8 text-yellow-500/30 mb-3 mx-auto md:mx-0" />
                                    <div className="relative">
                                        <p className="text-gray-300 italic mb-4 leading-relaxed">
                                            "{testimonial.quote}"
                                        </p>
                                    </div>

                                    <div className="mt-6 flex flex-col items-center md:items-start">
                                        <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
} 