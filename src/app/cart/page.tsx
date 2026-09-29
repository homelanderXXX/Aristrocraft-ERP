import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  Phone,
  MapPin,
  User,
  Mail,
  PackageCheck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { QuantitySelector } from '../../components/shop/QuantitySelector';
import { useRouter } from '../../context/RouterContext';
import { DELIVERY_CONFIG, getDeliveryZone } from '../../config/delivery';
import { orderRepository, OrderModel } from '../../lib/supabase/repositories/orderRepository';
import { useCustomerAuth } from '../../context/CustomerAuthContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const { navigate } = useRouter();
  const { profile, user, updateProfile } = useCustomerAuth();

  // Checkout Form State
  const [customerName, setCustomerName] = useState(profile?.name || '');
  const [customerPhone, setCustomerPhone] = useState(profile?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(profile?.email || user?.email || '');
  const [deliveryAddress, setDeliveryAddress] = useState(profile?.defaultDeliveryAddress || '');
  const [selectedZoneId, setSelectedZoneId] = useState(DELIVERY_CONFIG.defaultZoneId);
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [saveToProfile, setSaveToProfile] = useState(true);
  const [autofillSource, setAutofillSource] = useState<'profile' | 'recent' | null>(null);

  // Sync profile data or recent checkout memory when loaded
  React.useEffect(() => {
    if (profile) {
      if (profile.name) setCustomerName(profile.name);
      if (profile.phone) setCustomerPhone(profile.phone);
      if (profile.email || user?.email) setCustomerEmail(profile.email || user?.email || '');
      if (profile.defaultDeliveryAddress) setDeliveryAddress(profile.defaultDeliveryAddress);
      if (profile.city) {
        const found = DELIVERY_CONFIG.zones.find(
          (z) => z.id === profile.city || z.name.toLowerCase().includes(profile.city?.toLowerCase() || '')
        );
        if (found) setSelectedZoneId(found.id);
      }
      setAutofillSource('profile');
    } else if (typeof window !== 'undefined') {
      try {
        const savedRaw = localStorage.getItem('aristro_checkout_saved_details');
        if (savedRaw) {
          const saved = JSON.parse(savedRaw);
          if (saved.name && !customerName) setCustomerName(saved.name);
          if (saved.phone && !customerPhone) setCustomerPhone(saved.phone);
          if (saved.email && !customerEmail) setCustomerEmail(saved.email);
          if (saved.deliveryAddress && !deliveryAddress) setDeliveryAddress(saved.deliveryAddress);
          if (saved.city) {
            const found = DELIVERY_CONFIG.zones.find(
              (z) => z.id === saved.city || z.name.toLowerCase().includes(saved.city?.toLowerCase() || '')
            );
            if (found) setSelectedZoneId(found.id);
          }
          setAutofillSource('recent');
        }
      } catch {
        // ignore
      }
    }
  }, [profile, user]);

  const handleResetToProfile = () => {
    if (profile) {
      setCustomerName(profile.name || '');
      setCustomerPhone(profile.phone || '');
      setCustomerEmail(profile.email || user?.email || '');
      setDeliveryAddress(profile.defaultDeliveryAddress || '');
      if (profile.city) {
        const found = DELIVERY_CONFIG.zones.find(
          (z) => z.id === profile.city || z.name.toLowerCase().includes(profile.city?.toLowerCase() || '')
        );
        if (found) setSelectedZoneId(found.id);
      }
    }
  };

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderModel | null>(null);
  const [copied, setCopied] = useState(false);

  const currentZone = getDeliveryZone(selectedZoneId);
  const deliveryFee = currentZone.fee;
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    if (!customerName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      setError('Please provide a valid phone number (e.g. 01712345678).');
      return;
    }
    if (!deliveryAddress.trim()) {
      setError('Please provide your complete delivery address.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Auto-save/update customer profile so user NEVER has to type again
      if (user && saveToProfile) {
        updateProfile({
          name: customerName.trim(),
          phone: customerPhone.trim(),
          defaultDeliveryAddress: deliveryAddress.trim(),
          city: selectedZoneId,
        }).catch((err) => console.warn('Failed to update customer profile during order placement:', err));
      }

      // 2. Also cache to local checkout memory
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            'aristro_checkout_saved_details',
            JSON.stringify({
              name: customerName.trim(),
              phone: customerPhone.trim(),
              email: customerEmail.trim(),
              deliveryAddress: deliveryAddress.trim(),
              city: selectedZoneId,
            })
          );
        } catch {
          // ignore
        }
      }

      const { order, error: orderError } = await orderRepository.createOrder({
        customer: {
          id: profile?.id || user?.id,
          name: customerName.trim(),
          phone: customerPhone.trim(),
          email: customerEmail.trim() || undefined,
          deliveryAddress: deliveryAddress.trim(),
          city: currentZone.name,
        },
        items,
        subtotal,
        deliveryFee,
        discount: 0,
        notes: deliveryNotes.trim() || undefined,
      });

      if (orderError || !order) {
        throw orderError || new Error('Failed to create order. Please try again.');
      }

      setConfirmedOrder(order);
      clearCart();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error creating order.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderNumber = () => {
    if (confirmedOrder?.orderNumber) {
      navigator.clipboard.writeText(confirmedOrder.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ==================================================
  // ORDER CONFIRMATION VIEW
  // ==================================================
  if (confirmedOrder) {
    return (
      <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-[75vh] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white border-3 border-[#171717] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#171717] text-center">
          
          <div className="w-20 h-20 rounded-3xl bg-[#34D399] border-3 border-[#171717] text-white flex items-center justify-center text-4xl mx-auto mb-5 shadow-[4px_4px_0px_0px_#171717] rotate-[-2deg]">
            🎉
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-xs font-black font-heading tracking-widest uppercase text-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717] mb-3">
            <span>ORDER CONFIRMED</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2">
            Thank You, {confirmedOrder.customerName}!
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed max-w-md mx-auto mb-6">
            Your 3D print order has been received and added to our production queue. We'll slice, inspect, and dispatch it promptly.
          </p>

          {/* Order Details Receipt Box */}
          <div className="bg-[#FFF9ED] border-2.5 border-[#171717] rounded-2xl p-5 mb-6 text-left shadow-[3px_3px_0px_0px_#171717]">
            <div className="flex items-center justify-between border-b-2 border-[#171717]/10 pb-3 mb-3">
              <span className="text-xs font-black font-heading uppercase text-[#6D6D6D]">
                Order Tracking ID:
              </span>
              <button
                type="button"
                onClick={handleCopyOrderNumber}
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF8A00] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy ID'}</span>
              </button>
            </div>

            <div className="font-mono text-base font-black text-[#171717] mb-4">
              {confirmedOrder.orderNumber}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-[#525252]">
              <div>
                <span className="block text-[10px] font-black uppercase text-[#6D6D6D]">Recipient</span>
                <span className="font-bold text-[#171717]">{confirmedOrder.customerName} ({confirmedOrder.customerPhone})</span>
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase text-[#6D6D6D]">Delivery Destination</span>
                <span className="font-bold text-[#171717]">{confirmedOrder.deliveryAddress}, {confirmedOrder.city}</span>
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase text-[#6D6D6D]">Payment Method</span>
                <span className="font-bold text-[#171717]">Cash on Delivery / bKash upon Delivery</span>
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase text-[#6D6D6D]">Total Amount Payable</span>
                <span className="font-black text-sm text-[#FF8A00]">৳{confirmedOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(`/track?orderNumber=${confirmedOrder.orderNumber}&phone=${encodeURIComponent(confirmedOrder.customerPhone)}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-full px-8 py-3.5 text-xs sm:text-sm font-black font-heading uppercase tracking-wide shadow-[3px_3px_0px_0px_#171717] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <PackageCheck className="w-4 h-4" />
              <span>TRACK ORDER LIVE</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFF9ED] text-[#171717] border-2 border-[#171717] rounded-full px-6 py-3.5 text-xs font-black font-heading uppercase tracking-wide shadow-[2px_2px_0px_0px_#171717] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>CONTINUE SHOPPING</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ==================================================
  // EMPTY CART VIEW
  // ==================================================
  if (items.length === 0) {
    return (
      <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border-3 border-[#171717] rounded-3xl p-8 text-center shadow-[6px_6px_0px_0px_#171717]">
          <div className="w-20 h-20 rounded-2xl bg-[#FFF9ED] border-2.5 border-[#171717] text-4xl flex items-center justify-center mx-auto mb-5 shadow-[3px_3px_0px_0px_#171717] rotate-[-4deg]">
            🛒
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2">
            Your cart is empty.
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed mb-6">
            Looks like you haven't added any 3D prints yet. Browse our curated ready-to-order catalog or start a custom print request.
          </p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-[#171717] rounded-full px-6 py-3.5 text-xs sm:text-sm font-black font-heading uppercase tracking-wide shadow-[3px_3px_0px_0px_#171717] hover:shadow-[5px_5px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            >
              <span>EXPLORE PRODUCTS →</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/#custom')}
              className="w-full text-xs font-black font-heading uppercase text-[#171717]/70 hover:text-[#171717] py-2 cursor-pointer transition-colors"
            >
              Or Start a Custom Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] pb-16">
      
      {/* ================================================== */}
      {/* 1. CART HEADER */}
      {/* ================================================== */}
      <section className="relative w-full pt-10 pb-6 px-4 sm:px-6 lg:px-8 border-b-2 border-[#171717]/10 bg-[#FFF9ED]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FFC43C] border-2 border-[#171717] text-[10px] font-black font-heading tracking-widest uppercase text-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717] mb-2">
              <ShoppingBag className="w-3 h-3 stroke-[2.5px]" />
              <span>SHOPPING BAG & CHECKOUT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-heading uppercase text-[#171717] tracking-tight">
              Review Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3px]" />
              <span>Continue Shopping</span>
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#EF4444] hover:text-white text-[#171717] border-2 border-[#171717] text-xs font-black font-heading uppercase shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 2. CART MAIN CONTENT */}
      {/* ================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* ================================================== */}
            {/* LEFT: CART ITEMS LIST + CHECKOUT FORM (7 Cols) */}
            {/* ================================================== */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
              
              {/* Product items list */}
              <div className="flex flex-col gap-4">
                <h2 className="text-sm font-black font-heading uppercase text-[#171717] tracking-wide">
                  Order Items ({items.length})
                </h2>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-2.5 border-[#171717] rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#171717] flex flex-col sm:flex-row items-start sm:items-center gap-4 select-none"
                  >
                    {/* Thumbnail Icon */}
                    <div
                      onClick={() => navigate(`/shop/${item.product.slug}`)}
                      className={`
                        w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-[#171717] ${item.product.illustration.bgAccent}
                        flex items-center justify-center text-3xl sm:text-4xl shadow-[2px_2px_0px_0px_#171717] shrink-0 cursor-pointer hover:scale-105 transition-transform
                      `}
                    >
                      <span className="drop-shadow-xs">{item.product.illustration.emoji}</span>
                    </div>

                    {/* Info & Variants */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black font-heading uppercase text-[#6D6D6D]">
                          {item.product.category}
                        </span>
                        <span className="text-xs font-black font-heading text-[#FF8A00]">
                          ৳{item.unitPrice.toLocaleString()} each
                        </span>
                      </div>

                      <a
                        href={`/shop/${item.product.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/shop/${item.product.slug}`);
                        }}
                        className="text-base sm:text-lg font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] tracking-tight block truncate mt-0.5"
                      >
                        {item.product.name}
                      </a>

                      {/* Variant labels */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[11px] font-bold text-[#525252]">
                        {item.selectedColor && (
                          <span className="px-2 py-0.5 bg-[#FFF9ED] border border-[#171717]/20 rounded-md">
                            Color: <strong className="text-[#171717]">{item.selectedColor}</strong>
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="px-2 py-0.5 bg-[#FFF9ED] border border-[#171717]/20 rounded-md">
                            Size: <strong className="text-[#171717]">{item.selectedSize}</strong>
                          </span>
                        )}
                      </div>

                      {item.customNote && (
                        <div className="mt-1.5 text-[11px] font-bold text-[#171717] bg-[#FFC43C]/20 border border-[#FFC43C] px-2 py-1 rounded-md">
                          Note: "{item.customNote}"
                        </div>
                      )}
                    </div>

                    {/* Quantity & Item Subtotal Row */}
                    <div className="w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#171717]/10 flex items-center justify-between sm:flex-col sm:items-end gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase text-[#6D6D6D] block">
                          Total
                        </span>
                        <span className="text-base sm:text-lg font-black font-heading text-[#171717]">
                          ৳{(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onQuantityChange={(q) => updateQuantity(item.id, q)}
                          size="sm"
                        />

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="w-8 h-8 rounded-xl bg-white hover:bg-[#EF4444] hover:text-white text-[#6D6D6D] border-1.5 border-[#171717] flex items-center justify-center transition-colors cursor-pointer shadow-[1px_1px_0px_0px_#171717]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery & Customer Checkout Details */}
              <div className="bg-white border-2.5 border-[#171717] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#171717]">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-[#171717]/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#FF8A00] text-white flex items-center justify-center font-black text-xs">
                      📍
                    </div>
                    <h3 className="text-lg font-black font-heading uppercase text-[#171717] tracking-tight">
                      Delivery & Contact Details
                    </h3>
                  </div>

                  {user ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10B981]/15 text-[#065F46] border-1.5 border-[#10B981] rounded-full text-[11px] font-black uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Customer</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFC43C] hover:bg-[#FF8A00] text-[#171717] hover:text-white border-1.5 border-[#171717] rounded-full text-xs font-black transition-colors cursor-pointer shadow-[1px_1px_0px_0px_#171717]"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Sign In to Auto-Fill</span>
                    </button>
                  )}
                </div>

                {/* Logged in Customer Info Card */}
                {user && (
                  <div className="mb-5 p-3.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#171717]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FFC43C] border-2 border-[#171717] overflow-hidden flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#171717]">
                        <img
                          src={profile?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                          alt={profile?.name || 'Customer Avatar'}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-[#171717] truncate">
                            {profile?.name || 'Customer Account'}
                          </span>
                          <span className="text-[10px] font-bold bg-[#10B981] text-white px-2 py-0.5 rounded-md uppercase">
                            Auto-Applied
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#6D6D6D] truncate">
                          {profile?.email || user.email} {profile?.phone ? `• ${profile.phone}` : ''}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetToProfile}
                      title="Reset fields to your saved account details"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#EAEAEA] text-[#171717] border-1.5 border-[#171717] rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Saved</span>
                    </button>
                  </div>
                )}

                {/* Unauthenticated but cached autofill indicator */}
                {!user && autofillSource === 'recent' && (
                  <div className="mb-5 p-3 bg-[#10B981]/10 border-1.5 border-[#10B981] rounded-2xl flex items-center gap-2 text-xs font-bold text-[#065F46]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10B981]" />
                    <span>Restored from your recent order on this device. Sign in to permanently sync across all devices!</span>
                  </div>
                )}

                {error && (
                  <div className="p-3.5 mb-5 bg-[#FEE2E2] border-2 border-[#EF4444] rounded-2xl flex items-center gap-2 text-xs font-bold text-[#B91C1C]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full px-4 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. 01712345678"
                        className="w-full px-4 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                        Email Address (For Confirmation Receipt)
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g. tanvir@example.com"
                        className="w-full px-4 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                        Delivery Zone *
                      </label>
                      <select
                        value={selectedZoneId}
                        onChange={(e) => setSelectedZoneId(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-bold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                      >
                        {DELIVERY_CONFIG.zones.map((zone) => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name} (৳{zone.fee} — {zone.estimatedDays})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                      Full Street Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House, Road, Area, Thana / District (e.g. House 14, Road 5, Block C, Banani, Dhaka)"
                      className="w-full px-4 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                    />
                  </div>

                  {/* Profile Save Option */}
                  {user ? (
                    <div className="flex items-center gap-2.5 p-3 bg-[#10B981]/10 border-1.5 border-[#10B981] rounded-xl text-xs font-bold text-[#065F46]">
                      <input
                        type="checkbox"
                        id="saveToProfileCheckbox"
                        checked={saveToProfile}
                        onChange={(e) => setSaveToProfile(e.target.checked)}
                        className="w-4 h-4 rounded border-[#171717] text-[#10B981] focus:ring-[#10B981] cursor-pointer"
                      />
                      <label htmlFor="saveToProfileCheckbox" className="cursor-pointer select-none">
                        Keep this address & phone saved to my profile for 1-click checkout next time
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-[#FFF9ED] border border-[#171717]/20 rounded-xl text-xs font-medium text-[#6D6D6D]">
                      <Sparkles className="w-4 h-4 text-[#FF8A00] shrink-0" />
                      <span>Contact and shipping details are remembered on this device for your next visit.</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-black font-heading uppercase text-[#171717] mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Leave with security, call before arrival..."
                      className="w-full px-4 py-2.5 bg-[#FFF9ED] border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-semibold text-[#171717] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* ================================================== */}
            {/* RIGHT: ORDER SUMMARY (4 Cols) */}
            {/* ================================================== */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717]">
                <h2 className="text-lg font-black font-heading uppercase text-[#171717] tracking-tight mb-4 pb-3 border-b-2 border-[#171717]/10 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs text-[#FF8A00] font-black font-heading">
                    {totalItems} items
                  </span>
                </h2>

                <div className="space-y-3 text-xs sm:text-sm font-semibold text-[#525252] mb-5">
                  <div className="flex justify-between items-center">
                    <span>Items Subtotal</span>
                    <span className="font-black font-heading text-[#171717] text-base">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#FF8A00]" />
                      <span>{currentZone.name}</span>
                    </span>
                    <span className="font-bold text-[#171717]">
                      ৳{deliveryFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span>Eco-Packaging & Quality Check</span>
                    <span className="text-[#10B981] font-black">FREE</span>
                  </div>
                </div>

                {/* Total Row */}
                <div className="pt-4 border-t-2 border-[#171717] flex justify-between items-baseline mb-6">
                  <div>
                    <span className="text-xs font-black font-heading uppercase text-[#6D6D6D] block">
                      Total Payable
                    </span>
                    <span className="text-3xl font-black font-heading text-[#171717] tracking-tight">
                      ৳{grandTotal.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#10B981] bg-[#ECFDF5] border border-[#10B981] px-2 py-0.5 rounded-md">
                    Cash on Delivery
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white disabled:opacity-50 text-[#171717] border-2.5 border-[#171717] font-black font-heading text-xs sm:text-sm uppercase tracking-wider text-center shadow-[4px_4px_0px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 stroke-[3px]" />
                    <span>{isSubmitting ? 'Placing Order...' : 'PLACE ORDER (CASH ON DELIVERY)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/shop')}
                    className="w-full py-3 rounded-2xl bg-white hover:bg-[#FFF9ED] text-[#171717] border-2 border-[#171717] font-black font-heading text-xs uppercase tracking-wider text-center shadow-[2px_2px_0px_0px_#171717] transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Guarantees */}
                <div className="mt-5 pt-4 border-t border-[#171717]/10 flex flex-col gap-2 text-[10px] font-bold text-[#6D6D6D]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    100% Quality & Dimension Guaranteed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#FF8A00]" />
                    Estimated Delivery: {currentZone.estimatedDays}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}
