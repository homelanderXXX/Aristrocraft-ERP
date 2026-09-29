import React from 'react';
import { INSTITUTIONAL_AUDIENCES } from '../../data/educationData';
import { Sparkles, ArrowRight, Building2, GraduationCap, School, Microscope, User, Laptop } from 'lucide-react';

interface WhoCanOrderProps {
  onSelectAudience: (role: string) => void;
}

export const WhoCanOrderSection: React.FC<WhoCanOrderProps> = ({
  onSelectAudience,
}) => {
  return (
    <section id="who-can-order" className="w-full py-16 md:py-28 bg-[#FFF9ED] border-b-2 border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4">
            WHO WE SERVE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] tracking-tight uppercase leading-[1.05]">
            BUILT FOR EVERY LEVEL <br />
            <span className="text-[#FF8A00]">OF LEARNING & RESEARCH.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#171717]/80 leading-relaxed">
            Whether you need a single custom-designed classroom demonstration prop or 50 complete laboratory kits for an entire university department.
          </p>
        </div>

        {/* Visual Horizontal Flow / Timeline Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {INSTITUTIONAL_AUDIENCES.map((aud, idx) => (
            <div
              key={aud.id}
              className="bg-white rounded-2xl border-2 border-[#171717] overflow-hidden shadow-[4px_4px_0px_0px_#171717] flex flex-col justify-between hover:shadow-[6px_6px_0px_0px_#FF8A00] transition-all duration-300 group"
            >
              <div>
                {/* Photo Banner */}
                <div className="relative h-40 w-full overflow-hidden bg-[#171717]">
                  <img
                    src={aud.image}
                    alt={aud.role}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#FF8A00] text-white text-[10px] font-mono font-bold uppercase rounded shadow">
                    0{idx + 1}
                  </span>

                  <span className="absolute bottom-2 left-3 right-3 text-xs font-black font-heading text-white uppercase tracking-wider truncate">
                    {aud.role}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <span className="text-xs font-mono font-bold text-[#FF8A00] block mb-1">
                    {aud.sub}
                  </span>
                  <p className="text-xs sm:text-sm text-[#171717]/80 leading-relaxed">
                    {aud.description}
                  </p>
                </div>
              </div>

              {/* Order Footnote & CTA */}
              <div className="p-4 sm:p-5 pt-0">
                <div className="p-2.5 bg-[#FFF9ED] rounded-xl border border-[#171717]/20 mb-3 text-[11px] font-mono text-[#171717]/90 font-medium">
                  {aud.orderType}
                </div>

                <button
                  onClick={() => onSelectAudience(aud.role)}
                  className="w-full py-2 px-3 bg-[#171717] hover:bg-[#333] text-white text-xs font-black font-heading uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>ORDER FOR {aud.role}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF8A00]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
