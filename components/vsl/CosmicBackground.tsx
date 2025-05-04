import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Stars, Environment } from '@react-three/drei';
import { Group, Mesh, ShaderMaterial, Points, BufferGeometry, Float32BufferAttribute, Color, Vector3, AdditiveBlending } from 'three';

// --- NEW: Fireworks Component ---
const FIREWORK_PARTICLES = 300;
const FIREWORK_LIFESPAN = 4.0; // Slow explosion, longer life
const FIREWORK_SIZE = 0.15;    // Larger particle size

function Fireworks() {
  const pointsRef = useRef<Points>(null);
  const particlesData = useMemo(() => {
    const data: { position: Vector3; velocity: Vector3; life: number; initialLife: number; color: Color }[] = [];
    for (let i = 0; i < FIREWORK_PARTICLES; i++) {
      data.push({
        position: new Vector3(), // Start hidden or at origin
        velocity: new Vector3(),
        life: 0,
        initialLife: FIREWORK_LIFESPAN * (0.8 + Math.random() * 0.4), // Vary lifespan slightly
        color: new Color()
      });
    }
    return data;
  }, []);

  const [explosionState, setExplosionState] = useState({
    active: false,
    position: new Vector3(),
    startTime: 0
  });
  const nextExplosionTime = useRef(Math.random() * 5 + 3); // Time until next explosion

  // Geometry and attributes
  const geometry = useMemo(() => new BufferGeometry(), []);
  const positions = useMemo(() => new Float32Array(FIREWORK_PARTICLES * 3), []);
  const colors = useMemo(() => new Float32Array(FIREWORK_PARTICLES * 3), []);
  const sizes = useMemo(() => new Float32Array(FIREWORK_PARTICLES), []);

  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1));

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const points = pointsRef.current;
    if (!points) return;

    // Trigger explosion logic
    if (!explosionState.active && time > nextExplosionTime.current) {
      const explosionPos = new Vector3(
        (Math.random() - 0.5) * 20, // Random position within view
        (Math.random() - 0.5) * 15,
        -5 - Math.random() * 10     // Slightly behind
      );
      setExplosionState({ active: true, position: explosionPos, startTime: time });
      nextExplosionTime.current = time + Math.random() * 8 + 6; // Schedule next one (6-14s later)

      // Initialize particles for explosion
      particlesData.forEach(p => {
        p.position.copy(explosionPos);
        const speed = 0.5 + Math.random() * 1.5; // Slow speed
        p.velocity.set(
          (Math.random() - 0.5) * speed,
          (Math.random() - 0.5) * speed,
          (Math.random() - 0.5) * speed
        );
        p.life = p.initialLife;
        // Gold/Orange/Yellow hues
        p.color.setHSL(0.1 + Math.random() * 0.05, 0.9, 0.6 + Math.random() * 0.2);
      });
    }

    let activeParticles = 0;
    // Update active explosion particles
    if (explosionState.active) {
      const explosionElapsedTime = time - explosionState.startTime;
      particlesData.forEach((p, i) => {
        if (p.life > 0) {
          activeParticles++;
          // Apply gravity/drag for slower effect
          p.velocity.y -= 0.008; // Gentle gravity
          p.velocity.multiplyScalar(0.97); // Drag
          p.position.addScaledVector(p.velocity, 0.1); // Adjust scalar for speed control
          p.life -= 0.02; // Adjust life decay rate

          const lifeRatio = Math.max(0, p.life / p.initialLife);
          const i3 = i * 3;
          positions[i3] = p.position.x;
          positions[i3 + 1] = p.position.y;
          positions[i3 + 2] = p.position.z;

          // Fade color and size
          colors[i3] = p.color.r * lifeRatio;
          colors[i3 + 1] = p.color.g * lifeRatio;
          colors[i3 + 2] = p.color.b * lifeRatio;
          sizes[i] = FIREWORK_SIZE * lifeRatio * lifeRatio; // Fade size quadratically
        } else {
          // Hide dead particles
          const i3 = i * 3;
          positions[i3] = positions[i3+1] = positions[i3+2] = 10000; // Move offscreen
          sizes[i] = 0;
        }
      });

      // Check if explosion finished
      if (activeParticles === 0) {
        setExplosionState({ ...explosionState, active: false });
      }

      // Mark attributes for update
      points.geometry.attributes.position.needsUpdate = true;
      points.geometry.attributes.color.needsUpdate = true;
      points.geometry.attributes.size.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={FIREWORK_SIZE} // Base size
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={AdditiveBlending}
        depthWrite={false} // Important for blending
      />
    </points>
  );
}

const CosmosBackground: React.FC = () => {
  const starsRef = useRef<Points | null>(null);
  const nebulaRef = useRef<Mesh | null>(null);
  const nebulaMaterial = useRef<ShaderMaterial | null>(null);
  const floatingStarsRef = useRef<Points | null>(null);
  
  // Custom shader material instance
  const shaderMaterialInstance = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouseX: { value: 0 },
      uMouseY: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uMouseX;
      uniform float uMouseY;
      varying vec2 vUv;
      
      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        // First corner
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        // Permutations
        i = mod289(i);
        vec4 p = permute(permute(permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                 
        // Gradients from 7x7 points over a square, mapped onto an octahedron
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        // Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        // Mix final noise value
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }
      
      void main() {
        // Create a cosmic nebula effect
        vec2 uv = vUv * 2.0 - 1.0;
        
        // Create multiple layers of noise
        float n1 = snoise(vec3(uv * 1.5, uTime * 0.05));
        float n2 = snoise(vec3(uv * 2.0, uTime * 0.08 + 100.0));
        float n3 = snoise(vec3(uv * 4.0, uTime * 0.03 + 200.0));
        
        // Combine noise layers
        float noiseVal = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
        
        // Create color gradient
        vec3 color1 = vec3(0.001, 0.002, 0.01); // Even deeper space black
        vec3 color2 = vec3(0.002, 0.004, 0.015); // Darker deep space blue
        vec3 color3 = vec3(0.004, 0.008, 0.02); // Rich dark blue
        
        // Mix colors based on noise
        vec3 color = mix(color1, color2, smoothstep(0.2, 0.8, noiseVal));
        color = mix(color, color3, smoothstep(-0.2, 0.2, -noiseVal));
        
        // Add volumetric light rays
        float rays = 0.0;
        for(float i = 0.0; i < 32.0; i++) {
          float angle = (i / 32.0) * 3.14159 * 2.0;
          vec2 rayDir = vec2(cos(angle), sin(angle));
          float intensity = pow(max(0.0, dot(normalize(uv), rayDir)), 32.0);
          rays += intensity * 0.02;
        }
        color += vec3(0.1, 0.2, 0.4) * rays * (sin(uTime * 0.5) * 0.5 + 0.5);
        
        // Mouse-reactive glow
        vec2 mousePos = vec2(uMouseX, uMouseY);
        float distToMouse = length(mousePos - vUv);
        float glow = exp(-distToMouse * 4.0);
        
        // Create a more sophisticated glow effect
        vec3 glowColor = vec3(0.1, 0.2, 0.6); // Even softer blue glow
        float pulseEffect = sin(uTime * 2.0) * 0.5 + 0.5; // Pulsing effect
        float glowIntensity = glow * (0.15 + pulseEffect * 0.08);
        
        // Add ripple effect
        float ripple = sin(distToMouse * 20.0 - uTime * 3.0) * 0.5 + 0.5;
        glowIntensity += ripple * glow * 0.03;
        
        color += glowColor * glowIntensity;
        
        // Add some stars/highlights
        float stars = pow(max(0.0, snoise(vec3(uv * 20.0, uTime * 0.01))), 20.0);
        
        // Add star trails
        float trail = pow(max(0.0, snoise(vec3(uv.x * 40.0 + uTime * 0.1, uv.y * 40.0, 0.0))), 8.0);
        color += vec3(0.4, 0.6, 0.8) * (stars * 0.4 + trail * 0.2);
        
        // Vignette effect
        float vignette = 1.0 - smoothstep(0.4, 1.6, length(uv));
        color *= vignette;
        
        // Add subtle color aberration
        float aberration = 0.02;
        vec3 colorShift = vec3(
          snoise(vec3(uv * 1.0 - aberration, uTime * 0.1)),
          snoise(vec3(uv * 1.0, uTime * 0.1)),
          snoise(vec3(uv * 1.0 + aberration, uTime * 0.1))
        );
        color += colorShift * 0.015;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: true,
  });

  useFrame(({ clock, mouse, size }) => {
    const elapsedTime = clock.getElapsedTime();
    
    // Rotate stars slowly
    if (starsRef.current) {
      starsRef.current.rotation.y = elapsedTime * 0.03;
      starsRef.current.rotation.x = Math.sin(elapsedTime * 0.015) * 0.15;
    }
    
    // Animate floating stars
    if (floatingStarsRef.current) {
      floatingStarsRef.current.rotation.y = elapsedTime * 0.01;
      floatingStarsRef.current.position.y = Math.sin(elapsedTime * 0.2) * 0.5;
    }
    
    // Update nebula shader time
    if (nebulaMaterial.current) {
      nebulaMaterial.current.uniforms.uTime.value = elapsedTime;
      nebulaMaterial.current.uniforms.uMouseX.value = (mouse.x + 1) * 0.5;
      nebulaMaterial.current.uniforms.uMouseY.value = (mouse.y + 1) * 0.5;
    }
  });

  return (
    <>
      {/* Environment light */}
      <Environment preset="night" />
      
      {/* Ambient light */}
      <ambientLight intensity={0.2} />
      
      {/* Stars background */}
      <Stars
        ref={starsRef}
        radius={80}
        depth={120}
        count={10000}
        factor={6}
        saturation={0.5}
        fade
        speed={1.5}
      />
      
      {/* Additional floating stars layer */}
      <Stars
        ref={floatingStarsRef}
        radius={50}
        depth={40}
        count={4000}
        factor={7}
        saturation={0.7}
        fade
        speed={0.6}
      />
      
      {/* Nebula background */}
      <mesh ref={nebulaRef} position={[0, 0, -10]}>
        <planeGeometry args={[40, 40]} />
        <primitive object={shaderMaterialInstance} ref={nebulaMaterial} />
      </mesh>
      
      {/* Add Fireworks */}
      <Fireworks />
    </>
  );
};

export default CosmosBackground;