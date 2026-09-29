import React from 'react';
import { PopColor, ButtonVariant, ButtonSize } from '../../types';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  colorTheme?: PopColor;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'candy',
  colorTheme = 'accent',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const colorStyles: Record<PopColor, string> = {
    accent: 'bg-[#FFC43C] text-[#171717] hover:bg-[#FFB703] border-[#171717]',
    secondary: 'bg-[#FF8A00] text-white hover:bg-[#E07A00] border-[#171717]',
    tertiary: 'bg-[#171717] text-white hover:bg-[#000000] border-[#171717]',
    quaternary: 'bg-[#34D399] text-[#171717] hover:bg-[#10B981] border-[#171717]',
    slate: 'bg-[#171717] text-white hover:bg-[#262626] border-[#171717]',
    cream: 'bg-[#FFF9ED] text-[#171717] hover:bg-[#FCEEBD] border-[#171717]',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-xs gap-1.5 rounded-full',
    md: 'px-6 py-3 text-sm gap-2 rounded-full',
    lg: 'px-8 py-4 text-base gap-2.5 rounded-full',
  };

  const variantBase =
    'font-black font-heading tracking-tight inline-flex items-center justify-center transition-all cursor-pointer select-none border-2 shadow-[3px_3px_0px_0px_#171717] active:shadow-[1px_1px_0px_0px_#171717] active:translate-x-[2px] active:translate-y-[2px]';

  return (
    <button
      className={`
        ${variantBase}
        ${colorStyles[colorTheme]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 stroke-[2.5px]" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 stroke-[2.5px]" />}
    </button>
  );
};
