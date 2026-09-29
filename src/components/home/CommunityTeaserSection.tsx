import React from 'react';
import { ArrowRight, Users, MessageSquare } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { ScrollReveal, StaggerContainer, StaggerItem, SubtleDepthCard } from '../animation/ScrollReveal';

interface MakerHighlight {
  title: string;
  makerType: string;
  quote: string;
  image: string;
  field: string;
}

export const CommunityTeaserSection: React.FC = () => {
  const { navigate } = useRouter();

  const makerStories: MakerHighlight[] = [
    {
      title: 'Robotics Team Arm Manipulator',
      makerType: 'University Engineering Team',
      quote: '“We went from CAD export to a functioning carbon-fiber gripper in under 48 hours for competition testing.”',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      field: 'BUET Robotics Club',
    },
    {
      title: 'Medical School Anatomical Heart Study',
      makerType: 'Medical Student Researcher',
      quote: '“Having a physical model showing arterial branching helped our entire study cohort understand complex spatial anatomy.”',
      image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=800',
      field: 'Clinical Anatomy Research',
    },
    {
      title: 'Hardware IoT Enclosure MVP',
      makerType: 'Tech Startup Founder',
      quote: '“Instead of waiting 8 weeks for factory injection molds, we printed 50 beta test enclosures for our pilot rollout.”',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      field: 'Smart Agriculture Sensor Node',
    },
  ];

  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9ED] border-b-3 border-[#171717]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC43C] text-[#171717] border-2 border-[#171717] shadow-[2.5px_2.5px_0px_0px_#171717] rotate-[-1deg] mb-3.5 select-none">
                <Users className="w-3.5 h-3.5 text-[#171717] stroke-[3px]" />
                <span className="text-[11px] sm:text-xs font-black font-heading tracking-wider uppercase">
                  COMMUNITY & REAL PROJECTS
                </span>
              </div>

              <h2
                id="community-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#171717] uppercase leading-none"
              >
                SEE WHAT PEOPLE <span className="text-[#FF8A00]">ARE MAKING.</span>
              </h2>

              <p className="text-base sm:text-lg font-semibold text-[#6D6D6D] mt-2 max-w-xl">
                From university researchers and hardware startups to makers and designers. You don&apos;t have to know how to manufacture it — bring us the idea.
              </p>
            </div>

            <button
              onClick={() => navigate('/community')}
              className="inline-flex items-center gap-2 bg-[#171717] hover:bg-[#262626] text-white border-2.5 border-[#171717] rounded-xl px-6 py-3.5 text-xs sm:text-sm font-black font-heading uppercase tracking-wider shadow-[4px_4px_0px_0px_#171717] hover:shadow-[6px_6px_0px_0px_#171717] hover:-translate-y-0.5 transition-all self-start md:self-end cursor-pointer"
            >
              <span>EXPLORE THE COMMUNITY</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>
        </ScrollReveal>

        {/* 3 REAL-WORLD PROJECT STORIES */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7" staggerDelay={0.09}>
          {makerStories.map((story, idx) => (
            <StaggerItem key={idx} className="h-full">
              <SubtleDepthCard maxRotate={2} className="h-full">
                <div
                  onClick={() => navigate('/community')}
                  className="group bg-white border-3 border-[#171717] rounded-3xl overflow-hidden shadow-[5px_5px_0px_0px_#171717] hover:shadow-[8px_8px_0px_0px_#171717] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div className="relative w-full h-[210px] overflow-hidden border-b-3 border-[#171717]">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#171717] text-white text-[10px] font-black font-heading uppercase tracking-wider border border-white/20 shadow-[1.5px_1.5px_0px_0px_#000]">
                        {story.makerType}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black font-heading uppercase text-[#171717] tracking-tight mb-2 group-hover:text-[#FF8A00] transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium italic text-[#4A4A4A] leading-relaxed mb-4">
                        {story.quote}
                      </p>
                    </div>

                    <div className="pt-3 border-t-2 border-[#171717]/10 flex items-center justify-between text-xs font-bold text-[#6D6D6D]">
                      <span>{story.field}</span>
                      <span className="text-[#FF8A00] font-black font-heading uppercase">STORY →</span>
                    </div>
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

