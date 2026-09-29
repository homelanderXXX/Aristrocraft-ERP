import React from 'react';
import { Gift, Key, Home, Monitor, User, Wrench, ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (category: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'gifts',
      title: 'CUSTOM GIFTS',
      desc: 'Personalized lithophanes, nameplates & memory prints',
      icon: Gift,
      color: 'bg-[#FFC43C]',
      rotation: 'hover:rotate-1',
    },
    {
      id: 'keychains',
      title: 'KEYCHAINS',
      desc: 'Custom names, brand logos, tags & fun charms',
      icon: Key,
      color: 'bg-[#FF8A00]',
      rotation: 'hover:-rotate-1',
      textColor: 'text-white',
    },
    {
      id: 'decor',
      title: 'HOME DECOR',
      desc: 'Geometric vases, planters, lamps & wall art',
      icon: Home,
      color: 'bg-[#34D399]',
      rotation: 'hover:rotate-1',
    },
    {
      id: 'desk',
      title: 'DESK STUFF',
      desc: 'Headphone stands, cable holders & fidget toys',
      icon: Monitor,
      color: 'bg-[#FFFDF5]',
      rotation: 'hover:-rotate-1',
    },
    {
      id: 'miniatures',
      title: 'MINIATURES',
      desc: 'Tabletop figures, anime models & cosplay props',
      icon: User,
      color: 'bg-[#FFC43C]',
      rotation: 'hover:rotate-1',
    },
    {
      id: 'parts',
      title: 'CUSTOM PARTS',
      desc: 'Replacement gears, brackets & engineering prototypes',
      icon: Wrench,
      color: 'bg-[#171717]',
      textColor: 'text-white',
      rotation: 'hover:-rotate-1',
    },
  ];

  return (
    <section id="shop" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] mb-3">
          <span className="text-xs font-black font-heading uppercase text-[#FF8A00]">
            OUR COLLECTIONS
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#171717] uppercase">
          WHAT CAN WE MAKE?
        </h2>
        <p className="text-[#525252] font-semibold text-sm sm:text-base mt-2 max-w-md mx-auto">
          Explore our most popular crafted categories or bring your own 3D files.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`
                ${cat.color} ${cat.rotation}
                border-3 border-[#171717] rounded-3xl p-6 sm:p-8
                shadow-[6px_6px_0px_0px_#171717] hover:shadow-[10px_10px_0px_0px_#171717]
                hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between min-h-[220px]
              `}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border-2.5 border-[#171717] shadow-[3px_3px_0px_0px_#171717] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#171717] stroke-[2.5px]" />
                </div>
                <h3 className={`text-xl sm:text-2xl font-black font-heading uppercase ${cat.textColor || 'text-[#171717]'}`}>
                  {cat.title}
                </h3>
                <p className={`text-xs sm:text-sm font-semibold mt-2 ${cat.textColor ? 'text-white/80' : 'text-[#404040]'}`}>
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                <span className={cat.textColor || 'text-[#171717]'}>EXPLORE CATEGORY</span>
                <ArrowRight className={`w-4 h-4 stroke-[3px] ${cat.textColor || 'text-[#171717]'}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
