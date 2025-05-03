'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ModelSpinner, ModelContainer } from './ModelLoader';

// Store animation state globally so it persists between renders
const globalAnimState = {
  frameCount: 0,
  autoRotateAngle: 0,
  isInitialAnimComplete: false
};

function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

interface ModelProps {
  modelPath: string;
}

const Model = ({ modelPath }: ModelProps) => {
  // Make sure we always use an absolute path with origin for GLB files
  const absoluteModelPath = modelPath.startsWith('/') 
    ? modelPath 
    : `/${modelPath}`;
  
  // Use a try-catch to handle potential loading errors
  try {
    const { scene } = useGLTF(absoluteModelPath);
    
    // Apply shadow settings
    useEffect(() => {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }, [scene]);
    
    return <primitive object={scene} />;
  } catch (error) {
    console.error("Error loading model:", error);
    return null;
  }
};

const AnimatedCamera = () => {
  const { camera } = useThree();
  const target = new THREE.Vector3(-0.5, 1.2, 0);
  const initialCameraPosition = new THREE.Vector3(
    20 * Math.sin(0.2 * Math.PI),
    10,
    20 * Math.cos(0.2 * Math.PI)
  );

  // Initialize camera position only if animation hasn't completed
  useEffect(() => {
    if (!globalAnimState.isInitialAnimComplete) {
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);
    }
  }, [camera, initialCameraPosition, target]);

  useFrame(() => {
    // Only run the initial animation if it's not complete
    if (!globalAnimState.isInitialAnimComplete && globalAnimState.frameCount <= 100) {
      const frame = globalAnimState.frameCount;
      const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;
      
      camera.position.y = 10;
      camera.position.x = initialCameraPosition.x * Math.cos(rotSpeed) + initialCameraPosition.z * Math.sin(rotSpeed);
      camera.position.z = initialCameraPosition.z * Math.cos(rotSpeed) - initialCameraPosition.x * Math.sin(rotSpeed);
      camera.lookAt(target);
      
      globalAnimState.frameCount += 1;
      
      // Mark animation as complete when done
      if (globalAnimState.frameCount > 100) {
        globalAnimState.isInitialAnimComplete = true;
      }
    }
  });

  return null;
};

// Custom OrbitControls that maintains rotation state
const PersistentOrbitControls = () => {
  const controlsRef = useRef<any>(null);
  
  useFrame(() => {
    if (controlsRef.current && globalAnimState.isInitialAnimComplete) {
      // Continue auto-rotation from where it left off
      controlsRef.current.autoRotateSpeed = 1.0;
      
      // Just keeping track of whether initial animation is done
      globalAnimState.autoRotateAngle += 0.01; // Just for tracking progress
    }
  });

  return (
    <OrbitControls 
      ref={controlsRef}
      autoRotate 
      autoRotateSpeed={1.0}
      enableZoom={true}
      enablePan={true}
      target={new THREE.Vector3(-0.5, 1.2, 0)}
    />
  );
};

interface ModelViewerProps {
  modelPath: string;
  className?: string;
}

export default function ModelViewer({ modelPath, className = '' }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Ensure model path is absolute
  const absoluteModelPath = modelPath.startsWith('/') 
    ? modelPath 
    : `/${modelPath}`;

  // Handle model load completion
  const handleModelLoad = useCallback(() => {
    setLoading(false);
  }, []);

  // Only render on client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return empty container with same dimensions to prevent layout shift
    return <div className={`${className} h-64 w-full`} />;
  }

  return (
    <ModelContainer ref={containerRef} className={className}>
      {loading && <ModelSpinner />}
      <Canvas
        camera={{ 
          fov: 50, 
          near: 0.01, 
          far: 50000,
          position: [20, 10, 20]
        }}
        dpr={[1, 2]}
        onCreated={() => {
          // Set timeout to ensure the spinner shows for at least a moment
          // even if the model loads very quickly
          setTimeout(() => handleModelLoad(), 500);
        }}
      >
        <ambientLight intensity={Math.PI} />
        <AnimatedCamera />
        <PersistentOrbitControls />
        <Suspense fallback={null}>
          <Model modelPath={absoluteModelPath} />
        </Suspense>
      </Canvas>
    </ModelContainer>
  );
}