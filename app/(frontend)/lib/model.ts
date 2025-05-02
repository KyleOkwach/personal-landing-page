import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

export interface ModelLoadOptions {
  receiveShadow?: boolean;
  castShadow?: boolean;
}

// For hooks-based usage in components
export function useGLTF(path: string) {
  return useLoader(GLTFLoader, path);
}

// For imperative loading (this is an alternative to using the useGLTF hook from drei)
export function loadGLTFModel(
  scene: THREE.Scene,
  glbPath: string,
  options: ModelLoadOptions = { receiveShadow: true, castShadow: true }
): Promise<THREE.Group> {
  const { receiveShadow, castShadow } = options;
  
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      glbPath,
      (gltf) => {
        const obj = gltf.scene;
        obj.name = 'model';
        obj.position.set(0, 0, 0);
        obj.receiveShadow = receiveShadow || false;
        obj.castShadow = castShadow || false;
        
        scene.add(obj);

        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = castShadow || false;
            child.receiveShadow = receiveShadow || false;
          }
        });
        
        resolve(obj);
      },
      undefined,
      (error) => {
        console.error('An error occurred loading the GLTF model:', error);
        reject(error);
      }
    );
  });
}