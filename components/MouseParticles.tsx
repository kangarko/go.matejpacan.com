import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector2, Vector3, Color, AdditiveBlending, Points } from 'three';
import { MousePosition } from '../app/hooks/useMousePosition';

interface MouseParticlesProps {
  mousePosition: MousePosition;
  mouseVelocity: Vector2;
}

interface Particle {
  position: Vector3;
  velocity: Vector3;
  lifespan: number;
  maxLifespan: number;
  size: number;
}

const PARTICLE_COUNT = 200;
const PARTICLE_SIZE = 0.035;
const MAX_LIFESPAN = 3.0;

const MouseParticles: React.FC<MouseParticlesProps> = ({ mousePosition, mouseVelocity }) => {
  const particlesRef = useRef<Points>(null);
  
  // Calculate world coordinates from screen coordinates
  const getWorldCoordinates = (x: number, y: number): Vector3 => {
    // Normalize coordinates to -1 to 1
    const normalizedX = (x / window.innerWidth) * 2 - 1;
    const normalizedY = -(y / window.innerHeight) * 2 + 1;
    
    // Scale based on camera distance
    const z = 0;
    const distance = 6; // Same as camera distance
    const fov = 50 * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * distance;
    const width = height * (window.innerWidth / window.innerHeight);
    
    return new Vector3(normalizedX * width / 2, normalizedY * height / 2, z);
  };
  
  // Create particles
  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      temp.push({
        position: new Vector3(100, 100, 0), // Start off-screen
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
        lifespan: 0,
        maxLifespan: Math.random() * MAX_LIFESPAN,
        size: Math.random() * PARTICLE_SIZE + PARTICLE_SIZE * 0.5,
      });
    }
    return temp;
  }, []);
  
  // Particle system animation
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    const sizes = particlesRef.current.geometry.attributes.size.array;
    const colors = particlesRef.current.geometry.attributes.color.array;
    const delta = Math.min(clock.getDelta(), 0.1); // Cap delta time
    
    // Update particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = particles[i];
      
      // If mouse moved and particle is dead, revive it at mouse position
      if (
        mousePosition.x &&
        mousePosition.y &&
        (particle.lifespan <= 0 || Math.random() > 0.98) &&
        (Math.abs(mouseVelocity.x) > 0.5 || Math.abs(mouseVelocity.y) > 0.5)
      ) {
        const worldPos = getWorldCoordinates(mousePosition.x, mousePosition.y);
        
        // Set new position at mouse
        particle.position.copy(worldPos);
        
        // Set velocity based on mouse movement
        const speedFactor = 0.01;
        particle.velocity.set(
          mouseVelocity.x * speedFactor * (Math.random() * 0.5 + 0.5),
          -mouseVelocity.y * speedFactor * (Math.random() * 0.5 + 0.5),
          (Math.random() - 0.5) * 0.01
        );
        
        // Reset lifespan
        particle.lifespan = particle.maxLifespan;
      }
      
      // Update position based on velocity
      particle.position.add(particle.velocity);
      
      // Apply some drag
      particle.velocity.multiplyScalar(0.98);
      
      // Decrease lifespan
      particle.lifespan -= delta;
      
      // Update position in geometry
      const i3 = i * 3;
      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;
      
      // Update size based on lifespan
      const lifeFactor = Math.max(0, particle.lifespan / particle.maxLifespan);
      sizes[i] = particle.size * lifeFactor;
      
      // Update color based on lifespan
      const i4 = i * 4;
      // Blue/purple gradient that fades out
      colors[i4] = 0.03 + lifeFactor * 0.12; // R
      colors[i4 + 1] = 0.15 + lifeFactor * 0.15; // G
      colors[i4 + 2] = 0.5 + lifeFactor * 0.25; // B
      colors[i4 + 3] = lifeFactor; // A
    }
    
    // Update buffers
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.size.needsUpdate = true;
    particlesRef.current.geometry.attributes.color.needsUpdate = true;
  });
  
  // Prepare positions, sizes, and colors arrays
  const positionsArray = new Float32Array(PARTICLE_COUNT * 3);
  const sizesArray = new Float32Array(PARTICLE_COUNT);
  const colorsArray = new Float32Array(PARTICLE_COUNT * 4);
  
  // Initialize with starting values
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const i4 = i * 4;
    positionsArray[i3] = 100; // Off-screen
    positionsArray[i3 + 1] = 100;
    positionsArray[i3 + 2] = 0;
    
    sizesArray[i] = 0;
    
    colorsArray[i4] = 0.5;
    colorsArray[i4 + 1] = 0.5;
    colorsArray[i4 + 2] = 1.0;
    colorsArray[i4 + 3] = 1.0;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        {/* @ts-ignore - R3F types might be conflicting with linter/TS config */}
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positionsArray}
          itemSize={3}
        />
         {/* @ts-ignore - R3F types might be conflicting with linter/TS config */}
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizesArray}
          itemSize={1}
        />
         {/* @ts-ignore - R3F types might be conflicting with linter/TS config */}
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colorsArray}
          itemSize={4}
        />
      </bufferGeometry>
      <pointsMaterial
        size={PARTICLE_SIZE}
        sizeAttenuation={true}
        vertexColors
        transparent
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default MouseParticles;