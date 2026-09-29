import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = 'md',
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const buttonClass = isSm
    ? 'w-7 h-7 text-xs'
    : isLg
    ? 'w-11 h-11 text-base'
    : 'w-9 h-9 text-sm';

  const textClass = isSm
    ? 'w-8 text-xs'
    : isLg
    ? 'w-14 text-lg'
    : 'w-10 text-sm';

  return (
    <div
      role="group"
      aria-label="Quantity selector"
      className="inline-flex items-center bg-white border-2 border-[#171717] rounded-xl sm:rounded-2xl p-1 shadow-[2px_2px_0px_0px_#171717] select-none"
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`
          ${buttonClass} rounded-lg sm:rounded-xl font-black font-heading flex items-center justify-center
          transition-colors cursor-pointer border border-[#171717]/20
          ${
            quantity <= min
              ? 'bg-[#E5E5E5] text-[#8C8C8C] cursor-not-allowed opacity-60'
              : 'bg-[#FFF9ED] text-[#171717] hover:bg-[#FFC43C] active:bg-[#FF8A00] active:text-white'
          }
        `}
      >
        <Minus className={`${isSm ? 'w-3 h-3' : 'w-4 h-4'} stroke-[3px]`} />
      </button>

      <span
        className={`${textClass} font-black font-heading text-center text-[#171717]`}
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`
          ${buttonClass} rounded-lg sm:rounded-xl font-black font-heading flex items-center justify-center
          transition-colors cursor-pointer border border-[#171717]/20
          ${
            quantity >= max
              ? 'bg-[#E5E5E5] text-[#8C8C8C] cursor-not-allowed opacity-60'
              : 'bg-[#FFF9ED] text-[#171717] hover:bg-[#FFC43C] active:bg-[#FF8A00] active:text-white'
          }
        `}
      >
        <Plus className={`${isSm ? 'w-3 h-3' : 'w-4 h-4'} stroke-[3px]`} />
      </button>
    </div>
  );
};
