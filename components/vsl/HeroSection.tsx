"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CallToActionButton from "./CallToActionButton";
import Image from 'next/image';

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMouseInSection, setIsMouseInSection] = useState(false);
    const [isVideoTransitioning, setIsVideoTransitioning] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const videoId = "17gCxSKpz54";
    const thumbnailUrl = `https://i3.ytimg.com/vi/${videoId}/sddefault.jpg`;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            
            // Check if mouse is within the section
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                setIsMouseInSection(true);
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            } else {
                setIsMouseInSection(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handlePlayVideo = () => {
        // Set transitioning state to trigger effect
        setIsVideoTransitioning(true);
        
        // After a short delay, set the video to play
        setTimeout(() => {
            setIsVideoPlaying(true);
            
            // Keep transition effect on for a bit longer, then fade it out
            setTimeout(() => {
                setIsVideoTransitioning(false);
            }, 1000);
        }, 600);
    };

    return (
        <section 
            ref={sectionRef}
            className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-8 md:pt-32 pb-20 overflow-hidden bg-gray-950" 
            style={{ perspective: "1000px" }}
        >
            {/* Background image */}
            <Image
                src="/photoshoot-2.webp"
                alt="Background photoshoot"
                fill
                style={{ objectFit: "cover" }}
                quality={75}
                className="absolute inset-0 z-0 filter grayscale opacity-15"
                priority
            />
            
            {/* Mouse light effect */}
            <AnimatePresence>
                {isMouseInSection && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 z-0 pointer-events-none"
                            style={{
                                background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
                                    rgba(255, 230, 150, 0.2), 
                                    rgba(255, 200, 100, 0.05) 20%, 
                                    rgba(255, 180, 50, 0.01) 35%, 
                                    transparent 50%)`,
                                mixBlendMode: 'screen'
                            }}
                        />
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 z-0 pointer-events-none blur-md"
                            style={{
                                background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, 
                                    rgba(255, 220, 120, 0.15), 
                                    transparent 80%)`,
                                mixBlendMode: 'lighten'
                            }}
                        />
                        
                        {/* Extra intensity at cursor point */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.7, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute pointer-events-none blur-sm"
                            style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255, 230, 150, 0.6)',
                                left: mousePosition.x - 15,
                                top: mousePosition.y - 15,
                                mixBlendMode: 'lighten'
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
            
            {/* Video playing transition effect */}
            <AnimatePresence>
                {isVideoTransitioning && (
                    <>
                        {/* Flash effect */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ 
                                opacity: [0, 0.9, 0.3, 0],  
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                                duration: 1.5, 
                                times: [0, 0.1, 0.3, 1],
                                ease: "easeOut"
                            }}
                            className="absolute inset-0 z-50 bg-yellow-100 pointer-events-none"
                        />
                        
                        {/* Expanding rings */}
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ 
                                scale: 3, 
                                opacity: [0, 0.3, 0] 
                            }}
                            transition={{ 
                                duration: 1.8,
                                times: [0, 0.2, 1],
                                ease: "easeOut"  
                            }}
                            className="absolute left-1/2 top-1/2 w-40 h-40 -ml-20 -mt-20 rounded-full border-2 border-yellow-400/30 pointer-events-none z-50"
                        />
                        
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ 
                                scale: 2.5, 
                                opacity: [0, 0.4, 0] 
                            }}
                            transition={{ 
                                duration: 1.5,
                                delay: 0.2,
                                times: [0, 0.2, 1],
                                ease: "easeOut"  
                            }}
                            className="absolute left-1/2 top-1/2 w-40 h-40 -ml-20 -mt-20 rounded-full border-2 border-yellow-500/40 pointer-events-none z-50"
                        />
                    </>
                )}
            </AnimatePresence>
            
            <div className="container max-w-6xl mx-auto relative z-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 rounded-full text-yellow-300 text-sm font-semibold mb-8 border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <span className="tracking-wide">1:1 Beginner Mentoring Program - 75% Off</span>
                    </div>
                    <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                        Transform Your Coaching Business From <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-transparent bg-clip-text">Struggling to Scaling</span> In 90 Days
                    </h1>
                    <div className="flex items-center justify-center gap-6 mb-6">
                        <div className="text-center">
                            <div className="text-2xl text-gray-400 line-through">$4,000/mo</div>
                            <div className="text-sm text-gray-500">Regular Price</div>
                        </div>
                        <div className="text-center relative">
                            <div className="text-3xl font-bold text-yellow-400">$1,000/mo</div>
                            <div className="text-sm text-yellow-400/80">Special Beginner Offer</div>
                            <div className="absolute -top-3 -right-3 bg-yellow-400/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                                75% OFF
                            </div>
                        </div>
                    </div>
                    <p className="font-light text-xl md:text-2xl text-gray-300/90 max-w-3xl mx-auto tracking-wide">
                        No hype. No BS. Just proven strategies from someone who's done it and helped others do the same.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col items-center relative z-40"
                >
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ 
                            y: isVideoTransitioning ? [-5, 0] : 0,
                            scale: isVideoTransitioning ? [1.02, 1] : 1
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative w-full max-w-4xl mx-auto aspect-video bg-gray-900 rounded-lg shadow-2xl mb-10 overflow-hidden group pointer-events-auto"
                        onClick={!isVideoPlaying && !isVideoTransitioning ? handlePlayVideo : undefined}
                    >
                        {isVideoPlaying ? (
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <>
                                <motion.img
                                    src={thumbnailUrl}
                                    alt="Video Thumbnail"
                                    animate={{ 
                                        scale: isVideoTransitioning ? 1.1 : 1,
                                        filter: isVideoTransitioning ? "brightness(1.5) contrast(1.1)" : "brightness(1) contrast(1)"
                                    }}
                                    transition={{ duration: 0.7 }}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors cursor-pointer">
                                    <motion.div 
                                        animate={{
                                            scale: isVideoTransitioning ? [1, 1.5, 0] : 1,
                                            opacity: isVideoTransitioning ? [1, 0.8, 0] : 1
                                        }}
                                        transition={{ duration: 0.6 }}
                                        className="play-button relative flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500 shadow-lg"
                                    >
                                        <Play className="h-8 w-8 text-gray-900 fill-gray-900 ml-1" />
                                    </motion.div>
                                    <motion.span 
                                        animate={{
                                            opacity: isVideoTransitioning ? 0 : 1,
                                            y: isVideoTransitioning ? 10 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute bottom-6 text-lg font-medium text-white group-hover:text-yellow-300 transition-colors"
                                    >
                                        Watch The Full Video
                                    </motion.span>
                                </div>
                            </>
                        )}
                    </motion.div>

                    <p className="text-lg text-yellow-400 font-medium mb-6 pointer-events-auto">
                        Last year this offer sold out in under 3 hours. Limited to 2 spots per 6 months.
                    </p>

                    <div className="pointer-events-auto">
                        <CallToActionButton />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}