import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  Sparkles,
  MapPin,
  GraduationCap,
  Layers,
  Award,
  Mail,
  ChevronDown,
  Compass,
  Zap,
  ArrowDownCircle,
  Code,
  LineChart,
  Brain,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';

import CosmosCanvas from './components/CosmosCanvas';
import InteractiveCursor from './components/InteractiveCursor';
import LoadingScreen from './components/LoadingScreen';
import AboutSection from './components/AboutSection';
import EducationTimeline from './components/EducationTimeline';
import SkillsMap from './components/SkillsMap';
import ProjectsSection from './components/ProjectsSection';
import CertificationsGrid from './components/CertificationsGrid';
import ContactSection from './components/ContactSection';
import DiscoverySystem from './components/DiscoverySystem';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [showResume, setShowResume] = useState(false);
  const [immersiveCursor, setImmersiveCursor] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('immersiveCursor');
      if (saved !== null) return saved === 'true';
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !prefersReduced; // disable enhanced custom effects automatically on reduced-motion preference
    }
    return true;
  });
  const [windowHeight, setWindowHeight] = useState(800);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Synchronize scroll depth and window height
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('immersiveCursor', String(immersiveCursor));
  }, [immersiveCursor]);

  return (
    <div className={`relative bg-[#040404] min-h-screen text-white select-none overflow-x-hidden font-sans ${immersiveCursor ? 'immersive-cursor-active' : ''}`}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* 1. Cinematic Loading Screen Sequence */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative w-full min-h-screen"
        >
          {/* 2. Primary 3D Neural Cosmos Background Canvas */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <CosmosCanvas immersive={immersiveCursor} />
          </div>

          {/* Dedicated high fidelity Interactive Custom Cursor Canvas overlay */}
          <InteractiveCursor immersive={immersiveCursor} />

          {/* 3. Floating Hidden Discoveries Parallax Layer */}
          <DiscoverySystem scrollY={scrollY} />

          {/* 4. Minimalist Glassy Floating Header */}
          <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
            scrollY >= windowHeight
              ? 'bg-[#040404]/50 backdrop-blur-3xl border-cyan-500/10 h-18 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
              : scrollY > 80
              ? 'bg-[#040404]/35 backdrop-blur-xl border-white/[0.06] h-18'
              : 'bg-[#040404]/15 backdrop-blur-md border-white/[0.02] h-22'
          }`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex justify-between items-center">
              <a href="#" className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center p-[1px]">
                  <div className="w-full h-full bg-[#040404] rounded-full flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-white tracking-widest">AR</span>
                  </div>
                </div>
              </a>

              {/* Minimalist links (Desktop) */}
              <nav className="hidden md:flex items-center space-x-8 font-mono text-xs text-gray-300">
                <a href="#" className="hover:text-cyan-400 transition-colors uppercase">Home</a>
                <a href="#about" className="hover:text-cyan-400 transition-colors">ABOUT</a>
                <a href="#projects" className="hover:text-purple-400 transition-colors">PROJECTS</a>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">SKILLS</a>
                
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-purple-400 transition-colors"
                >
                  CONTACT
                </a>
              </nav>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="text-gray-300 hover:text-cyan-400 transition-colors p-2"
                  aria-label="Open Mobile Menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </header>

          {/* Mobile Drawer Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 bg-[#040404]/80 backdrop-blur-sm z-[60] md:hidden"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-full w-[280px] bg-gradient-to-b from-[#0A0E1A] to-[#040404] border-l border-white/5 shadow-2xl z-[70] md:hidden flex flex-col"
                >
                  <div className="p-6 flex justify-end">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-300 hover:text-purple-400 transition-colors p-2 rounded-full hover:bg-white/5"
                      aria-label="Close Mobile Menu"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <nav className="flex flex-col space-y-8 px-8 py-4 flex-1 font-mono text-sm text-gray-300">
                    <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-cyan-400 transition-colors tracking-widest uppercase">Home</a>
                    <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-cyan-400 transition-colors tracking-widest uppercase">About</a>
                    <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors tracking-widest uppercase">Projects</a>
                    <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-cyan-400 transition-colors tracking-widest uppercase">Skills</a>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-purple-400 transition-colors tracking-widest uppercase"
                    >
                      Contact
                    </a>
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* 5. Main Hero Screen Layer */}
          <main className="relative z-20">
            
            {/* Viewport Landing Area */}
            <section className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
              {/* Outer Grids */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center relative py-12 md:py-0">
                
                {/* Left Side: Display Typography */}
                <div className="lg:col-span-7 space-y-8 select-text">
                  <div className="space-y-4">
                    {/* Status badge */}
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 block animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-bold">PORTFOLIO 2026</span>
                    </div>

                    <h1 id="hero-title" className="text-5xl md:text-7xl font-mono tracking-tight font-bold text-[#ff0070] leading-[1.08]">
                      ANGEL ROSE C D
                    </h1>

                    <h2 id="hero-subtitle" className="text-xl md:text-2xl font-mono text-cyan-400 uppercase tracking-widest border-b border-white/5 pb-2 max-w-md font-medium">
                      Artificial Intelligence & Data Science Engineer
                    </h2>
                  </div>

                  <p id="hero-statement" className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl font-sans">
                    Building intelligent systems that solve real-world problems through Artificial Intelligence, machine learning, and innovative thinking.
                  </p>



                  {/* Action Link Buttons */}
                  {/*<div className="flex flex-wrap gap-4 pt-4">
                    <button
                      onClick={() => {
                        const el = document.getElementById('projects');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white font-mono text-xs tracking-widest uppercase font-bold rounded-xl shadow-lg hover:translate-y-[-2px] transition-all cursor-pointer"
                    >
                      View Projects
                    </button>

                    <button
                      onClick={() => setShowResume(true)}
                      className="px-6 py-3.5 bg-cyan-400/10 hover:bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/20 hover:border-[#00D4FF]/40 font-mono text-xs tracking-widest uppercase rounded-xl transition-all font-bold cursor-pointer"
                    >
                      Download Resume
                    </button>

                    <button
                      onClick={() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 bg-[#0A0E1A]/60 hover:bg-white/5 text-white border border-white/10 hover:border-white/20 font-mono text-xs tracking-widest uppercase rounded-xl transition-all cursor-pointer"
                    >
                      Contact Me
                    </button>
                  </div>*/}
                </div>

                {/* Right Side: Subtle Pointer Indicator and Depth Frame */}
                <div className="lg:col-span-5 h-[280px] lg:h-[450px] flex items-center justify-center relative pointer-events-none">
                  {/* Decorative Neural Web Sphere overlay representing central core */}
                  <div className="absolute w-72 h-72 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06)_0%,transparent_70%)] animate-pulse" />
                  <div className="absolute w-[220px] h-[220px] rounded-full border border-double border-white/5 tracking-[0.2em] flex flex-col items-center justify-center space-y-1.5 p-4 text-center">
                    <Sparkles className="w-6 h-6 text-purple-400 animate-spin-slow" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 block font-bold">Interactive Cosmos</span>
                    <span className="text-[9px] text-gray-500 font-sans max-w-[140px] leading-tight">Sweep your cursor to trigger temporary neural pathways in space.</span>
                  </div>
                </div>

              </div>

              {/* Bounce down scroll indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 text-gray-500 text-xxs tracking-widest font-mono select-none pointer-events-none">
                <span>SCROLL DEEPER</span>
                <ChevronDown className="w-4 h-4 animate-bounce text-purple-500/80" />
              </div>
            </section>

            {/* Informational Sections with elegant cinematic transitions */}
            <div id="scrolled-sections-ledger" className="space-y-4 shadow-xl relative bg-gradient-to-b from-transparent via-[#040404]/80 to-[#040404] pb-24">
              
              {/* About story section */}
              <AboutSection />

              {/* Academic Milestones on timeline */}
              <EducationTimeline />

              {/* Skills Interactive orbiting Core Map */}
              <SkillsMap />

              {/* Cinematic expandable projects list */}
              <ProjectsSection />

              {/* verified credentials floating elements */}
              <CertificationsGrid />

              {/* Contact details ledger and printable cv */}
              <ContactSection showResume={showResume} setShowResume={setShowResume} />

            </div>

            {/* Micro footer detail elements */}
            <footer className="py-8 bg-[#040404] border-t border-white/[0.03] text-center font-mono text-xxs text-gray-650 relative z-30">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>@2026 ANGEL ROSE CD. ALL RIGHTS RESERVED.</p>
                <p className="text-[9px] text-gray-600">CONSTRUCTED WITH PRECISION</p>
              </div>
            </footer>

          </main>

        </motion.div>
      )}
    </div>
  );
}
