"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CallToActionButton() {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        const element = document.getElementById('strategy-call');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900 font-bold text-lg shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] transition-all duration-300 relative overflow-hidden group cursor-pointer"
        >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
            <span className="relative flex items-center">
                Reserve Your Spot Now
                <motion.span
                    animate={{
                        x: isHovered ? 8 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                >
                    <ArrowRight className="h-5 w-5" />
                </motion.span>
            </span>
        </motion.button>
    );
}