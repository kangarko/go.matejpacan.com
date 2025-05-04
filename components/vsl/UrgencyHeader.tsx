"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";

export default function UrgencyHeader() {
    const [endDate, setEndDate] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const headerRef = useRef(null);

    useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() + 2);
        setEndDate(date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }));
    }, []);

    useEffect(() => {
        let lastScroll = window.scrollY;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (window.innerWidth >= 768) {
                setIsVisible(currentScroll <= lastScroll || currentScroll < 100);
            }
            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                setIsVisible(true);
            } else {
                handleScroll();
            }
        });
        
        if (window.innerWidth < 768) {
            setIsVisible(true);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        }
    }, []);

    return (
        <motion.div
            ref={headerRef}
            initial={{ y: 0 }}
            animate={{
                y: isVisible ? 0 : (window.innerWidth >= 768 ? -100 : 0),
                opacity: isVisible ? 1 : (window.innerWidth >= 768 ? 0 : 1),
            }}
            transition={{ duration: 0.3 }}
            className="relative md:fixed md:top-0 md:left-0 md:right-0 md:z-50 backdrop-blur-md bg-black/30 border-b border-yellow-500/20"
        >
            <div className="py-4 px-4">
                <div className="container max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left space-y-1">
                            <p className="font-medium tracking-wide">
                                <span className="text-yellow-400">1:1 Beginner Mentoring Program</span>
                                <span className="mx-2">•</span>
                                <span className="text-gray-200">Ends {endDate}</span>
                            </p>
                            <p className="text-sm text-gray-400 font-light">
                                Only <span className="text-yellow-400 font-medium">2 clients</span> at this rate accepted every 6 months
                            </p>
                        </div>
                        <CountdownTimer />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}