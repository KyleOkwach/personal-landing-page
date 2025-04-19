"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function Model({ modelPath, autoRotate = true }: { modelPath: string; autoRotate?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame((state, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive object={scene} ref={group} />;
}

function Loader() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

// Ease out circular function for smooth camera animation
function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

function CameraAnimation() {
  const [frame, setFrame] = useState(0);
  
  useFrame(({ camera }) => {
    if (frame <= 100) {
      setFrame(frame + 1);
      
      const initialPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      );
      
      const target = new THREE.Vector3(-0.5, 1.2, 0);
      const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;
      
      camera.position.y = 10;
      camera.position.x = initialPosition.x * Math.cos(rotSpeed) + initialPosition.z * Math.sin(rotSpeed);
      camera.position.z = initialPosition.z * Math.cos(rotSpeed) - initialPosition.x * Math.sin(rotSpeed);
      camera.lookAt(target);
    }
  });
  
  return null;
}

interface ModelViewerProps {
  modelPath: string;
  className?: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
}

export default function ModelViewer({
  modelPath,
  className = '',
  autoRotate = true,
  enableZoom = true,
  enablePan = true,
}: ModelViewerProps) {
  const scale = 6; // Similar to scale calculation in reference code
  
  return (
    <div className={`${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        orthographic
        camera={{
          left: -scale,
          right: scale,
          top: scale,
          bottom: -scale,
          near: 0.01,
          far: 50000,
          position: [
            20 * Math.sin(0.2 * Math.PI),
            10,
            20 * Math.cos(0.2 * Math.PI)
          ],
          zoom: 1
        }}
        gl={{ 
          antialias: true,
          outputColorSpace: "srgb"
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        {/* Camera animation component */}
        <CameraAnimation />
        
        {/* Exact lighting from the reference code */}
        <ambientLight color={0xcccccc} intensity={Math.PI} />
        
        <Suspense fallback={<Loader />}>
          <Model modelPath={modelPath} autoRotate={autoRotate} />
          <OrbitControls
            enableZoom={enableZoom}
            enablePan={enablePan}
            autoRotate={false}
            autoRotateSpeed={2}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            target={new THREE.Vector3(-0.5, 1.2, 0)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}