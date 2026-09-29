import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { ScrollReveal, StaggerContainer, StaggerItem, SubtleDepthCard } from '../animation/ScrollReveal';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  material: string;
  image: string;
  specs: string;
  spanClass: string;
}

export const FeaturedCreationsSection: React.FC = () => {
  const { navigate } = useRouter();

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'port-1',
      title: 'Robotic Gripper & Servo Mounts',
      category: 'Robotics & Engineering',
      material: 'Nylon Carbon Fiber (PA-CF)',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
      specs: '0.12mm layer height • 60% Gyroid Infill',
      spanClass: 'lg:col-span-7 lg:row-span-2 min-h-[380px] sm:min-h-[460px]',
    },
    {
      id: 'port-2',
      title: 'Sub-Millimeter Skull & Vertebrae Replica',
      category: 'Medical Visualization',
      material: 'High-Detail Tough SLA Resin',
      image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800',
      specs: 'From DICOM CT Scan • 50 Micron Resin',
      spanClass: 'lg:col-span-5 min-h-[220px] sm:min-h-[240px]',
    },
    {
      id: 'port-3',
      title: 'Custom Weatherproof IoT Sensor Housing',
      category: 'Electronics Prototyping',
      material: 'Impact PETG + TPU Gasket',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      specs: 'IP65 Gasket Seal • Brass Heat-Set Inserts',
      spanClass: 'lg:col-span-5 min-h-[220px] sm:min-h-[240px]',
    },
    {
      id: 'port-4',
      title: 'Architectural Contour & Urban Masterplan Model',
      category: 'Architecture',
      material: 'Matte White PLA & Resin Facade',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      specs: '1:500 Scale • 48-Hour Continuous Print',
      spanClass: 'lg:col-span-4 min-h-[260px] sm:min-h-[300px]',
    },
    {
      id: 'port-5',
      title: 'Castable Wax Filigree Signet Ring',
      category: 'Jewelry & Casting',
      material: 'Castable Wax Photopolymer',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      specs: 'Direct Lost-Wax Casting Ready • Zero Ash',
      spanClass: 'lg:col-span-4 min-h-[260px] sm:min-h-[300px]',
    },
    {
      id: 'port-6',
      title: 'Modern Geometric Parametric Planter & Lamp',
      category: 'Consumer Design',
      material: 'Silk Copper & Matte Basalt PLA',
      image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=800',
      specs: 'Watertight Dual-Wall Spiral Slicing',
      spanClass: 'lg:col-span-4 min-h-[260px] sm:min-h-[300px]',
    },
  ];

  return (
    <section
      id="creations"
      aria-labelledby="creations-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9ED] border-b-3 border-[#171717]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC43C] text-[#171717] border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1deg] mb-3.5 select-none">
                <span className="text-[11px] sm:text-xs font-black font-heading tracking-wider uppercase">
                  STUDIO CASE STUDIES & PORTFOLIO
                </span>
              </div>

              <h2
                id="creations-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#171717] uppercase leading-none"
              >
                THINGS WE&apos;VE <span className="text-[#FF8A00]">BROUGHT TO LIFE.</span>
              </h2>

              <p className="text-base sm:text-lg font-semibold text-[#6D6D6D] mt-2 max-w-xl">
                From mechanical assemblies and surgical study models to consumer products and castable jewelry.
              </p>
            </div>

            <button
              onClick={() => navigate('/creations')}
              className="inline-flex items-center gap-2 bg-[#171717] hover:bg-[#262626] text-white border-2.5 border-[#171717] rounded-xl px-6 py-3.5 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 transition-all self-start md:self-end cursor-pointer"
            >
              <span>EXPLORE ALL CREATIONS</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>
        </ScrollReveal>

        {/* ASYMMETRIC EDITORIAL PHOTO MASONRY */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6" staggerDelay={0.08}>
          {portfolioItems.map((item) => (
            <StaggerItem
              key={item.id}
              className={`${item.spanClass} h-full`}
            >
              <SubtleDepthCard maxRotate={1.8} className="h-full">
                <div
                  onClick={() => navigate('/creations')}
                  className={`
                    group relative bg-white border-3 border-[#171717] rounded-3xl overflow-hidden
                    shadow-[5px_5px_0px_0px_#171717] hover:shadow-[9px_9px_0px_0px_#171717]
                    hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between
                    h-full w-full
                  `}
                >
                  {/* Background Photo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  </div>

                  {/* Top Tag Bar */}
                  <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-white/95 text-[#171717] text-[10px] sm:text-[11px] font-black font-heading uppercase tracking-wider border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717]">
                      {item.category}
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-[#FFC43C] text-[#171717] text-[10px] font-black font-heading uppercase tracking-wider border-2 border-[#171717]">
                      {item.material}
                    </span>
                  </div>

                  {/* Bottom Information */}
                  <div className="relative z-10 p-5 sm:p-6 text-white mt-auto">
                    <h3 className="text-xl sm:text-2xl font-black font-heading uppercase tracking-tight text-white mb-1 group-hover:text-[#FFC43C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-white/80">
                      {item.specs}
                    </p>
                  </div>
                </div>
              </SubtleDepthCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};

