import { X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  image: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ image, alt, isOpen, onClose }: ImageModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-5xl max-h-[90vh] w-full">
        <button 
          className="absolute -top-12 right-0 text-white p-2 hover:bg-white/10 rounded-full" 
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className="relative w-full aspect-video" onClick={(e) => e.stopPropagation()}>
          <Image
            src={image}
            alt={alt}
            className="object-contain max-h-[90vh]"
            fill
            sizes="90vw"
          />
        </div>
      </div>
    </div>
  );
}