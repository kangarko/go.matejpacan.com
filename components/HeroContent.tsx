"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MousePosition } from '../app/hooks/useMousePosition'; // Adjusted path relative to components/

interface HeroContentProps {
  isLoaded: boolean;
  mousePosition: MousePosition;
}

const HeroContent: React.FC<HeroContentProps> = ({ isLoaded, mousePosition }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for text
  useEffect(() => {
    const handleMouseMove = () => {
      if (!mousePosition.x || !mousePosition.y) return;
      
      const xPos = (mousePosition.x / window.innerWidth - 0.5) * 20;
      const yPos = (mousePosition.y / window.innerHeight - 0.5) * 20;
      
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
      
      if (subHeadingRef.current) {
        gsap.to(subHeadingRef.current, {
          x: xPos * 0.3,
          y: yPos * 0.3,
          duration: 1,
          ease: 'power2.out',
        });
      }
      
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          x: xPos * 0.1,
          y: yPos * 0.1,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    };
    
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [mousePosition]);
  
  // Animation on load
  useEffect(() => {
    if (isLoaded) {
      const tl = gsap.timeline();
      
      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          subHeadingRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        );
    }
  }, [isLoaded]);

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