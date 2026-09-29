import React, { useState } from 'react';
import { EducationHero } from '../../components/education/EducationHero';
import { TouchExplorationSection } from '../../components/education/TouchExplorationSection';
import { SubjectsEditorialSection } from '../../components/education/SubjectsEditorialSection';
import { TextbookToTableSection } from '../../components/education/TextbookToTableSection';
import { ClassroomScenariosSection } from '../../components/education/ClassroomScenariosSection';
import { ManufacturingPositioningSection } from '../../components/education/ManufacturingPositioningSection';
import { EditorialGallerySection } from '../../components/education/EditorialGallerySection';
import { WhoCanOrderSection } from '../../components/education/WhoCanOrderSection';
import { CustomEducationCTA } from '../../components/education/CustomEducationCTA';
import { EducationLightboxModal } from '../../components/education/EducationLightboxModal';
import { EducationInquiryModal } from '../../components/education/EducationInquiryModal';
import { EducationalProject } from '../../data/educationData';

export const EducationPage: React.FC = () => {
  // Modal states
  const [selectedProject, setSelectedProject] = useState<EducationalProject | null>(null);
  const [customLightboxImage, setCustomLightboxImage] = useState<{
    url: string;
    title: string;
    caption: string;
  } | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState('');

  // Scroll helpers
  const handleExploreSubjects = () => {
    const el = document.getElementById('subjects-editorial');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewInstitutional = () => {
    const el = document.getElementById('who-can-order');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenInquiry = (topic?: string) => {
    setInquiryTopic(topic || '');
    setIsInquiryModalOpen(true);
  };

  const handleOpenImageLightbox = (url: string, title: string, caption: string) => {
    setSelectedProject(null);
    setCustomLightboxImage({ url, title, caption });
  };

  const handleSelectProjectForInspection = (project: EducationalProject) => {
    setCustomLightboxImage(null);
    setSelectedProject(project);
  };

  const handleCloseLightbox = () => {
    setSelectedProject(null);
    setCustomLightboxImage(null);
  };

  const handleNavigateToUpload = () => {
    // Navigate to custom print quote or open inquiry
    handleOpenInquiry('Upload CAD/STL for Educational Model');
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#171717] selection:bg-[#FF8A00] selection:text-white">
      
      {/* 1. VISUALLY POWERFUL EDITORIAL HERO */}
      <EducationHero
        onExploreSubjects={handleExploreSubjects}
        onRequestCustom={() => handleOpenInquiry('Custom Academic 3D Model')}
        onViewInstitutional={handleViewInstitutional}
      />

      {/* 2. "WHAT CAN STUDENTS ACTUALLY TOUCH?" (LARGE EDITORIAL SPREAD) */}
      <TouchExplorationSection
        onExploreMore={handleExploreSubjects}
        onRequestModel={() => handleOpenInquiry('Classroom Tabletop Models')}
      />

      {/* 3. 12 SUBJECTS — VISUAL STORY, NOT A BOXED GRID (ALTERNATING SPREADS) */}
      <SubjectsEditorialSection
        onRequestSubject={(subjectTitle) => handleOpenInquiry(`Curriculum Model: ${subjectTitle}`)}
        onOpenLightbox={handleOpenImageLightbox}
      />

      {/* 4. "FROM TEXTBOOK TO TABLE" (CINEMATIC VISUAL SEQUENCE) */}
      <TextbookToTableSection
        onStartProject={() => handleOpenInquiry('Textbook to Table Project')}
      />

      {/* 5. "IMAGINE THIS IN YOUR CLASSROOM" (REAL-LIFE SCENARIOS) */}
      <ClassroomScenariosSection
        onOpenLightbox={handleOpenImageLightbox}
        onRequestCustom={(subject) => handleOpenInquiry(`Classroom Order: ${subject}`)}
      />

      {/* 6. "NOT JUST TOYS. REAL LEARNING TOOLS." (MANUFACTURING POSITIONING) */}
      <ManufacturingPositioningSection
        onStartInstitutional={() => handleOpenInquiry('Institutional Manufacturing Order')}
      />

      {/* 7. EDITORIAL WORKSHOP GALLERY (MASONRY & SPECIMEN ARCHIVE) */}
      <EditorialGallerySection
        onOpenLightbox={handleOpenImageLightbox}
        onRequestCustom={() => handleOpenInquiry('Custom Workshop Specimen')}
      />

      {/* 8. WHO CAN ORDER? (HORIZONTAL VISUAL STORYTELLING) */}
      <WhoCanOrderSection
        onSelectAudience={(role) => handleOpenInquiry(`Institutional Order for ${role}`)}
      />

      {/* 9. CUSTOM EDUCATION PROJECT CTA */}
      <CustomEducationCTA
        onStartProject={() => handleOpenInquiry('Bespoke Curriculum Model')}
        onUploadFile={handleNavigateToUpload}
      />

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <EducationLightboxModal
        isOpen={Boolean(selectedProject || customLightboxImage)}
        onClose={handleCloseLightbox}
        project={selectedProject}
        customImage={customLightboxImage}
        onRequestModel={(modelTitle) => {
          handleCloseLightbox();
          handleOpenInquiry(modelTitle);
        }}
      />

      {/* ACADEMIC INQUIRY MODAL */}
      <EducationInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialTopic={inquiryTopic}
      />

    </div>
  );
};

export default EducationPage;
