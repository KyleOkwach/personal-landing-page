"use client"
import { useEffect, useRef, useState } from "react";

export default function ASCIIDonut() {
    const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(true);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const ARef = useRef(0);
  const BRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      const b = [];
      const z = [];
      
      // Initialize arrays
      for (let i = 0; i < 1760; i++) {
        b[i] = i % 80 === 79 ? '\n' : ' ';
        z[i] = 0;
      }

      const A = ARef.current;
      const B = BRef.current;

      // Precompute sines and cosines
      const cosA = Math.cos(A);
      const sinA = Math.sin(A);
      const cosB = Math.cos(B);
      const sinB = Math.sin(B);

      // Generate the donut
      for (let j = 0; j < 6.28; j += 0.07) {
        const cosj = Math.cos(j);
        const sinj = Math.sin(j);
        
        for (let i = 0; i < 6.28; i += 0.02) {
          const cosi = Math.cos(i);
          const sini = Math.sin(i);
          
          const h = cosj + 2;
          const D = 1 / (sini * h * sinA + sinj * cosA + 5);
          const t = sini * h * cosA - sinj * sinA;
          
          const x = Math.floor(40 + 30 * D * (cosi * h * cosB - t * sinB));
          const y = Math.floor(12 + 15 * D * (cosi * h * sinB + t * cosB));
          const o = x + 80 * y;
          
          const N = Math.floor(8 * ((sinj * sinA - sini * cosj * cosA) * cosB - sini * cosj * sinA - sinj * cosA - cosi * cosj * sinB));
          
          if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
            z[o] = D;
            b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
          }
        }
      }

      setOutput(b.join(''));
      
      ARef.current += 0.04;
      BRef.current += 0.02;

      if (isRunning) {
        animationRef.current = setTimeout(animate, 50);
      }
    };

    if (isRunning) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isRunning]);

  const toggleAnimation = () => {
    setIsRunning(!isRunning);
  };

  const resetAnimation = () => {
    ARef.current = 0;
    BRef.current = 0;
  };

  return (
    <div className="" onClick={toggleAnimation} onDoubleClick={resetAnimation}>
        <pre className="terminal">
          {output}
        </pre>
    </div>
  )
}