import React from 'react';
import { MousePointerClick, Sliders, PenTool, Printer, Truck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'CHOOSE',
      desc: 'Pick an item from our catalog or upload your custom 3D model.',
      icon: MousePointerClick,
    },
    {
      num: '02',
      title: 'CUSTOMIZE',
      desc: 'Select your preferred color, scale, and material options.',
      icon: Sliders,
    },
    {
      num: '03',
      title: 'WE DESIGN',
      desc: 'We slice, support, and prepare the files for flawless printing.',
      icon: PenTool,
    },
    {
      num: '04',
      title: 'WE PRINT',
      desc: 'High-density 3D printing with precision calibration.',
      icon: Printer,
    },
    {
      num: '05',
      title: 'WE DELIVER',
      desc: 'Packed securely and shipped straight to your doorstep.',
      icon: Truck,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-white border-4 border-[#171717] rounded-3xl p-8 sm:p-12 shadow-[10px_10px_0px_0px_#171717]">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] mb-3">
            <span className="text-xs font-black font-heading uppercase">
              SIMPLE 5-STEP JOURNEY
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#171717] uppercase">
            HOW IT WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFF9ED] border-3 border-[#171717] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#171717] flex flex-col items-start relative group hover:-translate-y-1 transition-transform"
              >
                <div className="w-8 h-8 rounded-full bg-[#171717] text-white font-black text-xs flex items-center justify-center mb-4">
                  {s.num}
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#171717] stroke-[2.5px]" />
                </div>
                <h3 className="text-base font-black font-heading uppercase text-[#171717] mb-1">
                  {s.title}
                </h3>
                <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
