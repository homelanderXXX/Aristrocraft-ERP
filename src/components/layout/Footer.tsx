import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Instagram,
  Facebook,
  Share2,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
  HelpCircle,
  X,
  Layers,
  CheckCircle2,
  Mail,
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

type ModalType = 'privacy' | 'terms' | 'refund' | 'track' | null;

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackStatus, setTrackStatus] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleNavClick = (sectionId: string, e?: React.MouseEvent) => {
    if (onNavigate) {
      e?.preventDefault();
      onNavigate(sectionId);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) {
        e?.preventDefault();
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCustomOrderClick = (e?: React.MouseEvent) => {
    handleNavClick('custom', e);
  };

  const handleNewsletterClick = (e: React.MouseEvent) => {
    handleNavClick('newsletter', e);
  };

  // Keyboard accessibility for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        setActiveModal(null);
      }
    };

    if (activeModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackOrderId.trim()) return;
    setTrackStatus(`Searching queue status for order #${trackOrderId.trim().toUpperCase()}... Our studio will confirm current print stage via WhatsApp or email.`);
  };

  return (
    <footer
      id="footer"
      aria-labelledby="footer-brand-heading"
      className="relative w-full bg-[#171717] text-white overflow-hidden border-t-4 border-[#171717]"
    >
      {/* ================================================== */}
      {/* BACKGROUND DECORATIVE ACCENTS (aria-hidden) */}
      {/* ================================================== */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle dot matrix */}
        <div className="absolute top-10 left-10 w-48 h-48 opacity-5 bg-[radial-gradient(#FFFFFF_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
        <div className="absolute bottom-16 right-10 w-56 h-56 opacity-5 bg-[radial-gradient(#FF8A00_2px,transparent_2px)] [background-size:16px_16px]" />

        {/* 3D Print Layer Line Accents */}
        <div className="absolute top-0 right-1/4 w-32 h-64 opacity-5 bg-[repeating-linear-gradient(0deg,#FF8A00,#FF8A00_2px,transparent_2px,transparent_8px)]" />
        <div className="absolute bottom-0 left-1/3 w-32 h-64 opacity-5 bg-[repeating-linear-gradient(0deg,#FFFFFF,#FFFFFF_2px,transparent_2px,transparent_8px)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* ================================================== */}
        {/* TOP ROW: BRAND BLOCK + 3 NAV COLUMNS */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 mb-14">
          
          {/* 1. Brand Area (3 Columns on Desktop) */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col items-start text-left">
            {/* Standalone Brand Logo (Name already integrated into the logo mark) */}
            <a
              href="/"
              onClick={(e) => handleNavClick('hero', e)}
              className="inline-flex flex-col items-start group select-none mb-4"
              aria-label="ARISTROCRAFT Home"
            >
              <img
                src="/brand/footer-logo.png"
                alt="AristroCraft"
                className="h-14 sm:h-16 md:h-18 w-auto max-w-[200px] sm:max-w-[240px] object-contain shrink-0 group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#FFC43C] mt-2">
                Thoughtfully designed. Precisely printed.
              </span>
            </a>

            {/* Supporting Brand Statement */}
            <p className="text-xs sm:text-sm font-semibold text-[#A3A3A3] leading-relaxed max-w-sm mb-5">
              Custom 3D printed creations made for your space, your passion, and your ideas. Additive manufacturing studio based in Bangladesh.
            </p>

            {/* Newsletter Mini Connection */}
            <div className="p-3.5 rounded-2xl bg-[#262626] border-2 border-[#333333] flex flex-col gap-1 w-full max-w-sm shadow-[3px_3px_0px_0px_#000000]">
              <span className="text-[11px] font-bold text-[#E5E5E5]">
                Stay connected with new prints & ideas.
              </span>
              <a
                href="#newsletter"
                onClick={handleNewsletterClick}
                className="inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase text-[#FF8A00] hover:text-[#FFC43C] transition-colors group cursor-pointer"
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3px] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* 2. Column 01: EXPLORE (2 Columns on Desktop) */}
          <div className="md:col-span-1 lg:col-span-2">
            <h4 className="text-xs font-black font-heading tracking-widest uppercase text-[#FFC43C] mb-4 flex items-center gap-1.5">
              <span>EXPLORE</span>
            </h4>
            <nav aria-label="Explore Navigation">
              <ul className="flex flex-col gap-2.5 text-xs font-bold text-[#D4D4D4]">
                <li>
                  <a href="/shop" onClick={(e) => handleNavClick('/shop', e)} className="hover:text-[#FF8A00] transition-colors">Shop All</a>
                </li>
                <li>
                  <a href="/shop?filter=new" onClick={(e) => handleNavClick('/shop?filter=new', e)} className="hover:text-[#FF8A00] transition-colors">New Arrivals</a>
                </li>
                <li>
                  <a href="/shop?filter=bestsellers" onClick={(e) => handleNavClick('/shop?filter=bestsellers', e)} className="hover:text-[#FF8A00] transition-colors">Best Sellers</a>
                </li>
                <li>
                  <a href="/creations" onClick={(e) => handleNavClick('/creations', e)} className="hover:text-[#FF8A00] transition-colors">Creations & Community</a>
                </li>
                <li>
                  <a href="/custom-print" onClick={(e) => handleNavClick('/custom-print', e)} className="hover:text-[#FF8A00] transition-colors">Custom Order</a>
                </li>
                <li>
                  <a href="/industries" onClick={(e) => handleNavClick('/industries', e)} className="hover:text-[#FF8A00] transition-colors">Industries We Serve</a>
                </li>
                <li>
                  <a href="/education" onClick={(e) => handleNavClick('/education', e)} className="hover:text-[#FF8A00] transition-colors">Education Division</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* 3. Column 02: HELP & SUPPORT (2 Columns on Desktop) */}
          <div className="md:col-span-1 lg:col-span-2">
            <h4 className="text-xs font-black font-heading tracking-widest uppercase text-[#FFC43C] mb-4 flex items-center gap-1.5">
              <span>HELP & SUPPORT</span>
            </h4>
            <nav aria-label="Help Navigation">
              <ul className="flex flex-col gap-2.5 text-xs font-bold text-[#D4D4D4]">
                <li>
                  <a href="/track" onClick={(e) => handleNavClick('/track', e)} className="hover:text-[#FF8A00] transition-colors">Track Order</a>
                </li>
                <li>
                  <a href="/faq" onClick={(e) => handleNavClick('/faq', e)} className="hover:text-[#FF8A00] transition-colors">FAQ & Support</a>
                </li>
                <li>
                  <a href="/shipping" onClick={(e) => handleNavClick('/shipping', e)} className="hover:text-[#FF8A00] transition-colors">Shipping Policy</a>
                </li>
                <li>
                  <a href="/how-it-works" onClick={(e) => handleNavClick('/how-it-works', e)} className="hover:text-[#FF8A00] transition-colors">How It Works</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* 4. Column 03: COMPANY & ACCOUNT (2 Columns on Desktop) */}
          <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-6">
            <div>
              <h4 className="text-xs font-black font-heading tracking-widest uppercase text-[#FFC43C] mb-3">
                COMPANY
              </h4>
              <ul className="flex flex-col gap-2 text-xs font-bold text-[#D4D4D4]">
                <li>
                  <a href="/about" onClick={(e) => handleNavClick('/about', e)} className="hover:text-[#FF8A00] transition-colors">About Us</a>
                </li>
                <li>
                  <a href="/quality" onClick={(e) => handleNavClick('/quality', e)} className="hover:text-[#FF8A00] transition-colors">Quality Standards</a>
                </li>
                <li>
                  <a href="/contact" onClick={(e) => handleNavClick('/contact', e)} className="hover:text-[#FF8A00] transition-colors">Contact Us</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black font-heading tracking-widest uppercase text-[#FFC43C] mb-3">
                CUSTOMER ACCOUNT
              </h4>
              <ul className="flex flex-col gap-2 text-xs font-bold text-[#D4D4D4]">
                <li>
                  <a href="/login" onClick={(e) => handleNavClick('/login', e)} className="hover:text-[#FF8A00] transition-colors">Sign In</a>
                </li>
                <li>
                  <a href="/register" onClick={(e) => handleNavClick('/register', e)} className="hover:text-[#FF8A00] transition-colors">Register</a>
                </li>
                <li>
                  <a href="/account" onClick={(e) => handleNavClick('/account', e)} className="hover:text-[#FF8A00] transition-colors">My Account</a>
                </li>
                <li>
                  <a href="/wishlist" onClick={(e) => handleNavClick('/wishlist', e)} className="hover:text-[#FF8A00] transition-colors">Wishlist</a>
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Column 04: CONNECT & STUDIO INFO (3 Columns on Desktop - Beside COMPANY) */}
          <div className="md:col-span-1 lg:col-span-3 flex flex-col">
            <h4 className="text-xs font-black font-heading tracking-widest uppercase text-[#FFC43C] mb-4.5">
              CONNECT & STUDIO
            </h4>

            <div className="flex flex-col gap-3 text-xs font-bold text-[#D4D4D4] mb-5">
              <div className="flex items-center gap-2 text-[#A3A3A3]">
                <MapPin className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2 text-[#A3A3A3]">
                <Clock className="w-4 h-4 text-[#34D399] shrink-0" />
                <span>Order Queue: <strong className="text-[#34D399]">Open (24-48h Print Lead)</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[#A3A3A3]">
                <Mail className="w-4 h-4 text-[#FFC43C] shrink-0" />
                <a href="mailto:info@aristrocrafts.com" className="hover:text-[#FF8A00] transition-colors">
                  info@aristrocrafts.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#A3A3A3]">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <a href="mailto:support@aristrocrafts.com" className="hover:text-[#38BDF8] transition-colors">
                  support@aristrocrafts.com
                </a>
              </div>
            </div>

            {/* Social Icons with Accessible Tooltips */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow ARISTROCRAFT on Instagram"
                className="w-10 h-10 rounded-xl bg-[#262626] border-2 border-[#404040] hover:border-[#FF8A00] hover:bg-[#FF8A00] text-white flex items-center justify-center transition-all duration-150 hover:-translate-y-1 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-[#FFC43C]"
              >
                <Instagram className="w-4 h-4 stroke-[2.5px]" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with ARISTROCRAFT on Facebook"
                className="w-10 h-10 rounded-xl bg-[#262626] border-2 border-[#404040] hover:border-[#FF8A00] hover:bg-[#FF8A00] text-white flex items-center justify-center transition-all duration-150 hover:-translate-y-1 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-[#FFC43C]"
              >
                <Facebook className="w-4 h-4 stroke-[2.5px]" />
              </a>

              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'ARISTROCRAFT 3D Printing Studio',
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard?.writeText(window.location.href);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 3000);
                  }
                }}
                aria-label="Share ARISTROCRAFT Studio"
                className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-150 hover:-translate-y-1 shadow-[2px_2px_0px_0px_#000000] focus:outline-none focus:ring-2 focus:ring-[#FFC43C] cursor-pointer ${
                  copiedLink
                    ? 'bg-[#FF8A00] border-[#FF8A00] text-white'
                    : 'bg-[#262626] border-[#404040] hover:border-[#FFC43C] hover:bg-[#FFC43C] hover:text-[#171717] text-white'
                }`}
              >
                {copiedLink ? (
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5px]" />
                ) : (
                  <Share2 className="w-4 h-4 stroke-[2.5px]" />
                )}
              </button>
            </div>
          </div>

        </div>

        {/* ================================================== */}
        {/* MID ROW: DISTINCT CUSTOM ORDER MINI CTA BANNER */}
        {/* ================================================== */}
        <div className="bg-gradient-to-r from-[#262626] via-[#1F1F1F] to-[#262626] border-2.5 border-[#404040] rounded-3xl p-6 sm:p-8 mb-12 shadow-[6px_6px_0px_0px_#000000] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#FF8A00] border-2 border-white text-white flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] shrink-0">
              <Layers className="w-6 h-6 stroke-[2.5px]" />
            </div>
            <div>
              <span className="text-[10px] font-black font-heading tracking-widest uppercase text-[#FFC43C] block">
                HAVE AN IDEA?
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading uppercase text-white tracking-tight">
                Let's make it real.
              </h3>
            </div>
          </div>

          <a
            href="/custom"
            onClick={handleCustomOrderClick}
            className="inline-flex items-center justify-center gap-2 bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2.5 border-white rounded-full px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000000] transition-all cursor-pointer select-none shrink-0"
          >
            <span>START A CUSTOM ORDER</span>
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </a>
        </div>

        {/* ================================================== */}
        {/* BOTTOM ROW: COPYRIGHT + LEGAL LINKS + CRAFTED NOTE */}
        {/* ================================================== */}
        <div className="border-t border-[#333333] pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#8C8C8C]">
          
          {/* Copyright */}
          <p className="text-center lg:text-left">
            © 2026 ARISTROCRAFT. All rights reserved.
          </p>

          {/* Legal Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="/privacy"
              onClick={(e) => handleNavClick('/privacy', e)}
              className="hover:text-[#FFC43C] transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <span className="text-[#404040]">|</span>
            <a
              href="/terms"
              onClick={(e) => handleNavClick('/terms', e)}
              className="hover:text-[#FFC43C] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </a>
            <span className="text-[#404040]">|</span>
            <a
              href="/refund"
              onClick={(e) => handleNavClick('/refund', e)}
              className="hover:text-[#FFC43C] transition-colors cursor-pointer"
            >
              Refund Policy
            </a>
            <span className="text-[#404040]">|</span>
            <a
              href="/admin/login"
              className="hover:text-[#FFC43C] transition-colors font-bold text-[#FF8A00]"
            >
              Admin Portal
            </a>
          </div>

          {/* Crafted with love */}
          <p className="flex items-center gap-1.5 text-center lg:text-right text-[#A3A3A3]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF8A00] fill-[#FF8A00]" />
            <span>in Bangladesh</span>
          </p>

        </div>

      </div>

      {/* ================================================== */}
      {/* ACCESSIBLE LEGAL & TRACK ORDER MODALS */}
      {/* ================================================== */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171717]/85 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white text-[#171717] border-3 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#FFC43C] overflow-hidden select-none animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFF9ED] hover:bg-[#FF8A00] hover:text-white border-2 border-[#171717] flex items-center justify-center text-[#171717] shadow-[2px_2px_0px_0px_#171717] transition-all cursor-pointer z-20"
            >
              <X className="w-4 h-4 stroke-[3px]" />
            </button>

            {/* Modal Content Switch */}
            {activeModal === 'privacy' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-black font-heading text-[#FF8A00] uppercase mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </div>
                <h3 id="footer-modal-title" className="text-2xl font-black font-heading uppercase text-[#171717] tracking-tight mb-3">
                  Your Privacy at ARISTROCRAFT
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed space-y-3">
                  <p>
                    We respect your privacy. All customer uploaded 3D models, STL files, and personal contact info are used strictly for slicing, estimating, and delivering your custom prints.
                  </p>
                  <p>
                    We never sell or distribute your private designs or personal contact information to third parties.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'terms' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-black font-heading text-[#FF8A00] uppercase mb-1">
                  <FileText className="w-4 h-4" />
                  <span>Terms & Conditions</span>
                </div>
                <h3 id="footer-modal-title" className="text-2xl font-black font-heading uppercase text-[#171717] tracking-tight mb-3">
                  Studio Terms & Guidelines
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed space-y-3">
                  <p>
                    <strong>Custom Orders:</strong> Estimates are based on weight (grams), layer resolution, and material selection (PLA+, PETG, TPU, Resin).
                  </p>
                  <p>
                    <strong>File Compatibility:</strong> We accept STL, OBJ, 3MF, and STEP files. If your file requires manifold repair or supports, our team will optimize it before production.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'refund' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-black font-heading text-[#FF8A00] uppercase mb-1">
                  <HelpCircle className="w-4 h-4" />
                  <span>Quality Guarantee</span>
                </div>
                <h3 id="footer-modal-title" className="text-2xl font-black font-heading uppercase text-[#171717] tracking-tight mb-3">
                  Refund & Reprint Policy
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-[#525252] leading-relaxed space-y-3">
                  <p>
                    Every ARISTROCRAFT print undergoes a strict multi-point dimensional and surface layer inspection before packaging.
                  </p>
                  <p>
                    If an item arrives damaged in transit or has a manufacturing defect, contact us within 48 hours with a photo, and we will issue a priority free reprint or full refund.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'track' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-black font-heading text-[#FF8A00] uppercase mb-1">
                  <Layers className="w-4 h-4" />
                  <span>Live Studio Queue</span>
                </div>
                <h3 id="footer-modal-title" className="text-2xl font-black font-heading uppercase text-[#171717] tracking-tight mb-3">
                  Track Your Print Order
                </h3>
                <form onSubmit={handleTrackSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="track-order-input" className="block text-xs font-black font-heading uppercase text-[#171717] mb-1.5">
                      Enter Order ID or WhatsApp Number
                    </label>
                    <input
                      id="track-order-input"
                      type="text"
                      value={trackOrderId}
                      onChange={(e) => setTrackOrderId(e.target.value)}
                      placeholder="e.g. AC-9842"
                      className="w-full bg-[#FFF9ED] border-2 border-[#171717] rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-[#171717] placeholder:text-[#8C8C8C] shadow-[2px_2px_0px_0px_#171717] outline-none focus:border-[#FF8A00]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#FFC43C] hover:bg-[#FF8A00] hover:text-white text-[#171717] border-2 border-[#171717] text-xs font-black font-heading uppercase shadow-[3px_3px_0px_0px_#171717] hover:shadow-[4px_4px_0px_0px_#171717] transition-all cursor-pointer"
                  >
                    Check Print Status
                  </button>

                  {trackStatus && (
                    <div className="p-3.5 rounded-xl bg-[#FFF9ED] border-2 border-[#171717] text-xs font-semibold text-[#171717]">
                      {trackStatus}
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Modal Bottom Close Action */}
            <div className="mt-6 pt-4 border-t border-[#171717]/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#171717] text-white text-xs font-black font-heading uppercase tracking-wider hover:bg-[#FF8A00] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
