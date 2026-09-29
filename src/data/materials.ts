export interface MaterialItem {
  id: string;
  name: string;
  category: 'filament' | 'resin';
  shortTag: string;
  tagline: string;
  description: string;
  keyProperties: string[];
  bestFor: string[];
  typicalProducts: string[];
  recommendedUseCase: string;
  heroImage: string;
  specs: {
    strength: number; // 1-10
    flexibility: number; // 1-10
    detailLevel: number; // 1-10
    heatResistance: number; // 1-10 (e.g. 55C vs 120C)
    heatDeflectionTemp: string;
    surfaceFinish: string;
    durability: string;
    outdoorResistance: 'Poor' | 'Moderate' | 'High' | 'Extreme' | 'N/A';
  };
}

export interface MaterialProductShowcase {
  materialId: string;
  materialName: string;
  categoryLabel: string;
  products: {
    title: string;
    subtitle: string;
    image: string;
    description: string;
  }[];
}

export interface MaterialDecisionPathway {
  goal: string;
  recommendedMaterial: string;
  materialId: string;
  explanation: string;
  badge: string;
}

export const FILAMENT_MATERIALS: MaterialItem[] = [
  {
    id: 'pla',
    name: 'PLA (Polylactic Acid / PLA+)',
    category: 'filament',
    shortTag: 'Standard & Display',
    tagline: 'The gold standard for clean aesthetics, vibrant color definition, and precise dimensional prototyping.',
    description: 'A biodegradable cornstarch-derived thermoplastic engineered for zero warp, razor-sharp corner definition, and flawless surface finishes. Ideal for decorative objects, visual proof-of-concepts, and desktop organization.',
    keyProperties: [
      'Flawless surface finish with minimal layer lines',
      'Wide spectrum of colors, dual-tone, and matte finishes',
      'High rigidity and tensile strength',
      'Cost-effective for rapid iteration and display models'
    ],
    bestFor: [
      'Rapid aesthetic prototypes',
      'Decorative homeware & architectural mockups',
      'Custom figurines & character models',
      'Desk accessories & organizer trays',
      'Personalized branded merchandise'
    ],
    typicalProducts: [
      'Custom Nameplates & Desk Signs',
      'Articulated Dragons & Toys',
      'Architectural Massing Models',
      'Geometric Planters & Vases'
    ],
    recommendedUseCase: 'Indoor display models, proof-of-concept visual prototypes, and branded gifts where surface beauty matters most.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 7,
      flexibility: 2,
      detailLevel: 8,
      heatResistance: 5,
      heatDeflectionTemp: '55°C (131°F)',
      surfaceFinish: 'Smooth satin, crisp details',
      durability: 'Moderate (Indoor use)',
      outdoorResistance: 'Poor'
    }
  },
  {
    id: 'petg',
    name: 'PETG (Glycol-Modified Polyethylene)',
    category: 'filament',
    shortTag: 'Functional & Tough',
    tagline: 'High impact resistance, water impermeability, and thermal resilience for hard-working components.',
    description: 'Combining the ease-of-print of PLA with the functional toughness of ABS. PETG provides superior layer bonding, slight elongation before break to prevent brittle failure, and excellent resistance to mild chemicals and humidity.',
    keyProperties: [
      'Exceptional inter-layer adhesion & impact absorption',
      'Chemical, moisture, and mild UV resistance',
      'Temperature resistant up to 75°C without deformation',
      'Food-safe polymer base (studio non-certified post-print)'
    ],
    bestFor: [
      'Functional mechanical parts & brackets',
      'Electronics housings & outdoor sensor cases',
      'Workshop tool holders & wall mounts',
      'Replacement gears, levers & household components'
    ],
    typicalProducts: [
      'Under-desk Headphone & Controller Mounts',
      'Custom Wall Clamps & Cable Guides',
      'Electronic Raspberry Pi & Sensor Cases',
      'Washing Machine & Appliance Replacement Knobs'
    ],
    recommendedUseCase: 'Functional parts subjected to regular handling, mechanical stress, humidity, or temperatures up to 75°C.',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 8,
      flexibility: 4,
      detailLevel: 7,
      heatResistance: 7,
      heatDeflectionTemp: '75°C (167°F)',
      surfaceFinish: 'Semi-gloss, industrial rugged',
      durability: 'High (Impact resistant)',
      outdoorResistance: 'Moderate'
    }
  },
  {
    id: 'abs',
    name: 'ABS (Acrylonitrile Butadiene Styrene)',
    category: 'filament',
    shortTag: 'Thermal & Impact',
    tagline: 'The classic injection-molding polymer engineered for high thermal tolerance and mechanical durability.',
    description: 'A rigid engineering thermoplastic capable of withstanding vehicle interior temperatures and rough mechanical abuse. It responds well to post-processing, sanding, and acetone vapor smoothing for mirror-gloss finishes.',
    keyProperties: [
      'High thermal threshold (operates safely up to 95°C)',
      'High impact resistance and shock tolerance',
      'Can be sanded, tapped with threads, and acetone smoothed',
      'Lightweight with strong structural integrity'
    ],
    bestFor: [
      'Automotive interior accessories & phone mounts',
      'Drone frames & RC vehicle chassis',
      'High-friction mechanical assemblies',
      'Protective gear & durable robotics housings'
    ],
    typicalProducts: [
      'Car Vent Clips & Dashboard Brackets',
      'Drone Structural Arms & Motor Mounts',
      'Heavy-duty Switch Boxes & Push Buttons',
      'Snap-fit Enclosures & Hinges'
    ],
    recommendedUseCase: 'Automotive interiors, functional prototypes under heat stress, and components needing post-machining.',
    heroImage: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 8,
      flexibility: 3,
      detailLevel: 7,
      heatResistance: 9,
      heatDeflectionTemp: '95°C (203°F)',
      surfaceFinish: 'Matte, sandable & polishable',
      durability: 'Very High',
      outdoorResistance: 'Moderate'
    }
  },
  {
    id: 'asa',
    name: 'ASA (Acrylonitrile Styrene Acrylate)',
    category: 'filament',
    shortTag: 'Extreme Outdoor & UV',
    tagline: 'True all-weather outdoor resilience that resists yellowing, sun UV degradation, and rain.',
    description: 'Engineered as the weather-resistant sibling of ABS. ASA features built-in UV stabilizers that protect prints against solar degradation, color fading, and brittleness under intense Dhaka sunlight or open-air weather exposure.',
    keyProperties: [
      'Superior UV & sunlight resistance (zero yellowing)',
      'High heat resistance up to 98°C',
      'Matte, high-end industrial surface finish',
      'Weather-sealed and water-resistant structure'
    ],
    bestFor: [
      'Outdoor surveillance & solar sensor housings',
      'Automotive exterior trim & motorcycle brackets',
      'Garden irrigation fittings & greenhouse clips',
      'Exterior building signage & architectural facades'
    ],
    typicalProducts: [
      'Rooftop Weather Station Enclosures',
      'Motorcycle Mirror & Action Cam Mounts',
      'Outdoor Security Camera Sunshields',
      'Exterior Marine & Boat Hardware Spacers'
    ],
    recommendedUseCase: 'Any component destined for full-time outdoor mounting, rooftop sensors, or vehicle exterior applications.',
    heroImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 8,
      flexibility: 3,
      detailLevel: 7,
      heatResistance: 9,
      heatDeflectionTemp: '98°C (208°F)',
      surfaceFinish: 'Refined matte industrial finish',
      durability: 'Extreme (Weather-proof)',
      outdoorResistance: 'Extreme'
    }
  },
  {
    id: 'tpu',
    name: 'TPU (Thermoplastic Polyurethane 95A / 85A)',
    category: 'filament',
    shortTag: 'Elastic & Shock Absorbing',
    tagline: 'Rubber-like flexibility, extreme tear resistance, and unmatched vibration dampening.',
    description: 'An elastomeric polymer that bends, twists, and compresses without permanent deformation. TPU is practically indestructible against blunt impacts, high vibrations, grease, and abrasion.',
    keyProperties: [
      'Flexible, bendable, and returns to original shape instantly',
      'Excellent vibration dampening & anti-shock properties',
      'Immense tear strength and abrasion resistance',
      'Oil, grease, and mild solvent resistant'
    ],
    bestFor: [
      'Custom phone bumpers & protective equipment cases',
      'Vibration isolators for motors & drones',
      'Industrial gaskets, O-rings & weather seals',
      'Flexible RC car tires, wheels & non-slip feet'
    ],
    typicalProducts: [
      'Action Camera Crash Guards & Drone Bumpers',
      'Custom Non-Slip Equipment Feet & Pads',
      'Sealing Gaskets for Enclosures',
      'Ergonomic Tool Grips & Handle Sleeves'
    ],
    recommendedUseCase: 'Parts that must absorb shock, protect delicate hardware from drop impacts, seal fluid/dust, or grip surfaces.',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 7,
      flexibility: 10,
      detailLevel: 6,
      heatResistance: 7,
      heatDeflectionTemp: '80°C (176°F)',
      surfaceFinish: 'Textured rubber-like grip',
      durability: 'Extreme (Unbreakable on drop)',
      outdoorResistance: 'High'
    }
  },
  {
    id: 'nylon',
    name: 'Nylon (Polyamide PA6 / PA12)',
    category: 'filament',
    shortTag: 'Ultra-High Toughness',
    tagline: 'Industrial mechanical polymer built for continuous friction, snap-fits, and heavy structural load.',
    description: 'Nylon offers the highest tensile and fatigue strength among standard thermoplastics, coupled with a naturally low friction coefficient. It flexes under extreme stress without snapping, making it ideal for working mechanical gear trains.',
    keyProperties: [
      'Low surface friction (ideal for moving joints & gears)',
      'Exceptional fatigue endurance under cyclic loading',
      'High resistance to oil, fuels, and industrial solvents',
      'Supports high-strength functional snap-fit joints'
    ],
    bestFor: [
      'Mechanical gears, bushings & bearings',
      'Robotics structural joints & tensioners',
      'Industrial snap-fits & repeated clip mechanisms',
      'Heavy-duty tool handles and lever arms'
    ],
    typicalProducts: [
      'High-Torque Reduction Gears',
      'Robotic Arm Joint Pulleys & Bushings',
      'Heavy Industrial Latching Mechanisms',
      'Custom Ratchets & Locking Hubs'
    ],
    recommendedUseCase: 'Moving mechanical parts, gears with interlocking teeth, and components subjected to repetitive cyclical stress.',
    heroImage: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 9,
      flexibility: 6,
      detailLevel: 7,
      heatResistance: 9,
      heatDeflectionTemp: '110°C (230°F)',
      surfaceFinish: 'Semi-smooth, low friction',
      durability: 'Extreme',
      outdoorResistance: 'Moderate'
    }
  },
  {
    id: 'carbon-fiber',
    name: 'Carbon Fiber Reinforced (PA-CF / PETG-CF)',
    category: 'filament',
    shortTag: 'Aerospace Structural',
    tagline: 'Infused with chopped micro-carbon fibers for exceptional stiffness, ultra-light weight, and stunning matte black finish.',
    description: 'High-performance engineering composite featuring high-modulus carbon fibers embedded into a polymer matrix. Carbon fiber filaments drastically elevate structural rigidity, eliminate warping, and produce an exquisite stealth-black surface that completely masks layer lines.',
    keyProperties: [
      'Unmatched stiffness-to-weight ratio (aerospace class)',
      'Near-zero thermal warping with high dimensional stability',
      'Stunning textured matte carbon finish with invisible layer lines',
      'Withstands extreme operating temperatures (up to 150°C+ for PA-CF)'
    ],
    bestFor: [
      'Drone racing chassis & high-speed aerodynamic components',
      'Manufacturing assembly jigs, fixtures & gauges',
      'High-stress automotive mounting brackets',
      'Production-grade tooling & end-use aerospace prototypes'
    ],
    typicalProducts: [
      'Quadcopter Rigid Arm Plates & Gimbals',
      'Factory Assembly Line Jigs & Fixtures',
      'Engine Bay Sensor Brackets & Air Intake Ducts',
      'Lightweight High-Torque Mechanical Wrenches'
    ],
    recommendedUseCase: 'Demanding engineering applications where maximum rigidity, zero flex, heat resistance, and a stealth matte aesthetic are required.',
    heroImage: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 10,
      flexibility: 1,
      detailLevel: 9,
      heatResistance: 10,
      heatDeflectionTemp: '150°C+ (302°F)',
      surfaceFinish: 'Stealth matte carbon texture (flawless)',
      durability: 'Maximum',
      outdoorResistance: 'Extreme'
    }
  }
];

export const RESIN_MATERIALS: MaterialItem[] = [
  {
    id: 'standard-resin',
    name: 'Standard Photopolymer Resin',
    category: 'resin',
    shortTag: 'Smooth & High Detail',
    tagline: 'Razor-sharp 50-micron layer resolution with injection-molded smoothness for visual master models.',
    description: 'Cured layer-by-layer using ultraviolet light on high-resolution SLA/MSLA printers. Standard resin delivers an ultra-smooth surface with virtually imperceptible layer lines, perfect for intricate tabletop characters, ornate display pieces, and product prototypes.',
    keyProperties: [
      'Microscopic 0.05mm layer height resolution',
      'Completely smooth, uniform surface without FDM lines',
      'Accepts primers, acrylic paints, and clear coats effortlessly',
      'Crisp rendering of tiny text, pores, and micro-geometry'
    ],
    bestFor: [
      'Tabletop RPG miniatures (Warhammer, D&D characters)',
      'Cosmetic concept design validation models',
      'Ornate architectural miniature details & columns',
      'Detailed artistic sculptures & busts'
    ],
    typicalProducts: [
      'Detailed 28mm-75mm Fantasy Miniatures',
      'High-Fidelity Architectural Scale Figures',
      'Custom Sculpted Portrait Busts & Trophies',
      'Electronic Enclosure Aesthetic Mockups'
    ],
    recommendedUseCase: 'High-detail cosmetic models and miniatures where visual fidelity is prioritized over rough impact resistance.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 6,
      flexibility: 2,
      detailLevel: 10,
      heatResistance: 6,
      heatDeflectionTemp: '60°C (140°F)',
      surfaceFinish: 'Glass-smooth, injection-grade',
      durability: 'Moderate (Can be brittle on drop)',
      outdoorResistance: 'Poor'
    }
  },
  {
    id: 'tough-resin',
    name: 'Tough & Durable Engineering Resin',
    category: 'resin',
    shortTag: 'ABS-Like Resin',
    tagline: 'High impact strength and elongation to yield, engineered for functional snap-fits and mechanical prototypes.',
    description: 'Formulated to simulate the mechanical characteristics of molded ABS plastic. Tough resin absorbs sudden impact, resists shattering when dropped, and allows for working snap-fits, living hinges, and load-bearing prototype enclosures.',
    keyProperties: [
      'Simulates ABS mechanical toughness with SLA smoothness',
      'High tensile strength with moderate elongation before break',
      'Resistant to cyclic stress and snap-fit fatigue',
      'Dimensional stability for precision interlocking assemblies'
    ],
    bestFor: [
      'Functional snap-fit electronic housings',
      'Wearable hardware prototypes & watch cases',
      'Low-volume functional assembly testing',
      'Impact-resistant medical & dental study aids'
    ],
    typicalProducts: [
      'Snap-Locking Smart Home Sensor Housings',
      'Custom Wearable Device Casings & Clips',
      'Threaded Connector Prototyping Sleeves',
      'High-Precision Assembly Test Couplings'
    ],
    recommendedUseCase: 'Prototypes requiring both resin-grade surface smoothness and the impact toughness to withstand functional testing.',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 8,
      flexibility: 5,
      detailLevel: 9,
      heatResistance: 7,
      heatDeflectionTemp: '70°C (158°F)',
      surfaceFinish: 'Smooth satin, resilient',
      durability: 'High',
      outdoorResistance: 'Moderate'
    }
  },
  {
    id: 'high-detail-resin',
    name: 'Ultra-High Detail Micro Resin',
    category: 'resin',
    shortTag: 'Microscopic Precision',
    tagline: 'Extreme resolution for micro-textures, jewelry masters, and dental study arches.',
    description: 'Formulated with ultra-low viscosity and high light-reactivity for capturing sub-millimeter features. Ideal for anatomical pre-clinical study models, master models for silicone mold casting, and micro-precision engineering mockups.',
    keyProperties: [
      'Sub-0.03mm layer heights for microscopic precision',
      'Porous-free, ultra-dense cured surface',
      'Zero thermal contraction after post-cure cycle',
      'Renders hair strands, micro-text, and intricate filigree'
    ],
    bestFor: [
      'Pre-clinical anatomical study & dental master arches',
      'Silicone mold master patterns & casting plugs',
      'Micro-fluidic channels & scientific test rigs',
      'High-end museum replica artifacts'
    ],
    typicalProducts: [
      'Dental Study Arches & Crown Mockups',
      'Micro-Gears & Watch Mechanism Prototypes',
      'Anatomical Bone Structure Replicas',
      'Intricate Sculptural Filigree Masters'
    ],
    recommendedUseCase: 'When micro-features smaller than 0.2mm must be clearly resolved and preserved.',
    heroImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 6,
      flexibility: 1,
      detailLevel: 10,
      heatResistance: 6,
      heatDeflectionTemp: '65°C (149°F)',
      surfaceFinish: 'Microscopic smooth clarity',
      durability: 'Moderate',
      outdoorResistance: 'Poor'
    }
  },
  {
    id: 'castable-resin',
    name: 'Castable Wax Resin (Jewelry & Metal Casting)',
    category: 'resin',
    shortTag: 'Direct Lost-Wax Casting',
    tagline: '20% wax-filled photopolymer that burns out cleanly with zero ash residue for direct precious metal casting.',
    description: 'Engineered specifically for jewelry makers and precision metal casters. This specialized resin allows jewelers to print custom rings, pendants, and intricate filigree settings and place them directly into gypsum investment molds for lost-wax casting in gold, silver, brass, or bronze.',
    keyProperties: [
      'Clean burnout with near-zero ash residue during kiln firing',
      'Smooth surfaces reduce polishing and precious metal loss',
      'Preserves micro-prongs, bezel walls, and pavé stone seats',
      'Direct pipeline from CAD model to gold or silver casting'
    ],
    bestFor: [
      'Custom gold & silver jewelry rings and bands',
      'Intricate filigree pendants & ornate earrings',
      'Dental castable copings and frameworks',
      'Custom brass bronze commemorative medallions'
    ],
    typicalProducts: [
      'Pavé Engagement Ring Master Castings',
      'Ornate Wedding Band Patterns',
      'Custom Initial Pendants & Charms',
      'Miniature Metal Sculpture Wax Masters'
    ],
    recommendedUseCase: 'Direct investment casting into precious metals (Gold, Silver, Bronze, Brass) without making traditional rubber molds.',
    heroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    specs: {
      strength: 4,
      flexibility: 1,
      detailLevel: 10,
      heatResistance: 4,
      heatDeflectionTemp: 'Burns out cleanly at 730°C',
      surfaceFinish: 'Wax-like, mirror castable',
      durability: 'Specialized for casting',
      outdoorResistance: 'N/A'
    }
  }
];

export const ALL_MATERIALS: MaterialItem[] = [...FILAMENT_MATERIALS, ...RESIN_MATERIALS];

export const MATERIAL_PRODUCT_GALLERIES: MaterialProductShowcase[] = [
  {
    materialId: 'pla',
    materialName: 'PLA+ Thermoplastic',
    categoryLabel: 'Aesthetic & Prototyping',
    products: [
      {
        title: 'Customized Desk Organizers & Trays',
        subtitle: 'Geometric cable management & dual-color trays',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        description: 'Vibrant matte desk setup items with custom compartments.'
      },
      {
        title: 'Articulated Figurines & Sculptures',
        subtitle: 'Multi-joint print-in-place dragon & creature models',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
        description: 'Smooth layer transitions and rich color vibrancy.'
      },
      {
        title: 'Architectural Scale Models',
        subtitle: 'Urban massing buildings and complex floor plans',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        description: 'Sharp corners, crisp window apertures, and scale accuracy.'
      },
      {
        title: 'Personalized Branded Nameplates',
        subtitle: 'Dual-extrusion raised lettering plaques',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        description: 'Distinct contrast between foreground text and background base.'
      }
    ]
  },
  {
    materialId: 'petg',
    materialName: 'PETG Co-Polymer',
    categoryLabel: 'Functional & Tough',
    products: [
      {
        title: 'Heavy-Duty Headphone & Controller Mounts',
        subtitle: 'Under-desk structural clamps with cable retention',
        image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
        description: 'Engineered to support heavy mechanical weight without sagging.'
      },
      {
        title: 'Electronics & Sensor Enclosures',
        subtitle: 'Weather-resistant snap-together housings',
        image: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=800&q=80',
        description: 'Impact absorption and thermal stability for active circuit boards.'
      },
      {
        title: 'Replacement Household Components',
        subtitle: 'Appliance knobs, dishwasher wheels, and door clips',
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
        description: 'Durable co-polymers restore broken equipment effortlessly.'
      },
      {
        title: 'Tool Wall Organizers & Custom Brackets',
        subtitle: 'Workshop pegboard hooks and power tool docks',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        description: 'Resists oil, moisture, and repeated impact stress.'
      }
    ]
  },
  {
    materialId: 'tpu',
    materialName: 'Flexible TPU 95A',
    categoryLabel: 'Elastic & Shock Absorbing',
    products: [
      {
        title: 'Custom Action Camera Crash Bumpers',
        subtitle: 'FPV drone camera protectors and corner guards',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        description: 'Absorbs extreme crash kinetic energy to safeguard camera lenses.'
      },
      {
        title: 'Industrial Sealing Gaskets & O-Rings',
        subtitle: 'Custom diameter fluid and dust barrier rings',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        description: 'Compresses tightly under screw tension for airtight seals.'
      },
      {
        title: 'Non-Slip Equipment Feet & Pads',
        subtitle: 'Vibration dampening bases for heavy audio speakers',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        description: 'Eliminates acoustic rattles and prevents desk surface scratching.'
      },
      {
        title: 'Ergonomic Tool Grips & Handles',
        subtitle: 'Molded custom contours for hand tools and levers',
        image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80',
        description: 'High-friction tactile grip reduces operator hand fatigue.'
      }
    ]
  },
  {
    materialId: 'carbon-fiber',
    materialName: 'Carbon Fiber Reinforced (PA-CF)',
    categoryLabel: 'High-Strength Engineering',
    products: [
      {
        title: 'Quadcopter & Drone Rigid Arms',
        subtitle: 'Zero-flex aerodynamic structural beams',
        image: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=800&q=80',
        description: 'Maximum motor thrust transfer with minimal airframe weight.'
      },
      {
        title: 'Automotive Engine Bay Mounting Brackets',
        subtitle: 'Heat-resistant sensor and harness mounts (150°C+)',
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
        description: 'Maintains dimensional rigidity inside hot engine compartments.'
      },
      {
        title: 'Factory Assembly Line Jigs & Fixtures',
        subtitle: 'Precision drill alignment and welding clamp guides',
        image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
        description: 'Replaces expensive CNC aluminum tooling with fast additive jigs.'
      },
      {
        title: 'High-Torque Custom Wrench & Lever Tools',
        subtitle: 'Non-marring composite mechanics tools',
        image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80',
        description: 'Rigid structural core delivers immense rotational torque.'
      }
    ]
  },
  {
    materialId: 'resin',
    materialName: 'SLA Photopolymer Resins',
    categoryLabel: 'Ultra-Fine Precision',
    products: [
      {
        title: 'Tabletop RPG Character Miniatures',
        subtitle: 'Intricate 28mm-75mm fantasy & sci-fi heroes',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
        description: 'Crisp armor chainmail, facial expressions, and weapon edges.'
      },
      {
        title: 'Direct Castable Jewelry Patterns',
        subtitle: 'Prong engagement rings and filigree earrings',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
        description: 'Ready for lost-wax investment casting into pure Gold or 925 Silver.'
      },
      {
        title: 'Pre-Clinical Anatomical Study Models',
        subtitle: 'Detailed skull, dental arches, and bone structures',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        description: 'Pre-operative planning and surgical visualization mockups.'
      },
      {
        title: 'Electronic Casing Master Prototypes',
        subtitle: 'Injection-mold proofing with micro text & logos',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        description: 'Glass-smooth finish demonstrates final production appearance.'
      }
    ]
  }
];

export const MATERIAL_DECISION_GUIDES: MaterialDecisionPathway[] = [
  {
    goal: 'I need a beautiful, affordable display model or prototype',
    recommendedMaterial: 'PLA / PLA+ Thermoplastic',
    materialId: 'pla',
    explanation: 'Unrivaled color options, crisp aesthetics, and cost-effective turnaround for display items and indoor proof-of-concepts.',
    badge: 'Best Value & Aesthetics'
  },
  {
    goal: 'I need a strong, functional part that handles daily wear & tear',
    recommendedMaterial: 'PETG Co-Polymer',
    materialId: 'petg',
    explanation: 'High impact tolerance, moisture resistance, and solid heat resilience up to 75°C for brackets, mounts, and appliances.',
    badge: 'Top Functional Choice'
  },
  {
    goal: 'I need an ultra-stiff, aerospace-grade engineering component',
    recommendedMaterial: 'Carbon Fiber Reinforced (PA-CF / PETG-CF)',
    materialId: 'carbon-fiber',
    explanation: 'Maximized stiffness-to-weight ratio, high heat resistance (150°C+), zero flex, and an exquisite matte stealth black finish.',
    badge: 'Industrial Strength'
  },
  {
    goal: 'I need a bendable, shock-absorbing or flexible component',
    recommendedMaterial: 'TPU 95A / 85A Polyurethane',
    materialId: 'tpu',
    explanation: 'Rubber-like elastomeric flexibility that bends and bounces back. Unbreakable under drops, vibration, or impact.',
    badge: 'Flexible & Impact Proof'
  },
  {
    goal: 'I need an outdoor part exposed to sun UV, rain, and weather',
    recommendedMaterial: 'ASA Weather-Resistant Polymer',
    materialId: 'asa',
    explanation: 'Built-in UV stabilizers prevent sunlight yellowing and degradation in hot tropical or exterior climates.',
    badge: 'All-Weather Durability'
  },
  {
    goal: 'I need an extremely detailed miniature, jewelry pattern, or smooth master',
    recommendedMaterial: 'SLA Photopolymer Resin',
    materialId: 'standard-resin',
    explanation: 'Microscopic 50-micron layers with injection-molded smoothness, capturing micro-features, jewelry prongs, and facial details.',
    badge: 'Microscopic Detail'
  }
];
