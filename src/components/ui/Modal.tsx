import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E293B]/60 backdrop-blur-sm animate-fadeIn">
      {/* Pop Sticker Container */}
      <div
        className="
          relative w-full max-w-lg bg-[#FFFDF5] border-4 border-[#1E293B] rounded-3xl
          p-6 sm:p-8 shadow-[12px_12px_0px_0px_#1E293B]
          animate-popIn transition-all duration-300
        "
      >
        {/* Top Floating Badge */}
        <div className="absolute -top-5 left-8">
          <Badge color="secondary" variant="sticker" rotation="left">
            POP! STICKER MODAL
          </Badge>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F1F5F9] border-2 border-[#1E293B]
            flex items-center justify-center text-[#1E293B] hover:bg-[#FBBF24]
            shadow-[2px_2px_0px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0.5
            transition-all duration-150 cursor-pointer
          "
        >
          <X className="w-5 h-5 stroke-[3px]" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pt-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1E293B] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm font-medium text-[#64748B] mt-1">{subtitle}</p>
          )}
        </div>

        {/* Modal Body */}
        <div className="mb-6">{children}</div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t-2 border-[#1E293B]">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="candy" colorTheme="accent" size="sm" onClick={onClose}>
            Got It!
          </Button>
        </div>
      </div>
    </div>
  );
};
