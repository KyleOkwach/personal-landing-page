// components/ModelLoader.tsx
import { forwardRef, ReactNode } from 'react';
import { Spinner } from './Spinner'; // We'll create this next

type ModelSpinnerProps = {
  className?: string;
};

export const ModelSpinner = ({ className = '' }: ModelSpinnerProps) => (
  <div className="absolute left-1/2 top-1/2 -ml-6 -mt-6">
    <Spinner className={`w-12 h-12 ${className}`} />
  </div>
);

type ModelContainerProps = {
  children: ReactNode;
  className?: string;
};

export const ModelContainer = forwardRef<HTMLDivElement, ModelContainerProps>(
  ({ children, className = '' }, ref) => (
    <div
      ref={ref}
      className={`voxel-model relative mx-auto 
                 mt-[-20px] md:mt-[-60px] lg:mt-[-120px]
                 mb-[-40px] md:mb-[-140px] lg:mb-[-200px]
                 w-[280px] md:w-[480px] lg:w-[640px]
                 h-[280px] md:h-[480px] lg:h-[640px] ${className}`}
    >
      {children}
    </div>
  )
);

ModelContainer.displayName = 'ModelContainer';

const ModelLoader = () => {
  return (
    <ModelContainer>
      <ModelSpinner />
    </ModelContainer>
  );
};

export default ModelLoader;