import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ProgressRing = ({ position, progress, color }) => {
  const ringRef = useRef();
  const glowRef = useRef();

  const pct = Math.max(0, Math.min(100, progress)) / 100;

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.003;
      ringRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z -= 0.002;
    }
  });

  const arcLength = pct * Math.PI * 2;

  return (
    <group position={position}>
      {/* Background ring */}
      <mesh ref={glowRef}>
        <torusGeometry args={[1.2, 0.04, 16, 64]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={0.4} />
      </mesh>

      {/* Progress ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.2, 0.08, 16, 64, arcLength]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Center sphere */}
      <mesh>
        <sphereGeometry args={[0.3 + pct * 0.3, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.6 + pct * 0.4}
        />
      </mesh>
    </group>
  );
};

const ProgressScene = ({ userAProgress = 0, userBProgress = 0 }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 40 }} className="rounded-xl">
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <ProgressRing position={[-1.5, 0, 0]} progress={userAProgress} color="#10b981" />
      <ProgressRing position={[1.5, 0, 0]} progress={userBProgress} color="#6366f1" />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default ProgressScene;
