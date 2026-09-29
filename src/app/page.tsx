import React, { useState } from 'react';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/home/HeroSection';
import { OurProductsSection } from '../components/home/OurProductsSection';
import { WhatCanWeMakeSection } from '../components/home/WhatCanWeMakeSection';
import { IndustriesShowcaseSection } from '../components/home/IndustriesShowcaseSection';
import { ManufacturingStorySection } from '../components/home/ManufacturingStorySection';
import { CustomOrderBannerSection } from '../components/home/CustomOrderBannerSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { Footer } from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { CustomOrderModal } from '../components/shop/CustomOrderModal';
import { ScrollProgressBar } from '../components/animation/ScrollReveal';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const { totalItems } = useCart();
  const { navigate } = useRouter();

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);

    // Direct route navigation
    if (sectionId.startsWith('/')) {
      navigate(sectionId);
      return;
    }

    if (sectionId === 'shop' || sectionId === 'shop-catalog') {
      navigate('/shop');
      return;
    }

    if (sectionId === 'custom-print' || sectionId === 'custom' || sectionId === 'custom-order') {
      navigate('/custom-print');
      return;
    }

    if (sectionId === 'creations' || sectionId === 'community') {
      navigate('/creations');
      return;
    }

    if (sectionId === 'industries') {
      navigate('/industries');
      return;
    }

    if (sectionId === 'education') {
      navigate('/education');
      return;
    }

    if (sectionId === 'materials') {
      navigate('/custom-print');
      return;
    }

    if (sectionId === 'about') {
      navigate('/about');
      return;
    }

    if (sectionId === 'quality') {
      navigate('/quality');
      return;
    }

    if (sectionId === 'faq') {
      navigate('/faq');
      return;
    }

    if (sectionId === 'shipping') {
      navigate('/shipping');
      return;
    }

    if (sectionId === 'track') {
      navigate('/track');
      return;
    }

    if (sectionId === 'cart') {
      navigate('/cart');
      return;
    }

    if (sectionId === 'privacy') {
      navigate('/privacy');
      return;
    }

    if (sectionId === 'terms') {
      navigate('/terms');
      return;
    }

    if (sectionId === 'refund') {
      navigate('/refund');
      return;
    }

    if (sectionId === 'hero' || sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Cinematic Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* 01. Sticky Navbar with ARISTROCRAFT Logo & Clean Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        cartCount={totalItems}
        onOpenCart={() => navigate('/cart')}
      />

      {/* SECTION 01 — HERO: Turn Your Ideas Into Real Objects */}
      <HeroSection
        onStartCustomProject={() => setIsCustomModalOpen(true)}
        onExploreWhatWeMake={() => {
          const el = document.getElementById('what-we-make');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* BRAND / TRUST MARQUEE — Supporting positioning strip directly below Hero */}
      <AnnouncementBar />

      {/* SECTION — OUR PRODUCTS: Viral Prints & Top Sellers Horizontal Gallery */}
      <OurProductsSection />

      {/* SECTION 02 — WHAT CAN WE MAKE? (Editorial 8-Category Mosaic) */}
      <WhatCanWeMakeSection />

      {/* SECTION 03 — ONE IDEA, MANY INDUSTRIES */}
      <IndustriesShowcaseSection />

      {/* SECTION 04 — FROM IDEA TO REAL OBJECT (Continuous Manufacturing Story) */}
      <ManufacturingStorySection />

      {/* SECTION 10 — CUSTOM ORDER CTA (Have an Idea?) */}
      <CustomOrderBannerSection
        onStartCustomProject={() => setIsCustomModalOpen(true)}
      />

      {/* Newsletter & Studio Updates */}
      <NewsletterSection />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Custom Order Modal for Direct Submission */}
      <CustomOrderModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
    </>
  );
}

