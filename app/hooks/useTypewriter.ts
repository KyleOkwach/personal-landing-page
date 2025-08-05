import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const useTypewriter = ({ 
  text, 
  speed = 50, 
  delay = 0,
  onComplete 
}: UseTypewriterOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    setDisplayText('');
    setIsComplete(false);
    setHasStarted(false);

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
      let i = 0;
      
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  return { displayText, isComplete, hasStarted };
};