export type CommunityFilterCategory =
  | 'ALL'
  | 'ENGINEERING'
  | 'EDUCATION'
  | 'ROBOTICS'
  | 'ART'
  | 'JEWELRY'
  | 'ARCHITECTURE'
  | 'AUTOMOTIVE'
  | 'CONSUMER'
  | 'OTHER';

export interface GalleryItem {
  id: string;
  title: string;
  category: CommunityFilterCategory;
  caption: string;
  material: string;
  description: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square' | 'tall' | 'wide';
  specs?: {
    technology?: string;
    tolerance?: string;
    layerHeight?: string;
    finish?: string;
  };
}

export interface TransformationStep {
  number: string;
  title: string;
  subtitle: string;
  caption: string;
  image: string;
  description: string;
}

export interface ApplicationPillar {
  id: string;
  title: string;
  category: string;
  description: string;
  highlightItems: string[];
  mainImage: string;
  secondaryImage: string;
  accentNote: string;
}

export interface StudentMakerItem {
  id: string;
  title: string;
  makerType: string;
  description: string;
  image: string;
  material: string;
  field: string;
}

// 02: Horizontal Storytelling Sequence (Idea -> Digital Model -> Printing -> Real Object)
export const TRANSFORMATION_STEPS: TransformationStep[] = [
  {
    number: '01',
    title: 'THE IDEA',
    subtitle: 'Sketch & Concept',
    caption: 'A hand sketch, measurement, or reference photo',
    description: 'Every physical object starts as a mental spark or a rough sketch on grid paper. Whether you have exact dimensions or just a problem to solve, the idea is all that is needed.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200',
  },
  {
    number: '02',
    title: 'DIGITAL MODEL',
    subtitle: 'CAD & 3D Geometry',
    caption: 'Parametric CAD design & slicing preparation',
    description: 'The sketch is converted into a precise 3D digital model. Wall thicknesses, tolerances, thread inserts, and layer orientations are optimized for physical strength.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
  },
  {
    number: '03',
    title: 'PRINTING',
    subtitle: 'Precision Fabrication',
    caption: 'Additive layer-by-layer manufacturing',
    description: 'Industrial 3D printers build the part layer by layer—from carbon-reinforced filament to ultra-fine liquid resins—turning pure data into tangible matter.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=1200',
  },
  {
    number: '04',
    title: 'REAL OBJECT',
    subtitle: 'Physical Reality',
    caption: 'The finished product in hand and in use',
    description: 'Post-processed, hand-inspected, and ready to hold. The part is tested, fitted into assemblies, or deployed directly into real-world applications.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
  },
];

// 03 & 07: Editorial Visual Portfolio Items
export const EDITORIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Robotic Arm Gripper & Sensor Casing',
    category: 'ROBOTICS',
    caption: 'Robotics — custom protective housing & claw',
    material: 'Carbon-Fiber PETG',
    description: 'Topology-optimized lightweight gripper fingers with embedded strain-gauge channels and brass threaded inserts for pick-and-place automation.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    aspect: 'wide',
    specs: {
      technology: 'FDM Composite Extrusion',
      tolerance: '±0.08 mm',
      layerHeight: '0.14 mm',
      finish: 'Matte Charcoal & Heat-Set Brass Inserts',
    },
  },
  {
    id: 'gal-2',
    title: 'Anatomical Cranial & Vascular Teaching Aid',
    category: 'EDUCATION',
    caption: 'Education — anatomical teaching model',
    material: 'Multi-Color Tough PLA & Clear Resin',
    description: 'High-contrast sectional cranial anatomy model with color-coded neural pathways designed for interactive medical classroom demonstration.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000',
    aspect: 'portrait',
    specs: {
      technology: 'Multi-Material SLA & FDM',
      tolerance: '±0.05 mm',
      layerHeight: '0.08 mm',
      finish: 'Ultra-Fine Surface Micro-Sanded',
    },
  },
  {
    id: 'gal-3',
    title: 'High-Torque Helical Planetary Gearbox',
    category: 'ENGINEERING',
    caption: 'Engineering — functional replacement component',
    material: 'Nylon Carbon-Fiber (PA12-CF)',
    description: 'Self-lubricating custom gearset designed for continuous high-torque load cycling without thermal deformation or backlash.',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200',
    aspect: 'landscape',
    specs: {
      technology: 'Industrial FDM',
      tolerance: '±0.05 mm',
      layerHeight: '0.12 mm',
      finish: 'High-Wear Hardened Composite',
    },
  },
  {
    id: 'gal-4',
    title: 'Castable Wax Filigree Bridal Pendant',
    category: 'JEWELRY',
    caption: 'Jewelry — custom pendant prototype & master',
    material: 'Zero-Ash Castable Resin',
    description: 'Ultra-high-resolution 25-micron castable wax master ready for lost-wax gold and silver investment casting with microscopic lace details.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1000',
    aspect: 'square',
    specs: {
      technology: '12K High-Definition SLA',
      tolerance: '±0.025 mm',
      layerHeight: '0.025 mm (25 microns)',
      finish: 'Clean Burnout Zero Residue',
    },
  },
  {
    id: 'gal-5',
    title: 'Parametric Pavilion Scale Architectural Model',
    category: 'ARCHITECTURE',
    caption: 'Architecture — scale building & terrain study',
    material: 'Architectural Matte Terracotta & White Resin',
    description: '1:200 scale sectional massing study showing curved timber roof trusses and sunlight ingress angles for client presentation.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    aspect: 'landscape',
    specs: {
      technology: 'High-Resolution FDM & SLA',
      tolerance: '±0.1 mm',
      layerHeight: '0.12 mm',
      finish: 'Architectural Pure Matte',
    },
  },
  {
    id: 'gal-6',
    title: 'High-Flow Velocity Stack & Air Intake Trumpet',
    category: 'AUTOMOTIVE',
    caption: 'Automotive — track induction component',
    material: 'Industrial ASA (Heat Resistant 105°C)',
    description: 'CFD-profiled induction trumpet engineered for high-vibration and engine bay heat environments, delivering smooth laminar airflow.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1000',
    aspect: 'portrait',
    specs: {
      technology: 'Engineered FDM',
      tolerance: '±0.1 mm',
      layerHeight: '0.16 mm',
      finish: 'Vapor Smoothed & Heat Annealed',
    },
  },
  {
    id: 'gal-7',
    title: 'Restoration Bronze Plaque & Archaeological Bust',
    category: 'ART',
    caption: 'Art & Sculpture — museum tactile replica',
    material: '80% Bronze-Filled Metallic Composite',
    description: 'Cold-cast metallic composite sculpture hand-polished and chemically oxidized with natural patina for tactile museum interaction.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1000',
    aspect: 'tall',
    specs: {
      technology: 'Metallic Composite FDM',
      tolerance: '±0.1 mm',
      layerHeight: '0.10 mm',
      finish: 'Hand-Polished & Patinated Bronze',
    },
  },
  {
    id: 'gal-8',
    title: 'Custom Ergonomic Split Mechanical Keyboard Shell',
    category: 'CONSUMER',
    caption: 'Consumer Products — custom workspace peripheral',
    material: 'Heavy Matte Stone PLA & Gasket TPU',
    description: 'Custom 15-degree tented keyboard chassis with silicone gasket mounting pockets and hot-swap PCB support.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1200',
    aspect: 'wide',
    specs: {
      technology: 'Precision FDM',
      tolerance: '±0.12 mm',
      layerHeight: '0.16 mm',
      finish: 'Textured Matte Finish',
    },
  },
  {
    id: 'gal-9',
    title: 'Myoelectric Bionic Hand Prosthetic Mechanism',
    category: 'ROBOTICS',
    caption: 'Medical / Robotics — multi-articulated prosthetic',
    material: 'Engineering Tough Resin & ABS+',
    description: 'Low-friction internal gear knuckle joints actuated by tendon cables for responsive finger dexterity and clinical rehabilitation testing.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
    aspect: 'landscape',
    specs: {
      technology: 'SLA Resin & FDM',
      tolerance: '±0.05 mm',
      layerHeight: '0.05 mm',
      finish: 'Self-Lubricating Tough Finish',
    },
  },
  {
    id: 'gal-10',
    title: 'Topographical Elevation Watershed Model',
    category: 'EDUCATION',
    caption: 'Education — interactive 3D terrain map',
    material: 'Color-Contoured Tough PLA',
    description: 'Physical elevation relief derived from satellite data, allowing students to trace river basin catchment flows with hands-on topography.',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000',
    aspect: 'square',
    specs: {
      technology: 'Multi-Color FDM',
      tolerance: '±0.15 mm',
      layerHeight: '0.12 mm',
      finish: 'Matte Topographic Layering',
    },
  },
  {
    id: 'gal-11',
    title: 'Aerospace FPV Drone Camera Isolation Mount',
    category: 'ENGINEERING',
    caption: 'Engineering / Drones — vibration damper mount',
    material: 'Shore 85A TPU & Carbon-Nylon',
    description: 'Dual-durometer camera cage that dampens high-frequency motor resonance while maintaining rigid optical stability in high-G maneuvers.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1000',
    aspect: 'portrait',
    specs: {
      technology: 'Hybrid Dual-Material FDM',
      tolerance: '±0.08 mm',
      layerHeight: '0.12 mm',
      finish: 'Impact-Absorbing Elastic Finish',
    },
  },
  {
    id: 'gal-12',
    title: 'Waterproof Environmental Sensor Buoy Node',
    category: 'OTHER',
    caption: 'Custom Enclosure — IP67 solar telemetry buoy',
    material: 'UV-Stabilized Industrial PETG',
    description: 'Sealed floating telemetry canister with O-ring pressure channels and transparent sensor ports for continuous water quality monitoring.',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1200',
    aspect: 'wide',
    specs: {
      technology: 'Weatherproof FDM',
      tolerance: '±0.1 mm',
      layerHeight: '0.16 mm',
      finish: 'Double O-Ring Sealed Cavity',
    },
  },
];

// 04: Real-World Applications Grouped Compositions (NOT 8 equal cards)
export const APPLICATION_PILLARS: ApplicationPillar[] = [
  {
    id: 'pillar-engineering-robotics',
    title: 'FUNCTIONAL ENGINEERING & ROBOTICS',
    category: 'Industrial, Mechanical & Mechatronics',
    description: 'Digital manufacturing allows rapid iteration of load-bearing brackets, cycloidal speed reducers, sensor mounts, and custom robot chassis without waiting weeks for overseas tooling.',
    highlightItems: [
      'High-strength Carbon-PETG & PA12-CF structural frames',
      'Wear-resistant nylon and tough resin precision gears',
      'Heat-set threaded brass inserts for machine assembly',
      'Custom FPV drone cages & anti-vibration gimbal mounts',
    ],
    mainImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    accentNote: 'From CAD file to structural component in 24 to 48 hours.',
  },
  {
    id: 'pillar-education-medical',
    title: 'EDUCATION, ANATOMY & SCIENCE',
    category: 'Interactive Learning & Healthcare Aids',
    description: 'Complex 3D concepts—from molecular lattices and cranial vascular networks to terrain watersheds—become instantly understandable when learners can touch and hold them.',
    highlightItems: [
      'Multi-part anatomical models with magnetic snap joints',
      'Tactile topographic relief maps from satellite elevation data',
      'Custom assistive prosthetics & physical rehabilitation aids',
      'Interactive STEM classroom kits and physics demonstration gear',
    ],
    mainImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    accentNote: 'Transforms abstract diagrams into intuitive tactile understanding.',
  },
  {
    id: 'pillar-architecture-art-jewelry',
    title: 'ARCHITECTURE, JEWELRY & BESPOKE DESIGN',
    category: 'Scale Modeling, Micro-Resin Masters & Fine Art',
    description: 'Architects study complex roof geometries in true 3D scale, while jewelry artisans produce 25-micron castable wax filigree patterns ready for high-carat gold investment casting.',
    highlightItems: [
      'Zero-ash castable resin masters for lost-wax gold casting',
      '1:50 to 1:500 scale architectural site massing and interior sections',
      'Museum-grade archival replicas in bronze and stone composites',
      'Custom ergonomic peripherals, enclosures, and personalized products',
    ],
    mainImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    accentNote: 'Microscopic 25-micron detail fidelity for artisan craftsmanship.',
  },
];

// 05: Featured Magazine-Style Case Study
export const FEATURED_CASE_STUDY = {
  title: 'MODULAR ROVER SUSPENSION & CHASSIS',
  subtitle: 'What started as an idea became a high-strength physical prototype.',
  badge: 'FEATURED PROJECT',
  image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1400',
  processImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900',
  story: {
    clientNeed: 'A robotics team needed lightweight, interlocking suspension links and differential joints capable of enduring brutal off-road vibration trials under strict vehicle weight limits.',
    challenge: 'Off-the-shelf aluminum brackets were too heavy, while overseas 5-axis CNC machining had an 8-week lead time that would miss competition deadlines.',
    solution: 'ARISTROCRAFT analyzed the CAD geometry, performed topology optimization to remove unneeded material, and printed 26 structural parts in Carbon-Fiber PETG with integrated M3/M4 brass threaded inserts.',
    result: 'Reduced overall suspension assembly weight by 41% while maintaining high shear strength. Delivered and assembled in under 5 business days.',
  },
  specs: {
    material: 'Carbon-Fiber PETG & TPU 95A',
    technology: 'Industrial FDM',
    tolerance: '±0.1 mm',
    printTime: '42 Hours Continuous Batch',
    components: '26 Interlocking Parts',
  },
};

// 06: Students & Makers Highlights
export const STUDENT_MAKER_PROJECTS: StudentMakerItem[] = [
  {
    id: 'sm-1',
    title: 'Autonomous Robotics Wheel Hubs & Sensor Mounts',
    makerType: 'University Robotics Team Prototype',
    description: 'Custom lightweight wheel hubs and LiDAR sensor brackets printed in Carbon-PETG for agility on rough terrain.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    material: 'Carbon-Fiber PETG',
    field: 'Robotics & Automation',
  },
  {
    id: 'sm-2',
    title: 'Aerodynamic UAV Airfoil Spar & Wing Ribs',
    makerType: 'Aeronautics Student Club Project',
    description: 'Internal truss structures designed for maximum torsional stiffness and minimal takeoff weight.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    material: 'High-Stiffness Composite PLA',
    field: 'Aerospace Engineering',
  },
  {
    id: 'sm-3',
    title: 'Tactile DNA Double-Helix & Molecular Models',
    makerType: 'Science Fair & Classroom Project',
    description: 'Color-coded interlocking base pairs for hands-on classroom demonstration of genetic sequencing.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
    material: 'Matte Tough PLA',
    field: 'STEM Education',
  },
  {
    id: 'sm-4',
    title: 'Micro-Hydrofoil Thruster Nozzles & Propeller Ducts',
    makerType: 'Marine Engineering Student Prototype',
    description: 'Hydrodynamic duct profiles engineered to increase micro-ROV underwater thrust efficiency.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
    material: 'Waterproof Industrial ASA',
    field: 'Marine Robotics',
  },
];
