import { CircleUserRound } from 'lucide-react';
import { ReactNode } from 'react';

interface SegmentProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  iconSize?: number;
  strokeWidth?: number;
  className?: string;
}

export default function Segment({
  title,
  icon,
  children,
  iconSize = 16,
  strokeWidth = 2.5,
  className = '',
}: SegmentProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-col items-start justify-center gap-0.5 w-fit">
        <div className="flex flex-row gap-1 items-center">
          {icon && (
            <span style={{ fontSize: iconSize, strokeWidth }}>
              {icon}
            </span>
          )}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <span className="w-full h-1 bg-text/70"></span>
      </div>
      <div className='flex flex-col gap-4'>{children}</div>
    </div>
  );
}