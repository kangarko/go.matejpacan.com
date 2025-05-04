"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Sparkles } from "lucide-react";
import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import CallToActionButton from "./CallToActionButton";
// Keep the updated background import if needed, or revert if not
// import CosmicBackground from "./CosmicBackground"; 
import Image from 'next/image'; // Import Next.js Image component
// Remove YouTubePlayerOverlay import
// import YouTubePlayerOverlay from "./YouTubePlayerOverlay"; 

// --- Animated Play Button --- (Keep styles)
const playButtonStyles = `
  .play-button {
    transition: transform 0.2s ease-out, background-color 0.2s ease-out;
  }
  .play-button:hover {
    transform: scale(1.15);
    background-color: #facc15; /* Slightly brighter yellow on hover */
  }
  .play-button:active {
    transform: scale(1.05);
  }
`;

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoId = "Jv_mGIZ7hM8";
    const thumbnailUrl = `https://i3.ytimg.com/vi/${videoId}/sddefault.jpg`;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handlePlayVideo = () => {
        setIsVideoPlaying(true);
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-32 pb-20 overflow-hidden bg-gray-950" style={{ perspective: "1000px" }}>
            <Image
                src="/photoshoot-2.webp"
                alt="Background photoshoot"
                layout="fill"
                objectFit="cover"
                quality={75}
                className="absolute inset-0 z-0 filter grayscale opacity-15"
                priority
            />
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
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
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
                    <p className="text-xl md:text-2xl text-gray-300/90 max-w-3xl mx-auto font-light tracking-wide">
                        No hype. No BS. Just proven strategies from someone who's done it and helped others do the same.
                    </p>
                </motion.div>

                {/* Video and CTA container */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col items-center relative z-40"
                >
                    <div
                        className="relative w-full max-w-4xl mx-auto aspect-video bg-gray-900 rounded-lg shadow-2xl mb-10 overflow-hidden group pointer-events-auto"
                        onClick={!isVideoPlaying ? handlePlayVideo : undefined}
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
                                <img
                                    src={thumbnailUrl}
                                    alt="Video Thumbnail"
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors cursor-pointer">
                                    <div className="play-button relative flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500 shadow-lg">
                                        <Play className="h-8 w-8 text-gray-900 fill-gray-900 ml-1" />
                                    </div>
                                    <span className="absolute bottom-6 text-lg font-medium text-white group-hover:text-yellow-300 transition-colors">
                                        Watch The Full Video
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

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