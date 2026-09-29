import React from 'react';
import { LucideIcon, Check } from 'lucide-react';
import { PopColor } from '../../types';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: LucideIcon;
  focusColor?: PopColor;
}

const focusShadowMap: Record<PopColor, string> = {
  accent: 'focus:border-[#8B5CF6] focus:shadow-[4px_4px_0px_0px_#8B5CF6]',
  secondary: 'focus:border-[#F472B6] focus:shadow-[4px_4px_0px_0px_#F472B6]',
  tertiary: 'focus:border-[#FBBF24] focus:shadow-[4px_4px_0px_0px_#FBBF24]',
  quaternary: 'focus:border-[#34D399] focus:shadow-[4px_4px_0px_0px_#34D399]',
  slate: 'focus:border-[#1E293B] focus:shadow-[4px_4px_0px_0px_#1E293B]',
  cream: 'focus:border-[#1E293B] focus:shadow-[4px_4px_0px_0px_#1E293B]',
};

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  icon: Icon,
  focusColor = 'accent',
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold font-heading uppercase tracking-wide text-[#1E293B]"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#64748B] pointer-events-none">
            <Icon className="w-5 h-5 stroke-[2.5px]" />
          </div>
        )}

        <input
          id={inputId}
          className={`
            w-full bg-white text-[#1E293B] font-medium text-base
            border-2 border-[#1E293B] rounded-xl px-4 py-3
            placeholder:text-[#94A3B8] outline-none
            transition-all duration-200
            ${Icon ? 'pl-11' : ''}
            ${focusShadowMap[focusColor]}
            ${error ? 'border-red-500 shadow-[4px_4px_0px_0px_#EF4444]' : ''}
            ${className}
          `}
          {...props}
        />
      </div>

      {error ? (
        <span className="text-xs font-bold text-red-600 tracking-wide mt-0.5">{error}</span>
      ) : helperText ? (
        <span className="text-xs font-medium text-[#64748B]">{helperText}</span>
      ) : null}
    </div>
  );
};

/* Playful Checkbox Component */
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  color?: PopColor;
}

const checkboxColorMap: Record<PopColor, string> = {
  accent: 'peer-checked:bg-[#8B5CF6]',
  secondary: 'peer-checked:bg-[#F472B6]',
  tertiary: 'peer-checked:bg-[#FBBF24]',
  quaternary: 'peer-checked:bg-[#34D399]',
  slate: 'peer-checked:bg-[#1E293B]',
  cream: 'peer-checked:bg-[#FFFDF5]',
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  color = 'accent',
  checked,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
          {...props}
        />
        <div
          className={`
            w-6 h-6 border-2 border-[#1E293B] rounded-lg bg-white
            shadow-[2px_2px_0px_0px_#1E293B]
            peer-checked:shadow-[3px_3px_0px_0px_#1E293B]
            ${checkboxColorMap[color]}
            flex items-center justify-center
            transition-all duration-200 cubic-bezier(0.34, 1.56, 0.64, 1)
            group-hover:-translate-x-0.5 group-hover:-translate-y-0.5
            ${className}
          `}
        >
          <Check
            className={`
              w-4 h-4 stroke-[3px] text-white transition-transform duration-200
              ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              ${color === 'tertiary' || color === 'quaternary' || color === 'cream' ? 'text-[#1E293B]' : ''}
            `}
          />
        </div>
      </div>
      <span className="text-sm font-bold text-[#1E293B]">{label}</span>
    </label>
  );
};
