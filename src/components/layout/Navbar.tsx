import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Gem,
  Heart,
  Truck,
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  LogIn,
  Home,
  Wrench,
  Cpu,
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
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRouter } from '../../context/RouterContext';
import { useCustomerAuth } from '../../context/CustomerAuthContext';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  activeSection?: string;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection = 'shop',
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { navigate } = useRouter();
  const { user, profile, signOut } = useCustomerAuth();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const shopDropdownRef = useRef<HTMLDivElement>(null);

  const displayCartCount = cartCount !== undefined ? cartCount : totalItems;

  // Smooth scroll elevation detection without height shifts
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showMainNav = true;

  const categoryItems = [
    { label: 'Home & Living', slug: 'home-living', href: '/shop/category/home-living', icon: Home, desc: 'Decor, kitchen, pots & organization' },
    { label: 'Gadgets & Electronics', slug: 'gadgets-electronics', href: '/shop/category/gadgets-electronics', icon: Cpu, desc: 'Enclosures, mounts & desk setups' },
    { label: 'Mechanical & Engineering', slug: 'mechanical-engineering', href: '/shop/category/mechanical-engineering', icon: Wrench, desc: 'Gears, brackets, jigs & functional parts' },
    { label: 'Automotive', slug: 'automotive', href: '/shop/category/automotive', icon: Car, desc: 'Custom pods, clips & interior trims' },
    { label: 'Medical & Dental (Non-Clinical)', slug: 'medical-dental', href: '/shop/category/medical-dental', icon: Activity, desc: 'Bone replicas & study guides' },
    { label: 'Robotics & Drones', slug: 'robotics-drones', href: '/shop/category/robotics-drones', icon: Bot, desc: 'TPU mounts, chassis & grippers' },
    { label: 'Toys & Games', slug: 'toys-games', href: '/shop/category/toys-games', icon: Gamepad2, desc: 'Articulated figures & board game inserts' },
    { label: 'Art, Sculpture & Collectibles', slug: 'art-collectibles', href: '/shop/category/art-collectibles', icon: Palette, desc: 'Busts, plaques & statues' },
    { label: 'Jewelry & Fashion', slug: 'jewelry-fashion', href: '/shop/category/jewelry-fashion', icon: Gem, desc: 'Castable wax masters & pendants' },
    { label: 'Architecture & Models', slug: 'architecture-models', href: '/shop/category/architecture-models', icon: Building2, desc: 'Scale massing models & facades' },
    { label: 'Education', slug: 'education-stem', href: '/education', icon: GraduationCap, desc: 'Classroom teaching aids, anatomy & lab models', badge: 'CATALOG' },
    { label: 'Business & Industrial', slug: 'business-industrial', href: '/shop/category/business-industrial', icon: Briefcase, desc: 'POS docks, branded stands & MVP housings' },
    { label: 'Custom Manufacturing', slug: 'custom-manufacturing', href: '/shop/category/custom-manufacturing', icon: Layers, desc: 'Direct CAD & STL commission service', badge: 'CUSTOM' },
  ];

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setShopMenuOpen(false);
    setAccountDropdownOpen(false);

    if (onNavigate) {
      if (href === '/') onNavigate('hero');
      else if (href === '/shop') onNavigate('shop');
      else if (href === '/education') onNavigate('education');
      else if (href.startsWith('/shop/category/')) onNavigate(href);
      else if (href === '/custom-print' || href === '/custom') onNavigate('custom-print');
      else if (href === '/creations' || href === '/community') onNavigate('creations');
      else if (href === '/materials') onNavigate('custom-print');
      else if (href === '/about') onNavigate('about');
      else if (href === '/industries') onNavigate('industries');
      else if (href === '/track') onNavigate('track');
      else navigate(href);
    } else {
      navigate(href);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(e.target as Node)) {
        setShopMenuOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(e.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setShopMenuOpen(false);
        setAccountDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus search input
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF9ED]">
      
      {/* UNIFIED DUAL-TIER NAVBAR CONTAINER */}
      <div
        className={`w-full bg-[#FFF9ED] relative z-40 border-b-3 border-[#171717] transition-shadow duration-200 ${
          isScrolled ? 'shadow-[0_4px_0_0_#171717]' : 'shadow-[0_2px_0_0_#171717]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* LEFT: STANDALONE PROMINENT BRAND LOGO (Centered in the middle across the 2 lines) */}
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="flex items-center group select-none shrink-0 py-1.5 lg:py-2"
            aria-label="ARISTROCRAFT Home"
          >
            <img
              src="/brand/logo.png"
              alt="AristroCraft"
              className="h-13 sm:h-15 md:h-17 lg:h-20 xl:h-[84px] w-auto max-w-[170px] sm:max-w-[210px] md:max-w-[260px] object-contain shrink-0 group-hover:scale-105 transition-transform duration-200 drop-shadow-xs"
            />
          </a>

          {/* RIGHT: THE 2 LINES (Rows) */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            
            {/* LINE 1 — UTILITY BAR (Secondary, Slim & Compact) */}
            <div className="hidden lg:flex items-center justify-end py-1.5 border-b border-[#171717]/15 text-xs">
              <div className="flex items-center gap-1 sm:gap-1.5">
                
                {/* 1. SEARCH TRIGGER */}
                <div className="relative" ref={searchContainerRef}>
                  <button
                    type="button"
                    aria-label="Search Catalog"
                    onClick={() => {
                      setSearchOpen(!searchOpen);
                      setAccountDropdownOpen(false);
                    }}
                    className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-black font-heading uppercase tracking-wider text-[#171717]/80 hover:text-[#171717] hover:bg-[#FFC43C]/20 transition-all cursor-pointer
                      ${searchOpen ? 'bg-[#FFC43C]/40 text-[#171717]' : ''}
                    `}
                  >
                    <Search className="w-3.5 h-3.5 stroke-[2.5px] text-[#FF8A00]" />
                    <span>Search</span>
                  </button>

                  {/* SEARCH DROPDOWN */}
                  {searchOpen && (
                    <div className="absolute right-0 top-8 w-72 sm:w-80 bg-[#FFF9ED] border-2.5 border-[#171717] rounded-2xl p-3 shadow-[5px_5px_0px_0px_#171717] z-50 animate-popIn">
                      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search models, categories, parts..."
                          className="w-full bg-white border-2 border-[#171717] rounded-xl px-3 py-1.5 text-xs font-bold text-[#171717] placeholder:text-[#8C8C8C] outline-none focus:border-[#FF8A00]"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2 border-[#171717] rounded-xl font-black font-heading text-xs shadow-[2px_2px_0px_0px_#171717] cursor-pointer shrink-0"
                        >
                          Go
                        </button>
                      </form>
                    </div>
                  )}
                </div>

                <span className="h-3.5 w-px bg-[#171717]/20 mx-0.5" aria-hidden="true" />

                {/* 2. TRACK ORDER */}
                <a
                  href="/track"
                  onClick={(e) => handleNavClick('/track', e)}
                  aria-label="Track Order"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-black font-heading uppercase tracking-wider text-[#171717]/80 hover:text-[#171717] hover:bg-[#FFC43C]/20 transition-all cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 stroke-[2.5px] text-[#FF8A00]" />
                  <span>Track Order</span>
                </a>

                <span className="h-3.5 w-px bg-[#171717]/20 mx-0.5" aria-hidden="true" />

                {/* 3. CART */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setAccountDropdownOpen(false);
                    setSearchOpen(false);
                    if (onOpenCart) onOpenCart();
                    else handleNavClick('/cart', e);
                  }}
                  aria-label="Shopping Cart"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-black font-heading uppercase tracking-wider text-[#171717]/80 hover:text-[#171717] hover:bg-[#FFC43C]/20 transition-all cursor-pointer relative"
                >
                  <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5px] text-[#FF8A00]" />
                  <span>Cart</span>
                  {displayCartCount > 0 && (
                    <span className="min-w-4 h-4 px-1 rounded-full bg-[#FF8A00] text-white text-[9px] font-black font-heading flex items-center justify-center border border-[#171717]">
                      {displayCartCount}
                    </span>
                  )}
                </button>

                <span className="h-3.5 w-px bg-[#171717]/20 mx-0.5" aria-hidden="true" />

                {/* 4. ACCOUNT / LOGIN (RIGHTMOST ITEM) */}
                {user ? (
                  <div className="relative" ref={accountDropdownRef}>
                    <button
                      type="button"
                      aria-label="Customer Account Menu"
                      onClick={() => {
                        setAccountDropdownOpen(!accountDropdownOpen);
                        setSearchOpen(false);
                      }}
                      className={`
                        inline-flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full text-[11px] font-black font-heading uppercase tracking-wider text-[#171717] border-2 border-[#171717] bg-white shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFC43C]/20 transition-all cursor-pointer
                        ${accountDropdownOpen ? 'bg-[#FFC43C]/40 border-[#171717]' : ''}
                      `}
                    >
                      {/* Round shape account logo/icon png */}
                      <div className="w-5 h-5 rounded-full border border-[#171717] overflow-hidden bg-[#FFC43C] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#171717]">
                        <img
                          src={profile?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                          alt={profile?.name || 'Account Logo'}
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span>Account</span>
                      <ChevronDown className={`w-3 h-3 stroke-[2.5px] text-[#171717] transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* ACCOUNT DROPDOWN MENU */}
                    {accountDropdownOpen && (
                      <div className="absolute right-0 top-8 w-60 bg-[#FFF9ED] border-2.5 border-[#171717] rounded-2xl p-2.5 shadow-[5px_5px_0px_0px_#171717] z-50 animate-popIn">
                        <div className="px-3 py-2 border-b-2 border-[#171717]/10 mb-1 flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full border-2 border-[#171717] overflow-hidden bg-[#FFC43C] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#171717]">
                            <img
                              src={profile?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                              alt={profile?.name || 'Account'}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-black font-heading uppercase text-[#FF8A00] tracking-wider">
                              MY ACCOUNT
                            </p>
                            <p className="text-xs font-black font-heading text-[#171717] truncate">
                              {profile?.name || user.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-0.5 text-xs font-black font-heading">
                          <a
                            href="/account/profile"
                            onClick={(e) => {
                              setAccountDropdownOpen(false);
                              handleNavClick('/account/profile', e);
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#171717] hover:bg-[#FFC43C]/30 hover:text-[#171717] transition-colors"
                          >
                            <User className="w-3.5 h-3.5 stroke-[2.5px] text-[#FF8A00]" />
                            <span>Profile</span>
                          </a>

                          <a
                            href="/account/orders"
                            onClick={(e) => {
                              setAccountDropdownOpen(false);
                              handleNavClick('/account/orders', e);
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#171717] hover:bg-[#FFC43C]/30 hover:text-[#171717] transition-colors"
                          >
                            <Package className="w-3.5 h-3.5 stroke-[2.5px] text-[#FF8A00]" />
                            <span>My Orders</span>
                          </a>

                          <a
                            href="/wishlist"
                            onClick={(e) => {
                              setAccountDropdownOpen(false);
                              handleNavClick('/wishlist', e);
                            }}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-[#171717] hover:bg-[#FFC43C]/30 hover:text-[#171717] transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Heart className="w-3.5 h-3.5 stroke-[2.5px] text-[#FF4D4D]" />
                              <span>Wishlist</span>
                            </div>
                            {totalWishlistItems > 0 && (
                              <span className="px-1.5 py-0.2 rounded-full bg-[#FF4D4D] text-white text-[9px] font-black border border-[#171717]">
                                {totalWishlistItems}
                              </span>
                            )}
                          </a>

                          <a
                            href="/account/profile"
                            onClick={(e) => {
                              setAccountDropdownOpen(false);
                              handleNavClick('/account/profile', e);
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#171717] hover:bg-[#FFC43C]/30 hover:text-[#171717] transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5 stroke-[2.5px] text-[#FF8A00]" />
                            <span>Addresses</span>
                          </a>

                          <a
                            href="/account/settings"
                            onClick={(e) => {
                              setAccountDropdownOpen(false);
                              handleNavClick('/account/settings', e);
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#171717] hover:bg-[#FFC43C]/30 hover:text-[#171717] transition-colors"
                          >
                            <Settings className="w-3.5 h-3.5 stroke-[2.5px] text-[#FF8A00]" />
                            <span>Account Settings</span>
                          </a>
                        </div>

                        <div className="border-t-2 border-[#171717]/10 mt-1 pt-1">
                          <button
                            type="button"
                            onClick={async () => {
                              setAccountDropdownOpen(false);
                              await signOut();
                              navigate('/');
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#FF4D4D] hover:bg-[#FF4D4D]/10 text-xs font-black font-heading transition-colors cursor-pointer text-left"
                          >
                            <LogOut className="w-3.5 h-3.5 stroke-[2.5px]" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href="/login"
                    onClick={(e) => {
                      setSearchOpen(false);
                      handleNavClick('/login', e);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black font-heading uppercase tracking-wider bg-[#FFC43C] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FF8A00] hover:text-white hover:shadow-[3px_3px_0px_0px_#171717] transition-all cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 stroke-[2.5px]" />
                    <span>Login</span>
                  </a>
                )}

              </div>
            </div>

            {/* LINE 2 — PRIMARY NAVIGATION & CONTROLS */}
            <div className="flex items-center justify-end h-[56px] sm:h-[62px] lg:h-[60px] gap-4 sm:gap-6">
              
              {/* PRIMARY WEBSITE NAVIGATION LINKS (Desktop) */}
              <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-4 xl:gap-6">
                
                {/* 0. HOME */}
                <a
                  href="/"
                  onClick={(e) => handleNavClick('/', e)}
                  className={`py-2 text-sm font-black font-heading tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                    activeSection === 'hero' || activeSection === 'home' || !activeSection
                      ? 'text-[#FF8A00]'
                      : 'text-[#171717] hover:text-[#FF8A00]'
                  }`}
                >
                  <Home className="w-4 h-4 stroke-[2.5px]" />
                  <span>HOME</span>
                </a>

                {/* 1. SHOP MEGA-MENU DROPDOWN */}
                <div
                  className="relative"
                  ref={shopDropdownRef}
                  onMouseEnter={() => setShopMenuOpen(true)}
                  onMouseLeave={() => setShopMenuOpen(false)}
                >
            <a
              href="/shop"
              onClick={(e) => {
                handleNavClick('/shop', e);
                setShopMenuOpen(false);
              }}
              className={`py-2 text-sm font-black font-heading tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'shop'
                  ? 'text-[#FF8A00]'
                  : 'text-[#171717] hover:text-[#FF8A00]'
              }`}
            >
              <span>PRODUCTS</span>
              <button
                type="button"
                aria-label="Toggle shop categories dropdown"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShopMenuOpen(!shopMenuOpen);
                }}
                className="p-0.5 text-inherit cursor-pointer hover:scale-110 transition-transform"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${shopMenuOpen ? 'rotate-180 text-[#FF8A00]' : ''}`} />
              </button>
            </a>

            {/* MEGA-MENU DROPDOWN */}
            {shopMenuOpen && (
              <div
                className="absolute top-10 left-0 w-[680px] bg-white border-3 border-[#171717] rounded-2xl p-5 shadow-[8px_8px_0px_0px_#171717] z-50 animate-popIn"
              >
                <div className="pb-3 mb-2 border-b-2 border-[#171717]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black font-heading uppercase text-[#FF8A00] tracking-wider">
                      DISCOVER MANUFACTURING DISCIPLINES ({categoryItems.length})
                    </span>
                  </div>
                  <a
                    href="/shop"
                    onClick={(e) => handleNavClick('/shop', e)}
                    className="text-[11px] font-black font-heading uppercase text-[#171717] hover:text-[#FF8A00] flex items-center gap-1"
                  >
                    <span>VIEW COMPLETE SHOWROOM</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF8A00]" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-1">
                  {categoryItems.map((cat) => {
                    const IconComp = cat.icon;
                    return (
                      <a
                        key={cat.slug}
                        href={cat.href}
                        onClick={(e) => handleNavClick(cat.href, e)}
                        className="p-2.5 rounded-xl border-2 border-transparent hover:border-[#171717] hover:bg-[#FFF9ED] transition-all flex items-start gap-3 group/cat"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#FFC43C] border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717] shrink-0 group-hover/cat:scale-105 transition-transform">
                          <IconComp className="w-4 h-4 stroke-[2.5px]" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black font-heading uppercase text-[#171717] group-hover/cat:text-[#FF8A00] transition-colors truncate">
                              {cat.label}
                            </span>
                            {cat.badge && (
                              <span className="px-1.5 py-0.2 rounded-full bg-[#FF8A00] text-white text-[8px] font-black font-heading border border-[#171717] shrink-0">
                                {cat.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-semibold text-[#6D6D6D] line-clamp-1">
                            {cat.desc}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t-2 border-[#171717]/10 flex items-center justify-between bg-[#FFF9ED] -mx-5 -mb-5 p-3.5 rounded-b-xl border-t border-[#171717]">
                  <span className="text-xs font-bold text-[#171717]">
                    Have a unique CAD / STL design not in catalog?
                  </span>
                  <a
                    href="/custom-print"
                    onClick={(e) => handleNavClick('/custom-print', e)}
                    className="px-3.5 py-1.5 bg-[#FF8A00] hover:bg-[#FF9B26] border-2 border-[#171717] rounded-lg text-xs font-black font-heading uppercase text-white shadow-[2px_2px_0px_0px_#171717] flex items-center gap-1"
                  >
                    <span>Instant Custom Slicing</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 2. INDUSTRIES */}
          <a
            href="/industries"
            onClick={(e) => handleNavClick('/industries', e)}
            className={`py-2 text-sm font-black font-heading tracking-wider uppercase transition-colors ${
              activeSection === 'industries'
                ? 'text-[#FF8A00]'
                : 'text-[#171717] hover:text-[#FF8A00]'
            }`}
          >
            INDUSTRIES
          </a>

          {/* 3. EDUCATION */}
          <a
            href="/education"
            onClick={(e) => handleNavClick('/education', e)}
            className={`py-2 text-sm font-black font-heading tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 ${
              activeSection === 'education'
                ? 'text-[#FF8A00]'
                : 'text-[#171717] hover:text-[#FF8A00]'
            }`}
          >
            <span>EDUCATION</span>
          </a>

          {/* 4. CREATIONS & COMMUNITY */}
          <a
            href="/creations"
            onClick={(e) => handleNavClick('/creations', e)}
            className={`py-2 text-sm font-black font-heading tracking-wider uppercase transition-colors ${
              activeSection === 'creations' || activeSection === 'community'
                ? 'text-[#FF8A00]'
                : 'text-[#171717] hover:text-[#FF8A00]'
            }`}
          >
            CREATIONS & COMMUNITY
          </a>

          {/* 7. ABOUT */}
          <a
            href="/about"
            onClick={(e) => handleNavClick('/about', e)}
            className={`py-2 text-sm font-black font-heading tracking-wider uppercase transition-colors ${
              activeSection === 'about'
                ? 'text-[#FF8A00]'
                : 'text-[#171717] hover:text-[#FF8A00]'
            }`}
          >
            ABOUT
          </a>

        </nav>

        {/* RIGHT: DEDICATED PROMINENT CUSTOM ORDER CTA (Desktop) & COMPACT CONTROLS (Mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* DESKTOP PRIMARY CTA: CUSTOM ORDER */}
          <a
            href="/custom-print"
            onClick={(e) => handleNavClick('/custom-print', e)}
            className="hidden lg:inline-flex items-center justify-center gap-2 bg-[#FFC43C] text-[#171717] hover:bg-[#FF8A00] hover:text-white border-2.5 border-[#171717] rounded-full px-5 sm:px-6 py-2.5 text-xs font-black font-heading uppercase tracking-wider shadow-[3px_3px_0px_0px_#171717] hover:shadow-[5px_5px_0px_0px_#171717] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none"
          >
            <span>CUSTOM ORDER</span>
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </a>

          {/* MOBILE QUICK SEARCH BUTTON */}
          <button
            type="button"
            aria-label="Search Catalog"
            onClick={() => setSearchOpen(!searchOpen)}
            className={`
              lg:hidden w-9 h-9 rounded-full bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717]
              flex items-center justify-center text-[#171717] transition-all cursor-pointer
              hover:bg-[#FFC43C] active:translate-y-0.5
              ${searchOpen ? 'bg-[#FFC43C]' : ''}
            `}
          >
            <Search className="w-4 h-4 stroke-[2.5px]" />
          </button>

          {/* MOBILE CART BUTTON */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenCart) onOpenCart();
              else handleNavClick('/cart', e);
            }}
            aria-label="Shopping Cart"
            className="lg:hidden relative w-9 h-9 rounded-full bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center text-[#171717] transition-all cursor-pointer hover:bg-[#FFC43C]"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5px]" />
            {displayCartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-[#FF8A00] text-white border-1.5 border-[#171717] rounded-full text-[9px] font-black font-heading flex items-center justify-center px-1">
                {displayCartCount}
              </span>
            )}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center text-[#171717] transition-all cursor-pointer hover:bg-[#FFC43C]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[3px]" /> : <Menu className="w-5 h-5 stroke-[3px]" />}
          </button>
        </div>

      </div>
    </div>
  </div>

      {/* MOBILE FLOATING SEARCH OVERLAY (When triggered on mobile) */}
      {searchOpen && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-[#171717]/10 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, models, categories..."
              className="w-full bg-white border-2 border-[#171717] rounded-xl px-3.5 py-2 text-xs font-bold text-[#171717] placeholder:text-[#8C8C8C] outline-none focus:border-[#FF8A00] shadow-[2px_2px_0px_0px_#171717]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2 border-[#171717] rounded-xl font-black font-heading text-xs shadow-[2px_2px_0px_0px_#171717] cursor-pointer shrink-0"
            >
              Go
            </button>
          </form>
        </div>
      )}
      </div>

      {/* ================================================== */}
      {/* MOBILE DRAWER MENU */}
      {/* ================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] sm:top-[72px] z-50 lg:hidden flex flex-col bg-[#171717]/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative z-10 w-full bg-[#FFF9ED] border-b-4 border-[#171717] p-5 sm:p-6 max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-72px)] overflow-y-auto flex flex-col gap-3 shadow-[0_12px_0_0_#171717]">
            
            {/* 0. HOME LINK */}
            <a
              href="/"
              onClick={(e) => {
                handleNavClick('/', e);
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[48px] px-4 py-3 bg-white border-2 border-[#171717] rounded-xl text-xs sm:text-sm font-black font-heading uppercase text-[#171717] flex items-center gap-2 hover:bg-[#FFC43C] transition-colors shadow-[2px_2px_0px_0px_#171717]"
            >
              <Home className="w-4 h-4 stroke-[2.5px] text-[#FF8A00]" />
              <span>HOME</span>
            </a>

            {/* 1. SHOP LINK & ACCORDION */}
            <div className="border-2 border-[#171717] rounded-xl bg-white overflow-hidden shadow-[2px_2px_0px_0px_#171717]">
              <div className="w-full flex items-center justify-between bg-[#FFC43C] border-b-2 border-[#171717]">
                <a
                  href="/shop"
                  onClick={(e) => {
                    handleNavClick('/shop', e);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 min-h-[48px] px-4 py-3 text-xs sm:text-sm font-black font-heading uppercase text-[#171717] flex items-center justify-between hover:bg-[#FF8A00] hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 stroke-[2.5px]" />
                    <span>PRODUCTS</span>
                  </span>
                  <span className="text-[10px] font-bold tracking-normal opacity-80 underline">All Products →</span>
                </a>
                <button
                  type="button"
                  aria-label="Toggle categories list"
                  onClick={() => setMobileShopOpen(!mobileShopOpen)}
                  className="px-3 min-h-[48px] border-l-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FF8A00] hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileShopOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {mobileShopOpen && (
                <div className="p-2.5 bg-[#FFF9ED] flex flex-col gap-2 animate-fadeIn">
                  <a
                    href="/shop"
                    onClick={(e) => {
                      handleNavClick('/shop', e);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full min-h-[40px] px-3 py-2 bg-[#FF8A00] text-white border-2 border-[#171717] rounded-lg text-xs font-black font-heading uppercase shadow-[1.5px_1.5px_0px_0px_#171717] flex items-center justify-center gap-1.5 hover:bg-[#FF9B26] transition-colors"
                  >
                    <span>VIEW COMPLETE CATALOG</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryItems.map((cat) => (
                      <a
                        key={cat.slug}
                        href={cat.href}
                        onClick={(e) => handleNavClick(cat.href, e)}
                        className="min-h-[48px] p-2.5 bg-white border-2 border-[#171717] rounded-lg text-[11px] font-black font-heading uppercase text-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717] hover:bg-[#FFC43C] flex items-center justify-center text-center"
                      >
                        {cat.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. MAIN NAV LINKS */}
            <div className="flex flex-col gap-2 mt-0.5">
              <a
                href="/industries"
                onClick={(e) => handleNavClick('/industries', e)}
                className="w-full min-h-[48px] py-3 bg-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wider flex items-center justify-center text-center shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFF9ED]"
              >
                INDUSTRIES
              </a>

              <a
                href="/education"
                onClick={(e) => handleNavClick('/education', e)}
                className="w-full min-h-[48px] py-3 bg-[#FFC43C] text-[#171717] border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wider flex items-center justify-center text-center shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FF8A00] hover:text-white transition-colors"
              >
                EDUCATION
              </a>

              <a
                href="/creations"
                onClick={(e) => handleNavClick('/creations', e)}
                className="w-full min-h-[48px] py-3 bg-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wider flex items-center justify-center text-center shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFF9ED]"
              >
                CREATIONS & COMMUNITY
              </a>

              <a
                href="/about"
                onClick={(e) => handleNavClick('/about', e)}
                className="w-full min-h-[48px] py-3 bg-white border-2 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wider flex items-center justify-center text-center shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFF9ED]"
              >
                ABOUT
              </a>
            </div>

            {/* DEDICATED MOBILE CUSTOM ORDER CTA */}
            <div className="pt-1">
              <a
                href="/custom-print"
                onClick={(e) => handleNavClick('/custom-print', e)}
                className="w-full min-h-[48px] py-3.5 bg-[#FF8A00] hover:bg-[#FF9B26] text-white border-2.5 border-[#171717] rounded-xl font-black font-heading text-xs uppercase tracking-wider flex items-center justify-center text-center shadow-[3px_3px_0px_0px_#171717] gap-2 transition-all cursor-pointer"
              >
                <span>CUSTOM ORDER</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </a>
            </div>

            {/* 3. SUPPORT & COMMERCE LINKS */}
            <div className="grid grid-cols-2 gap-2 pt-2.5 border-t-2 border-[#171717]/10">
              <a
                href="/track"
                onClick={(e) => handleNavClick('/track', e)}
                className="min-h-[48px] py-2.5 flex items-center justify-center text-center text-[11px] font-black font-heading uppercase bg-white border-2 border-[#171717] rounded-lg shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFF9ED]"
              >
                Track Order
              </a>
              <a
                href="/wishlist"
                onClick={(e) => handleNavClick('/wishlist', e)}
                className="min-h-[48px] py-2.5 flex items-center justify-center text-center text-[11px] font-black font-heading uppercase bg-white border-2 border-[#171717] rounded-lg shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFF9ED]"
              >
                Wishlist {totalWishlistItems > 0 && `(${totalWishlistItems})`}
              </a>
              {user ? (
                <a
                  href="/account"
                  onClick={(e) => handleNavClick('/account', e)}
                  className="min-h-[48px] py-2.5 px-2 flex items-center justify-center gap-1.5 text-center text-[11px] font-black font-heading uppercase bg-white border-2 border-[#171717] rounded-lg shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFF9ED]"
                >
                  <div className="w-5 h-5 rounded-full border border-[#171717] overflow-hidden bg-[#FFC43C] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#171717]">
                    <img
                      src={profile?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                      alt={profile?.name || 'Account'}
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span>Account</span>
                </a>
              ) : (
                <a
                  href="/login"
                  onClick={(e) => handleNavClick('/login', e)}
                  className="min-h-[48px] py-2.5 px-2 flex items-center justify-center gap-1.5 text-center text-[11px] font-black font-heading uppercase bg-[#FFC43C] text-[#171717] border-2 border-[#171717] rounded-lg shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FF8A00] hover:text-white"
                >
                  <LogIn className="w-3.5 h-3.5 stroke-[2.5px]" />
                  <span>Login</span>
                </a>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenCart) onOpenCart();
                  else handleNavClick('/cart', e);
                }}
                className="min-h-[48px] py-2.5 flex items-center justify-center text-center text-[11px] font-black font-heading uppercase bg-white border-2 border-[#171717] rounded-lg shadow-[2px_2px_0px_0px_#171717] hover:bg-[#FFF9ED] cursor-pointer"
              >
                Cart {displayCartCount > 0 && `(${displayCartCount})`}
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

