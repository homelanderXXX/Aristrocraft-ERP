import React, { useEffect, useState } from 'react';
import {
  Gift,
  Key,
  Home,
  Laptop,
  Smile,
  Cog,
  ArrowRight,
  Layers,
  CheckCircle2,
  Box,
  RefreshCw,
} from 'lucide-react';
import { categoryRepository, CategoryModel } from '../../lib/supabase/repositories/categoryRepository';

interface CategoryItem {
  id: string;
  title: string;
  desc: string;
  href: string;
  accent: 'yellow' | 'orange';
  rotation: string;
  icon: React.ElementType;
  badge: string;
  illustration: {
    emoji: string;
    label: string;
    sublabel: string;
  };
}

interface CategorySectionProps {
  onSelectCategory?: (categoryId: string) => void;
  onCustomClick?: () => void;
}

const CATEGORY_VISUALS_MAP: Record<
  string,
  {
    icon: React.ElementType;
    accent: 'yellow' | 'orange';
    rotation: string;
    badge: string;
    illustration: { emoji: string; label: string; sublabel: string };
  }
> = {
  gifts: {
    icon: Gift,
    accent: 'yellow',
    rotation: 'rotate-[-1deg]',
    badge: 'POPULAR',
    illustration: {
      emoji: '🎁',
      label: 'Photo Plaque',
      sublabel: 'Lithophane & Glow',
    },
  },
  keychains: {
    icon: Key,
    accent: 'orange',
    rotation: 'rotate-[1deg]',
    badge: 'TRENDING',
    illustration: {
      emoji: '🏷️',
      label: 'Name Tag 3D',
      sublabel: 'Dual-Color Finish',
    },
  },
  'home-decor': {
    icon: Home,
    accent: 'yellow',
    rotation: 'rotate-[-0.5deg]',
    badge: 'CREATIVE',
    illustration: {
      emoji: '🏺',
      label: 'Spiral Planter',
      sublabel: 'Modern Geometry',
    },
  },
  desk: {
    icon: Laptop,
    accent: 'orange',
    rotation: 'rotate-[0.5deg]',
    badge: 'FUNCTIONAL',
    illustration: {
      emoji: '📐',
      label: 'Hex Stand & Hub',
      sublabel: 'Ergonomic Design',
    },
  },
  miniatures: {
    icon: Smile,
    accent: 'yellow',
    rotation: 'rotate-[-1deg]',
    badge: 'COLLECTIBLE',
    illustration: {
      emoji: '🤖',
      label: 'Robo Bot Fig',
      sublabel: 'Hand-Finished Art',
    },
  },
  'custom-parts': {
    icon: Cog,
    accent: 'orange',
    rotation: 'rotate-[1deg]',
    badge: 'PRECISION',
    illustration: {
      emoji: '⚙️',
      label: 'Custom Bracket',
      sublabel: 'Functional Spec',
    },
  },
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  onCustomClick,
}) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        setIsLoading(true);
        const dbCats = await categoryRepository.getActiveCategories();
        if (isMounted && dbCats && dbCats.length > 0) {
          const mapped: CategoryItem[] = dbCats.map((cat, idx) => {
            const visual = CATEGORY_VISUALS_MAP[cat.slug] || {
              icon: Box,
              accent: idx % 2 === 0 ? 'yellow' : 'orange',
              rotation: idx % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]',
              badge: 'FEATURED',
              illustration: {
                emoji: '📦',
                label: cat.name,
                sublabel: '3D Printed Art',
              },
            };

            return {
              id: cat.slug,
              title: cat.name.toUpperCase(),
              desc: cat.description || 'Precision 3D printed creations crafted for you.',
              href: `/shop?category=${cat.slug}`,
              accent: visual.accent,
              rotation: visual.rotation,
              icon: visual.icon,
              badge: visual.badge,
              illustration: visual.illustration,
            };
          });
          setCategories(mapped);
        }
      } catch (err) {
        console.warn('Failed to load categories dynamically:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCardClick = (cat: CategoryItem, e: React.MouseEvent) => {
    if (onSelectCategory) {
      e.preventDefault();
      onSelectCategory(cat.id);
    }
  };

  const handleCreateCustomClick = (e: React.MouseEvent) => {
    if (onCustomClick) {
      e.preventDefault();
      onCustomClick();
    }
  };

  return (
    <section
      id="category-section"
      aria-labelledby="what-we-make-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9ED] overflow-hidden border-b-2 border-[#171717]/10"
    >
      {/* ================================================== */}
      {/* BACKGROUND DECORATIONS (aria-hidden) */}
      {/* ================================================== */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-20 left-8 w-40 h-40 opacity-15 bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
        <div className="absolute bottom-24 right-10 w-48 h-48 opacity-15 bg-[radial-gradient(#FF8A00_2px,transparent_2px)] [background-size:16px_16px]" />
        
        {/* Floating geometric symbols */}
        <div className="absolute top-1/2 left-4 text-[#171717] font-black text-2xl opacity-20 rotate-45">▲</div>
        <div className="absolute top-2/3 right-8 text-[#FFC43C] font-black text-3xl opacity-30">●</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          
          {/* Small Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC43C] text-[#171717] border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-200 mb-4 select-none">
            <span className="text-xs font-black font-heading tracking-wider uppercase">
              OUR CREATIONS
            </span>
          </div>

          {/* Main Section Heading */}
          <h2
            id="what-we-make-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black font-heading tracking-tight text-[#171717] uppercase leading-[1.05]"
          >
            WHAT CAN WE{' '}
            <span className="text-[#FF8A00] relative inline-block">
              MAKE?
              {/* Subtle underline curve */}
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-3 text-[#FFC43C] -z-10"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 14 Q 25 2, 50 12 T 98 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          {/* Supporting Paragraph */}
          <p className="text-[#6D6D6D] font-semibold text-sm sm:text-base md:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            From personalized gifts to desk accessories and custom parts, we turn your ideas into real, physical products.
          </p>
        </div>

        {/* ================================================== */}
        {/* CATEGORY CARDS GRID (3x2 Desktop, 2x3 Tablet, 1x6 Mobile) */}
        {/* ================================================== */}
        {isLoading && categories.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border-3 border-[#171717]/20 rounded-3xl p-6 h-80 animate-pulse flex flex-col justify-between"
              >
                <div className="w-20 h-6 bg-[#171717]/10 rounded-full" />
                <div className="w-full h-36 bg-[#171717]/5 rounded-2xl" />
                <div className="space-y-2">
                  <div className="w-3/4 h-5 bg-[#171717]/10 rounded-md" />
                  <div className="w-1/2 h-3 bg-[#171717]/10 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isYellow = cat.accent === 'yellow';
              const accentBg = isYellow ? 'bg-[#FFC43C]' : 'bg-[#FF8A00]';
              const accentText = isYellow ? 'text-[#171717]' : 'text-white';
              const accentBorder = 'border-[#171717]';

              return (
                <a
                  key={cat.id}
                  href={cat.href}
                  onClick={(e) => handleCardClick(cat, e)}
                  className={`
                    group relative bg-white border-3 border-[#171717] rounded-3xl p-5 sm:p-6 lg:p-7
                    shadow-[5px_5px_0px_0px_#171717] hover:shadow-[9px_9px_0px_0px_#171717]
                    hover:-translate-y-1 hover:rotate-0 transition-all duration-200 cursor-pointer
                    flex flex-col justify-between select-none ${cat.rotation}
                  `}
                  aria-label={`Explore ${cat.title}`}
                >
                  {/* Top Card Bar: Badge + Category Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`
                        inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] sm:text-[11px]
                        font-black font-heading uppercase tracking-wide border-2 ${accentBorder} ${accentBg} ${accentText}
                        shadow-[2px_2px_0px_0px_#171717]
                      `}
                    >
                      {cat.badge}
                    </span>

                    <div
                      className={`
                        w-10 h-10 rounded-2xl border-2 border-[#171717] bg-[#FFF9ED]
                        flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717]
                        group-hover:scale-105 transition-transform duration-200
                      `}
                    >
                      <Icon className="w-5 h-5 stroke-[2.5px]" />
                    </div>
                  </div>

                  {/* Product Illustration Area (Tactile 3D physical card preview) */}
                  <div className="relative w-full h-36 sm:h-40 rounded-2xl bg-[#FFF9ED] border-2 border-[#171717] p-3 mb-5 flex items-center justify-center overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]">
                    {/* Subtle decorative background pattern */}
                    <div
                      className="absolute inset-0 opacity-10 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:10px_10px]"
                      aria-hidden="true"
                    />

                    {/* Tactile 3D Icon & Badge Representation */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div
                        className={`
                          w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border-2.5 border-[#171717] ${accentBg}
                          flex items-center justify-center text-3xl sm:text-4xl shadow-[3px_3px_0px_0px_#171717]
                          group-hover:rotate-6 group-hover:scale-110 transition-all duration-200
                        `}
                      >
                        <span>{cat.illustration.emoji}</span>
                      </div>

                      <span className="mt-2.5 text-xs font-black font-heading text-[#171717] uppercase tracking-wide">
                        {cat.illustration.label}
                      </span>
                      <span className="text-[10px] font-bold text-[#6D6D6D]">
                        {cat.illustration.sublabel}
                      </span>
                    </div>

                    {/* Corner Accent Geometric Dot */}
                    <div className="absolute bottom-2 right-2 text-[#171717] opacity-25 font-black text-xs">
                      ●
                    </div>
                  </div>

                  {/* Card Text Content */}
                  <div className="flex-1 flex flex-col justify-start">
                    <h3 className="text-xl sm:text-2xl font-black font-heading uppercase text-[#171717] tracking-tight group-hover:text-[#FF8A00] transition-colors duration-150">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#6D6D6D] mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Bottom Card Action: "EXPLORE →" */}
                  <div className="mt-5 pt-3.5 border-t-2 border-[#171717]/10 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-black font-heading uppercase tracking-wider text-[#171717] group-hover:text-[#FF8A00] transition-colors">
                      EXPLORE
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#171717] text-white flex items-center justify-center group-hover:bg-[#FF8A00] group-hover:translate-x-1 transition-all duration-150 shadow-[1.5px_1.5px_0px_0px_#171717]">
                      <ArrowRight className="w-4 h-4 stroke-[3px]" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* ================================================== */}
        {/* BOTTOM CTA: CAN'T FIND WHAT YOU'RE LOOKING FOR? */}
        {/* ================================================== */}
        <div className="mt-14 sm:mt-18 lg:mt-20">
          <div className="relative bg-[#FFFFFF] border-3 border-[#171717] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[6px_6px_0px_0px_#171717] flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            
            {/* CTA Decorative corner sticker */}
            <div className="absolute -top-3.5 left-6 sm:left-8 bg-[#34D399] text-[#171717] border-2 border-[#171717] rounded-full px-3.5 py-1 text-[10px] sm:text-xs font-black font-heading uppercase shadow-[2px_2px_0px_0px_#171717] rotate-[-2deg] select-none">
              100% CUSTOM MADE
            </div>

            <div className="flex flex-col text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-[#171717] uppercase tracking-tight">
                CAN&apos;T FIND WHAT YOU&apos;RE LOOKING FOR?
              </h3>
              <p className="text-xs sm:text-sm md:text-base font-semibold text-[#6D6D6D] mt-1.5">
                Have your own idea? We can make that too.
              </p>
            </div>

            <a
              href="/custom"
              onClick={handleCreateCustomClick}
              className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer select-none text-center"
            >
              <span>CREATE YOUR OWN</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
