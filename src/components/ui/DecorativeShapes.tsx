import React from 'react';
import { PopColor } from '../../types';

interface ShapeProps {
  color?: PopColor;
  size?: number;
  className?: string;
}

const colorHexMap: Record<PopColor, string> = {
  accent: '#8B5CF6',
  secondary: '#F472B6',
  tertiary: '#FBBF24',
  quaternary: '#34D399',
  slate: '#1E293B',
  cream: '#FFFDF5',
};

/* SVG Squiggle Path */
export const Squiggle: React.FC<ShapeProps> = ({ color = 'secondary', className = '' }) => (
  <svg
    width="100"
    height="18"
    viewBox="0 0 100 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M2 9C9 2 16 2 23 9C30 16 37 16 44 9C51 2 58 2 65 9C72 16 79 16 86 9C93 2 98 2 98 2"
      stroke={colorHexMap[color]}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* SVG Memphis Triangle */
export const Triangle: React.FC<ShapeProps> = ({ color = 'tertiary', size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <polygon
      points="16,2 30,28 2,28"
      fill={colorHexMap[color]}
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

/* SVG Polka Dot Grid Matrix Box */
export const DotMatrix: React.FC<{ rows?: number; cols?: number; className?: string }> = ({
  rows = 4,
  cols = 6,
  className = '',
}) => {
  return (
    <div
      className={`grid gap-2 select-none pointer-events-none ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-[#1E293B]" />
      ))}
    </div>
  );
};

/* Floating Geometric Confetti Background Accents */
export const ConfettiBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Floating Yellow Circle */}
      <div className="absolute top-12 left-10 w-16 h-16 rounded-full bg-[#FBBF24] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] opacity-80 animate-pulse" />

      {/* Floating Pink Arch */}
      <div className="absolute top-1/4 right-8 w-20 h-10 rounded-t-full bg-[#F472B6] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] rotate-12" />

      {/* Floating Mint Circle */}
      <div className="absolute bottom-20 left-16 w-12 h-12 rounded-full bg-[#34D399] border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#1E293B] -rotate-6" />

      {/* Floating Violet Square */}
      <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-[#8B5CF6] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] rotate-45" />

      {/* Floating Squiggle */}
      <div className="absolute top-1/3 left-1/3 opacity-75 hidden md:block">
        <Squiggle color="secondary" className="w-28 h-6" />
      </div>
    </div>
  );
};
