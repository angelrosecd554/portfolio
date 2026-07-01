import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Compass, Zap, HelpCircle, Layers, CheckCircle } from 'lucide-react';
import { SkillNode } from '../types';

export default function SkillsMap() {
  const [activeCategory, setActiveCategory] = useState<'language' | 'tool' | 'soft'>('language');
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  const skills: SkillNode[] = [
    // Programming Languages
    { name: 'Python', category: 'language', level: 93, info: 'Primary engine for deep learning, NLP parsing, and data architecture pipelines.' },
    { name: 'C', category: 'language', level: 80, info: 'Familiar with system memory handling and hardware optimization patterns.' },
    { name: 'Java', category: 'language', level: 75, info: 'Strong OOP fundamentals, software life cycles, and backend structures.' },
    { name: 'R', category: 'language', level: 78, info: 'Exploratory data analysis, matrix calculus, and statistical distributions.' },

    // Development Tools
    { name: 'Linux', category: 'tool', level: 85, info: 'Command scripts, process workflows, system services, and environments.' },
    { name: 'VS Code', category: 'tool', level: 90, info: 'Primary text editor configured with debuggers for quick script edits.' },
    { name: 'PyCharm', category: 'tool', level: 88, info: 'Employed to model large neural structures and manage deep repository files.' },
    { name: 'Jupyter Notebook', category: 'tool', level: 92, info: 'EDA visualization, dataset profiling, and interactive training steps.' },
    { name: 'R Studio', category: 'tool', level: 80, info: 'Utilized during scholastic labs for statistical charting and analytics.' },

    // Soft Skills
    { name: 'Leadership', category: 'soft', level: 85, info: 'Elected team coordinate during Hackathons and campus technology initiatives.' },
    { name: 'Communication', category: 'soft', level: 90, info: 'Explaining complex mathematical data models to clients and teams simply.' },
    { name: 'Teamwork', category: 'soft', level: 92, info: 'Cooperating inside paired programming networks to push finished assets.' },
    { name: 'Adaptability', category: 'soft', level: 95, info: 'Thriving in fast shifting frameworks and quick framework updates.' },
    { name: 'Problem Solving', category: 'soft', level: 94, info: 'Formulating logic from first principles to locate performance bottlenecks.' },
    { name: 'Quick Learner', category: 'soft', level: 95, info: 'Mastering novel architectures and SDK protocols in minimal time frames.' }
  ];

  const currentSkills = skills.filter((s) => s.category === activeCategory);

  // Position multipliers for orbital layout based on length of items
  const getOrbitalCoordinates = (index: number, total: number) => {
    const radius = window.innerWidth < 768 ? 100 : 160;
    // Distribute angles evenly
    const angle = (index / total) * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full text-white z-20">
      <div className="space-y-4 text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-lime-500/10 border border-lime-500/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 block" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-lime-400 font-medium">Core Expertise</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-mono tracking-tight font-bold">
          TECHNICAL SKILLS
        </h2>
        <p className="text-sm text-gray-400 font-mono max-w-xl mx-auto">
          Choose a skill category below. Hover or touch any skill node to read details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Interactive Categories & Text */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-mono font-bold text-white tracking-wide">
              SKILL CATEGORIES
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Explore key technical domains, programming languages, development environments, and essential professional capabilities.
            </p>
          </div>

          <div id="skills-selector-buttons" className="flex flex-col space-y-3">
            {[
              { id: 'language', label: 'Languages', desc: 'Core programming syntax, algorithms, and scripting languages.', color: 'border-cyan-500/25 text-cyan-400 bg-cyan-500/5' },
              { id: 'tool', label: 'Development Tools', desc: 'Operating systems, primary editors, IDEs, and environments.', color: 'border-purple-500/25 text-purple-400 bg-purple-500/5' },
              { id: 'soft', label: 'Professional Skills', desc: 'Leadership, collaboration, communication, and adaptability.', color: 'border-lime-500/25 text-[#A3FF12] bg-lime-500/5' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setHoveredSkill(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-300 backdrop-blur-md ${
                  activeCategory === cat.id
                    ? 'border-white/20 bg-white/10 ring-1 ring-white/10 shadow-lg scale-[1.02]'
                    : 'border-white/[0.04] bg-[#0A0E1A]/40 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-mono font-bold uppercase tracking-wider">{cat.label}</span>
                  {activeCategory === cat.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  )}
                </div>
                <p className="text-[11px] text-gray-400 font-sans leading-tight">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Orbital Canvas Map */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[460px] md:min-h-[500px]">
          {/* Orbital Circle Maps dashed line */}
          <div className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full border border-dashed border-white/5 pointer-events-none animate-spin-slow" />
          <div className="absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full border border-double border-white/[0.02] pointer-events-none" />

          {/* Central AI core element */}
          <div className="absolute z-10 flex flex-col items-center justify-center">
            {/* Spinning outward rings */}
            <div className="absolute w-24 h-24 rounded-full border border-cyan-400/20 animate-ping opacity-45 pointer-events-none" />
            <div className="absolute w-28 h-28 rounded-full border border-purple-500/25 animate-spin-slow pointer-events-none" />
            
            {/* Core container sphere */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-950 via-black to-slate-950 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/20 backdrop-blur-md relative group cursor-pointer">
              <Cpu className="w-6 h-6 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute -bottom-7 w-20 text-center">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#00D4FF] font-bold">KNOWLEDGE</span>
              </div>
            </div>
          </div>

          {/* Render individual Skills Nodes orbiting around Core */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {currentSkills.map((skill, index) => {
                const total = currentSkills.length;
                const { x, y } = getOrbitalCoordinates(index, total);
                const isHovered = hoveredSkill?.name === skill.name;

                // Adjust positioning style to rotate around absolute center of parent
                return (
                  <div
                    key={skill.name}
                    className="absolute"
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                  >
                    <motion.div
                      animate={isHovered ? { scale: [1.15, 1.25, 1.15] } : { scale: 1 }}
                      transition={isHovered ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onClick={() => setHoveredSkill(skill)}
                      className={`relative w-20 h-20 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center backdrop-blur-md cursor-pointer border transition-colors duration-300 ${
                        isHovered
                          ? 'bg-gradient-to-br from-indigo-900 to-[#040404] border-cyan-400 text-white shadow-md shadow-cyan-400/30'
                          : 'bg-[#0A0E1A]/70 border-white/10 text-gray-300 hover:border-purple-300'
                      }`}
                    >
                      {/* Connection Line to Core (rendered with SVG line) */}
                      <svg className="absolute inset-0 overflow-visible pointer-events-none w-full h-full">
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`calc(${-x}px + 50%)`}
                          y2={`calc(${-y}px + 50%)`}
                          stroke={isHovered ? 'rgba(0, 212, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)'}
                          strokeWidth={isHovered ? '1.5' : '0.5'}
                          strokeDasharray={isHovered ? '2 2' : 'none'}
                        />
                      </svg>

                      {/* Display name initial or micro text */}
                      <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-wider text-center font-bold p-1 leading-tight break-words max-w-full">
                        {skill.name}
                      </span>

                      {/* Level progress arc on node outer rim */}
                      {skill.level && (
                        <div className="absolute inset-[-1px] rounded-full border border-transparent border-t-cyan-500/40 border-r-purple-500/20 opacity-60" />
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Floating Detail Dialogue for hovered Skill Node information */}
          <div className="absolute bottom-[-16px] md:bottom-2 left-1/2 -translate-x-1/2 w-[280px] md:w-[360px] min-h-[96px] z-20">
            <AnimatePresence mode="wait">
              {hoveredSkill ? (
                <motion.div
                  key={hoveredSkill.name}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border border-cyan-400/40 rounded-xl shadow-xl backdrop-blur-md text-center space-y-2 relative"
                >
                  <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-t border-l border-cyan-400/40 bg-indigo-950" />
                  
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider font-mono">
                      {hoveredSkill.name}
                    </span>
                    <span className="text-xxs font-mono text-lime-400 px-1.5 py-0.5 bg-lime-500/10 rounded">
                      PROFICIENCY: {hoveredSkill.level}%
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-normal text-left pl-1 font-sans">
                    {hoveredSkill.info}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="text-center text-xs font-mono text-gray-500 flex items-center justify-center space-x-1.5 py-6"
                >
                  <HelpCircle className="w-4 h-4 text-purple-500" />
                  <span>Select any skill node above to inspect details</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
