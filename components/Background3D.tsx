'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const generateStars = () => {
  const starCount = 3000;
  const positions = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    const r = 20 + Math.random() * 80;
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    sizes[i] = Math.random() * 1.5;
  }
  return { positions, sizes };
};

const initialStars = generateStars();

const Starfield = () => {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const [positions, sizes] = useMemo(() => {
    return [initialStars.positions, initialStars.sizes];
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;

    // Parallax effect with mouse
    const targetX = mouse.x * 2;
    const targetY = mouse.y * 2;
    
    ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00bfff"
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const GridSystem = () => {
  const gridRef = useRef<THREE.GridHelper>(null!);
  const { mouse } = useThree();

  useFrame(() => {
    if (!gridRef.current) return;
    // Parallax effect on grid
    gridRef.current.position.x = mouse.x * 1.5;
    gridRef.current.position.y = mouse.y * 1.5 - 10;
    gridRef.current.rotation.z = mouse.x * 0.05;
    gridRef.current.rotation.x = Math.PI / 2 + mouse.y * 0.05;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[200, 100, '#0055ff', '#002255']}
      position={[0, -10, -20]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
};

const FloatingMathSymbols = () => {
    // A simple implementation of particles that could have textures, but for simplicity, we'll just have another layer of larger glowing points.
    return null;
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#020513] overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <fog attach="fog" args={["#020513", 10, 80]} />
        <Starfield />
        <GridSystem />
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}
