export interface CustomerCreation {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  customerNote: string;
  material: string;
  printTime: string;
  illustration: {
    emoji: string;
    bgGradient: string;
    accentColor: string;
    badgeLabel: string;
  };
  gridSpan?: {
    colSpanDesktop: string;
    rowSpanDesktop: string;
  };
  alt: string;
}

export const CUSTOMER_CREATIONS: CustomerCreation[] = [
  {
    id: 'creation-1',
    title: 'Dual-Color Articulated Dragon',
    category: 'Figures',
    categorySlug: 'figures',
    description: 'Custom scaled 45cm multi-jointed flexi dragon in silk copper and jet black PLA.',
    customerNote: '"The joint flexibility right off the bed is unreal. Looks epic on my shelf!" — Tanvir R.',
    material: 'Silk Copper & Matte Black PLA+',
    printTime: '14 hrs precision print',
    illustration: {
      emoji: '🐉',
      bgGradient: 'from-[#FF8A00]/25 via-[#FFC43C]/20 to-[#FFF9ED]',
      accentColor: 'bg-[#FF8A00]',
      badgeLabel: 'Multi-Joint Flex',
    },
    gridSpan: {
      colSpanDesktop: 'lg:col-span-4',
      rowSpanDesktop: 'lg:row-span-2',
    },
    alt: 'Custom 3D printed articulated dragon figure placed on a collector desk',
  },
  {
    id: 'creation-2',
    title: 'Minimalist Desk Cable Hub',
    category: 'Desk Setup',
    categorySlug: 'desk-setup',
    description: 'Custom snap-fit modular cable routing channel with magnetic desk clamps.',
    customerNote: '"Cleaned up my entire dual-monitor workstation wiring in 5 minutes." — Abrar H.',
    material: 'High-Temp PETG Carbon Black',
    printTime: '4 hrs precision print',
    illustration: {
      emoji: '🔌',
      bgGradient: 'from-[#34D399]/20 via-[#FFF9ED] to-[#34D399]/10',
      accentColor: 'bg-[#34D399]',
      badgeLabel: 'Modular Clamp',
    },
    gridSpan: {
      colSpanDesktop: 'lg:col-span-4',
      rowSpanDesktop: 'lg:row-span-1',
    },
    alt: 'Clean 3D printed cable management hub on a wooden studio workstation',
  },
  {
    id: 'creation-3',
    title: 'Warm Ambient Moon Lamp',
    category: 'Home Decor',
    categorySlug: 'home-decor',
    description: 'High-resolution lithophane moon sphere with warm LED wood base fitting.',
    customerNote: '"The surface crater topography when the LED turns on is mesmerizing." — Sadia K.',
    material: 'Natural Ivory PLA (0.12mm layer)',
    printTime: '22 hrs ultra-detail print',
    illustration: {
      emoji: '🌕',
      bgGradient: 'from-[#FFF9ED] via-[#FFC43C]/30 to-[#FF8A00]/20',
      accentColor: 'bg-[#FFC43C]',
      badgeLabel: 'Lithophane Glow',
    },
    gridSpan: {
      colSpanDesktop: 'lg:col-span-4',
      rowSpanDesktop: 'lg:row-span-2',
    },
    alt: 'Illuminated 3D printed lithophane moon lamp glowing on a bedroom nightstand',
  },
  {
    id: 'creation-4',
    title: 'Dual Grip Controller Stand',
    category: 'Gaming',
    categorySlug: 'gaming',
    description: 'Custom angled stand designed for PS5 DualSense and Xbox controllers.',
    customerNote: '"Matches my custom PC build aesthetics perfectly. Super sturdy!" — Farhan M.',
    material: 'Tough PLA+ Matte Finish',
    printTime: '6 hrs precision print',
    illustration: {
      emoji: '🎮',
      bgGradient: 'from-[#171717]/10 via-[#FF8A00]/15 to-[#FFF9ED]',
      accentColor: 'bg-[#171717]',
      badgeLabel: 'Anti-Slip Base',
    },
    gridSpan: {
      colSpanDesktop: 'lg:col-span-4',
      rowSpanDesktop: 'lg:row-span-1',
    },
    alt: 'Custom 3D printed gaming controller stand on an RGB battlestation desk',
  },
  {
    id: 'creation-5',
    title: 'Personalized 3D Desk Plaque',
    category: 'Custom Gift',
    categorySlug: 'custom-gift',
    description: 'Dual-extrusion embossed name plaque with corporate logo and bevel finish.',
    customerNote: '"Ordered this as a farewell gift for our lead architect. He was amazed!" — Nabila S.',
    material: 'Dual-Color Silk Gold & Charcoal PLA',
    printTime: '5 hrs precision print',
    illustration: {
      emoji: '🏷️',
      bgGradient: 'from-[#FFC43C]/20 via-[#FFF9ED] to-[#FF8A00]/15',
      accentColor: 'bg-[#FF8A00]',
      badgeLabel: 'Embossed Custom',
    },
    gridSpan: {
      colSpanDesktop: 'lg:col-span-6',
      rowSpanDesktop: 'lg:row-span-1',
    },
    alt: 'Personalized dual-color embossed 3D printed executive desk plaque',
  },
  {
    id: 'creation-6',
    title: 'Tabletop Miniature Squad',
    category: 'Collectibles',
    categorySlug: 'collectibles',
    description: 'Ultra-fine 0.08mm layer fantasy tabletop hero figures with custom bases.',
    customerNote: '"The detail on the chainmail and facial expressions is top tier." — Zidan A.',
    material: 'Engineering Resin / Micro-Layer PLA',
    printTime: '8 hrs micro-detail print',
    illustration: {
      emoji: '🧙‍♂️',
      bgGradient: 'from-[#34D399]/20 via-[#FFC43C]/20 to-[#FFF9ED]',
      accentColor: 'bg-[#34D399]',
      badgeLabel: '0.08mm Micro-Res',
    },
    gridSpan: {
      colSpanDesktop: 'lg:col-span-6',
      rowSpanDesktop: 'lg:row-span-1',
    },
    alt: 'Detailed 3D printed tabletop RPG fantasy miniatures ready for paint',
  },
];
