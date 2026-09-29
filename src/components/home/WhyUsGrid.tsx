import React from 'react';
import { Palette, Printer, Zap, HeartHandshake } from 'lucide-react';

export const WhyUsGrid: React.FC = () => {
  const points = [
    {
      title: 'CUSTOM MADE',
      desc: 'Everything is crafted specifically for you, tailored down to the exact color and dimensions.',
      icon: Palette,
      color: 'bg-[#FFC43C]',
    },
    {
      title: 'QUALITY PRINT',
      desc: 'Tuned 0.12mm high-precision slicing with rigid, biodegradable, premium eco-grade filaments.',
      icon: Printer,
      color: 'bg-[#FF8A00]',
      textColor: 'text-white',
    },
    {
      title: 'FAST DELIVERY',
      desc: 'Swift 48-72h production turnaround with tracked doorstep delivery across all districts.',
      icon: Zap,
      color: 'bg-[#34D399]',
    },
    {
      title: 'MADE WITH PASSION',
      desc: 'Every single piece is manually inspected, cleaned, and carefully hand-packaged with love.',
      icon: HeartHandshake,
      color: 'bg-[#171717]',
      textColor: 'text-white',
    },
  ];

  return (
    <section id="about" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC43C] border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] mb-3">
          <span className="text-xs font-black font-heading uppercase text-[#171717]">
            THE ARISTROCRAFT PROMISE
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#171717] uppercase">
          WHY ARISTROCRAFT?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((pt, idx) => {
          const Icon = pt.icon;
          return (
            <div
              key={idx}
              className={`
                ${pt.color} border-3 border-[#171717] rounded-3xl p-6
                shadow-[6px_6px_0px_0px_#171717] flex flex-col items-start
              `}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border-2.5 border-[#171717] shadow-[3px_3px_0px_0px_#171717] flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#171717] stroke-[2.5px]" />
              </div>
              <h3 className={`text-lg font-black font-heading uppercase mb-2 ${pt.textColor || 'text-[#171717]'}`}>
                {pt.title}
              </h3>
              <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${pt.textColor ? 'text-white/80' : 'text-[#404040]'}`}>
                {pt.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
