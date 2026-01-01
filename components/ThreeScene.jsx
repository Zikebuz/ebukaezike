'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useRef, Suspense, useEffect } from 'react';

/* -----------------------------
   3D Object (INSIDE Canvas)
------------------------------ */
function FloatingTorus() {
  const torusRef = useRef();
  const texture = useLoader(TextureLoader, '/textures/texture1.png');

  // This ensures the scene signals "ready" after the texture is loaded
  useEffect(() => {
    if (texture) {
      window.dispatchEvent(new Event('three-scene-ready'));
    }
  }, [texture]);

  useFrame((_, delta) => {
    if (!torusRef.current) return;
    torusRef.current.rotation.x += delta * 0.3;
    torusRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={torusRef}>
      <torusKnotGeometry args={[0.55, 0.18, 128, 32]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.8}
        roughness={0.25}
      />
    </mesh>
  );
}

/* -----------------------------
   Canvas Wrapper
------------------------------ */
export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 1.5]}
      fallback={null}
      gl={{ alpha: true }}
      // onCreated fires once the canvas and gl renderer are initialized
      onCreated={() => {
        // Fallback signal in case there's no texture
        window.dispatchEvent(new Event('three-scene-ready'));
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.6} />

      <Suspense fallback={null}>
        <FloatingTorus />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}