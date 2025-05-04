import { useState, useEffect, useRef } from 'react';

export interface MousePosition {
    x: number | null;
    y: number | null;
}

export const useMousePosition = (): MousePosition => {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: null,
        y: null
    });
    const isMobile = useRef(false);
    const animationFrame = useRef<number>(0);

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };

        const animateMobilePosition = () => {
            const time = Date.now() * 0.001;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Create a figure-8 pattern
            const scale = 0.3;
            const x = width * 0.5 + Math.sin(time) * width * scale;
            const y = height * 0.5 + Math.sin(time * 2) * height * scale * 0.5;

            setMousePosition({ x, y });
            animationFrame.current = requestAnimationFrame(animateMobilePosition);
        };

        // Add touch support for mobile
        const updateTouchPosition = (ev: TouchEvent) => {
            if (ev.touches.length > 0) {
                setMousePosition({
                    x: ev.touches[0].clientX,
                    y: ev.touches[0].clientY,
                });
            }
        };

        // Set initial position to center for mobile devices
        if ('ontouchstart' in window) {
            isMobile.current = true;
            animateMobilePosition();
        } else {
            window.addEventListener('mousemove', updateMousePosition);
        }

        if (isMobile.current) {
            window.addEventListener('touchmove', updateTouchPosition);
        }

        return () => {
            if (!isMobile.current) {
                window.removeEventListener('mousemove', updateMousePosition);
            } else {
                window.removeEventListener('touchmove', updateTouchPosition);
                if (animationFrame.current) {
                    cancelAnimationFrame(animationFrame.current);
                }
            }
        };
    }, []);

    return mousePosition;
};