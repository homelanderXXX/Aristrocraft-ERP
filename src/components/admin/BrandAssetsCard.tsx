import React, { useState } from 'react';
import { Image as ImageIcon, Check, Copy, ExternalLink, Layout, Shield, Palette } from 'lucide-react';

interface BrandAssetItem {
  id: string;
  filename: string;
  originalName: string;
  dimensions: string;
  role: string;
  placement: string;
  recommendedUse: string;
  url: string;
  status: 'active' | 'ready';
  tag: string;
}

export const BrandAssetsCard: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const assets: BrandAssetItem[] = [
    {
      id: 'asset-fov',
      filename: 'brand-fov.png',
      originalName: 'fov.png',
      dimensions: '1024 × 1024 px (Transparent)',
      role: 'Primary Brand Logo & Favicon',
      placement: 'Navbar Header, Footer, Browser Favicon & Apple Touch Icon',
      recommendedUse: 'Signature 3D geometric brand mark for all headers, tabs, and watermarks.',
      url: '/brand/brand-fov.png',
      status: 'active',
      tag: 'FAVICON & LOGO',
    },
    {
      id: 'asset-1',
      filename: 'design-1.png',
      originalName: 'Untitled design (1).png',
      dimensions: '942 × 667 px',
      role: 'Studio Showcase & Hero Card',
      placement: 'Custom 3D Print CTA & Studio Manufacturing Story',
      recommendedUse: 'High-contrast charcoal & gold card highlighting "Turn Ideas into Real Objects".',
      url: '/brand/design-1.png',
      status: 'ready',
      tag: 'SHOWCASE CARD',
    },
    {
      id: 'asset-2',
      filename: 'design-2.png',
      originalName: 'Untitled design (2).png',
      dimensions: '778 × 460 px',
      role: 'Main Brand Horizontal Banner',
      placement: 'Hero Section Feature Mosaic & Custom Order Top Banner',
      recommendedUse: 'Wide panoramic AristroCraft typography banner with gold trim.',
      url: '/brand/design-2.png',
      status: 'ready',
      tag: 'BRAND BANNER',
    },
    {
      id: 'asset-3',
      filename: 'design-3.png',
      originalName: 'Untitled design (3).png',
      dimensions: '197 × 158 px',
      role: 'Trust & Precision Seal',
      placement: 'Why Choose Us Section & Checkout Guarantee Badge',
      recommendedUse: 'Compact quality seal to show precision tolerance and guarantee.',
      url: '/brand/design-3.png',
      status: 'ready',
      tag: 'TRUST SEAL',
    },
    {
      id: 'asset-4',
      filename: 'design-4.png',
      originalName: 'Untitled design (4).png',
      dimensions: '178 × 158 px',
      role: 'Quality Verified Badge',
      placement: 'Product Detail Specs & Cart Guarantee Banner',
      recommendedUse: 'Verification seal for certified 3D printed materials.',
      url: '/brand/design-4.png',
      status: 'ready',
      tag: 'QUALITY BADGE',
    },
    {
      id: 'asset-5',
      filename: 'design-5.png',
      originalName: 'Untitled design (5).png',
      dimensions: '275 × 236 px',
      role: 'Specialty Filament & Materials Card',
      placement: 'Materials Section (Wood, Bronze & Composites)',
      recommendedUse: 'Warm filament palette showcasing premium textured 3D materials.',
      url: '/brand/design-5.png',
      status: 'ready',
      tag: 'MATERIALS',
    },
    {
      id: 'asset-6',
      filename: 'design-6.png',
      originalName: 'Untitled design (6).png',
      dimensions: '197 × 197 px',
      role: 'Avatar, Stamp & Packaging Watermark',
      placement: 'Account Profile Icon & Delivery Tracking Stamp',
      recommendedUse: 'Crisp square mark for customer parcels, stamps, and user avatars.',
      url: '/brand/design-6.png',
      status: 'ready',
      tag: 'STAMP / AVATAR',
    },
    {
      id: 'asset-7',
      filename: 'design-7.png',
      originalName: 'Untitled design (7).png',
      dimensions: '942 × 667 px',
      role: 'Alternative Studio Card (Match of #1)',
      placement: 'Backup / Social Share Card',
      recommendedUse: 'Exact graphic companion to design-1 for multi-banner rotations.',
      url: '/brand/design-7.png',
      status: 'ready',
      tag: 'CARD VARIANT',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white border-3 border-[#171717] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#171717] lg:col-span-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-[#171717] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#FFC43C] text-[#171717] border-2 border-[#171717] rounded-2xl flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#171717]">
            <ImageIcon className="w-6 h-6 stroke-[2.5px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black font-heading uppercase text-[#171717]">
                PROJECT BRAND ASSETS (IMGS FOLDER)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-black uppercase tracking-wider border border-[#171717]">
                8 IMAGES MAPPED
              </span>
            </div>
            <p className="text-xs font-bold text-[#6D6D6D]">
              Custom images from your <span className="font-mono text-[#171717] bg-[#FFF9ED] px-1.5 py-0.5 rounded border border-[#171717]/20">IMGS/</span> folder are stored in <span className="font-mono text-[#171717] bg-[#FFF9ED] px-1.5 py-0.5 rounded border border-[#171717]/20">public/brand/</span> and ready for use.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#6D6D6D]">
            Favicon & Navbar Active:
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#34D399]/20 text-[#10B981] border border-[#10B981] text-[11px] font-black uppercase">
            <Check className="w-3.5 h-3.5 stroke-[3px]" />
            Live Connected
          </span>
        </div>
      </div>

      {/* Grid of 8 Assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-[#FFF9ED] border-2.5 border-[#171717] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#171717] flex flex-col justify-between group hover:-translate-y-0.5 transition-all"
          >
            <div>
              {/* Image Preview Box */}
              <div className="relative w-full h-36 bg-[#171717] rounded-xl border-2 border-[#171717] overflow-hidden flex items-center justify-center p-2 mb-3">
                <img
                  src={asset.url}
                  alt={asset.role}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#FFC43C] text-[#171717] text-[9px] font-black uppercase tracking-wider border border-[#171717]">
                  {asset.tag}
                </span>
                {asset.status === 'active' && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#10B981] text-white text-[9px] font-black uppercase tracking-wider border border-[#171717]">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Title & Specs */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <h3 className="text-xs font-black font-heading uppercase text-[#171717] truncate">
                  {asset.role}
                </h3>
              </div>

              <p className="text-[10px] font-mono text-[#6D6D6D] font-bold mb-2">
                {asset.dimensions}
              </p>

              <div className="bg-white border-1.5 border-[#171717] rounded-lg p-2 mb-3 text-[11px] font-semibold text-[#4A4A4A] leading-tight">
                <p className="font-bold text-[#FF8A00] text-[10px] uppercase mb-0.5">Recommended Placement:</p>
                {asset.placement}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#171717]/10">
              <button
                type="button"
                onClick={() => handleCopy(asset.id, asset.url)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-[#FFC43C] text-[#171717] border-1.5 border-[#171717] rounded-lg text-[10px] font-black uppercase transition-colors cursor-pointer"
                title="Copy relative image URL"
              >
                {copiedId === asset.id ? (
                  <>
                    <Check className="w-3 h-3 text-[#10B981] stroke-[3px]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#171717]" />
                    <span>Copy Path</span>
                  </>
                )}
              </button>

              <a
                href={asset.url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 bg-white hover:bg-[#FF8A00] hover:text-white text-[#171717] border-1.5 border-[#171717] rounded-lg transition-colors"
                title="Open full size image in new tab"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
