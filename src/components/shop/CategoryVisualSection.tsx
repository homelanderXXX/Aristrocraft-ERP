import React from 'react';
import {
  ArrowRight,
  Gem,
  Upload,
  CheckCircle2,
  Home,
  Cpu,
  Wrench,
  Car,
  Activity,
  Bot,
  Gamepad2,
  Palette,
  Building2,
  GraduationCap,
  Briefcase,
  Layers,
} from 'lucide-react';
import { CategoryData } from '../../data/categories';
import { useRouter } from '../../context/RouterContext';

interface CategoryVisualSectionProps {
  category: CategoryData;
  index: number;
  onStartCustomOrder: (categoryName: string) => void;
}

export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Home':
      return Home;
    case 'Cpu':
      return Cpu;
    case 'Wrench':
      return Wrench;
    case 'Car':
      return Car;
    case 'Activity':
      return Activity;
    case 'Bot':
      return Bot;
    case 'Gamepad2':
      return Gamepad2;
    case 'Palette':
      return Palette;
    case 'Gem':
      return Gem;
    case 'Building2':
      return Building2;
    case 'GraduationCap':
      return GraduationCap;
    case 'Briefcase':
      return Briefcase;
    default:
      return Layers;
  }
};

export const CategoryVisualSection: React.FC<CategoryVisualSectionProps> = ({
  category,
  index,
  onStartCustomOrder,
}) => {
  const { navigate } = useRouter();
  const IconComponent = getCategoryIcon(category.iconName);
  const isEven = index % 2 === 0;

  return (
    <section
      id={`category-${category.slug}`}
      className="w-full bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[8px_8px_0px_0px_#171717] transition-all hover:shadow-[10px_10px_0px_0px_#171717] relative overflow-hidden"
    >
      {/* BACKGROUND ACCENT WATERMARK */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none">
        <IconComponent className="w-80 h-80 text-[#171717]" />
      </div>

      {/* TOP HEADER: BADGE, NUMBER, TITLE & ACTION */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b-2 border-[#171717]/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] shrink-0">
            <IconComponent className="w-6 h-6 stroke-[2.5px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black font-heading text-[#FF8A00] tracking-widest uppercase">
                CATEGORY {String(index + 1).padStart(2, '0')}
              </span>
              {category.badge && (
                <span className="px-2 py-0.5 rounded-full bg-[#171717] text-white text-[9px] font-black font-heading tracking-wider uppercase">
                  {category.badge}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#171717] tracking-tight">
              {category.name}
            </h2>
          </div>
        </div>

        {/* HEADER ACTIONS */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onStartCustomOrder(category.name)}
            className="px-4 py-2.5 bg-[#FFF9ED] hover:bg-[#FFC43C] border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wider text-[#171717] shadow-[2px_2px_0px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Start Custom Order</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(`/shop/category/${category.slug}`)}
            className="px-5 py-2.5 bg-[#FF8A00] hover:bg-[#FF9B26] border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Category</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* CATEGORY TAGLINE & DESCRIPTION */}
      <div className="mt-6 space-y-2 max-w-4xl">
        <p className="text-base sm:text-lg font-bold text-[#171717]">
          {category.tagline}
        </p>
        <p className="text-sm text-[#555] leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* SUBCATEGORIES CHIPS */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-black font-heading uppercase text-[#6D6D6D] mr-1">
          SUBCATEGORIES:
        </span>
        {category.subcategories.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => navigate(`/shop/category/${category.slug}?sub=${encodeURIComponent(sub)}`)}
            className="px-3 py-1 bg-[#FFF9ED] hover:bg-[#FFC43C] border border-[#171717]/30 hover:border-[#171717] rounded-lg text-xs font-bold text-[#171717] transition-all cursor-pointer"
          >
            {sub}
          </button>
        ))}
      </div>

      {/* VISUAL SHOWCASE: HERO IMAGE + SUPPORTING PRODUCT IMAGES */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* MAIN HERO IMAGE & CORE CAPABILITY (5 or 6 cols) */}
        <div className={`lg:col-span-5 flex flex-col ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative w-full h-64 sm:h-80 lg:h-full min-h-[300px] rounded-2xl border-2 border-[#171717] overflow-hidden group shadow-[4px_4px_0px_0px_#171717]">
            <img
              src={category.heroImage}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="px-2.5 py-1 rounded-md bg-[#FF8A00] text-white text-[10px] font-black font-heading uppercase tracking-wider w-max mb-2 border border-white/20">
                Primary Studio Focus
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight">
                {category.name}
              </h3>
              <p className="text-xs text-white/90 font-medium line-clamp-2 mt-1">
                {category.tagline}
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs font-bold text-[#FFC43C]">
                <span>Lead Time: {category.leadTime}</span>
                <span>•</span>
                <span>Starting from ৳{category.startingPriceBDT}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORTING GALLERY ITEMS (7 or 6 cols) */}
        <div className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          {category.galleryImages.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="bg-[#FFF9ED] border-2 border-[#171717] rounded-xl p-3.5 flex flex-col justify-between shadow-[3px_3px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] hover:-translate-y-0.5 transition-all group"
            >
              <div>
                {/* IMAGE */}
                <div className="w-full h-36 rounded-lg border border-[#171717] overflow-hidden relative mb-3 bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#171717]/90 text-white text-[9px] font-black font-heading tracking-wider uppercase backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>

                {/* TEXT */}
                <h4 className="text-sm font-black font-heading text-[#171717] leading-tight group-hover:text-[#FF8A00] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] font-bold text-[#6D6D6D] mt-0.5">
                  {item.subtitle}
                </p>
                <p className="text-[11px] text-[#444] mt-1.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* MATERIAL & ACTION */}
              <div className="mt-3 pt-2.5 border-t border-[#171717]/10 flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#FF8A00]">
                  {item.suggestedMaterial}
                </span>
                <button
                  type="button"
                  onClick={() => onStartCustomOrder(`${category.name} - ${item.title}`)}
                  className="text-[10px] font-black font-heading text-[#171717] hover:text-[#FF8A00] flex items-center gap-1 cursor-pointer"
                >
                  <span>Order This</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER CAPABILITIES & MATERIALS BAR */}
      <div className="mt-6 pt-4 border-t-2 border-[#171717]/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-black font-heading text-[#171717] uppercase text-[11px]">
            RECOMMENDED POLYMERS:
          </span>
          {category.recommendedMaterials.map((mat) => (
            <span
              key={mat}
              className="px-2.5 py-0.5 bg-white border border-[#171717] rounded-md font-bold text-[#171717] text-[10px]"
            >
              {mat}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate(`/shop/category/${category.slug}`)}
          className="text-xs font-black font-heading text-[#171717] hover:text-[#FF8A00] flex items-center gap-1.5 cursor-pointer self-end md:self-auto"
        >
          <span>View All {category.name} Applications & Products</span>
          <ArrowRight className="w-4 h-4 text-[#FF8A00]" />
        </button>
      </div>
    </section>
  );
};
