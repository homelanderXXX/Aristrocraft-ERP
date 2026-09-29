import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, Filter } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { Product, ProductCategorySlug } from '../../types';
import { productRepository } from '../../lib/supabase/repositories/productRepository';

interface FilterOption {
  label: string;
  slug: ProductCategorySlug;
}

interface FeaturedProductsProps {
  onAddToCart?: (product: Product) => void;
  onViewAllProducts?: () => void;
  onViewProduct?: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onAddToCart,
  onViewAllProducts,
  onViewProduct,
}) => {
  const [products, setProducts] = useState<Product[]>(FEATURED_PRODUCTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategorySlug>('all');

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      setIsLoading(true);
      try {
        const data = await productRepository.getFeaturedProducts();
        if (isMounted) {
          setProducts(data && data.length > 0 ? data : FEATURED_PRODUCTS);
        }
      } catch (err) {
        console.warn('Error fetching featured products from repository:', err);
        if (isMounted) {
          setProducts(FEATURED_PRODUCTS);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  const filterOptions: FilterOption[] = [
    { label: 'ALL', slug: 'all' },
    { label: 'GIFTS', slug: 'gifts' },
    { label: 'KEYCHAINS', slug: 'keychains' },
    { label: 'HOME DECOR', slug: 'home-decor' },
    { label: 'DESK', slug: 'desk' },
    { label: 'MINIATURES', slug: 'miniatures' },
    { label: 'CUSTOM PARTS', slug: 'custom-parts' },
  ];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(
      (prod) => prod.categorySlug === selectedCategory
    );
  }, [products, selectedCategory]);

  const handleSeeAllClick = (e: React.MouseEvent) => {
    if (onViewAllProducts) {
      e.preventDefault();
      onViewAllProducts();
    }
  };

  return (
    <section
      id="shop"
      aria-labelledby="featured-products-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9ED] overflow-hidden border-b-2 border-[#171717]/10"
    >
      {/* ================================================== */}
      {/* BACKGROUND DECORATIVE ELEMENTS (aria-hidden) */}
      {/* ================================================== */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-12 right-8 w-44 h-44 opacity-15 bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
        <div className="absolute bottom-16 left-6 w-36 h-36 opacity-15 bg-[radial-gradient(#FFC43C_2.5px,transparent_2.5px)] [background-size:14px_14px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8A00] text-white border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[1.5deg] hover:rotate-0 transition-transform duration-200 mb-4 select-none">
            <span className="text-xs font-black font-heading tracking-wider uppercase">
              FAN FAVORITES
            </span>
          </div>

          {/* Main Heading */}
          <h2
            id="featured-products-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black font-heading tracking-tight text-[#171717] uppercase leading-[1.05]"
          >
            FAN{' '}
            <span className="text-[#FF8A00] relative inline-block">
              FAVORITES
              {/* Decorative wave underline */}
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

          {/* Supporting Text */}
          <p className="text-[#6D6D6D] font-semibold text-sm sm:text-base md:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Some of our most-loved creations, made to order just for you.
          </p>
        </div>

        {/* ================================================== */}
        {/* CATEGORY FILTER BUTTONS ROW */}
        {/* ================================================== */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div
            className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 pt-1 px-2 max-w-full no-scrollbar"
            role="toolbar"
            aria-label="Filter products by category"
          >
            {filterOptions.map((filter) => {
              const isSelected = selectedCategory === filter.slug;
              return (
                <button
                  key={filter.slug}
                  type="button"
                  onClick={() => setSelectedCategory(filter.slug)}
                  aria-pressed={isSelected}
                  className={`
                    px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-xs font-black font-heading tracking-wide uppercase transition-all duration-150 shrink-0 border-2 border-[#171717] cursor-pointer
                    ${
                      isSelected
                        ? 'bg-[#171717] text-white shadow-[3px_3px_0px_0px_#FFC43C] -translate-y-0.5'
                        : 'bg-white text-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C]/40 hover:-translate-y-0.5'
                    }
                  `}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================== */}
        {/* PRODUCT GRID (4 Cols Desktop, 2 Cols Tablet, 2/1 Mobile) */}
        {/* ================================================== */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-10 text-center shadow-[6px_6px_0px_0px_#171717] max-w-md mx-auto">
            <span className="text-4xl mb-3 inline-block">🔍</span>
            <h3 className="text-xl font-black font-heading uppercase text-[#171717]">
              No products found
            </h3>
            <p className="text-sm font-semibold text-[#6D6D6D] mt-1 mb-4">
              Try selecting another category or check all products.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="px-5 py-2.5 bg-[#FFC43C] text-[#171717] border-2 border-[#171717] rounded-full font-black font-heading text-xs uppercase shadow-[2px_2px_0px_0px_#171717] cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* ================================================== */}
        {/* BOTTOM SECTION CTA: SEE ALL PRODUCTS → */}
        {/* ================================================== */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="/shop"
            onClick={handleSeeAllClick}
            className="inline-flex items-center justify-center gap-2.5 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-full px-8 sm:px-10 py-4 text-sm sm:text-base font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[7px_7px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] transition-all cursor-pointer select-none text-center"
          >
            <span>SEE ALL PRODUCTS</span>
            <ArrowRight className="w-5 h-5 stroke-[3px]" />
          </a>
        </div>

      </div>
    </section>
  );
};
