import React from 'react';
import { ConfettiBackground } from '../components/ui/DecorativeShapes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#171717] relative font-body selection:bg-[#FF8A00] selection:text-white flex flex-col justify-between">
      <ConfettiBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
