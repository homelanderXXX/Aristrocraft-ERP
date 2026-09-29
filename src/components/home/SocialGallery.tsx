import React from 'react';
import { Instagram, Heart, ArrowUpRight } from 'lucide-react';

export const SocialGallery: React.FC = () => {
  const prints = [
    { title: 'Cyber Low-Poly Skull', tag: '#ArtPrint', color: 'bg-[#FFC43C]' },
    { title: 'Articulated Dragon', tag: '#FidgetToys', color: 'bg-[#FF8A00]' },
    { title: 'Custom Nameplate', tag: '#CustomGift', color: 'bg-[#34D399]' },
    { title: 'Spiral Voronoi Lamp', tag: '#HomeDecor', color: 'bg-[#FFFDF5]' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFDF5] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] mb-2">
            <Instagram className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span className="text-xs font-black font-heading uppercase text-[#171717]">@aristrocraft.bd</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-[#171717] uppercase">
            MADE BY ARISTROCRAFT
          </h2>
        </div>

        <a
          href="#instagram"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-black font-heading uppercase bg-white border-2 border-[#171717] px-4 py-2 rounded-full shadow-[3px_3px_0px_0px_#171717] hover:bg-[#FFC43C] transition-colors"
        >
          Follow our journey <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {prints.map((item, idx) => (
          <div
            key={idx}
            className={`
              ${item.color} border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]
              hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[200px]
            `}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-[#171717]">
                {item.tag}
              </span>
              <Heart className="w-4 h-4 text-[#171717] fill-[#171717]" />
            </div>

            <div>
              <h3 className="text-lg font-black font-heading uppercase text-[#171717]">
                {item.title}
              </h3>
              <span className="text-xs font-bold text-[#525252]">Fresh off the print bed</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
