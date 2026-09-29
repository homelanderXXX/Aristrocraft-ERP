import React from 'react';
import { Heart, ArrowLeft, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { ProductCard } from '../../components/products/ProductCard';
import { useRouter } from '../../context/RouterContext';
import { PageMeta } from '../../components/common/PageMeta';

export default function WishlistPage() {
  const { wishlist, clearWishlist, totalWishlistItems } = useWishlist();
  const { navigate } = useRouter();

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-[80vh] py-10 px-4 sm:px-6 lg:px-8">
      <PageMeta
        title="Saved Wishlist — ARISTROCRAFT 3D Prints"
        description="Your saved 3D printed items and custom designs at ARISTROCRAFT."
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* TOP HEADER BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-3 border-[#171717] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF4D4D] border-2 border-[#171717] flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#171717]">
                <Heart className="w-4 h-4 fill-white stroke-white" />
              </div>
              <span className="text-xs font-black font-heading uppercase text-[#FF8A00] tracking-wider">
                YOUR FAVORITE SAVED PRINTS
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-heading uppercase text-[#171717]">
              My Wishlist ({totalWishlistItems})
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[3px]" />
              <span>Back to Shop</span>
            </button>

            {wishlist.length > 0 && (
              <button
                type="button"
                onClick={clearWishlist}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border-2 border-[#171717] text-xs font-black font-heading uppercase text-[#FF4D4D] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FF4D4D] hover:text-white transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* WISHLIST GRID OR EMPTY STATE */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={(p) => navigate(`/shop/${p.slug}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border-3 border-[#171717] rounded-3xl p-12 text-center space-y-4 shadow-[8px_8px_0px_0px_#171717] max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF9ED] border-2.5 border-[#171717] flex items-center justify-center text-[#FF4D4D] mx-auto shadow-[3px_3px_0px_0px_#171717]">
              <Heart className="w-8 h-8 stroke-[2px]" />
            </div>
            <h2 className="text-2xl font-black font-heading uppercase text-[#171717]">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed">
              Explore our 3D print catalog and click the heart icon on any product to save it to your wishlist for easy ordering later.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] font-black font-heading text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] cursor-pointer transition-all"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5px]" />
                <span>BROWSE 3D PRINTS CATALOG</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
