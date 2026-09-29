import React from 'react';
import { Sparkles, Zap, Heart, Star, Smile, Flame } from 'lucide-react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    { text: 'STABLE GRID, WILD DECORATION', icon: Sparkles, color: 'text-[#8B5CF6]' },
    { text: 'NO BORING MINIMALISM', icon: Flame, color: 'text-[#F472B6]' },
    { text: 'TACTILE POP SHADOWS', icon: Zap, color: 'text-[#FBBF24]' },
    { text: 'PLAYFUL GEOMETRIC SYSTEM', icon: Star, color: 'text-[#34D399]' },
    { text: 'MEMPHIS REIMAGINED', icon: Heart, color: 'text-[#F472B6]' },
    { text: 'BUILT WITH OPTIMISM', icon: Smile, color: 'text-[#8B5CF6]' },
  ];

  return (
    <div className="w-full bg-[#1E293B] text-white py-3.5 border-y-4 border-[#1E293B] overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-black font-heading text-sm sm:text-base tracking-widest uppercase">
        {/* Repeat array 3 times for continuous seamless scrolling loop */}
        {[...items, ...items, ...items].map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="inline-flex items-center gap-3">
              <span className="text-white">{item.text}</span>
              <Icon className={`w-5 h-5 ${item.color} stroke-[3px] shrink-0`} />
              <span className="text-[#64748B] text-xs">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
