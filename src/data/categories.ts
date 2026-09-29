export interface CategoryGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  tag: string;
  suggestedMaterial: string;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  badge?: string;
  iconName: string; // Used to map to Lucide icons
  subcategories: string[];
  applications: string[];
  recommendedMaterials: string[];
  useCases: string[];
  galleryImages: CategoryGalleryItem[];
  leadTime: string;
  startingPriceBDT: number;
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id: 'cat-home-living',
    name: 'Home & Living',
    slug: 'home-living',
    tagline: 'Modern functional homeware, bespoke organizers, and architectural interior elements.',
    description: 'Transform residential and workspace environments with custom-dimensioned organizers, modular self-watering planters, parametric lighting fixtures, and custom kitchen fixtures crafted in durable, food-safe grade, and eco-friendly biopolymers.',
    heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    badge: 'POPULAR',
    iconName: 'Home',
    subcategories: [
      'Kitchen',
      'Bathroom',
      'Bedroom',
      'Home Decor',
      'Office',
      'Storage & Organization',
      'Garden & Outdoor',
    ],
    applications: [
      'Custom spice rack and utensil drawer dividers',
      'Self-watering geometric planters & vases',
      'Modular cable-routing desk trays and pen organizers',
      'Parametric acoustic wall tiles and light diffusers',
      'Shower caddy brackets and non-slip soap cradles',
    ],
    recommendedMaterials: ['Tough PLA+', 'PETG', 'Matte PLA', 'Silk PLA'],
    useCases: [
      'Residential Interior Upgrade',
      'Kitchen Organization',
      'Custom Planter & Garden Solutions',
      'Modern Office Aesthetics',
    ],
    leadTime: '24-48 Hours',
    startingPriceBDT: 250,
    galleryImages: [
      {
        id: 'hl-1',
        title: 'Geometric Self-Watering Planters',
        subtitle: 'Bespoke Indoor Botany',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
        description: 'Dual-chamber planters with integrated water reservoirs and capillary wicking channels. Printed in watertight PETG or textured stone-finish PLA.',
        tag: 'Garden & Living',
        suggestedMaterial: 'Watertight PETG',
      },
      {
        id: 'hl-2',
        title: 'Modular Drawer & Storage Grid',
        subtitle: 'Custom Dimension Organization',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        description: 'Precision inter-locking organizational trays built exactly to your drawer and desk dimensions for zero wasted space.',
        tag: 'Storage & Organization',
        suggestedMaterial: 'Tough PLA+ Matte',
      },
      {
        id: 'hl-3',
        title: 'Parametric Pendant Lamp Shades',
        subtitle: 'Diffused Architectural Lighting',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        description: 'Complex voronoi and mathematically calculated light-scattering shades designed for standard E27 LED fittings.',
        tag: 'Home Decor',
        suggestedMaterial: 'Translucent PETG / Silk PLA',
      },
      {
        id: 'hl-4',
        title: 'Custom Kitchen Gadgets & Brackets',
        subtitle: 'Under-Cabinet Spicing & Mounts',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        description: 'Magnetic knife dock adapters, cup dispensers, and custom coffee filter stations built for heavy daily use.',
        tag: 'Kitchen',
        suggestedMaterial: 'Food-Safe Base PETG',
      },
    ],
  },
  {
    id: 'cat-gadgets-electronics',
    name: 'Gadgets & Electronics',
    slug: 'gadgets-electronics',
    tagline: 'Custom PCB housings, single-board computer cases, and ergonomic device docks.',
    description: 'Precision enclosures engineered for Raspberry Pi, Arduino, ESP32, and custom electronics. Featuring snap-fit lids, brass heat-set threaded inserts, tailored port cutouts, and thermal cooling vents.',
    heroImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80',
    badge: 'ENGINEERING',
    iconName: 'Cpu',
    subcategories: [
      'Phone Accessories',
      'Laptop & Computer',
      'Raspberry Pi / Arduino',
      'Cable Management',
      'Camera Accessories',
      'Device Enclosures',
    ],
    applications: [
      'DIN-rail and VESA mount Raspberry Pi 4/5 cases',
      'MagSafe weighted desktop phone & smartwatch charging stations',
      'Custom ergonomic mechanical keyboard cases and macro pads',
      'Under-desk cable management raceways and clamp channels',
      'Camera cold-shoe adapters and battery pack brackets',
    ],
    recommendedMaterials: ['PETG', 'ABS / ASA', 'Tough Resin', 'Carbon-Fiber PETG'],
    useCases: [
      'Hardware Prototyping',
      'Smart Home Hub Housings',
      'Custom Desk Station Accessories',
      'Studio Camera Rigs',
    ],
    leadTime: '24-48 Hours',
    startingPriceBDT: 300,
    galleryImages: [
      {
        id: 'ge-1',
        title: 'Raspberry Pi & SBC Enclosures',
        subtitle: 'Thermal-Vented & DIN-Rail Ready',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        description: 'Snug snap-fit cases with active fan mounting, OLED screen bezels, and clean GPIO breakout slots.',
        tag: 'Raspberry Pi / Arduino',
        suggestedMaterial: 'Flame-Resistant ABS / PETG',
      },
      {
        id: 'ge-2',
        title: 'MagSafe Multi-Device Charging Docks',
        subtitle: 'Weighted Desktop Stands',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
        description: 'Clean minimalist charging cradles designed to hold OEM magnetic pucks with integrated cable routing channels.',
        tag: 'Phone Accessories',
        suggestedMaterial: 'Weighted High-Density PLA+',
      },
      {
        id: 'ge-3',
        title: 'Custom Mechanical Keyboard Switch Housings',
        subtitle: 'Gasket-Mounted Sound Profiles',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
        description: 'Custom 60%, 65%, or split keyboard frames with brass threaded insert bosses and sound-dampened bottom cases.',
        tag: 'Laptop & Computer',
        suggestedMaterial: 'ABS-Like Resin / PETG',
      },
      {
        id: 'ge-4',
        title: 'Under-Desk Modular Cable Trays',
        subtitle: 'Zero Cable Sag Management',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        description: 'High-strength clamp-on cable organizers capable of carrying heavy power strips and dual monitor power bricks.',
        tag: 'Cable Management',
        suggestedMaterial: 'Structural PETG',
      },
    ],
  },
  {
    id: 'cat-mechanical-engineering',
    name: 'Mechanical & Engineering',
    slug: 'mechanical-engineering',
    tagline: 'High-load brackets, precision gears, custom workshop jigs, and direct replacement parts.',
    description: 'Industrial-grade additive manufacturing for functional assemblies. We print with continuous carbon fiber, Nylon PA-CF, high-impact PETG, and tough resins calibrated to tight dimensional tolerances (±0.15mm).',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    badge: 'INDUSTRIAL',
    iconName: 'Wrench',
    subcategories: [
      'Mechanical Parts',
      'Brackets & Mounts',
      'Gears & Couplings',
      'Jigs & Fixtures',
      'Replacement Parts',
      'Machine Components',
    ],
    applications: [
      'Direct replacement gears for discontinued appliances and machinery',
      'High-tensile motor brackets and CNC stepper mounts',
      'Precision drill guides and assembly line alignment jigs',
      'Shaft couplers, timing pulleys, and spline adapters',
      'Pneumatic and fluid fitting adapters with tight seals',
    ],
    recommendedMaterials: ['Carbon Fiber Nylon (PA-CF)', 'PETG', 'ABS', 'Tough Resin'],
    useCases: [
      'Machinery Repair & Retrofit',
      'Production Line Tooling',
      'Mechanical Testing & Prototyping',
      'Heavy Load Fixturing',
    ],
    leadTime: '24-72 Hours',
    startingPriceBDT: 400,
    galleryImages: [
      {
        id: 'me-1',
        title: 'Involute Spur & Helical Gears',
        subtitle: 'High Torque & Low Friction',
        image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80',
        description: 'Custom tooth pitch, module, and pressure angles printed with solid perimeters for long wear cycles and silent mesh.',
        tag: 'Gears & Couplings',
        suggestedMaterial: 'Nylon PA12 / Carbon PETG',
      },
      {
        id: 'me-2',
        title: 'Structural Heavy-Duty Brackets',
        subtitle: 'Reinforced Webbing & Gussets',
        image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
        description: 'Optimized stress distributions for cantilever loads, 80/20 aluminum extrusion mounts, and servo actuators.',
        tag: 'Brackets & Mounts',
        suggestedMaterial: 'PA-CF Carbon Fiber',
      },
      {
        id: 'me-3',
        title: 'Workshop Assembly Jigs & Fixtures',
        subtitle: 'Zero-Tolerance Alignment Guides',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        description: 'Custom drill bushings, soldering third-hand mounts, and repeatable part inspection jigs.',
        tag: 'Jigs & Fixtures',
        suggestedMaterial: 'Tough ABS / PETG',
      },
      {
        id: 'me-4',
        title: 'Discontinued Machine Replacement Spares',
        subtitle: 'Reverse-Engineered Components',
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
        description: 'Replicate broken plastic gears, pump impellers, and latch mechanisms from physical samples or digital calipers.',
        tag: 'Replacement Parts',
        suggestedMaterial: 'Engineering Grade Resin / PETG',
      },
    ],
  },
  {
    id: 'cat-automotive',
    name: 'Automotive',
    slug: 'automotive',
    tagline: 'High-temperature interior clips, custom gauge pods, and UV-stable vehicle upgrades.',
    description: 'Automotive grade parts manufactured using UV-resistant ASA and temperature-hardened ABS/PETG capable of surviving 90°C+ car cabin temperatures under intense sun without warping or color degradation.',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    badge: 'ALL-WEATHER',
    iconName: 'Car',
    subcategories: [
      'Interior Accessories',
      'Mounts & Brackets',
      'Replacement Parts',
      'Dashboard Accessories',
      'Custom Components',
    ],
    applications: [
      'A-pillar single and dual gauge mounting pods',
      'Air vent phone and GPS navigation brackets',
      'Vintage & modern broken trim clips, sun-visor clips, and handle catches',
      'Center console cup holder enlargers and hidden tray inserts',
      'Under-hood sensor brackets and wire harness clips',
    ],
    recommendedMaterials: ['ASA (UV/Weather Resistant)', 'ABS (Heat Resistant)', 'Carbon-Fiber PETG'],
    useCases: [
      'Car Interior Customization',
      'Classic Car Restoration',
      'Fleet & Commercial Vehicle Mounts',
      'Track & Performance Additions',
    ],
    leadTime: '24-48 Hours',
    startingPriceBDT: 350,
    galleryImages: [
      {
        id: 'auto-1',
        title: 'Custom A-Pillar & Vent Gauge Pods',
        subtitle: 'Factory-Match Interior Integration',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
        description: 'Snug 52mm and 60mm gauge pods integrated into OEM vent slats or windshield pillars with factory matte texture.',
        tag: 'Dashboard Accessories',
        suggestedMaterial: 'Matte ASA (UV Resistant)',
      },
      {
        id: 'auto-2',
        title: 'Trim Clips & Latch Spares',
        subtitle: 'Snapping Precision Tolerances',
        image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
        description: 'Replacement door card clips, glovebox hinges, and console button blanks that are no longer available from dealerships.',
        tag: 'Replacement Parts',
        suggestedMaterial: 'High-Impact PETG / ABS',
      },
      {
        id: 'auto-3',
        title: 'Console Cup Holder Enlargers',
        subtitle: 'HydroFlask & Large Bottle Fitment',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
        description: 'Offset adapters tailored to specific vehicle models to securely hold oversized thermal bottles without blocking shifter controls.',
        tag: 'Interior Accessories',
        suggestedMaterial: 'ASA / PETG Tough',
      },
      {
        id: 'auto-4',
        title: 'Under-Hood Sensor & Harness Mounts',
        subtitle: 'Engine Bay Heat Resistance',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
        description: 'Custom brackets for catch cans, boost controllers, and sensor mounts capable of withstanding engine bay heat cycles.',
        tag: 'Mounts & Brackets',
        suggestedMaterial: 'Carbon-Fiber Nylon / ASA',
      },
    ],
  },
  {
    id: 'cat-medical-dental',
    name: 'Medical & Dental',
    slug: 'medical-dental',
    tagline: 'High-precision anatomical study models, dental orthodontic arches, and medical device prototypes.',
    description: 'Non-clinical anatomical reconstructions, dental study models, and medical device development mockups printed on ultra-high-resolution MSLA photopolymer resin printers down to 25-micron layer thickness.',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    badge: 'BIO-ACCURACY',
    iconName: 'Activity',
    subcategories: [
      'Anatomical Models',
      'Dental Study Models',
      'Training Models',
      'Surgical Planning Models',
      'Medical Device Prototypes',
    ],
    applications: [
      'Patient-specific anatomical bone replicas from DICOM/CT scans for education and pre-surgical visual review',
      'Orthodontic dental study arches and crown mockups for dental laboratories',
      'Suture and injection practice simulation blocks',
      'Ergonomic medical device handle prototypes for clinical usability trials',
      'Classroom physiological teaching models and bone cross-sections',
    ],
    recommendedMaterials: ['Ultra-Detail SLA Resin', 'Tough ABS-Like Resin', 'Bio-grade PLA'],
    useCases: [
      'Educational Demonstration',
      'Dental Laboratory Studies',
      'Medical Device R&D',
      'Simulation & Training Mockups',
    ],
    leadTime: '24-48 Hours',
    startingPriceBDT: 600,
    galleryImages: [
      {
        id: 'md-1',
        title: 'High-Fidelity Anatomical Bone Models',
        subtitle: 'CT-Derived Educational Replicas',
        image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
        description: 'Micro-accurate vertebrae, skulls, and orthopedic bone replicas showing internal cancellous structures for educational training.',
        tag: 'Anatomical Models',
        suggestedMaterial: 'High-Resolution Ivory Resin',
      },
      {
        id: 'md-2',
        title: 'Dental Study & Orthodontic Arches',
        subtitle: 'Sub-30 Micron Surface Smoothness',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
        description: 'Precision orthodontic aligner master models with crisp margin lines and zero shrinkage for dental technicians.',
        tag: 'Dental Study Models',
        suggestedMaterial: 'High-Rigidity Dental Study Resin',
      },
      {
        id: 'md-3',
        title: 'Ergonomic Surgical Device Grips',
        subtitle: 'Form & Usability Mockups',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        description: 'Rapid iterations of handheld diagnostic tools to evaluate surgeon hand fatigue and button placement before tooling.',
        tag: 'Medical Device Prototypes',
        suggestedMaterial: 'Tough ABS-Like Resin',
      },
      {
        id: 'md-4',
        title: 'Procedural Simulator Aids',
        subtitle: 'Classroom & Hospital Training Blocks',
        image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=800&q=80',
        description: 'Multi-density training models for needle biopsy practice, endoscopy navigation, and suture technique training.',
        tag: 'Training Models',
        suggestedMaterial: 'Flexible Resin & PLA Hybrid',
      },
    ],
  },
  {
    id: 'cat-robotics-drones',
    name: 'Robotics & Drones',
    slug: 'robotics-drones',
    tagline: 'Carbon-reinforced drone airframes, FPV action camera mounts, and multi-axis robot arm links.',
    description: 'Ultra-lightweight, high-strength structural parts for autonomous systems. We combine vibration-dampening TPU with rigid Carbon Fiber Nylon for extreme flight performance and crash resilience.',
    heroImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    badge: 'AEROSPACE',
    iconName: 'Bot',
    subcategories: [
      'Robot Parts',
      'Drone Frames',
      'Servo Mounts',
      'Sensor Mounts',
      'Protective Covers',
    ],
    applications: [
      'FPV drone GoPro and Action Cam vibration-isolated TPU mounts',
      'Autonomous drone landing gear and GPS mast holders',
      'Robotic gripper fingers with high-friction silicone-like TPU pads',
      'LiDAR and ultrasonic sensor pods with aerodynamic cowlings',
      'Servo motor bracket horns and planetary robot wrist gearboxes',
    ],
    recommendedMaterials: ['Carbon Fiber Nylon (PA-CF)', 'TPU 95A (Flexible)', 'PETG'],
    useCases: [
      'FPV Racing & Freestyle Drones',
      'Autonomous Drone Surveying',
      'Robotics Research & Competitions',
      'Industrial Automation Grippers',
    ],
    leadTime: '24-48 Hours',
    startingPriceBDT: 350,
    galleryImages: [
      {
        id: 'rd-1',
        title: 'Vibration-Damped FPV Camera Mounts',
        subtitle: 'Zero Jello Video Capture',
        image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
        description: 'Crash-proof flexible TPU camera hoods engineered for 25° to 45° tilt angles with snug friction fits for all action cams.',
        tag: 'Drone Frames',
        suggestedMaterial: 'Flexible TPU 95A',
      },
      {
        id: 'rd-2',
        title: 'Robotic Arm Links & Servo Mounts',
        subtitle: 'High Torque Load Distribution',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
        description: 'Lightweight articulated joints with brass bearings and servo spline adapters for multi-axis educational and industrial arms.',
        tag: 'Robot Parts',
        suggestedMaterial: 'Carbon-Fiber PA12',
      },
      {
        id: 'rd-3',
        title: 'LiDAR & Optical Sensor Pods',
        subtitle: 'Aerodynamic Protection',
        image: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=800&q=80',
        description: 'Weatherproof sensor housings designed for minimal optical occlusion and quick snap-in maintenance.',
        tag: 'Sensor Mounts',
        suggestedMaterial: 'Tough PETG / ASA',
      },
      {
        id: 'rd-4',
        title: 'Propeller Bumpers & Skid Plates',
        subtitle: 'Impact Energy Absorption',
        image: 'https://images.unsplash.com/photo-1507582020432-2a3bc4ff7a8b?auto=format&fit=crop&w=800&q=80',
        description: 'Duct guards and bottom landing skids that bounce off concrete without fracturing carbon fiber main plates.',
        tag: 'Protective Covers',
        suggestedMaterial: 'Semi-Rigid TPU',
      },
    ],
  },
  {
    id: 'cat-toys-games',
    name: 'Toys & Games',
    slug: 'toys-games',
    tagline: 'Articulated print-in-place toys, mechanical puzzles, and custom board game organizers.',
    description: 'Precision manufactured playware featuring integrated print-in-place mechanical hinges, custom interlocking puzzle boxes, tabletop game organizer inserts, and durable custom action figures.',
    heroImage: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80',
    badge: 'PLAY',
    iconName: 'Gamepad2',
    subcategories: [
      'Toys',
      'Action Figures',
      'Board Games',
      'Puzzles',
      'Educational Toys',
      'Custom Characters',
    ],
    applications: [
      'Print-in-place articulated dragons, animals, and fidget toys',
      'Board game token trays, card dispensers, and tile organizers',
      'Interlocking mechanical puzzle boxes and cryptex assemblies',
      'Custom collectible action figure armor and weapon accessories',
      'Educational gear train demonstration sets for kids',
    ],
    recommendedMaterials: ['Tough PLA+', 'Silk PLA Multi-Color', 'PETG'],
    useCases: [
      'Custom Board Game Upgrades',
      'Articulated Fidget Toys',
      'Interactive Mechanical Puzzles',
      'Custom Gift Collectibles',
    ],
    leadTime: '24-48 Hours',
    startingPriceBDT: 250,
    galleryImages: [
      {
        id: 'tg-1',
        title: 'Articulated Print-in-Place Creatures',
        subtitle: 'Zero Assembly Movable Hinges',
        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
        description: 'Silky smooth multi-segment creatures printed straight off the build plate without manual gluing or assembly.',
        tag: 'Toys',
        suggestedMaterial: 'Silk Dual-Color PLA+',
      },
      {
        id: 'tg-2',
        title: 'Custom Board Game Box Organizers',
        subtitle: 'Zero Setup Time Gaming',
        image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
        description: 'Snug organizer trays engineered for specific board games (Catan, Wingspan, Terraforming Mars) with pull-out resource dishes.',
        tag: 'Board Games',
        suggestedMaterial: 'Matte Tough PLA',
      },
      {
        id: 'tg-3',
        title: 'Mechanical Cryptex & Puzzle Cubes',
        subtitle: 'Internal Interlocking Mazes',
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
        description: 'Multi-ring rotational dial combination locks and sequential maze discovery boxes.',
        tag: 'Puzzles',
        suggestedMaterial: 'Precision PETG / PLA+',
      },
      {
        id: 'tg-4',
        title: 'Custom Articulated Action Figures',
        subtitle: 'Interchangeable Weapon Rigs',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
        description: 'High-friction ball joints and custom modular armor attachments for tabletop gaming and display posing.',
        tag: 'Custom Characters',
        suggestedMaterial: 'High-Density ABS / Tough PLA',
      },
    ],
  },
  {
    id: 'cat-art-collectibles',
    name: 'Art, Sculpture & Collectibles',
    slug: 'art-collectibles',
    tagline: 'Museum-grade statue busts, ultra-detailed miniatures, and life-size cosplay artifacts.',
    description: 'High-art digital sculpting brought into physical existence. Using 8K resin photopolymers and premium matte filaments, we reproduce microscopic facial expressions, cloth folds, and textured cosplay props.',
    heroImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    badge: 'FINE ART',
    iconName: 'Palette',
    subcategories: [
      'Statues',
      'Figurines',
      'Miniatures',
      'Cosplay Props',
      'Wall Art',
      'Decorative Objects',
    ],
    applications: [
      'Classical & modern sculpture museum busts (Marcus Aurelius, David, Venus)',
      'Tabletop RPG 28mm/32mm scale resin hero miniatures with razor-sharp weapons',
      'Life-size cosplay helmets, arm gauntlets, and weapon replicas with assembly dowels',
      'Parametric 3D geometric wall murals and textured canvas reliefs',
      'Custom caricature portrait statues crafted from customer photo references',
    ],
    recommendedMaterials: ['8K Ultra-Detail Resin', 'Matte Stone PLA', 'Silk Metallic PLA'],
    useCases: [
      'Gallery & Home Art Installation',
      'Tabletop RPG Campaigns',
      'Cosplay & Film Production Props',
      'Commemorative Trophy Busts',
    ],
    leadTime: '2-5 Days',
    startingPriceBDT: 350,
    galleryImages: [
      {
        id: 'ac-1',
        title: 'Museum-Quality Classical Statuary Busts',
        subtitle: 'Sub-0.08mm Layer Resolution',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        description: 'Impeccably detailed marble-texture busts with deep eye sockets, flowing drapery, and hollow-weighted bases.',
        tag: 'Statues',
        suggestedMaterial: 'Matte Marble PLA / Ivory Resin',
      },
      {
        id: 'ac-2',
        title: 'Tabletop RPG & D&D Resin Miniatures',
        subtitle: 'Microscopic Chainmail & Blade Details',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
        description: 'Printed on 8K monochrome LCDs with zero visible layer stepping, washed, and UV-cured ready for acrylic priming and painting.',
        tag: 'Miniatures',
        suggestedMaterial: '8K Ultra-Detail Grey Resin',
      },
      {
        id: 'ac-3',
        title: 'Wearable Cosplay Helmets & Gauntlets',
        subtitle: 'Multi-Part Split & Dowel Alignment',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        description: 'Full-scale wearable sci-fi and fantasy armor components split with alignment keys for easy assembly, sanding, and automotive paint.',
        tag: 'Cosplay Props',
        suggestedMaterial: 'High-Impact Tough PLA+',
      },
      {
        id: 'ac-4',
        title: '3D Geometric Parametric Wall Panels',
        subtitle: 'Acoustic Relief & Modern Depth',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        description: 'Modular interlocking panels creating captivating shadow play and visual texture across large accent walls.',
        tag: 'Wall Art',
        suggestedMaterial: 'Matte Architectural PLA',
      },
    ],
  },
  {
    id: 'cat-jewelry-fashion',
    name: 'Jewelry & Fashion',
    slug: 'jewelry-fashion',
    tagline: 'Castable wax masters, avant-garde statement rings, and flexible fashion prototypes.',
    description: 'Jewelry manufacturing masters printed in 100% ash-free castable resin for direct lost-wax gold and silver casting, alongside avant-garde geometric jewelry and flexible lattice textiles.',
    heroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    badge: 'CASTABLE',
    iconName: 'Gem',
    subcategories: [
      'Rings',
      'Pendants',
      'Jewelry Masters',
      'Accessories',
      'Fashion Prototypes',
    ],
    applications: [
      'Direct castable wax patterns for lost-wax gold, silver, and brass foundry casting',
      'Micro-prong gemstone setting masters with precise claw tolerances',
      'Avant-garde geometric statement rings and mathematical lattice pendants',
      'Custom belt buckles, shoe lace locks, and wearable eyewear prototypes',
      'Articulated 3D printed chainmail textiles for high-fashion garments',
    ],
    recommendedMaterials: ['Castable Wax Resin', 'Ultra-Detail SLA Resin', 'Flexible TPU'],
    useCases: [
      'Fine Jewelry Lost-Wax Casting',
      'Bespoke Statement Accessories',
      'Fashion Runway Prototyping',
      'Custom Eyewear Development',
    ],
    leadTime: '24-72 Hours',
    startingPriceBDT: 500,
    galleryImages: [
      {
        id: 'jf-1',
        title: 'Lost-Wax Castable Ring Patterns',
        subtitle: 'Zero-Ash Burnout Foundry Ready',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
        description: 'Flawless 15-micron resolution wax resin rings ready for investment plaster burnout into 18K gold or 925 sterling silver.',
        tag: 'Jewelry Masters',
        suggestedMaterial: 'Castable Purple Wax Resin',
      },
      {
        id: 'jf-2',
        title: 'Geometric Statement Pendants',
        subtitle: 'Complex Hollow Gyroid Geometries',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
        description: 'Intricate parametric lattice jewelry that is physically impossible to fabricate using traditional CNC or subtractive tooling.',
        tag: 'Pendants',
        suggestedMaterial: 'Metallic Bronze Resin / Wax',
      },
      {
        id: 'jf-3',
        title: 'Custom Eyewear Frame Prototypes',
        subtitle: 'Ergonomic Bridge & Temple Fit',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
        description: 'Rapid physical mockups for optical designers to test pupil distance, temple hinge flex, and nose bridge contours.',
        tag: 'Fashion Prototypes',
        suggestedMaterial: 'Tough ABS-Like Resin',
      },
      {
        id: 'jf-4',
        title: 'Flexible 3D Chainmail Textiles',
        subtitle: 'Print-in-Place Interlocking Chain Mesh',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        description: 'Continuous flexible chainmail sheets capable of draping naturally over curves for avant-garde apparel and cuffs.',
        tag: 'Accessories',
        suggestedMaterial: 'Flexible TPU / Silk PLA',
      },
    ],
  },
  {
    id: 'cat-architecture-models',
    name: 'Architecture & Models',
    slug: 'architecture-models',
    tagline: 'Scale building mockups, topographic terrain contours, and masterplan presentation models.',
    description: 'Transform Revit, Rhino, and SketchUp architectural CAD files into crisp physical presentation models. Featuring razor-sharp facades, transparent window volumes, and accurate topographic contour terraces.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    badge: 'SCALE 1:100',
    iconName: 'Building2',
    subcategories: [
      'Building Models',
      'Interior Models',
      'Terrain Models',
      'Landscape Models',
      'Scale Models',
    ],
    applications: [
      '1:50 to 1:500 architectural massing and high-detail facade models for client pitches',
      'Topographic GIS-derived terrain contour models for civil and landscape planning',
      'Modular sectioned floor plan models with removable upper stories and roof assemblies',
      'Urban masterplan zoning massing blocks with color-coded density zones',
      'Historic landmark replicas for museum displays and educational exhibits',
    ],
    recommendedMaterials: ['Architectural Matte White PLA', 'High-Detail SLA Resin', 'Translucent PETG'],
    useCases: [
      'Real Estate Development Pitches',
      'Architecture Thesis & Competitions',
      'Civil & Landscape Engineering',
      'Museum Exhibit Dioramas',
    ],
    leadTime: '2-5 Days',
    startingPriceBDT: 800,
    galleryImages: [
      {
        id: 'am-1',
        title: 'High-Detail Facade Massing Models',
        subtitle: '1:100 Scale Commercial Buildings',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
        description: 'Crisp window mullions, overhang louvers, and structural columns printed in clean non-glare architectural white matte.',
        tag: 'Building Models',
        suggestedMaterial: 'Matte White Architecture PLA',
      },
      {
        id: 'am-2',
        title: 'Topographic GIS Contour Terrain',
        subtitle: 'Elevational Contour Terraces',
        image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=800&q=80',
        description: 'Generated directly from elevation DEM rasters, illustrating slope grades, riverbeds, and construction site grading.',
        tag: 'Terrain Models',
        suggestedMaterial: 'High-Resolution FDM / Resin',
      },
      {
        id: 'am-3',
        title: 'Removable Multi-Story Floorplans',
        subtitle: 'Interior Layout Presentation',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        description: 'Magnetic locator pins between floors allow clients to lift roofs and inspect furnished interior living rooms and corridors.',
        tag: 'Interior Models',
        suggestedMaterial: 'Multi-Color PLA / Resin',
      },
      {
        id: 'am-4',
        title: 'Scale Vehicles & Site Context',
        subtitle: '1:200 Scale Urban Details',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        description: 'Tiny scale trees, pedestrian silhouettes, and street furniture to bring architectural presentations to life.',
        tag: 'Scale Models',
        suggestedMaterial: 'Micro-Detail Resin',
      },
    ],
  },
  {
    id: 'cat-education-stem',
    name: 'Education & STEM',
    slug: 'education-stem',
    tagline: 'Kinematic gear cutaways, tactile molecular lattices, and hands-on robotics kits.',
    description: 'Empower STEM learning through tactile, interactive demonstration models. We manufacture kinematic mechanisms, planetary gear cutaways, biological cell structures, and mathematical fractals for universities and schools.',
    heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    badge: 'ACADEMIC',
    iconName: 'GraduationCap',
    subcategories: [
      'Science Models',
      'Engineering Demonstrations',
      'Mathematics Models',
      'Biology Models',
      'Robotics Education',
    ],
    applications: [
      'Planetary and differential gearbox cutaway mechanisms with rotating crank handles',
      'DNA double-helix tactile models and protein crystallography visualizations',
      '3D mathematical surface manifolds, Klein bottles, and hyperbolic planes',
      'Human organ section models for high school and university biology labs',
      'Modular student chassis kits for Arduino robotics competitions',
    ],
    recommendedMaterials: ['Dual-Color PLA+', 'Tough PETG', 'High-Detail SLA Resin'],
    useCases: [
      'University Engineering Labs',
      'K-12 STEM Classrooms',
      'Science Museum Interactive Exhibits',
      'Robotics Hackathons & Clubs',
    ],
    leadTime: '24-48 Hours',
    startingPriceBDT: 300,
    galleryImages: [
      {
        id: 'es-1',
        title: 'Kinematic Gearbox Cutaway Demonstrator',
        subtitle: 'Manual Hand-Crank Working Mechanics',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        description: 'Multi-colored gears allowing students to visualize mechanical advantage, speed ratios, and torque conversion in real time.',
        tag: 'Engineering Demonstrations',
        suggestedMaterial: 'High-Contrast Dual PLA+',
      },
      {
        id: 'es-2',
        title: 'DNA Double Helix & Molecular Lattices',
        subtitle: 'Tactile Base Pair Visualizers',
        image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
        description: 'Color-coded nucleotide bases with snap-fit magnetic connectors illustrating hydrogen bonding and major/minor grooves.',
        tag: 'Biology Models',
        suggestedMaterial: 'Tough PLA / Resin',
      },
      {
        id: 'es-3',
        title: 'Mathematical Manifolds & 4D Projections',
        subtitle: 'Hyperbolic Surfaces & Topology',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
        description: 'Self-intersecting Klein bottles and Calabi-Yau manifold projections that transform abstract equations into tangible objects.',
        tag: 'Mathematics Models',
        suggestedMaterial: 'Translucent SLA Resin',
      },
      {
        id: 'es-4',
        title: 'Modular STEM Robotics Chassis Kits',
        subtitle: 'Universal Motor & Sensor Mounts',
        image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80',
        description: 'Custom slot-and-screw chassis plates designed for TT motors, ultrasonic sensors, and microcontrollers for student workshops.',
        tag: 'Robotics Education',
        suggestedMaterial: 'Impact PETG',
      },
    ],
  },
  {
    id: 'cat-business-industrial',
    name: 'Business & Industrial',
    slug: 'business-industrial',
    tagline: 'Functional product MVPs, thermoforming tooling, and customized batch production.',
    description: 'Bridge the gap between digital CAD prototypes and mass production. ARISTROCRAFT manufactures short-run production batches, retail display stands, vacuum forming mold masters, and consumer product prototypes.',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    badge: 'B2B SCALE',
    iconName: 'Briefcase',
    subcategories: [
      'Product Prototypes',
      'Packaging Prototypes',
      'Display Models',
      'Custom Fixtures',
      'Small-Batch Products',
    ],
    applications: [
      'Functional consumer electronics enclosures for investor pitches and Kickstarter campaigns',
      'High-durability thermoforming and silicone casting mold masters',
      'Custom point-of-sale retail countertop display units and product pedestals',
      'Production assembly line alignment jigs and automated feeder chutes',
      'On-demand small batch runs (10 to 500 units) with zero tooling costs',
    ],
    recommendedMaterials: ['Carbon-Fiber PA', 'ABS / ASA', 'Tough Resin', 'PETG'],
    useCases: [
      'Hardware Startup MVP Validation',
      'Short-Run Custom Manufacturing',
      'Retail Merchandising Displays',
      'Factory Floor Ergonomic Fixtures',
    ],
    leadTime: '2-5 Days',
    startingPriceBDT: 500,
    galleryImages: [
      {
        id: 'bi-1',
        title: 'Consumer Hardware MVP Prototypes',
        subtitle: 'Investor Pitch Ready Enclosures',
        image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80',
        description: 'Multi-part snap-fit casings with textured grip surfaces, soft-touch silicone buttons, and silk-screened logo recesses.',
        tag: 'Product Prototypes',
        suggestedMaterial: 'ABS-Like Resin / Matte PLA',
      },
      {
        id: 'bi-2',
        title: 'Thermoforming & Silicone Mold Masters',
        subtitle: 'High Thermal & Compressive Resilience',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        description: 'Solid infill masters designed with draft angles to withstand vacuum forming heat cycles and repeated silicone casting demolding.',
        tag: 'Custom Fixtures',
        suggestedMaterial: 'High-Temp Resin / Polycarbonate',
      },
      {
        id: 'bi-3',
        title: 'Branded Retail Point-of-Sale Displays',
        subtitle: 'Custom Pedestals & Card Holders',
        image: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=800&q=80',
        description: 'Eye-catching branded payment terminal cradles, cosmetic display trays, and illuminated showcase stands.',
        tag: 'Display Models',
        suggestedMaterial: 'Silk Finish PLA+ / PETG',
      },
      {
        id: 'bi-4',
        title: 'Small-Batch End-Use Production Runs',
        subtitle: 'Zero Tooling Cost Manufacturing',
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
        description: 'Consistent 50-to-200 unit runs printed across our synchronized printer farm with strict quality control guarantees.',
        tag: 'Small-Batch Products',
        suggestedMaterial: 'PETG / PA-CF Nylon',
      },
    ],
  },
  {
    id: 'cat-custom-manufacturing',
    name: 'Custom / Anything You Can Imagine',
    slug: 'custom-manufacturing',
    tagline: 'Upload your 3D CAD/STL file, share an idea, or let our design team engineer it from scratch.',
    description: 'If you have a 3D model, an STL file, a hand-drawn sketch, or simply a concept, ARISTROCRAFT brings it to reality. From one-off broken part replicas to full invention prototypes, our engineering studio handles slicing, optimization, and high-precision production.',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    badge: 'FULL FREEDOM',
    iconName: 'Layers',
    subcategories: [
      'Upload STL/CAD',
      'Send an Idea',
      'CAD Design Service',
      'Custom Manufacturing',
    ],
    applications: [
      'Instant slicing and manufacturing from customer-supplied .STL, .STEP, or .OBJ files',
      '3D CAD modeling and reverse-engineering from physical broken parts and photos',
      'Parametric generative design optimization for weight reduction and load maximization',
      'Multi-material and multi-color printing tailored to your specific mechanical requirements',
      'Surface post-processing: vapor smoothing, primer coating, threaded insert installation',
    ],
    recommendedMaterials: ['Full Studio Spectrum (All Filaments & Resins)'],
    useCases: [
      'Bespoke Inventions',
      'Reverse Engineering',
      'Custom One-Off Fabrication',
      'Student Capstone Projects',
    ],
    leadTime: '24-48 Hours',
    startingPriceBDT: 200,
    galleryImages: [
      {
        id: 'cm-1',
        title: 'Direct STL / STEP File Slicing & Production',
        subtitle: 'Digital Manufacturing on Demand',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        description: 'Upload your 3D model and receive an immediate engineering review for wall thickness, overhang angles, and material fit.',
        tag: 'Upload STL/CAD',
        suggestedMaterial: 'Selected by Customer',
      },
      {
        id: 'cm-2',
        title: 'CAD 3D Modeling & Design from Napkin Sketches',
        subtitle: 'Concept to Physical Reality',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        description: 'Send us dimensions and photos. Our CAD engineers build fully parametric 3D models ready for functional additive manufacturing.',
        tag: 'CAD Design Service',
        suggestedMaterial: 'Studio Engineered',
      },
      {
        id: 'cm-3',
        title: 'Reverse Engineering Broken Components',
        subtitle: 'Caliper Precision Reproduction',
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
        description: 'Ship or drop off your broken appliance, drone, or automotive part. We measure, re-model, reinforce weak points, and print a stronger replacement.',
        tag: 'Custom Manufacturing',
        suggestedMaterial: 'Engineering Carbon-Fiber / Tough Resin',
      },
      {
        id: 'cm-4',
        title: 'Surface Finishing & Brass Thread Insertion',
        subtitle: 'Production-Grade Post Processing',
        image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
        description: 'Ultrasonic heat-set brass threaded inserts (M2 to M8) installed into printed bosses for reusable, strong mechanical fastening.',
        tag: 'Send an Idea',
        suggestedMaterial: 'Threaded Reinforced PETG / ABS',
      },
    ],
  },
];

// Helper functions for category access & slug mapping
export function getCategoryBySlug(slug: string): CategoryData | undefined {
  const normalized = slug.toLowerCase().trim();
  
  // Direct match
  const direct = CATEGORIES_DATA.find((c) => c.slug === normalized);
  if (direct) return direct;

  // Legacy mappings for backwards compatibility with earlier routes
  const legacyMap: Record<string, string> = {
    'keychains-tags': 'home-living',
    'keychains': 'home-living',
    'desk-accessories': 'gadgets-electronics',
    'desk': 'gadgets-electronics',
    'figures-minis': 'toys-games',
    'miniatures': 'toys-games',
    'home-wall-decor': 'home-living',
    'home-decor': 'home-living',
    'custom-gifts': 'art-collectibles',
    'gifts': 'art-collectibles',
    'functional-parts': 'mechanical-engineering',
    'custom-parts': 'mechanical-engineering',
    'custom-order': 'custom-manufacturing',
    'custom': 'custom-manufacturing',
  };

  const mappedSlug = legacyMap[normalized];
  if (mappedSlug) {
    return CATEGORIES_DATA.find((c) => c.slug === mappedSlug);
  }

  return undefined;
}

export function searchCategoriesAndSubcategories(query: string): {
  category: CategoryData;
  matchedSubcategory?: string;
  matchedApplication?: string;
}[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();

  const results: {
    category: CategoryData;
    matchedSubcategory?: string;
    matchedApplication?: string;
  }[] = [];

  CATEGORIES_DATA.forEach((cat) => {
    // Check category name or description
    if (cat.name.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q) || cat.tagline.toLowerCase().includes(q)) {
      results.push({ category: cat });
      return;
    }

    // Check subcategories
    const matchedSub = cat.subcategories.find((sub) => sub.toLowerCase().includes(q));
    if (matchedSub) {
      results.push({ category: cat, matchedSubcategory: matchedSub });
      return;
    }

    // Check applications
    const matchedApp = cat.applications.find((app) => app.toLowerCase().includes(q));
    if (matchedApp) {
      results.push({ category: cat, matchedApplication: matchedApp });
      return;
    }

    // Check materials
    const matchedMat = cat.recommendedMaterials.find((mat) => mat.toLowerCase().includes(q));
    if (matchedMat) {
      results.push({ category: cat, matchedApplication: `Material: ${matchedMat}` });
      return;
    }
  });

  return results;
}
