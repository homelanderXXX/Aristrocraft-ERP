import React, { useState } from 'react';
import { Star, ShoppingBag, Check, Eye, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRouter } from '../../context/RouterContext';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewProduct,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { navigate } = useRouter();

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product, 1);
    }
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onViewProduct) {
      onViewProduct(product);
    } else {
      navigate(`/shop/${product.slug}`);
    }
  };

  const isYellowBadge = product.badgeColor === 'yellow';
  const hasValidImage = Boolean(product.image && !imageError);

  return (
    <div
      className="group relative bg-white border-2.5 sm:border-3 border-[#171717] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-[4px_4px_0px_0px_#171717] hover:shadow-[7px_7px_0px_0px_#171717] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between select-none"
    >
      {/* Product Image Stage: Increased Height & Narrow Bezels for Clear Product View */}
      <a
        href={`/shop/${product.slug}`}
        onClick={handleCardClick}
        className="relative w-full h-52 sm:h-60 rounded-xl sm:rounded-2xl bg-[#FFF9ED] border-2 border-[#171717] mb-3 flex items-center justify-center overflow-hidden cursor-pointer group/img shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)]"
        aria-label={`View ${product.name}`}
      >
        {/* Subtle grid pattern in image backing */}
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:10px_10px]"
          aria-hidden="true"
        />

        {/* Floating Top Bar: Sticker Badge & Wishlist Heart */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
          <span
            className={`
              pointer-events-auto inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px]
              font-black font-heading uppercase tracking-wide border-2 border-[#171717]
              shadow-[2px_2px_0px_0px_#171717]
              ${
                isYellowBadge
                  ? 'bg-[#FFC43C] text-[#171717]'
                  : 'bg-[#FF8A00] text-white'
              }
            `}
          >
            {product.badge}
          </span>

          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`
              pointer-events-auto w-8 h-8 rounded-full border-2 border-[#171717] flex items-center justify-center
              transition-all duration-150 cursor-pointer shadow-[2px_2px_0px_0px_#171717] active:scale-95
              ${
                isFavorite
                  ? 'bg-[#FF4D4D] text-white'
                  : 'bg-white text-[#171717] hover:bg-[#FFF9ED]'
              }
            `}
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'fill-white stroke-white' : 'stroke-[#171717] stroke-[2px]'
              }`}
            />
          </button>
        </div>

        {/* Product Visual: Real 3D Printed Photo or Fallback Illustration */}
        {hasValidImage ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className={`
              w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2.5 border-[#171717] ${product.illustration.bgAccent}
              flex items-center justify-center text-4xl sm:text-5xl shadow-[4px_4px_0px_0px_#171717]
              transition-transform duration-200 group-hover/img:scale-105 group-hover/img:rotate-2
            `}
          >
            <span className="drop-shadow-xs">{product.illustration.emoji}</span>
          </div>
        )}

        {/* Quick View Tag on hover */}
        <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-150 bg-white/95 border-2 border-[#171717] rounded-lg px-2.5 py-0.5 text-[9px] font-black font-heading text-[#171717] flex items-center gap-1 shadow-[2px_2px_0px_0px_#171717]">
          <Eye className="w-3 h-3 stroke-[2.5px]" />
          <span>VIEW</span>
        </div>
      </a>

      {/* Product Details (Category, Name, Rating) */}
      <div className="flex-1 flex flex-col justify-start px-0.5">
        <span className="text-[10px] sm:text-xs font-bold text-[#6D6D6D] uppercase tracking-wider mb-0.5 line-clamp-1">
          {product.category}
        </span>

        <a
          href={`/shop/${product.slug}`}
          onClick={handleCardClick}
          className="text-sm sm:text-base font-black font-heading uppercase text-[#171717] tracking-tight leading-snug line-clamp-2 hover:text-[#FF8A00] transition-colors"
        >
          {product.name}
        </a>

        {/* Rating Stars Row */}
        <div className="flex items-center gap-1.5 mt-1.5 mb-2.5">
          <div className="flex items-center text-[#FF8A00]" aria-label={`${product.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#FF8A00] stroke-[#171717] stroke-[1.5px]"
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs font-black font-heading text-[#171717]">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[10px] font-semibold text-[#6D6D6D]">
            ({product.reviewsCount})
          </span>
        </div>
      </div>

      {/* Card Bottom: Price & Add to Cart */}
      <div className="pt-2.5 border-t-2 border-[#171717]/10 flex items-center justify-between gap-2 mt-auto px-0.5">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase text-[#6D6D6D] leading-none">
            PRICE
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-base sm:text-lg font-black font-heading text-[#171717] tracking-tight">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-bold text-[#8C8C8C] line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
          className={`
            px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-2 border-[#171717]
            text-xs font-black font-heading uppercase tracking-wide
            shadow-[2px_2px_0px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#171717]
            transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0
            ${
              isAdded
                ? 'bg-[#34D399] text-[#171717]'
                : 'bg-[#FFC43C] text-[#171717] hover:bg-[#FF8A00] hover:text-white'
            }
          `}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3px]" />
              <span>ADDED</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5px]" />
              <span>ADD</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
