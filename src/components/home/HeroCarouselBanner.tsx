import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GallerySlide {
  id: string;
  tag: string;
  badge: string;
  title: string;
  highlightWord: string;
  subtitle: string;
  imageUrl: string;
  specs: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  accentColor: string;
  threeWireType: 'gear' | 'lattice' | 'torus' | 'helix';
}

const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 'industrial',
    tag: '01 // INDUSTRIAL PRECISION',
    badge: 'DIGITAL MANUFACTURING LAB',
    title: 'HIGH-TOLERANCE DIGITAL MANUFACTURING',
    highlightWord: 'MANUFACTURING',
    subtitle: 'Industrial-grade precision 3D printing with 0.05mm micron layer fidelity. Carbon-fiber composites, high-temp nylon, and production-ready aerospace durability.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=85&w=2200',
    specs: ['±0.05MM TOLERANCE', 'CARBON PA12 & PEEK', 'RAPID TURNAROUND'],
    ctaPrimary: { label: 'REQUEST 3D QUOTE', href: '/custom-print' },
    ctaSecondary: { label: 'EXPLORE CREATIONS', href: '/creations' },
    accentColor: '#FF8A00',
    threeWireType: 'gear',
  },
  {
    id: 'rapid-cad',
    tag: '02 // RAPID PROTOTYPING',
    badge: '24-HOUR HARDWARE SPRINT',
    title: 'FROM CAD SLICES TO FUNCTIONAL HARDWARE',
    highlightWord: 'HARDWARE',
    subtitle: 'Direct STL and STEP CAD precision slicing into physical evaluation models. Evaluate ergonomics, snap-fits, and mechanical assemblies before full tooling.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=85&w=2200',
    specs: ['SNAP-FIT TOLERANCE', 'FULL-COLOR UV RESIN', 'INSTANT SLICER'],
    ctaPrimary: { label: 'START A CUSTOM PROJECT', href: '/custom-print' },
    ctaSecondary: { label: 'WHAT WE MAKE', href: '/#what-we-make' },
    accentColor: '#FFC43C',
    threeWireType: 'lattice',
  },
  {
    id: 'architectural',
    tag: '03 // PARAMETRIC ARCHITECTURE',
    badge: 'PARAMETRIC & GENERATIVE DESIGN',
    title: 'SCULPTURAL VISIONS & PARAMETRIC SCALE MODELS',
    highlightWord: 'SCULPTURAL',
    subtitle: 'Topographic terrain maps, algorithmic architectural facades, and limited-edition gallery installations with flawless museum-grade silk finishes.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=2200',
    specs: ['TOPOGRAPHIC TERRAIN', 'ORGANIC LATTICES', 'MUSEUM-GRADE SILK'],
    ctaPrimary: { label: 'COMMISSION ART PIECE', href: '/custom-print' },
    ctaSecondary: { label: 'COMMUNITY SHOWCASE', href: '/community' },
    accentColor: '#00C896',
    threeWireType: 'torus',
  },
  {
    id: 'biomedical',
    tag: '04 // ADVANCED R&D',
    badge: 'SURGICAL & BIOMEDICAL GRADE',
    title: 'PRECISION BIOMEDICAL & RESEARCH MODELS',
    highlightWord: 'BIOMEDICAL',
    subtitle: 'Optically clear sterilizable resins, patient-specific surgical study guides, and lab fixtures engineered with zero dimensional distortion.',
    imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=85&w=2200',
    specs: ['MICRON FIDELITY', 'BIO-COMPATIBLE RESINS', 'CUSTOM STUDY RIGS'],
    ctaPrimary: { label: 'RESEARCH PRINT INQUIRY', href: '/custom-print' },
    ctaSecondary: { label: 'EXPLORE INDUSTRIES', href: '/industries' },
    accentColor: '#38BDF8',
    threeWireType: 'helix',
  },
];

export const HeroCarouselBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [is3DActive, setIs3DActive] = useState(true);

  // References for GSAP Scroll, Animation & DOM
  const bannerWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const bottomGradientRef = useRef<HTMLDivElement>(null);
  const slideContentRef = useRef<HTMLDivElement>(null);
  const imageElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const threeMountRef = useRef<HTMLDivElement>(null);

  // Three.js State
  const threeState = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    floatingMeshGroup: THREE.Group | null;
    particles: THREE.Points | null;
    targetRotation: { x: number; y: number };
    currentRotation: { x: number; y: number };
    animId: number | null;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    floatingMeshGroup: null,
    particles: null,
    targetRotation: { x: 0, y: 0 },
    currentRotation: { x: 0, y: 0 },
    animId: null,
  });

  const slideDuration = 6500;

  // -------------------------------------------------------------
  // 1. GSAP SCROLLTRIGGER: SEAMLESS SCROLL DISSOLVE & PARALLAX
  // The user scrolls and the carousel melts into the page invisibly!
  // -------------------------------------------------------------
  useEffect(() => {
    const banner = bannerWrapperRef.current;
    const bg = parallaxBgRef.current;
    const content = slideContentRef.current;
    const gradient = bottomGradientRef.current;

    if (!banner || !bg) return;

    const ctx = gsap.context(() => {
      // Scrub parallax of the background image downwards as user scrolls
      gsap.to(bg, {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: banner,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Seamlessly fade and elevate content as user scrolls down
      if (content) {
        gsap.to(content, {
          y: -70,
          opacity: 0,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: banner,
            start: 'top top',
            end: '80% top',
            scrub: true,
          },
        });
      }

      // Seamless gradient blend enhancement on scroll
      if (gradient) {
        gsap.to(gradient, {
          height: '55%',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: banner,
            start: '30% top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, banner);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 2. THREE.JS: FULL-BLEED AMBIENT 3D WEBGL INTERACTION LAYER
  // -------------------------------------------------------------
  useEffect(() => {
    const mount = threeMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }
    mount.appendChild(renderer.domElement);

    // Dynamic studio lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xff8a00, 3.5);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x00c896, 2.0);
    fillLight.position.set(-6, -3, 3);
    scene.add(fillLight);

    // Floating procedural particulate dust
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const meshGroup = new THREE.Group();
    // Position mesh comfortably on the right side of the screen on desktop
    meshGroup.position.set(window.innerWidth > 1024 ? 2.2 : 0, 0, 0);
    scene.add(meshGroup);

    threeState.current = {
      renderer,
      scene,
      camera,
      floatingMeshGroup: meshGroup,
      particles,
      targetRotation: { x: 0, y: 0 },
      currentRotation: { x: 0, y: 0 },
      animId: null,
    };

    let clock = new THREE.Clock();
    const render = () => {
      const elapsed = clock.getElapsedTime();
      const state = threeState.current;

      state.currentRotation.x += (state.targetRotation.x - state.currentRotation.x) * 0.05;
      state.currentRotation.y += (state.targetRotation.y - state.currentRotation.y) * 0.05;

      if (state.floatingMeshGroup) {
        state.floatingMeshGroup.rotation.y = state.currentRotation.y + elapsed * 0.35;
        state.floatingMeshGroup.rotation.x = state.currentRotation.x + Math.sin(elapsed * 0.5) * 0.15;
        state.floatingMeshGroup.position.y = Math.sin(elapsed * 0.7) * 0.15;
      }

      if (state.particles) {
        state.particles.rotation.y = elapsed * 0.03;
        state.particles.rotation.x = Math.sin(elapsed * 0.02) * 0.06;
      }

      renderer.render(scene, camera);
      state.animId = requestAnimationFrame(render);
    };
    render();

    // Mouse movement parallax for 3D elements
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      threeState.current.targetRotation.y = x * 0.85;
      threeState.current.targetRotation.x = -y * 0.55;
    };

    const handleMouseLeave = () => {
      threeState.current.targetRotation.x = 0;
      threeState.current.targetRotation.y = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (meshGroup) {
        meshGroup.position.set(w > 1024 ? 2.2 : 0, 0, 0);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (threeState.current.animId) cancelAnimationFrame(threeState.current.animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // Update Three.js procedural 3D wireframe mesh
  const update3DGeometry = useCallback((slideIndex: number) => {
    const { floatingMeshGroup, scene } = threeState.current;
    if (!floatingMeshGroup || !scene) return;

    while (floatingMeshGroup.children.length > 0) {
      const child = floatingMeshGroup.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
      floatingMeshGroup.remove(child);
    }

    const currentSlideData = GALLERY_SLIDES[slideIndex];
    const wireColor = new THREE.Color(currentSlideData.accentColor);

    const wireMat = new THREE.MeshBasicMaterial({
      color: wireColor,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.3,
      metalness: 0.9,
      transparent: true,
      opacity: 0.7,
    });

    if (currentSlideData.threeWireType === 'gear') {
      const geo = new THREE.CylinderGeometry(1.6, 1.6, 0.65, 16);
      const mesh = new THREE.Mesh(geo, wireMat);
      const inner = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.5, 12), innerMat);
      floatingMeshGroup.add(mesh);
      floatingMeshGroup.add(inner);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.05, 12, 36), wireMat);
      ring.rotation.x = Math.PI / 2;
      floatingMeshGroup.add(ring);
    } else if (currentSlideData.threeWireType === 'lattice') {
      const geo = new THREE.IcosahedronGeometry(1.7, 1);
      const mesh = new THREE.Mesh(geo, wireMat);
      const inner = new THREE.Mesh(new THREE.OctahedronGeometry(1.1, 0), innerMat);
      floatingMeshGroup.add(mesh);
      floatingMeshGroup.add(inner);
    } else if (currentSlideData.threeWireType === 'torus') {
      const geo = new THREE.TorusKnotGeometry(1.3, 0.4, 80, 16, 2, 3);
      const mesh = new THREE.Mesh(geo, wireMat);
      floatingMeshGroup.add(mesh);
    } else {
      const geo = new THREE.TorusGeometry(1.6, 0.5, 16, 40);
      const mesh = new THREE.Mesh(geo, wireMat);
      floatingMeshGroup.add(mesh);
    }

    gsap.fromTo(
      floatingMeshGroup.scale,
      { x: 0.5, y: 0.5, z: 0.5 },
      { x: 1, y: 1, z: 1, duration: 0.65, ease: 'back.out(1.5)' }
    );
  }, []);

  // -------------------------------------------------------------
  // 3. GSAP & ANIME.JS: SLIDE TRANSITION ANIMATION
  // -------------------------------------------------------------
  const animateSlide = useCallback((nextIndex: number) => {
    // A. GSAP: Seamless Ken-Burns zoom and cross-fade of images
    imageElementsRef.current.forEach((imgEl, idx) => {
      if (!imgEl) return;
      if (idx === nextIndex) {
        gsap.killTweensOf(imgEl);
        gsap.fromTo(
          imgEl,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        );
      } else {
        gsap.to(imgEl, { opacity: 0, duration: 0.9, ease: 'power2.inOut' });
      }
    });

    // B. GSAP: Editorial Stagger for Headline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.08
      );
    }

    // C. Update Three.js 3D model
    update3DGeometry(nextIndex);
  }, [update3DGeometry]);

  useEffect(() => {
    animateSlide(currentSlide);
  }, [currentSlide, animateSlide]);

  // -------------------------------------------------------------
  // 4. AUTO-SLIDE TIMER
  // -------------------------------------------------------------
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 40;
    const step = (intervalTime / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % GALLERY_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, slideDuration]);

  const handleSelectSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const current = GALLERY_SLIDES[currentSlide];

  return (
    <div
      ref={bannerWrapperRef}
      className="relative w-full overflow-hidden select-none text-white"
      style={{
        // Full width grand cinematic banner height
        minHeight: '88vh',
      }}
    >
      {/* ========================================================= */}
      {/* 1. FULL-BLEED BORDERLESS BACKGROUND IMAGES (EDGE-TO-EDGE) */}
      {/* ========================================================= */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-[#111111] pointer-events-none will-change-transform"
      >
        {GALLERY_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            ref={(el) => (imageElementsRef.current[idx] = el)}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
              opacity: idx === 0 ? 1 : 0,
              zIndex: idx === currentSlide ? 1 : 0,
            }}
          />
        ))}

        {/* Deep cinematic vignette anchored in bottom-left for maximum typographic punch & razor contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/40 to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent z-[2]" />
      </div>

      {/* ========================================================= */}
      {/* 2. THREE.JS FULL-BLEED 3D HOLOGRAPHIC OVERLAY */}
      {/* ========================================================= */}
      <div
        className={`absolute inset-0 w-full h-full z-[3] pointer-events-none transition-opacity duration-500 ${
          is3DActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          ref={threeMountRef}
          className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
          title="Interactive 3D WebGL Canvas — Move mouse to tilt in 3D"
        />
      </div>

      {/* ========================================================= */}
      {/* 3. HEAD TEXT: BALANCED GOLDEN RATIO BOTTOM-LEFT CORNER */}
      {/* Refined editorial typography: 2 lines max, elegant breathing space */}
      {/* ========================================================= */}
      <div
        ref={slideContentRef}
        className="absolute bottom-8 left-6 sm:bottom-10 sm:left-10 md:bottom-12 md:left-12 lg:bottom-14 lg:left-14 z-20 max-w-xl lg:max-w-2xl text-left pointer-events-auto pr-4"
      >
        {/* BALANCED EDITORIAL HEADLINE */}
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] font-black font-heading uppercase tracking-tight leading-[1.05] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
        >
          {current.title.split(current.highlightWord)[0]}
          <span
            className="underline decoration-3 sm:decoration-4 underline-offset-4 sm:underline-offset-6"
            style={{ textDecorationColor: current.accentColor }}
          >
            {current.highlightWord}
          </span>
          {current.title.split(current.highlightWord)[1]}
        </h2>

        {/* Minimal Slide Indicator Pills */}
        <div ref={thumbStripRef} className="flex items-center gap-2 sm:gap-2.5 pt-3 sm:pt-3.5">
          {GALLERY_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSelectSlide(idx)}
                className={`group relative h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'w-8 sm:w-12' : 'w-2 sm:w-2.5 opacity-40 hover:opacity-100 hover:w-5'
                }`}
                style={{
                  backgroundColor: isActive ? slide.accentColor : 'rgba(255,255,255,0.7)',
                }}
                aria-label={`Slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. SEAMLESS DISSOLVE EDGE (ONLY AT THE VERY BOTTOM LIP) */}
      {/* Blends smoothly into the #FFF9ED cream canvas without washing out the text */}
      {/* ========================================================= */}
      <div
        ref={bottomGradientRef}
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 w-full h-16 sm:h-20 pointer-events-none z-[4]"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,249,237,0) 0%, rgba(255,249,237,0.4) 40%, #FFF9ED 100%)',
        }}
      />
    </div>
  );
};

export default HeroCarouselBanner;
