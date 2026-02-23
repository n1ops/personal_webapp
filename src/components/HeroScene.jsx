import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useThemeStore } from '../hooks/useThemeStore';
import './HeroScene.css';

// Module-level mouse position (same pattern as AuroraBackground)
const mouse = { x: 0, y: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

function WireframeIcosahedron() {
  const meshRef = useRef();
  const theme = useThemeStore((s) => s.theme);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Slow auto-rotation
    meshRef.current.rotation.y += 0.08 * delta;
    meshRef.current.rotation.x += 0.05 * delta;

    // Mouse-reactive tilt (lerp towards mouse position)
    const targetRotX = mouse.y * 0.3;
    const targetRotZ = mouse.x * 0.2;
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.z += (targetRotZ - meshRef.current.rotation.z) * 0.02;
  });

  const wireColor = theme === 'dark' ? '#ffffff' : '#1a1a1a';
  const wireOpacity = theme === 'dark' ? 0.06 : 0.08;

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        wireframe
        color={wireColor}
        transparent
        opacity={wireOpacity}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const [scale, setScale] = useState(window.innerWidth > 768 ? 2.5 : 1.8);

  // Check reduced motion preference
  const [reducedMotion] = useState(() =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth > 768 ? 2.5 : 1.8);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (reducedMotion) return null;

  return (
    <div className="hero-scene">
      <Canvas
        gl={{ alpha: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 50 }}
      >
        <group scale={scale}>
          <WireframeIcosahedron />
        </group>
      </Canvas>
    </div>
  );
}
