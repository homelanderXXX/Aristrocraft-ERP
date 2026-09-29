import React from 'react';
import { PopColor } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  color?: PopColor;
  variant?: 'pill' | 'star' | 'sticker' | 'tag';
  rotation?: 'none' | 'left' | 'right';
  className?: string;
}

const colorMap: Record<PopColor, string> = {
  accent: 'bg-[#8B5CF6] text-white',
  secondary: 'bg-[#F472B6] text-white',
  tertiary: 'bg-[#FBBF24] text-[#1E293B]',
  quaternary: 'bg-[#34D399] text-[#1E293B]',
  slate: 'bg-[#1E293B] text-white',
  cream: 'bg-[#FFFDF5] text-[#1E293B]',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'tertiary',
  variant = 'pill',
  rotation = 'none',
  className = '',
}) => {
  const rotationClass =
    rotation === 'left' ? '-rotate-6' : rotation === 'right' ? 'rotate-6' : 'rotate-0';

  if (variant === 'star') {
    return (
      <div
        className={`
          inline-flex items-center justify-center px-4 py-2
          border-2 border-[#1E293B] font-black font-heading text-xs tracking-wider uppercase
          shadow-[3px_3px_0px_0px_#1E293B] ${colorMap[color]}
          rotate-12 hover:rotate-0 transition-transform duration-300
          ${className}
        `}
        style={{
          clipPath:
            'polygon(100% 50%, 85% 75%, 75% 100%, 50% 85%, 25% 100%, 15% 75%, 0% 50%, 15% 25%, 25% 0%, 50% 15%, 75% 0%, 85% 25%)',
        }}
      >
        {children}
      </div>
    );
  }

  if (variant === 'sticker') {
    return (
      <span
        className={`
          inline-flex items-center px-3 py-1 rounded-xl text-xs font-black font-heading
          uppercase tracking-wider border-2 border-[#1E293B]
          shadow-[3px_3px_0px_0px_#1E293B] ${colorMap[color]}
          ${rotationClass} hover:rotate-0 transition-transform duration-200
          ${className}
        `}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`
        inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold font-heading
        border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#1E293B]
        ${colorMap[color]}
        ${rotationClass}
        ${className}
      `}
    >
      {children}
    </span>
  );
};
