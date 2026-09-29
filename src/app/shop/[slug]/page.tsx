import React, { useState, useEffect } from 'react';
import {
  Star,
  ShoppingBag,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Package,
  Layers,
  Clock,
  Heart,
  Share2,
  Truck,
  MessageSquare,
  Plus,
  ThumbsUp,
} from 'lucide-react';
import { Product, ProductReview } from '../../../types';
import { QuantitySelector } from '../../../components/shop/QuantitySelector';
import { ProductCard } from '../../../components/products/ProductCard';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useRouter } from '../../../context/RouterContext';
import { productRepository } from '../../../lib/supabase/repositories/productRepository';
import { getProductBySlug as getStaticProductBySlug, PRODUCTS } from '../../../data/products';
import { PageMeta } from '../../../components/common/PageMeta';

import { reviewRepository } from '../../../lib/supabase/repositories/reviewRepository';

interface ProductDetailPageProps {
  slug?: string;
}

export default function ProductDetailPage({ slug: propSlug }: ProductDetailPageProps) {
  const { params, navigate } = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const slug = propSlug || params.slug;
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Variant States
  const [selectedColor, setSelectedColor] = useState<string>('Standard');
  const [selectedSize, setSelectedSize] = useState<string>('Standard');
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [customNote, setCustomNote] = useState<string>('');
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [showCopiedToast, setShowCopiedToast] = useState<boolean>(false);

  // Frequently Bought Together Bundle state
  const [includeBundle, setIncludeBundle] = useState<boolean>(true);

  // Interactive Review Form State
  const [reviewsList, setReviewsList] = useState<ProductReview[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  // Fetch product data from Supabase repository
  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const catalog = await productRepository.getProducts();
        const fullCatalog = catalog && catalog.length > 0 ? catalog : PRODUCTS;
        if (isMounted) setAllProducts(fullCatalog);

        const data = await productRepository.getProductBySlug(slug);
        if (isMounted) {
          const currentProd = data || getStaticProductBySlug(slug) || null;
          setProduct(currentProd);
          if (currentProd) {
            setSelectedColor(currentProd.colors?.[0] || 'Standard');
            setSelectedSize(currentProd.sizes?.[0] || 'Standard');
            setReviewsList(currentProd.reviews || [
              {
                id: 'r1',
                author: 'Tanvir Ahmed',
                rating: 5,
                date: '3 days ago',
                comment: 'Super clean surface finish and high structural strength. Arrived quickly!',
                verifiedPurchase: true,
              },
              {
                id: 'r2',
                author: 'Sultana Razia',
                rating: 5,
                date: '1 week ago',
                comment: 'Exactly as shown in photos. Dual color text pops nicely!',
                verifiedPurchase: true,
              },
            ]);
          }
        }
      } catch (err) {
        console.warn('Error loading product by slug, falling back to static:', err);
        const fallback = getStaticProductBySlug(slug) || null;
        if (isMounted) {
          setAllProducts(PRODUCTS);
          setProduct(fallback);
          if (fallback) {
            setSelectedColor(fallback.colors?.[0] || 'Standard');
            setSelectedSize(fallback.sizes?.[0] || 'Standard');
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setSelectedGalleryIdx(0);
          setQuantity(1);
          setCustomNote('');
          setIsAdded(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-[75vh] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
          <div className="h-6 bg-[#171717]/10 rounded w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 h-96 bg-white border-3 border-[#171717] rounded-3xl" />
            <div className="lg:col-span-6 space-y-4">
              <div className="h-8 bg-[#171717]/20 rounded w-3/4" />
              <div className="h-10 bg-[#FF8A00]/20 rounded w-1/3" />
              <div className="h-32 bg-white border-2 border-[#171717] rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#FFF9ED]">
        <div className="max-w-md w-full bg-white border-3 border-[#171717] rounded-3xl p-8 text-center shadow-[6px_6px_0px_0px_#171717]">
          <div className="w-16 h-16 rounded-2xl bg-[#FF8A00] border-2.5 border-[#171717] text-white text-3xl flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_0px_#171717]">
            📦
          </div>
          <h1 className="text-2xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2">
            Print Not Found
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed mb-6">
            The 3D printed item you requested is currently unavailable in our catalog.
          </p>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="inline-flex items-center justify-center gap-2 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-full px-6 py-3 text-xs font-black font-heading uppercase tracking-wide shadow-[3px_3px_0px_0px_#171717] cursor-pointer transition-all"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3px]" />
            <span>BACK TO SHOP CATALOG</span>
          </button>
        </div>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const isYellowBadge = product.badgeColor === 'yellow';
  const gallery = (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : (product.images && product.images.length > 0)
    ? product.images.map((url, idx) => ({
        id: `img-${idx}`,
        label: idx === 0 ? 'Main Angle' : `Angle ${idx + 1}`,
        emoji: product.illustration.emoji,
        bgAccent: product.illustration.bgAccent,
        imageUrl: url,
      }))
    : [
        { id: 'g1', emoji: product.illustration.emoji, label: 'Main Angle', bgAccent: product.illustration.bgAccent, imageUrl: product.image },
      ];
  const activeImage = gallery[selectedGalleryIdx] || gallery[0];

  // Frequently bought together bundle item (e.g. cable organizer or keychain)
  const bundleProduct = allProducts.find((p) => p.id !== product.id) || PRODUCTS[0];

  // Related products in same category or fallback
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.featured))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize, customNote);

    if (includeBundle && bundleProduct) {
      addToCart(bundleProduct, 1);
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim() || !product) return;

    const createdRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      verifiedPurchase: true,
    };

    setReviewsList([createdRev, ...reviewsList]);

    // Persist to Supabase database
    await reviewRepository.createReview({
      productId: product.slug || product.id,
      customerName: newAuthor.trim(),
      rating: newRating,
      reviewText: newComment.trim(),
    });

    setNewAuthor('');
    setNewComment('');
    setIsReviewSubmitted(true);
    setTimeout(() => setIsReviewSubmitted(false), 3000);
  };

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] py-6 sm:py-10">
      <PageMeta
        title={`${product.name} — ARISTROCRAFT 3D Prints`}
        description={product.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP NAVIGATION / BREADCRUMB */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 text-xs font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] transition-colors group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-white border-2 border-[#171717] flex items-center justify-center shadow-[2px_2px_0px_0px_#171717] group-hover:-translate-x-0.5 transition-transform">
              <ArrowLeft className="w-4 h-4 stroke-[3px]" />
            </div>
            <span>Back to Products</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`
                w-9 h-9 rounded-xl border-2 border-[#171717] flex items-center justify-center transition-all cursor-pointer shadow-[2px_2px_0px_0px_#171717]
                ${isLiked ? 'bg-[#FF4D4D] text-white' : 'bg-white text-[#171717] hover:bg-[#FFF9ED]'}
              `}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-white stroke-white' : 'stroke-[2.5px]'}`} />
            </button>

            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: product.name, url: window.location.href }).catch(() => {});
                } else {
                  navigator.clipboard?.writeText(window.location.href);
                  setShowCopiedToast(true);
                  setTimeout(() => setShowCopiedToast(false), 3000);
                }
              }}
              aria-label="Share product"
              className="w-9 h-9 rounded-xl bg-white border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FFC43C] transition-all cursor-pointer shadow-[2px_2px_0px_0px_#171717]"
            >
              <Share2 className="w-4 h-4 stroke-[2.5px]" />
            </button>
          </div>
        </div>

        {/* MAIN PRODUCT DETAIL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: GALLERY & SPECS */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Main Stage */}
            <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-white border-3 border-[#171717] rounded-3xl p-0 flex items-center justify-center shadow-[6px_6px_0px_0px_#171717] overflow-hidden select-none">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span
                  className={`
                    px-3 py-1 rounded-full text-[10px] sm:text-xs font-black font-heading uppercase tracking-wide border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717]
                    ${isYellowBadge ? 'bg-[#FFC43C] text-[#171717]' : 'bg-[#FF8A00] text-white'}
                  `}
                >
                  {product.badge}
                </span>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-black font-heading uppercase tracking-wider bg-white border-2 border-[#171717] text-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717]">
                  {product.illustration.tag}
                </span>
              </div>

              {activeImage?.imageUrl ? (
                <img
                  src={activeImage.imageUrl}
                  alt={`${product.name} - ${activeImage.label}`}
                  className="w-full h-full object-cover transition-opacity duration-200"
                />
              ) : product.image && selectedGalleryIdx === 0 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`
                    w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl border-3 border-[#171717] ${activeImage.bgAccent}
                    flex items-center justify-center text-6xl sm:text-7xl lg:text-8xl shadow-[6px_6px_0px_0px_#171717]
                    transition-all duration-300 transform hover:scale-105 hover:rotate-2 cursor-pointer
                  `}
                >
                  <span className="drop-shadow-md select-none">{activeImage.emoji}</span>
                </div>
              )}

              <div className="absolute bottom-4 right-4 bg-white/90 border-2 border-[#171717] rounded-xl px-3 py-1 text-[11px] font-black font-heading uppercase text-[#171717] shadow-[2px_2px_0px_0px_#171717] z-10">
                {activeImage.label}
              </div>
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 select-none">
                {gallery.map((img, idx) => {
                  const isSelected = idx === selectedGalleryIdx;
                  return (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setSelectedGalleryIdx(idx)}
                      className={`
                        w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2.5 border-[#171717] p-1 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shrink-0 overflow-hidden relative
                        ${
                          isSelected
                            ? 'bg-[#FFC43C] shadow-[4px_4px_0px_0px_#171717] -translate-y-1 ring-2 ring-[#171717]'
                            : 'bg-white hover:bg-[#FFF9ED] shadow-[2px_2px_0px_0px_#171717]'
                        }
                      `}
                    >
                      {img.imageUrl ? (
                        <img
                          src={img.imageUrl}
                          alt={img.label}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <>
                          <span className="text-2xl sm:text-3xl">{img.emoji}</span>
                          <span className="text-[9px] font-black font-heading uppercase text-[#171717] truncate max-w-[70px]">
                            {img.label.split(' ')[0]}
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Specs Card */}
            {product.specs && (
              <div className="bg-white border-2.5 border-[#171717] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#171717]">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-[#FF8A00] stroke-[2.5px]" />
                  <h2 className="text-xs font-black font-heading uppercase text-[#171717] tracking-wider">
                    3D Print Manufacturing Specifications
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-[#FFF9ED] border-1.5 border-[#171717]/20 rounded-xl p-2.5">
                    <span className="text-[10px] font-bold text-[#6D6D6D] uppercase block">Material</span>
                    <strong className="text-[#171717] font-black font-heading text-[11px] block truncate">
                      {product.specs.material || product.material}
                    </strong>
                  </div>
                  <div className="bg-[#FFF9ED] border-1.5 border-[#171717]/20 rounded-xl p-2.5">
                    <span className="text-[10px] font-bold text-[#6D6D6D] uppercase block">Layer Resolution</span>
                    <strong className="text-[#171717] font-black font-heading text-[11px] block truncate">
                      {product.specs.layerHeight || '0.16mm High Detail'}
                    </strong>
                  </div>
                  <div className="bg-[#FFF9ED] border-1.5 border-[#171717]/20 rounded-xl p-2.5">
                    <span className="text-[10px] font-bold text-[#6D6D6D] uppercase block">Infill Density</span>
                    <strong className="text-[#171717] font-black font-heading text-[11px] block truncate">
                      {product.specs.infill || '100% Solid Core'}
                    </strong>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: BUY ACTIONS & OPTIONS */}
          <div className="lg:col-span-6 flex flex-col justify-start space-y-6">
            
            <div>
              <span className="text-xs font-black font-heading uppercase tracking-widest text-[#FF8A00]">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black font-heading uppercase text-[#171717] tracking-tight leading-tight mt-1 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-[#FF8A00]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF8A00] stroke-[#171717] stroke-[1.5px]" />
                  ))}
                </div>
                <span className="text-sm font-black font-heading text-[#171717]">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs font-semibold text-[#6D6D6D]">
                  ({reviewsList.length} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black font-heading text-[#171717]">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base sm:text-lg font-bold text-[#A3A3A3] line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* OPTIONS BOX */}
            <div className="space-y-4 p-5 bg-white border-2.5 border-[#171717] rounded-3xl shadow-[4px_4px_0px_0px_#171717]">
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-2">
                    Filament Color Blend: <span className="text-[#FF8A00]">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`
                          px-3 py-1.5 rounded-xl text-xs font-black font-heading uppercase border-2 transition-all cursor-pointer
                          ${
                            selectedColor === c
                              ? 'bg-[#171717] text-white border-[#171717] shadow-[2px_2px_0px_0px_#FF8A00]'
                              : 'bg-[#FFF9ED] text-[#171717] border-[#171717]/30'
                          }
                        `}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personalization Note */}
              <div>
                <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                  Custom Text or Name Tag Note:
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Name: 'RANA', Text: 'CREATIVE STUDIO'"
                  className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl px-3.5 py-2 text-xs font-bold text-[#171717] placeholder:text-[#8C8C8C] outline-none focus:border-[#FF8A00]"
                />
              </div>

              {/* Quantity & Add Button */}
              <div className="pt-2 border-t-2 border-[#171717]/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} size="md" />

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`
                    flex-1 py-3.5 px-6 rounded-2xl border-2.5 border-[#171717] font-black font-heading text-xs sm:text-sm uppercase tracking-wider
                    shadow-[4px_4px_0px_0px_#171717] transition-all flex items-center justify-center gap-2 cursor-pointer
                    ${
                      isAdded
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717]'
                    }
                  `}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 stroke-[3px]" />
                      <span>ADDED TO CART!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 stroke-[2.5px]" />
                      <span>ADD TO CART • ৳{(product.price * quantity + (includeBundle && bundleProduct ? bundleProduct.price : 0)).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* FREQUENTLY BOUGHT TOGETHER BUNDLE WIDGET */}
            {bundleProduct && (
              <div className="p-4 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] space-y-3">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#FF8A00]" />
                  <span className="text-xs font-black font-heading uppercase text-[#171717]">
                    FREQUENTLY BOUGHT TOGETHER
                  </span>
                </div>

                <label className="flex items-center gap-3 bg-white p-3 border-2 border-[#171717] rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeBundle}
                    onChange={(e) => setIncludeBundle(e.target.checked)}
                    className="w-4 h-4 accent-[#FF8A00]"
                  />
                  <div className="flex-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{bundleProduct.illustration.emoji}</span>
                      <span className="text-xs font-black font-heading uppercase text-[#171717]">
                        {bundleProduct.name}
                      </span>
                    </div>
                    <span className="text-xs font-black font-heading text-[#FF8A00]">
                      +৳{bundleProduct.price}
                    </span>
                  </div>
                </label>
              </div>
            )}

            {/* DELIVERY ESTIMATE & POLICY CALCULATOR */}
            <div className="p-4 bg-white border-2 border-[#171717] rounded-2xl shadow-[3px_3px_0px_0px_#171717] space-y-2 text-xs font-bold text-[#171717]">
              <div className="flex items-center gap-2 text-[#FF8A00]">
                <Truck className="w-4 h-4 stroke-[2.5px]" />
                <span className="font-black font-heading uppercase">Delivery Fee & Turnaround</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2 bg-[#FFF9ED] border border-[#171717]/20 rounded-xl">
                  <span className="text-[10px] font-bold text-[#6D6D6D] uppercase block">Inside Dhaka</span>
                  <span className="font-black font-heading text-[#171717]">৳60 • 24-48 Hours</span>
                </div>
                <div className="p-2 bg-[#FFF9ED] border border-[#171717]/20 rounded-xl">
                  <span className="text-[10px] font-bold text-[#6D6D6D] uppercase block">Outside Dhaka</span>
                  <span className="font-black font-heading text-[#171717]">৳120 • 3-5 Days</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* INTERACTIVE CUSTOMER REVIEWS SECTION */}
        <section className="bg-white border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#171717] space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#171717]/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-black font-heading uppercase text-[#FF8A00]">
                <MessageSquare className="w-4 h-4" />
                <span>CUSTOMER FEEDBACK</span>
              </div>
              <h2 className="text-2xl font-black font-heading uppercase text-[#171717]">
                Customer Reviews & Ratings ({reviewsList.length})
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-3 shadow-[2px_2px_0px_0px_#171717]">
              <span className="text-2xl font-black font-mono text-[#FF8A00]">{product.rating.toFixed(1)}</span>
              <div className="flex flex-col">
                <div className="flex items-center text-[#FF8A00]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#FF8A00] stroke-[#171717]" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-[#6D6D6D]">Verified Studio Purchases</span>
              </div>
            </div>
          </div>

          {/* WRITE A REVIEW FORM */}
          <form onSubmit={handleAddReview} className="bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#171717] space-y-4">
            <h3 className="text-sm font-black font-heading uppercase text-[#171717]">
              Write a Review for {product.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Shakib Al Hasan"
                  className="w-full bg-white border-2 border-[#171717] rounded-xl px-3 py-2 text-xs font-bold text-[#171717] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                  Rating
                </label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full bg-white border-2 border-[#171717] rounded-xl px-3 py-2 text-xs font-bold text-[#171717] outline-none"
                >
                  <option value={5}>5 Stars — Excellent Print Quality</option>
                  <option value={4}>4 Stars — Very Good</option>
                  <option value={3}>3 Stars — Average</option>
                  <option value={2}>2 Stars — Needs Improvement</option>
                  <option value={1}>1 Star — Poor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                Your Review / Comment
              </label>
              <textarea
                required
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your experience with the material, layer finish, or turnaround time..."
                className="w-full bg-white border-2 border-[#171717] rounded-xl p-3 text-xs font-bold text-[#171717] outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2 border-[#171717] text-xs font-black font-heading uppercase shadow-[2px_2px_0px_0px_#171717] cursor-pointer transition-all"
            >
              Submit Customer Review
            </button>

            {isReviewSubmitted && (
              <p className="text-xs font-bold text-[#10B981]">
                ✓ Thank you! Your review has been submitted.
              </p>
            )}
          </form>

          {/* REVIEWS LIST */}
          <div className="space-y-4">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="p-4 bg-[#FFF9ED]/50 border-2 border-[#171717]/20 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black font-heading uppercase text-[#171717]">
                      {rev.author}
                    </span>
                    {rev.verifiedPurchase && (
                      <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#10B981] text-[9px] font-black font-heading text-[#10B981] uppercase">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-[#6D6D6D]">{rev.date}</span>
                </div>

                <div className="flex items-center text-[#FF8A00]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#FF8A00] stroke-[#171717]" />
                  ))}
                </div>

                <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED PRODUCTS RECOMMENDATION GRID */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black font-heading uppercase text-[#FF8A00] block">
                  RECOMMENDED FOR YOU
                </span>
                <h2 className="text-2xl font-black font-heading uppercase text-[#171717]">
                  Related 3D Prints
                </h2>
              </div>

              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="text-xs font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] flex items-center gap-1"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF8A00]" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onViewProduct={(p) => navigate(`/shop/${p.slug}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* COPIED TOAST */}
        {showCopiedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#FF8A00] text-white border-2 border-[#171717] px-5 py-3 rounded-xl shadow-[4px_4px_0px_0px_#171717] font-black font-heading text-xs uppercase tracking-wider flex items-center gap-2 animate-fadeIn">
            <span>✓ LINK COPIED TO CLIPBOARD!</span>
          </div>
        )}

      </div>
    </div>
  );
}
