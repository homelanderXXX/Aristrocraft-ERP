import React, { useState } from 'react';
import { PageMeta } from '../../components/common/PageMeta';
import { CommunityHero } from '../../components/community/CommunityHero';
import { MadeRealSection } from '../../components/community/MadeRealSection';
import { WhatPeopleAreMakingGallery } from '../../components/community/WhatPeopleAreMakingGallery';
import { RealWorldApplications } from '../../components/community/RealWorldApplications';
import { FeaturedProjectSection } from '../../components/community/FeaturedProjectSection';
import { StudentMakerShowcase } from '../../components/community/StudentMakerShowcase';
import { CommunityGallery } from '../../components/community/CommunityGallery';
import { CommunitySubmissionSection } from '../../components/community/CommunitySubmissionSection';
import { CommunityInquiryCTA } from '../../components/community/CommunityInquiryCTA';
import { CommunityLightboxModal } from '../../components/community/CommunityLightboxModal';
import { CustomOrderModal } from '../../components/shop/CustomOrderModal';
import { GalleryItem } from '../../data/communityData';
import { useRouter } from '../../context/RouterContext';

export default function CommunityPage() {
  const { navigate } = useRouter();
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState<boolean>(false);
  const [customOrderMaterial, setCustomOrderMaterial] = useState<string>('');

  const handleScrollToCreations = () => {
    const el = document.getElementById('community-creations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCustomOrder = (material?: string) => {
    setCustomOrderMaterial(material || '');
    setIsCustomOrderOpen(true);
  };

  const handleMakeSimilar = (item: GalleryItem) => {
    setCustomOrderMaterial(`${item.material} (Inspired by: ${item.title})`);
    setIsCustomOrderOpen(true);
  };

  return (
    <div className="w-full bg-[#FFF9ED] text-[#171717] min-h-screen">
      <PageMeta
        title="Community Creations & Showcase — ARISTROCRAFT"
        description="Ideas made real. See what people are designing, building, and bringing to physical reality with ARISTROCRAFT custom 3D printing."
      />

      {/* SECTION 01 — HERO */}
      <CommunityHero
        onStartProject={() => handleOpenCustomOrder()}
        onExploreCreations={handleScrollToCreations}
      />

      {/* SECTION 02 — FROM IDEA TO REAL OBJECT */}
      <MadeRealSection
        onStartCustomOrder={() => handleOpenCustomOrder()}
      />

      {/* SECTION 03 — WHAT PEOPLE ARE MAKING */}
      <WhatPeopleAreMakingGallery
        onSelectItem={(item) => setSelectedGalleryItem(item)}
      />

      {/* SECTION 04 — REAL-WORLD APPLICATIONS */}
      <RealWorldApplications
        onStartCustomOrder={() => handleOpenCustomOrder()}
      />

      {/* SECTION 05 — FEATURED PROJECT */}
      <FeaturedProjectSection
        onStartCustomOrder={() => handleOpenCustomOrder('Carbon-Fiber PETG & TPU')}
      />

      {/* SECTION 06 — STUDENTS & MAKERS */}
      <StudentMakerShowcase
        onStartStudentProject={() => handleOpenCustomOrder('Academic & Student Prototype')}
      />

      {/* SECTION 07 — COMMUNITY GALLERY */}
      <CommunityGallery
        onSelectItem={(item) => setSelectedGalleryItem(item)}
      />

      {/* SECTION 08 — SHARE YOUR CREATION */}
      <CommunitySubmissionSection />

      {/* SECTION 09 — CUSTOM PROJECT CTA */}
      <CommunityInquiryCTA
        onStartCustomProject={() => handleOpenCustomOrder()}
        onViewIndustries={() => navigate('/industries')}
      />

      {/* LIGHTBOX MODAL */}
      <CommunityLightboxModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        onMakeSimilar={handleMakeSimilar}
      />

      {/* CUSTOM ORDER MODAL */}
      <CustomOrderModal
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
        initialMaterial={customOrderMaterial}
      />
    </div>
  );
}
