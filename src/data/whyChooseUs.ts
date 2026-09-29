import React from 'react';
import { Target, Palette, ShieldCheck, HeartHandshake } from 'lucide-react';

export interface WhyChooseUsItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tag: string;
  accentColor: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
}

export interface TrustStatItem {
  value: string;
  label: string;
  badge: string;
}

export const WHY_CHOOSE_US_DATA: WhyChooseUsItem[] = [
  {
    id: 'precision-printing',
    number: '01',
    title: 'Precision Printing',
    description:
      'Clean details, accurate dimensions, and carefully tuned print settings for consistently better results.',
    icon: Target,
    tag: '±0.1mm Precision',
    accentColor: 'bg-[#FFC43C]',
    textColor: 'text-[#171717]',
    badgeBg: 'bg-white',
    badgeText: 'text-[#171717]',
  },
  {
    id: 'made-your-way',
    number: '02',
    title: 'Made Your Way',
    description:
      'Choose colors, sizes, finishes, and designs—or bring us your own idea for a truly custom creation.',
    icon: Palette,
    tag: 'Multi-Color & Filament',
    accentColor: 'bg-[#FF8A00]',
    textColor: 'text-white',
    badgeBg: 'bg-[#171717]',
    badgeText: 'text-white',
  },
  {
    id: 'quality-checked',
    number: '03',
    title: 'Quality Checked',
    description:
      'Every print is inspected, cleaned, and finished before it reaches you.',
    icon: ShieldCheck,
    tag: 'Manual Inspection',
    accentColor: 'bg-[#34D399]',
    textColor: 'text-[#171717]',
    badgeBg: 'bg-white',
    badgeText: 'text-[#171717]',
  },
  {
    id: 'built-around-you',
    number: '04',
    title: 'Built Around You',
    description:
      'Friendly communication, custom requests, and support from idea to finished product.',
    icon: HeartHandshake,
    tag: '1:1 Designer Chat',
    accentColor: 'bg-[#171717]',
    textColor: 'text-white',
    badgeBg: 'bg-[#FFC43C]',
    badgeText: 'text-[#171717]',
  },
];

export const TRUST_STATS: TrustStatItem[] = [
  {
    value: '100%',
    label: 'Customizable',
    badge: 'TAILORED',
  },
  {
    value: '24/7',
    label: 'Order Requests',
    badge: 'ALWAYS ON',
  },
  {
    value: '3D',
    label: 'Made to Order',
    badge: 'ON DEMAND',
  },
  {
    value: '1:1',
    label: 'Customer Support',
    badge: 'DIRECT CHAT',
  },
];
