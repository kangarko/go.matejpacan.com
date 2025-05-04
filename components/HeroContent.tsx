"use client";

import React, { useEffect, useRef } from 'react';

interface HeroContentProps {
    isLoaded: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({ isLoaded }) => {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subHeadingRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    return (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center px-4">
                <h1
                    ref={headingRef}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-100 mb-4 tracking-tight will-change-transform"
                    style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
                >
                    Build & Grow Your SaaS
                </h1>
                <p
                    ref={subHeadingRef}
                    className="text-xl md:text-2xl text-blue-200/90 mb-8 max-w-2xl mx-auto will-change-transform"
                    style={{ textShadow: '0 0 15px rgba(59, 130, 246, 0.4)' }}
                >
                    Launch faster and scale smarter with our powerful platform
                </p>
                <div ref={ctaRef} className="will-change-transform">
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 pointer-events-auto">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroContent; 