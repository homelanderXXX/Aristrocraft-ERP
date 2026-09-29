export interface SubjectEditorialData {
  id: string;
  num: string;
  title: string;
  tagline: string;
  shortDescription: string;
  visualDescription: string;
  heroImage: string;
  secondaryImage: string;
  galleryImages: string[];
  whatWeCanMake: string[];
  classroomUse: string[];
  suitableFor: string[];
  customExamples: string[];
  ctaText: string;
  color: string;
}

export interface ClassroomScenario {
  id: string;
  subject: string;
  title: string;
  caption: string;
  description: string;
  image: string;
  tag: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  span: 'large' | 'tall' | 'wide' | 'standard';
  specs?: string;
  material?: string;
}

export interface EducationalCategory {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  featuredImage: string;
  galleryImages: string[];
  examples: string[];
  suggestedMaterials: string[];
  targetLevels: ('Early Learning (3-9)' | 'School STEM (10-14)' | 'Advanced / University (15+)')[];
  learningOutcomes: string[];
  colorTheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
  };
}

export interface EducationalProject {
  id: string;
  title: string;
  caption: string;
  subject: string;
  category: string;
  description: string;
  detailedSpecs: {
    scale: string;
    materials: string[];
    printTechnology: string;
    assemblyType: string;
    tolerance: string;
    estimatedLeadTime: string;
  };
  applications: string[];
  targetAge: 'Ages 3–9' | 'Ages 10–14' | 'Ages 15+ / University' | 'All Ages';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Research Grade';
  image: string;
  additionalImages?: string[];
  customAvailable: boolean;
  featured: boolean;
  educationalNotes: string;
}

export interface InstitutionalService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface EducationWorkflowStep {
  step: string;
  title: string;
  description: string;
  detail: string;
  badge: string;
  image: string;
}

export interface LearningLevelTier {
  id: string;
  level: string;
  ageRange: string;
  headline: string;
  description: string;
  focusAreas: string[];
  sampleModels: string[];
  recommendedTech: string;
  image: string;
}

// 12 EDITORIAL SUBJECTS WITH RICH VISUAL IMAGERY
export const EDITORIAL_SUBJECTS: SubjectEditorialData[] = [
  {
    id: 'mathematics',
    num: '01',
    title: 'Mathematics',
    tagline: 'Turn formulas and geometry into objects students can hold.',
    shortDescription: 'From Platonic solids and non-Euclidean surfaces to fraction cylinders and 3D coordinate frames, abstract mathematics becomes tangible spatial intuition.',
    visualDescription: 'Precision-printed geometric polyhedra, nested dual solids, hyper-curved topological surfaces, and tactile algebra factoring tiles.',
    heroImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      'Platonic solids & dual polyhedra nesting sets',
      'Mathematical curves (paraboloids, saddles & hyperboloids)',
      'Fraction and volumetric ratio visualizer cylinders',
      '3D Cartesian, polar and spherical coordinate axes',
      'Pythagorean theorem physical water/bead proof vessels',
      'Topological Klein bottles & Mobius strip models',
    ],
    classroomUse: [
      'Geometry & spatial reasoning lectures',
      'Calculus 3D surface visualization',
      'Hands-on fraction manipulation for early math',
    ],
    suitableFor: ['Primary Schools', 'High School Math', 'University Calculus & Topology'],
    customExamples: ['Custom fractal Sierpinski pyramids', 'Curved Riemannian manifold replicas'],
    ctaText: 'Request Math Models',
    color: '#FF8A00',
  },
  {
    id: 'physics',
    num: '02',
    title: 'Physics',
    tagline: 'See forces, motion and mechanics in action.',
    shortDescription: 'Demonstrate kinematics, mechanical advantage, optics, and wave motion with high-durability laboratory apparatuses that students can assemble, crank, and test.',
    visualDescription: 'Compound gear trains, pulley systems, pendulum arrays, optical prism mounts, and velocity ramps engineered for continuous classroom use.',
    heroImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      'Compound mechanical advantage pulley rigs',
      'Interlocking gear sets & planetary torque transfer systems',
      'Coupled harmonic resonance pendulum arrays',
      'Optical bench lens holders & beam-splitter stands',
      'Transverse and longitudinal wave mechanical demonstrators',
      'Low-friction projectile motion launchers',
    ],
    classroomUse: [
      'Newtonian mechanics experiments',
      'Wave interference and frequency demonstrations',
      'Optical bench light refraction labs',
    ],
    suitableFor: ['Middle Schools', 'O/A Level Physics', 'University Physics Labs'],
    customExamples: ['Custom wind tunnel airfoils', 'Centripetal force rotating test beds'],
    ctaText: 'Request Physics Apparatus',
    color: '#2563EB',
  },
  {
    id: 'biology',
    num: '03',
    title: 'Biology & Anatomy',
    tagline: 'Make anatomy easier to understand with physical models.',
    shortDescription: 'Manufacture detailed multi-part cross-sectional hearts with magnetic valves, biological cell organelles, double-helix DNA strands, and articulated skeleton joints for classroom demonstration.',
    visualDescription: 'Full-color human heart models with removable atria and ventricles, cranial skull replicas, animal/plant cell cross-sections, and tactile organ assemblies.',
    heroImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      '4-Chamber magnetic human heart cross-sections',
      'Cranial skull models with removable brain lobes',
      'Eukaryotic animal and plant cell cutaway organelles',
      'DNA double helix unzipping and base-pairing kits',
      'Articulated knee, shoulder, and hip joint models',
      'Neuron synapse and neurotransmitter demonstrators',
    ],
    classroomUse: [
      'Anatomy & physiology demonstrations',
      'Genetics and molecular biology classes',
      'Pre-medical & nursing school visual lectures',
    ],
    suitableFor: ['High Schools', 'Pre-Med Colleges', 'Nursing & Medical Institutes'],
    customExamples: ['Custom pathology cross-sections', 'Microscopic organism 3D enlargements'],
    ctaText: 'Request Anatomy Models',
    color: '#059669',
  },
  {
    id: 'chemistry',
    num: '04',
    title: 'Chemistry',
    tagline: 'Turn invisible molecular structures into something students can see.',
    shortDescription: 'Replace fragile wire kits with mathematically accurate magnetic ball-and-stick molecular models, Bravais crystal lattices, hybridized orbital probability shells, and laboratory test fixtures.',
    visualDescription: 'Magnetic organic chemistry molecules, face-centered cubic crystal units, electron orbital geometries, and acid-resistant bespoke test tube racks.',
    heroImage: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      'Magnetic ball-and-socket organic molecule bonding kits',
      'Bravais crystal lattice unit cell demonstrator sets',
      's, p, d, f hybridized atomic orbital geometry models',
      'Fullerene (C60 Buckyball) and Graphene lattice sheets',
      'Tactile 3D periodic table element property visualizers',
      'Chemical-resistant custom test tube & cuvette holders',
    ],
    classroomUse: [
      'Stereochemistry and chiral isomerism lectures',
      'Solid-state crystallography studies',
      'Polymer chain and secondary protein folding demos',
    ],
    suitableFor: ['Secondary Chemistry', 'University Organic & Physical Chemistry'],
    customExamples: ['Complex pharmaceutical molecule 3D models', 'Custom catalyst pore lattices'],
    ctaText: 'Request Chemistry Models',
    color: '#D97706',
  },
  {
    id: 'engineering-mechanics',
    num: '05',
    title: 'Engineering & Mechanics',
    tagline: 'Learn engineering by examining real physical mechanisms.',
    shortDescription: 'Fabricate fully operational kinematic mechanisms for mechanical engineering faculties—planetary gearboxes, 4-stroke engine cutaways, differential drivetrains, and truss bridge failure testers.',
    visualDescription: 'Clear cutaway internal combustion engines, epicyclic gear reducers, bearing tolerance testers, and carbon-fiber reinforced structural trusses.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      'Transparent cutaway epicyclic planetary reduction gearboxes',
      '4-Stroke overhead cam engine piston & crankshaft cutaways',
      'Automotive open & limited-slip differential demonstrators',
      'Geneva mechanism intermittent motion indexers',
      'Centrifugal pump impeller cutaway fluid housings',
      'Standardized truss bridge load-to-failure testing sets',
    ],
    classroomUse: [
      'Mechanical kinematics & torque transmission labs',
      'Automotive engineering teardowns',
      'Civil engineering structural stress deflection experiments',
    ],
    suitableFor: ['Polytechnics', 'Engineering Universities', 'Vocational Technical Centers'],
    customExamples: ['Custom jet engine turbofan cutaways', 'Industrial robot gearbox prototypes'],
    ctaText: 'Request Engineering Mechanism',
    color: '#171717',
  },
  {
    id: 'electronics-cs',
    num: '06',
    title: 'Electronics & Computer Science',
    tagline: 'Build, protect and prototype hardware projects.',
    shortDescription: 'Equip electronics labs and computing workshops with modular Arduino/Raspberry Pi breadboard mounting plates, logic gate mechanical calculators, sensor protective housings, and cable organizers.',
    visualDescription: 'Workstation mounting rigs combining microcontrollers, breadboards, LCD screens, and mechanical logic gates demonstrating binary operations.',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      'All-in-one Arduino & Raspberry Pi student lab workstations',
      'Mechanical logic gate (AND, OR, NOT, XOR) marble calculators',
      'Sensor calibration brackets (LiDAR, ultrasonic, cameras)',
      'Classroom breadboard wire management & component trays',
      'Custom PCB snap-fit protective enclosures with port cutouts',
      'Binary counter mechanical flip registers',
    ],
    classroomUse: [
      'Microcontroller programming & IoT labs',
      'Digital logic & computer architecture lectures',
      'Embedded hardware prototyping workshops',
    ],
    suitableFor: ['School CS Labs', 'University EEE/CSE Departments', 'Robotics Clubs'],
    customExamples: ['Custom lab bench test station frames', 'DIN-rail server rack project brackets'],
    ctaText: 'Request Hardware Enclosures',
    color: '#7C3AED',
  },
  {
    id: 'robotics-programming',
    num: '07',
    title: 'Robotics & Programming',
    tagline: 'From an idea on a screen to a robot students can actually build.',
    shortDescription: 'Empower student robotics teams and university automation labs with custom lightweight chassis, articulated robotic arm linkages, parallel servo grippers, omni-wheel hubs, and modular bracket ecosystems.',
    visualDescription: 'Multi-axis robotic arms with precision servo joints, 4WD autonomous rover frames, flexible soft-robotics grippers, and drone motor mounts.',
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      '6-DOF desktop robotic arm assemblies with standard servo mounts',
      '2WD/4WD obstacle-avoiding autonomous rover chassis',
      'Compliant flexible-finger soft-robotics grippers',
      'Mecanum & omni-directional wheel internal hub brackets',
      'Line-follower sensor mounting bars & motor mounts',
      'Quadruped walking robot leg linkage mechanisms',
    ],
    classroomUse: [
      'Mechatronics & robotics engineering labs',
      'School STEM robotics competitions',
      'Kinematics and autonomous algorithm testing',
    ],
    suitableFor: ['High School Robotics Teams', 'Undergraduate Mechatronics', 'Hackathons'],
    customExamples: ['Custom combat robot armor & chassis', 'Autonomous warehouse AGV mockups'],
    ctaText: 'Request Robotics Parts',
    color: '#DC2626',
  },
  {
    id: 'geography-earth',
    num: '08',
    title: 'Geography & Earth Science',
    tagline: 'Understand landscapes by touching them.',
    shortDescription: 'Transform satellite DEM elevation data into touchable 3D terrain models, cross-sectional volcanic strata, continental drift puzzles, and scale planetary solar systems.',
    visualDescription: 'Detailed topographic relief maps of river deltas and mountain ranges, cutaway volcanoes with magma conduits, and nested Earth layer spheres.',
    heroImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      'DEM topographic elevation maps of river deltas & mountain ranges',
      'Cross-sectional volcano models (magma chamber, conduit, lava strata)',
      'Earth core-mantle-crust removable nested layer spheres',
      'Plate tectonic convergent/divergent fault boundary demonstrators',
      'Proportional scale solar system planetary comparison spheres',
      'Tactile watershed river drainage basin catchment models',
    ],
    classroomUse: [
      'Physical geography & cartography classes',
      'Geological faulting & volcanism demonstrations',
      'Astronomy & planetary scale studies',
    ],
    suitableFor: ['Primary & High Schools', 'University Geology & Earth Sciences'],
    customExamples: ['Campus watershed 3D relief model', 'National park topographical replica'],
    ctaText: 'Request Terrain & Earth Models',
    color: '#0D9488',
  },
  {
    id: 'architecture-design',
    num: '09',
    title: 'Architecture',
    tagline: 'Transform architectural drawings into physical models.',
    shortDescription: 'Support architecture studios and design faculties with scale site massings, parametric facade panels, structural compression arches, and interlocking traditional wood joinery specimens.',
    visualDescription: 'Scale urban site models, space-frame truss connections, parametric shading louvres, and classic Roman barrel & Gothic rib vault arches.',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      '1:100 and 1:500 scale masterplan urban massing blocks',
      'Parametric facade panels & responsive louvre mockups',
      'Structural compression arch and flying buttress models',
      'Traditional Japanese & mortise-and-tenon wood joinery puzzles',
      'Modular space-frame node and structural truss connections',
      'Sectional floor plan models with removable roof planes',
    ],
    classroomUse: [
      'Architecture studio design crits & thesis models',
      'Structural form-finding & load transfer demonstrations',
      'Industrial design ergonomic physical reviews',
    ],
    suitableFor: ['Architecture Universities', 'Interior Design Studios', 'Urban Planning Labs'],
    customExamples: ['Custom studio thesis scale model', 'Heritage building facade reconstruction'],
    ctaText: 'Request Architecture Models',
    color: '#4B5563',
  },
  {
    id: 'history-culture',
    num: '10',
    title: 'History & Heritage',
    tagline: 'Bring history into the classroom as a physical object.',
    shortDescription: 'Bring ancient civilizations to life with museum-grade 3D replicas of archaeological artifacts, monumental architectures, ancient cuneiform tablets, and historical working siege engines.',
    visualDescription: 'Stone-textured archaeological tablets, classical architectural column capitals, heritage fort models, and working wooden-look medieval trebuchets.',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      'Historical monument scale models (Lalbagh Fort, Somapura Mahavihara)',
      'Ancient Mesopotamian cuneiform tablets & Rosetta Stone slabs',
      'Classical Greek Parthenon column orders (Doric, Ionic, Corinthian)',
      'Prehistoric fossil replicas (Trilobites, Ammonites, dinosaur teeth)',
      'Ancient sculpture & museum artifact study replicas',
      'Medieval siege engine working models (Trebuchet & Ballista)',
    ],
    classroomUse: [
      'History and archaeology tactile demonstrations',
      'Museum education & school outreach tours',
      'Historical technology and warfare analysis',
    ],
    suitableFor: ['K-12 History Classes', 'Museums & Cultural Centers', 'Archaeology Departments'],
    customExamples: ['Regional archaeological site excavation 3D model', 'Historical artifact replication'],
    ctaText: 'Request Heritage Replicas',
    color: '#B45309',
  },
  {
    id: 'special-education',
    num: '11',
    title: 'Special & Inclusive Education',
    tagline: 'Create learning tools that students can explore through touch.',
    shortDescription: 'Craft specialized pedagogical tools for visually impaired, neurodivergent, and sensory learners—including high-contrast Braille alphabet blocks, tactile floor plans, and ergonomic adaptive pen grips.',
    visualDescription: 'Tactile maps with raised textures and Braille lettering, multi-sensory geometric sorting tiles, and weighted ergonomic utensil grips.',
    heroImage: 'https://images.unsplash.com/photo-1584697964190-7c26573c79a9?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1584697964190-7c26573c79a9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      'Dual-script Braille + Raised English tactile alphabet & number tiles',
      'Tactile campus and classroom wayfinding maps with distinct textures',
      'Ergonomic adaptive pencil grips & assistive utensil holders',
      '3D geometric shape sorting tiles with sensory textured surfaces',
      'Tactile celestial constellation maps with raised star magnitudes',
      'Custom AAC communication board switch mounts',
    ],
    classroomUse: [
      'Inclusive education for visually impaired students',
      'Occupational therapy fine-motor rehabilitation',
      'Multi-sensory math and spatial learning',
    ],
    suitableFor: ['Special Needs Schools', 'Inclusive Classrooms', 'Rehabilitation Centers'],
    customExamples: ['Custom student desk orientation tactile grid', 'Personalized adaptive grip'],
    ctaText: 'Request Inclusive Aids',
    color: '#0284C7',
  },
  {
    id: 'stem-projects',
    num: '12',
    title: 'Practical STEM Projects',
    tagline: 'Give students the freedom to turn their ideas into real prototypes.',
    shortDescription: 'Empower STEM clubs and science fairs with ready-to-assemble challenge kits—wind turbine blade angle testers, hydraulic excavators, bridge collapse rigs, and solar car chassis.',
    visualDescription: 'Complete classroom kits with modular snap-together components, hydraulic syringe mounts, aerodynamic drag racers, and seismic earthquake shake tables.',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    ],
    whatWeCanMake: [
      'Modular 3-blade wind turbine pitch efficiency testing kit',
      'Classroom hydraulic syringe excavator and robotic crane arm kits',
      'Spaghetti bridge and balsa truss standardized loading clamp rigs',
      'CO2 and balloon-powered aerodynamic drag car challenge chassis',
      'Seismic earthquake shake table building model testing sets',
      'Mechanical cipher cryptex combination puzzle kits',
    ],
    classroomUse: [
      'Science fairs & innovation challenges',
      'Hands-on engineering design process (Build, Test, Refine)',
      'Renewable energy and aerodynamic experiments',
    ],
    suitableFor: ['Middle & High School STEM Clubs', 'Makerspaces', 'Science Fairs'],
    customExamples: ['Custom school science fair challenge kit', 'Solar-powered vehicle competition chassis'],
    ctaText: 'Request STEM Project Kits',
    color: '#FF8A00',
  },
];

// REAL-WORLD CLASSROOM SCENARIOS
export const CLASSROOM_SCENARIOS: ClassroomScenario[] = [
  {
    id: 'scen-biology',
    subject: 'Biology',
    title: 'Explore the Human Heart',
    caption: 'Biology — Explore the structure of the human heart.',
    description: 'A teacher disassembles a 4-part magnetic heart model in front of secondary school students, allowing each student to pass around the left ventricle and inspect internal valve leaflets in high fidelity.',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=900',
    tag: 'Anatomy in Action',
  },
  {
    id: 'scen-physics-eng',
    subject: 'Physics & Engineering',
    title: 'Understand Motion Through Real Mechanisms',
    caption: 'Physics & Engineering — Understand motion through real mechanisms.',
    description: 'Engineering students rotate a 4:1 epicyclic planetary gearbox by hand, feeling the mechanical torque advantage and observing how carrier plates synchronize gear rotations.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900',
    tag: 'Kinematics Lab',
  },
  {
    id: 'scen-geography',
    subject: 'Geography',
    title: 'Study Elevation and Terrain with Your Hands',
    caption: 'Geography — Study elevation and terrain with your hands.',
    description: 'Geography pupils trace finger contours across a true-scale 3D topographic relief of the Bangladesh river delta, immediately understanding flood drainage basins and elevation gradients.',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=900',
    tag: 'Tactile Cartography',
  },
  {
    id: 'scen-robotics',
    subject: 'Robotics',
    title: 'Prototype Classroom Robots',
    caption: 'Robotics — Prototype classroom robots.',
    description: 'Students mount servo motors and sensors directly onto custom 3D printed rover chassis, testing autonomous obstacle avoidance algorithms on classroom arena floors.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=900',
    tag: 'Physical Prototyping',
  },
  {
    id: 'scen-architecture',
    subject: 'Architecture',
    title: 'Turn Digital Designs into Physical Models',
    caption: 'Architecture — Turn digital designs into physical models.',
    description: 'Architecture undergraduates inspect scaled 1:100 site massings and facade panels during studio critiques, examining sunlight shadow lines and spatial proportions in physical light.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=900',
    tag: 'Studio Critiques',
  },
];

// EDITORIAL WORKSHOP GALLERY (MASONRY & ASYMMETRICAL SIZES)
export const EDITORIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-heart',
    title: 'Dissectible Human Heart',
    category: 'Anatomy',
    caption: 'Anatomy',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1000',
    span: 'tall',
    specs: '1:1 Scale • Magnetic 4-Piece • Multi-Color',
    material: 'Medical-Grade Tough PLA+',
  },
  {
    id: 'gal-gearbox',
    title: 'Epicyclic Planetary Gearbox',
    category: 'Mechanical Systems',
    caption: 'Mechanical Systems',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
    span: 'wide',
    specs: '4:1 Reduction • Hand Crank • 608RS Bearings',
    material: 'Carbon Fiber Infused PLA',
  },
  {
    id: 'gal-polyhedra',
    title: 'Nested Platonic Solids Set',
    category: 'Geometry',
    caption: 'Geometry',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=900',
    span: 'standard',
    specs: '5 Regular Solids • Dual Insets',
    material: 'Matte Contrast PLA',
  },
  {
    id: 'gal-robot',
    title: '6-Axis Robotic Arm Manipulator',
    category: 'Robotics',
    caption: 'Robotics',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
    span: 'large',
    specs: '320mm Reach • SG90/MG996R Servos',
    material: 'High-Infill PETG & TPU',
  },
  {
    id: 'gal-topography',
    title: 'Satellite Topographic Relief',
    category: 'Topography',
    caption: 'Topography',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=900',
    span: 'standard',
    specs: 'DEM Elevation • 5x Exaggeration',
    material: 'Multi-Tone Contour PLA',
  },
  {
    id: 'gal-architecture',
    title: 'Urban Masterplan Massing',
    category: 'Architecture',
    caption: 'Architecture',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000',
    span: 'tall',
    specs: '1:200 Scale • Modular Site Base',
    material: 'SLA Resin & White Matte PLA',
  },
  {
    id: 'gal-cell',
    title: 'Eukaryotic Cell Cross-Section',
    category: 'Anatomy',
    caption: 'Anatomy',
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=900',
    span: 'standard',
    specs: '180mm Hemispherical • 6-Color Organelles',
    material: 'High-Density PLA+',
  },
  {
    id: 'gal-stem',
    title: 'Classroom Wind Turbine Tester',
    category: 'STEM Prototype',
    caption: 'STEM Prototype',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=1200',
    span: 'wide',
    specs: 'Adjustable Pitch Angle • DC Generator Hub',
    material: 'Impact-Resistant PETG',
  },
];

// WHO CAN ORDER HORIZONTAL FLOW DATA
export const INSTITUTIONAL_AUDIENCES = [
  {
    id: 'aud-schools',
    role: 'SCHOOLS',
    sub: 'Primary & High Schools',
    description: 'Durable, drop-resistant classroom demonstration kits and tactile manipulatives that simplify core science, biology, and math.',
    image: 'https://images.unsplash.com/photo-1584697964190-7c26573c79a9?auto=format&fit=crop&q=80&w=600',
    orderType: 'Classroom Sets (10–50x) • Safe Bio-Polymers',
  },
  {
    id: 'aud-colleges',
    role: 'COLLEGES',
    sub: 'O/A Level & Higher Secondary',
    description: 'High-contrast molecular kits, optical benches, and physics kinematics apparatuses for laboratory experiments and board practicals.',
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600',
    orderType: 'Lab Station Rigs • Multi-Subject Bundles',
  },
  {
    id: 'aud-universities',
    role: 'UNIVERSITIES',
    sub: 'Engineering, Medical & Architecture',
    description: 'Sub-millimeter accurate anatomical cross-sections, functional planetary gearboxes, scale architectural massings, and thesis prototypes.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    orderType: 'Bespoke Research Fixtures • 8K SLA Resin',
  },
  {
    id: 'aud-training-centers',
    role: 'TRAINING CENTERS',
    sub: 'Vocational & Technical Institutes',
    description: 'Working cutaways of engines, hydraulic valves, bearing testers, and industrial wiring jigs for real-world mechanical training.',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=600',
    orderType: 'Heavy-Duty Demonstrators • Carbon Fiber',
  },
  {
    id: 'aud-research-labs',
    role: 'RESEARCH LABS',
    sub: 'Postgraduate & Scientific Research',
    description: 'Custom sensor housings, chemical-resistant cuvette holders, optical aligners, and specialized non-standard lab hardware.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    orderType: 'CAD File Direct Slicing • Fast 24h Turnaround',
  },
  {
    id: 'aud-educators',
    role: 'INDIVIDUAL EDUCATORS',
    sub: 'Teachers, Tutors & Professors',
    description: 'Single custom-printed teaching aids, custom tactile puzzles, or specific demonstration props tailored to your exact syllabus lesson.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600',
    orderType: 'Single Prototypes • Direct Sketch to 3D Print',
  },
  {
    id: 'aud-students',
    role: 'STUDENTS & STEM CLUBS',
    sub: 'Science Fairs, Competitions & Hackathons',
    description: 'Custom robot chassis, drone brackets, aerodynamic test cars, and science fair inventions built exactly to student CAD designs.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600',
    orderType: 'Rapid Prototyping • Student Discount Available',
  },
];

// LEGACY ALIASES & COMPATIBILITY ARRAYS TO PREVENT ANY UNUSED COMPONENT ISSUES
export const EDUCATIONAL_PROJECTS: EducationalProject[] = [
  {
    id: 'proj-human-heart',
    title: 'Human Heart Cross-Section with Magnetic Valves',
    caption: 'Human Heart — Anatomy Teaching Model',
    subject: 'Biology',
    category: 'biology',
    description: 'A 4-part anatomical replica of the human cardiovascular system featuring segmented right and left ventricles, atria, aorta, and mitral valves. Embedded neodymium magnets allow smooth disassembly during lectures.',
    detailedSpecs: {
      scale: '1:1 Life Size (140 x 110 x 95 mm)',
      materials: ['Medical-Grade Multi-Color PLA+', 'SLA Resin Valves', 'N52 Magnets'],
      printTechnology: 'Multi-Color FDM + 8K SLA Hybrid',
      assemblyType: 'Magnetic 4-Piece Snap Closure',
      tolerance: '±0.15 mm alignment pins',
      estimatedLeadTime: '24–48 Hours',
    },
    applications: ['Medical Student Anatomy', 'High School Biology', 'Cardiology Patient Education'],
    targetAge: 'Ages 15+ / University',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=900',
    customAvailable: true,
    featured: true,
    educationalNotes: 'Non-clinical training replica designed strictly for educational visualization.',
  },
  {
    id: 'proj-planetary-gearbox',
    title: 'Cutaway Epicyclic Planetary Gearbox',
    caption: 'Planetary Gearbox — Mechanical Engineering',
    subject: 'Engineering',
    category: 'engineering-mechanics',
    description: 'A functional 4:1 reduction epicyclic planetary gearbox demonstrator with visible sun gear, 3 planetary gears, carrier plate, and outer ring gear. Demonstrates torque multiplier kinetics with hand crank.',
    detailedSpecs: {
      scale: 'Diameter 160 mm, Height 75 mm',
      materials: ['Carbon Fiber PLA (Gears)', 'Clear PETG (Cover)', 'Steel Bearings 608RS'],
      printTechnology: 'Precision FDM with 0.12mm layer height',
      assemblyType: 'Bearing Press-Fit with Knurled Thumb Screws',
      tolerance: '±0.10 mm gear backlash optimization',
      estimatedLeadTime: '24–48 Hours',
    },
    applications: ['Mechanical Engineering Labs', 'Automotive Powertrain Lectures', 'Physics Kinematics'],
    targetAge: 'Ages 15+ / University',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900',
    customAvailable: true,
    featured: true,
    educationalNotes: 'High durability for continuous student handling and torque testing.',
  },
];

export const SUBJECT_FILTER_LIST = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'math', label: 'Mathematics' },
  { id: 'physics', label: 'Physics' },
  { id: 'biology', label: 'Biology & Anatomy' },
  { id: 'chemistry', label: 'Chemistry' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'electronics', label: 'Electronics & CS' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'geography', label: 'Geography' },
  { id: 'architecture', label: 'Architecture' },
];

export const EDUCATION_CATEGORIES: EducationalCategory[] = [];
export const EDUCATION_WORKFLOW: EducationWorkflowStep[] = [];
export const INSTITUTIONAL_SOLUTIONS: any[] = [];
export const LEARNING_LEVEL_TIERS: LearningLevelTier[] = [];
