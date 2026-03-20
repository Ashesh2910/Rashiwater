/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const brightStarsInit = Array.from({ length: 50 }, () => ({
  position: [
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 50
  ],
  size: 0.1 + Math.random() * 0.2,
  color: Math.random() > 0.5 ? '#8b5cf6' : '#c4b5fd'
}));

const ConstellationStars = () => {
  const groupRef = useRef();
  
  // Create some "bright" stars to float around
  const [brightStars] = useState(brightStarsInit);

  useFrame((state) => {
    const { x, y } = state.mouse;
    if (groupRef.current) {
      // Parallax rotation based on mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.4, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      {brightStars.map((star, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={star.position}>
            <sphereGeometry args={[star.size, 16, 16]} />
            <meshStandardMaterial color={star.color} emissive={star.color} emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
};

const ThreeSkyMap = () => {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      zIndex: -1, pointerEvents: 'none', background: 'radial-gradient(circle at center, #0a0626 0%, #040210 100%)'
    }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} />
        <ConstellationStars />
      </Canvas>
    </div>
  );
};

export default ThreeSkyMap;
