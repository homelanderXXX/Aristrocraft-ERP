import React from 'react';
import { LucideIcon } from 'lucide-react';
import { PopColor } from '../../types';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconBgColor?: PopColor;
  headerBgColor?: PopColor;
  shadowColor?: PopColor | 'dark' | 'slate';
  badgeText?: string;
  badgeBgColor?: PopColor;
  featured?: boolean;
  wiggleOnHover?: boolean;
  className?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const popBgMap: Record<PopColor, string> = {
  accent: 'bg-[#8B5CF6] text-white',
  secondary: 'bg-[#F472B6] text-white',
  tertiary: 'bg-[#FBBF24] text-[#1E293B]',
  quaternary: 'bg-[#34D399] text-[#1E293B]',
  slate: 'bg-[#1E293B] text-white',
  cream: 'bg-[#FFFDF5] text-[#1E293B]',
};

const shadowColorMap: Record<string, string> = {
  dark: 'box-shadow-[8px_8px_0px_0px_#1E293B]',
  slate: 'box-shadow-[8px_8px_0px_0px_#1E293B]',
  accent: 'box-shadow-[8px_8px_0px_0px_#8B5CF6]',
  secondary: 'box-shadow-[8px_8px_0px_0px_#F472B6]',
  tertiary: 'box-shadow-[8px_8px_0px_0px_#FBBF24]',
  quaternary: 'box-shadow-[8px_8px_0px_0px_#34D399]',
  cream: 'box-shadow-[8px_8px_0px_0px_#E2E8F0]',
};

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconBgColor = 'accent',
  headerBgColor,
  shadowColor = 'dark',
  badgeText,
  badgeBgColor = 'tertiary',
  featured = false,
  wiggleOnHover = true,
  className = '',
  children,
  footer,
}) => {
  const shadowClass = shadowColorMap[shadowColor] || shadowColorMap.dark;

  return (
    <div
      className={`
        relative bg-white border-2 border-[#1E293B] rounded-2xl
        ${shadowClass}
        ${wiggleOnHover ? 'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:rotate-[-1deg] hover:box-shadow-[12px_12px_0px_0px_#1E293B]' : ''}
        ${featured ? 'border-[3px]' : ''}
        flex flex-col overflow-visible
        ${className}
      `}
    >
      {/* Floating Star / Pill Badge if provided */}
      {badgeText && (
        <div className="absolute -top-3.5 right-6 z-20">
          <span
            className={`
              inline-block px-3 py-1 text-xs font-black font-heading tracking-wide uppercase
              border-2 border-[#1E293B] rounded-full shadow-[2px_2px_0px_0px_#1E293B]
              ${popBgMap[badgeBgColor]}
            `}
          >
            {badgeText}
          </span>
        </div>
      )}

      {/* Half-in / Half-out Top Floating Icon Circle */}
      {Icon && (
        <div className="absolute -top-6 left-6 z-10">
          <div
            className={`
              w-12 h-12 rounded-full border-2 border-[#1E293B]
              flex items-center justify-center shadow-[3px_3px_0px_0px_#1E293B]
              ${popBgMap[iconBgColor]}
            `}
          >
            <Icon className="w-6 h-6 stroke-[2.5px]" />
          </div>
        </div>
      )}

      {/* Optional Colored Header Block */}
      {headerBgColor && (
        <div
          className={`
            px-6 ${Icon ? 'pt-8' : 'pt-6'} pb-5 border-b-2 border-[#1E293B] rounded-t-[14px]
            ${popBgMap[headerBgColor]}
          `}
        >
          {title && <h3 className="text-xl font-extrabold font-heading tracking-tight">{title}</h3>}
          {subtitle && <p className="text-sm font-medium opacity-90 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Card Content Body */}
      <div className={`p-6 flex-1 ${Icon && !headerBgColor ? 'pt-9' : ''}`}>
        {!headerBgColor && title && (
          <h3 className="text-xl font-extrabold font-heading text-[#1E293B] tracking-tight mb-1">
            {title}
          </h3>
        )}
        {!headerBgColor && subtitle && (
          <p className="text-sm font-medium text-[#64748B] mb-4">{subtitle}</p>
        )}
        {children}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className="px-6 py-4 bg-[#F1F5F9]/60 border-t-2 border-[#1E293B] rounded-b-[14px]">
          {footer}
        </div>
      )}
    </div>
  );
};
