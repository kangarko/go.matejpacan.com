import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Vector2 } from 'three';
import MouseParticles from './MouseParticles';
import { MousePosition } from '../app/hooks/useMousePosition';
import CosmosBackground from './vsl/CosmicBackground';

interface ThreeCanvasProps {
    mousePosition: MousePosition;
}

// Camera controller component
const CameraController: React.FC<{ mousePosition: MousePosition }> = ({ mousePosition }) => {
    const { camera } = useThree();
    const lerpFactor = 0.05;

    useFrame(() => {
        if (!mousePosition.x || !mousePosition.y) return;

        // Calculate normalized position (-1 to 1)
        const targetX = (mousePosition.x / window.innerWidth) * 2 - 1;
        const targetY = (mousePosition.y / window.innerHeight) * 2 - 1;

        // Smooth camera movement with lerp
        camera.position.x += (targetX * 0.3 - camera.position.x) * lerpFactor;
        camera.position.y += (-targetY * 0.3 - camera.position.y) * lerpFactor;

        // Always look at center
        camera.lookAt(0, 0, 0);
    });

    return null;
};

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ mousePosition }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseVelocity = useRef<Vector2>(new Vector2(0, 0));
    const prevMousePosition = useRef<Vector2>(new Vector2(0, 0));

    useEffect(() => {
        if (mousePosition.x && mousePosition.y) {
            // Calculate mouse velocity
            mouseVelocity.current.x = mousePosition.x - prevMousePosition.current.x;
            mouseVelocity.current.y = mousePosition.y - prevMousePosition.current.y;

            // Update previous position
            prevMousePosition.current.x = mousePosition.x;
            prevMousePosition.current.y = mousePosition.y;
        }
    }, [mousePosition]);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full">
            <Canvas
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                camera={{ position: [0, 0, 7], fov: 45 }}
                className="w-full h-full"
            >
                <CameraController mousePosition={mousePosition} />
                <CosmosBackground />
                <MouseParticles mousePosition={mousePosition} mouseVelocity={mouseVelocity.current} />
            </Canvas>
        </div>
    );
};

export default ThreeCanvas;