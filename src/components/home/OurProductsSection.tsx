import React, { useState, useMemo } from 'react';
import {
  Flame,
  Trophy,
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Check,
  Play,
  Pause,
  SlidersHorizontal,
  Layers,
  Clock,
  Zap,
} from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../context/RouterContext';
import { ScrollReveal } from '../animation/ScrollReveal';

// Curated Viral and Top-Selling Collections from project catalog
const TOP_SELLING_SLUGS = [
  'personalized-name-keychain',
  'custom-wall-sign',
  'geometric-self-watering-planter',
  'custom-desk-name-plate',
  'cable-organizer-set',
  'personalized-gift-plaque',
  'precision-helical-gear-set',
  'custom-mechanical-part',
];

const VIRAL_HIT_SLUGS = [
  'mini-dino-figure',
  'custom-couple-miniature',
  'fpv-action-cam-tpu-mount',
  'automotive-vent-gauge-pod',
  'raspberry-pi-5-vented-case',
  'anatomical-bone-study-model',
  'lost-wax-castable-ring-master',
  'personalized-name-keychain',
];

type FilterType = 'all' | 'viral' | 'topseller' | 'desk' | 'art';
type GapSize = 'compact' | 'normal' | 'spacious';

export const OurProductsSection: React.FC = () => {
  const { addToCart } = useCart();
  const { navigate } = useRouter();

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [gapSize, setGapSize] = useState<GapSize>('normal');
  const [isGapBreathing, setIsGapBreathing] = useState<boolean>(true);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Map products
  const topSellingProducts = useMemo(() => {
    return FEATURED_PRODUCTS.filter((p) =>
      TOP_SELLING_SLUGS.includes(p.slug) || p.badge === 'BESTSELLER' || p.badge === 'POPULAR'
    );
  }, []);

  const viralProducts = useMemo(() => {
    return FEATURED_PRODUCTS.filter((p) =>
      VIRAL_HIT_SLUGS.includes(p.slug) || p.badge === 'NEW' || p.badge === 'CUSTOM'
    );
  }, []);

  // Filtered rows
  const row1Filtered = useMemo(() => {
    if (activeFilter === 'viral') {
      return viralProducts.slice(0, 5);
    }
    if (activeFilter === 'topseller') {
      return topSellingProducts;
    }
    if (activeFilter === 'desk') {
      return FEATURED_PRODUCTS.filter(
        (p) => p.categorySlug === 'gadgets-electronics' || p.categorySlug === 'home-living'
      );
    }
    if (activeFilter === 'art') {
      return FEATURED_PRODUCTS.filter(
        (p) => p.categorySlug === 'art-collectibles' || p.categorySlug === 'toys-games'
      );
    }
    return topSellingProducts;
  }, [activeFilter, topSellingProducts, viralProducts]);

  const row2Filtered = useMemo(() => {
    if (activeFilter === 'viral') {
      return viralProducts.slice(3);
    }
    if (activeFilter === 'topseller') {
      return topSellingProducts.slice().reverse();
    }
    if (activeFilter === 'desk') {
      return FEATURED_PRODUCTS.filter((p) => p.categorySlug === 'mechanical-engineering');
    }
    if (activeFilter === 'art') {
      return FEATURED_PRODUCTS.filter((p) => p.categorySlug === 'toys-games');
    }
    return viralProducts;
  }, [activeFilter, topSellingProducts, viralProducts]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  const handleCardClick = (product: Product) => {
    navigate(`/shop/${product.slug}`);
  };

  // Gap mapping
  const gapClasses = {
    compact: 'gap-3 sm:gap-4',
    normal: 'gap-5 sm:gap-6',
    spacious: 'gap-8 sm:gap-10',
  }[gapSize];

  return (
    <section
      id="our-products"
      aria-labelledby="our-products-heading"
      className="relative w-full py-16 sm:py-24 bg-[#FFFDF5] border-b-3 border-[#171717] overflow-hidden select-none"
    >
      {/* Background Graphic Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================================================== */}
        {/* SECTION HEADER & HERO POSITIONING */}
        {/* ================================================== */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div>
              {/* Clean Badge Without Star Emojis */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1deg] mb-3.5 select-none">
                <Flame className="w-3.5 h-3.5 text-[#FFC43C] fill-[#FFC43C] shrink-0" />
                <span className="text-[11px] sm:text-xs font-black font-heading tracking-wider uppercase">
                  VIRAL PRINTS & STUDIO BESTSELLERS
                </span>
              </div>

              <h2
                id="our-products-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#171717] uppercase leading-none"
              >
                OUR <span className="text-[#FF8A00]">PRODUCTS</span>
              </h2>

              <p className="mt-3 text-sm sm:text-base font-semibold text-[#525252] max-w-2xl leading-relaxed">
                Explore our most requested creations made in Dhaka. From viral mechanical fidgets and articulated desk companions to custom signs and functional engineering prototypes.
              </p>
            </div>

            {/* Right Side Direct Action & Catalog Link */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/shop')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#171717] hover:bg-[#FF8A00] text-white font-black font-heading text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2.5 border-[#171717] shadow-[4px_4px_0px_0px_#FFC43C] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer"
              >
                <span>EXPLORE FULL SHOP</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ================================================== */}
        {/* INTERACTIVE CONTROLS BAR (FILTERS, GAP DYNAMICS, PLAY/PAUSE) */}
        {/* ================================================== */}
        <div className="bg-white border-2.5 border-[#171717] rounded-2xl p-3 sm:p-4 mb-8 sm:mb-10 shadow-[4px_4px_0px_0px_#171717] flex flex-wrap items-center justify-between gap-4">
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All Showcase', icon: Layers },
              { id: 'viral', label: 'Viral Hits', icon: Flame },
              { id: 'topseller', label: 'Top Sellers', icon: Trophy },
              { id: 'desk', label: 'Desk & Office', icon: Zap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as FilterType)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black font-heading uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717]'
                      : 'bg-[#FFF9ED] text-[#171717] border border-[#171717]/30 hover:bg-[#FFC43C]/20'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#FF8A00]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Gallery Animation Controls: Row Gap & Play/Pause */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Gap Size Selector with Animation Feedback */}
            <div className="hidden md:flex items-center gap-1.5 bg-[#FFF9ED] border border-[#171717]/20 p-1 rounded-xl">
              <span className="text-[10px] font-black font-heading uppercase text-[#6D6D6D] px-2 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                Row Gap:
              </span>
              {(['compact', 'normal', 'spacious'] as GapSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setGapSize(size)}
                  className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black font-heading uppercase tracking-wider transition-all cursor-pointer ${
                    gapSize === size
                      ? 'bg-[#171717] text-white shadow-sm'
                      : 'text-[#171717] hover:bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Gap Breathing Toggle */}
            <button
              onClick={() => setIsGapBreathing((prev) => !prev)}
              title="Toggle Row Gap Breathing Animation"
              className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-black font-heading uppercase border cursor-pointer transition-all ${
                isGapBreathing
                  ? 'bg-[#34D399]/20 text-[#065F46] border-[#34D399]'
                  : 'bg-white text-[#6D6D6D] border-[#171717]/20'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isGapBreathing ? 'bg-[#10B981] animate-ping' : 'bg-[#A3A3A3]'}`} />
              <span>Gap Pulse {isGapBreathing ? 'ON' : 'OFF'}</span>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171717] text-white border-1.5 border-[#171717] hover:bg-[#FF8A00] text-xs font-black font-heading uppercase tracking-wider shadow-[2px_2px_0px_0px_#FFC43C] transition-all cursor-pointer"
              title={isPlaying ? 'Pause Marquee Animation' : 'Resume Marquee Animation'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 stroke-[3px]" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 stroke-[3px]" />
                  <span>Play</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* ================================================== */}
      {/* HORIZONTAL GALLERY ROWS WITH CONTINUOUS MARQUEE & ROW GAP ANIMATION */}
      {/* ================================================== */}
      <div className="w-full space-y-5 sm:space-y-7 relative group">
        
        {/* ROW 1: TOP SELLING PRODUCTS (SCROLLS LEFT) */}
        <div className="overflow-hidden w-full py-2">
          <div
            style={{
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
            className={`flex items-center ${gapClasses} ${
              isGapBreathing ? 'transition-all duration-700 ease-in-out' : ''
            } animate-marquee-slow group-hover:[animation-play-state:paused] motion-reduce:animate-none w-max`}
          >
            {/* Duplicated 3 times to ensure infinite smooth marquee loop */}
            {[...row1Filtered, ...row1Filtered, ...row1Filtered].map((product, idx) => (
              <ProductGalleryCard
                key={`r1-${product.id}-${idx}`}
                product={product}
                badgeType="top-seller"
                onCardClick={handleCardClick}
                onQuickAdd={handleQuickAdd}
                isAdded={addedProductId === product.id}
              />
            ))}
          </div>
        </div>

        {/* ROW 2: VIRAL HIT PRODUCTS (SCROLLS RIGHT / REVERSE) */}
        <div className="overflow-hidden w-full py-2">
          <div
            style={{
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
            className={`flex items-center ${gapClasses} ${
              isGapBreathing ? 'transition-all duration-700 ease-in-out' : ''
            } animate-marquee-reverse-slow group-hover:[animation-play-state:paused] motion-reduce:animate-none w-max`}
          >
            {/* Duplicated 3 times to ensure infinite smooth marquee loop */}
            {[...row2Filtered, ...row2Filtered, ...row2Filtered].map((product, idx) => (
              <ProductGalleryCard
                key={`r2-${product.id}-${idx}`}
                product={product}
                badgeType="viral-hit"
                onCardClick={handleCardClick}
                onQuickAdd={handleQuickAdd}
                isAdded={addedProductId === product.id}
              />
            ))}
          </div>
        </div>

        {/* Subtle Lateral Fade Gradients on edges for smooth visual boundary */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#FFFDF5] to-transparent pointer-events-none z-20" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#FFFDF5] to-transparent pointer-events-none z-20" />
      </div>

      {/* ================================================== */}
      {/* BOTTOM TICKER / ASSURANCE STRIP */}
      {/* ================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="bg-[#FFF9ED] border-2 border-[#171717]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF8A00] text-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#171717] border border-[#171717]">
              <Clock className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <div>
              <span className="text-xs font-black font-heading uppercase text-[#171717] block">
                RAPID 24H–48H DISPATCH IN DHAKA & CHITTAGONG
              </span>
              <p className="text-[11px] font-semibold text-[#6D6D6D]">
                Every print undergoes individual layer verification and dimensional tolerance checks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/custom-print')}
              className="text-xs font-black font-heading uppercase text-[#FF8A00] hover:text-[#171717] underline decoration-2 underline-offset-4 cursor-pointer"
            >
              Need a Custom 3D Model Printed? Upload CAD →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================================
// SUB-COMPONENT: PRODUCT GALLERY CARD
// ==========================================================
interface ProductGalleryCardProps {
  product: Product;
  badgeType: 'top-seller' | 'viral-hit';
  onCardClick: (product: Product) => void;
  onQuickAdd: (e: React.MouseEvent, product: Product) => void;
  isAdded: boolean;
}

const ProductGalleryCard: React.FC<ProductGalleryCardProps> = ({
  product,
  badgeType,
  onCardClick,
  onQuickAdd,
  isAdded,
}) => {
  const isViral = badgeType === 'viral-hit' || product.badge === 'NEW' || product.badge === 'CUSTOM';
  const badgeText = isViral ? 'VIRAL HIT' : 'TOP SELLER';
  const badgeBg = isViral ? 'bg-[#FF8A00] text-white' : 'bg-[#FFC43C] text-[#171717]';
  const BadgeIcon = isViral ? Flame : Trophy;

  return (
    <div
      onClick={() => onCardClick(product)}
      className="w-[280px] sm:w-[320px] shrink-0 bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#171717] hover:shadow-[7px_7px_0px_0px_#FF8A00] hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between cursor-pointer group/card select-none"
    >
      {/* Card Header: Category & Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[10px] font-bold text-[#6D6D6D] uppercase tracking-wider truncate">
          {product.category}
        </span>

        {/* Distinctive Status Badge (No Star Emojis) */}
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black font-heading uppercase tracking-wider border border-[#171717] shadow-[1px_1px_0px_0px_#171717] ${badgeBg}`}
        >
          <BadgeIcon className="w-2.5 h-2.5 shrink-0" />
          <span>{product.badge || badgeText}</span>
        </span>
      </div>

      {/* 3D Visual Stage Showcase */}
      <div
        className={`w-full h-36 sm:h-40 rounded-xl border-2 border-[#171717] ${
          product.illustration?.bgAccent || 'bg-[#FFF9ED]'
        } flex items-center justify-center relative overflow-hidden mb-3.5 group-hover/card:brightness-95 transition-all`}
      >
        {/* Animated 3D Emoji Avatar */}
        <span className="text-5xl sm:text-6xl transform group-hover/card:scale-115 group-hover/card:rotate-6 transition-transform duration-300 drop-shadow-md">
          {product.illustration?.emoji || '📦'}
        </span>

        {/* Spec Pill Floating on Visual */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs border border-[#171717] rounded-md px-2 py-0.5 text-[9px] font-black font-heading text-[#171717]">
          {product.specs?.material ? product.specs.material.split(' ')[0] : 'PLA+'}
        </div>

        {/* Hover View Button */}
        <div className="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-150 bg-[#171717] text-white rounded-lg p-1.5 shadow-[1px_1px_0px_0px_#FFC43C]">
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[3px]" />
        </div>
      </div>

      {/* Title & Specs */}
      <div className="space-y-1 mb-3">
        <h3 className="text-sm sm:text-base font-black font-heading uppercase text-[#171717] tracking-tight leading-tight line-clamp-1 group-hover/card:text-[#FF8A00] transition-colors">
          {product.name}
        </h3>
        <p className="text-[11px] font-semibold text-[#6D6D6D] line-clamp-1">
          {product.description}
        </p>
      </div>

      {/* Price & Quick Add Button Row */}
      <div className="pt-2.5 border-t-1.5 border-[#171717]/15 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black font-heading text-[#171717]">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-semibold text-[#A3A3A3] line-through">
                ৳{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono font-bold text-[#059669] block">
            ✓ In Stock / 24h
          </span>
        </div>

        {/* Quick Add Action Button */}
        <button
          onClick={(e) => onQuickAdd(e, product)}
          className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-black font-heading uppercase tracking-wider border-2 border-[#171717] transition-all cursor-pointer ${
            isAdded
              ? 'bg-[#34D399] text-[#171717] shadow-none'
              : 'bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] shadow-[2px_2px_0px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px]'
          }`}
          title="Add to Shopping Cart"
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3px]" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5px]" />
              <span>Add +</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
