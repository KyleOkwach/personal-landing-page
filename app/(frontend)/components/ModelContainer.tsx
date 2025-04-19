import { ReactNode } from 'react';

export default function ModelContainer({ children }: { children: ReactNode }) {
  return (
    <div style={{
      width: '60vh',
      height: '60vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {children}
    </div>
  );
}