import React from 'react';

export const AnnouncementBar: React.FC = () => {
  const messages = [
    'CUSTOM 3D PRINTS',
    'MADE IN BANGLADESH',
    'TURNING IDEAS INTO REALITY',
    'CUSTOM ORDERS OPEN',
    'DESIGNED WITH YOU',
    'MADE WITH PRECISION',
  ];

  return (
    <aside
      aria-label="Brand Announcement Marquee"
      className="w-full bg-[#171717] text-white border-y-3 border-[#171717] py-2.5 sm:py-3 overflow-hidden select-none relative z-20 group shadow-[0_4px_0_0_#171717]"
    >
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...messages, ...messages, ...messages, ...messages].map((msg, idx) => (
          <div key={idx} className="flex items-center gap-4 sm:gap-6 mx-4 sm:mx-6 shrink-0">
            <span className="text-xs sm:text-sm font-black font-heading uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF8A00] inline-block" />
              {msg}
            </span>
            <span className="text-[#FFC43C] font-black text-sm select-none" aria-hidden="true">
              •
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};

