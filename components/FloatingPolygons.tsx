import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Edges } from '@react-three/drei';
import { Group, Color, MeshBasicMaterial, Vector3, Euler } from 'three';

const FloatingPolygons: React.FC = () => {
    const groupRef = useRef<Group>(null);
    const targetPositions = useRef(Array(12).fill(null).map(() => new Vector3()));
    
    // Define types for position and rotation
    type PositionTuple = [number, number, number];
    type RotationTuple = [number, number, number];

    const polygons = Array.from({ length: 12 }, (_, i) => ({
        // Explicitly cast to tuples
        position: [
            Math.sin(i / 2) * 8,
            Math.cos(i / 3) * 8,
            Math.sin(i / 4) * 8 - 5
        ] as PositionTuple,
        rotation: [i * 0.4, i * 0.5, i * 0.6] as RotationTuple, 
        scale: 0.5 + Math.random() * 0.5,
    }));

    const materials = polygons.map(() =>
        new MeshBasicMaterial({
            color: new Color(0.3, 0.4, 1.0),
            transparent: true,
            opacity: 0,
            visible: false,
        })
    );

    useFrame(({ clock, mouse }) => {
        if (!groupRef.current) return;

        const time = clock.getElapsedTime();
        const lerpFactor = 0.05;

        groupRef.current.children.forEach((poly, i) => {
            const target = targetPositions.current[i];

            // Update target position
            target.set(
                polygons[i].position[0] + Math.sin(time * 0.5 + i) * 0.5 + mouse.x * 2,
                polygons[i].position[1] + Math.cos(time * 0.4 + i) * 0.5 - mouse.y * 2,
                polygons[i].position[2]
            );

            // Smooth position interpolation
            poly.position.lerp(target, lerpFactor);

            // Gentle rotation
            poly.rotation.x += 0.002;
            poly.rotation.y += 0.003;
        });
    });

    return (
        <group ref={groupRef}>
            {polygons.map((props, i) => (
                // Pass props individually instead of spreading to ensure type safety
                <Icosahedron 
                    key={i} 
                    args={[1, 1]} 
                    material={materials[i]} 
                    position={props.position} 
                    rotation={props.rotation} 
                    scale={props.scale}
                >
                    <Edges
                        scale={1.001}
                        threshold={15}
                        color="#4080ff"
                        renderOrder={1000}
                    />
                </Icosahedron>
            ))}
        </group>
    );
};

export default FloatingPolygons;