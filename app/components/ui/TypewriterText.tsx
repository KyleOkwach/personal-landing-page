import React from 'react';
import { useTypewriter } from '@/app/hooks/useTypewriter';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = '',
  showCursor = true
}) => {
  const { displayText, isComplete } = useTypewriter({ 
    text, 
    speed, 
    delay, 
    onComplete 
  });

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span 
          className={`inline-block w-2 h-5 bg-current ml-1 ${
            isComplete ? 'animate-pulse' : 'animate-pulse'
          }`}
        >
          |
        </span>
      )}
    </span>
  );
};

export default TypewriterText;