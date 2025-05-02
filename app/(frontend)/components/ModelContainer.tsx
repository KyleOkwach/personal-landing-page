import { ReactNode } from 'react';

export default function ModelContainer({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={`${className}`} style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {children}
    </div>
  );
}