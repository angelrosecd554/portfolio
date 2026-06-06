import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Calendar, Compass, Star, Award } from 'lucide-react';

export default function EducationTimeline() {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const academicMilestones = [
    {
      id: 1,
      year: '2022 - 2023',
      phase: 'Scholastic Inception',
      title: 'Foundation & Core Engineering',
      institution: 'Vimal Jyothi Engineering College, Kannur',
      details: 'Started Bachelor of Technology in AI and Data Science. Mastered algorithmic paradigms, database architectures, discrete math, and standard computer applications.',
      skillsLearned: ['Python Core', 'Structured C Programing', 'Database Management Systems'],
      highlight: 'First-class academic clearance and initialized college AI student club presence.'
    },
    {
      id: 2,
      year: '2023 - 2024',
      phase: 'Algorithmic Evolution',
      title: 'Core Machine Learning & Theory',
      institution: 'Vimal Jyothi Engineering College, Kannur',
      details: 'Focussed extensively on mathematical modeling, statistics, linear algebra, and data mining, cementing deep understanding of algorithm lifecycle.',
      skillsLearned: ['Applied R Coding', 'Statistics & Calculus', 'Data Visualization (Matplotlib, R Studio)'],
      highlight: 'Successfully cleared NPTEL Certification from IIT Madras for Introduction to Machine Learning.'
    },
    {
      id: 3,
      year: '2024 - 2025',
      phase: 'Architectural Integration',
      title: 'Advanced AI Systems & NLP',
      institution: 'Vimal Jyothi Engineering College, Kannur',
      details: 'Deep-dived into intelligence architectures: NLP tokenizers, transformers, neural networks, and optimizing weights. Developed first major AI travel companion systems.',
      skillsLearned: ['Natural Language Processing', 'Neural Network Architectures', 'TensorFlow/PyTorch Basics'],
      highlight: 'Won Tink-Her-Hack 3.0 Hacker Certificate from TinkerHub Foundation and finished Applied AI Diploma.'
    },
    {
      id: 4,
      year: '2025 - 2026',
      phase: 'Practical Maturity',
      title: 'Final Year Specialization & Research',
      institution: 'Vimal Jyothi Engineering College, Kannur',
      details: 'Created high-efficiency networks with dynamic layer skipping for CPU constraints and integrated healthcare summaries with document intelligence NLP pipeline.',
      skillsLearned: ['Deep Neural Networks', 'Resource-Constrained Model Optimization', 'System Deployment'],
      highlight: 'Maintained current CGPA: 7.35 with major senior capstones fully completed.'
    }
  ];

  return (
    <section id="education" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full text-white z-20">
      <div className="space-y-4 text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 block" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400 font-medium">Academic Journey</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-mono tracking-tight font-bold">
          EDUCATION
        </h2>
        <p className="text-sm text-gray-400 font-mono max-w-xl mx-auto">
          Explore my academic foundations, milestones, and technical achievements.
        </p>
      </div>

      {/* Grid or Interactive Row Timeline */}
      <div id="education-timeline-wrapper" className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Horizontal background spline connecting nodes */}
        <div className="absolute top-[88px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-cyan-500/20 via-purple-500/35 to-lime-400/20 hidden md:block" />

        {academicMilestones.map((milestone, idx) => {
          const isHovered = hoveredPhase === milestone.id;
          
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredPhase(milestone.id)}
              onMouseLeave={() => setHoveredPhase(null)}
              className="relative p-6 bg-[#0A0E1A]/40 border border-white/5 rounded-xl hover:border-purple-500/30 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group cursor-pointer h-full"
            >
              {/* Pulsing Neural Junction Core */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono text-cyan-400 font-medium tracking-widest uppercase">
                  {milestone.year}
                </span>

                <div className="relative">
                  {/* Glowing halo ring */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-purple-400/40 animate-ping-slow ${
                    isHovered ? 'opacity-100 scale-125' : 'opacity-30'
                  }`} />
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'bg-[#8B5CF6] text-white shadow-[#8B5CF6]/50 shadow-md' : 'bg-white/5 text-purple-400 border border-white/10'
                  }`}>
                    {milestone.id === 4 ? (
                      <GraduationCap className="w-5 h-5 animate-pulse" />
                    ) : (
                      <Compass className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Epoch Details */}
              <div className="space-y-3 flex-1 mb-4">
                <p className="text-[10px] font-mono tracking-widest text-[#A3FF12] uppercase font-bold">
                  {milestone.phase}
                </p>
                <h3 className="text-lg font-mono font-bold text-white group-hover:text-purple-300 transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {milestone.details}
                </p>
              </div>

              {/* Expand details on hover or fixed on mobile with neat container */}
              <div className="pt-4 border-t border-white/5 mt-auto space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {milestone.skillsLearned.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 text-[9px] font-mono rounded bg-white/5 text-gray-300 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Highlight text */}
                <div className="flex items-start space-x-1.5 pt-1">
                  <Star className="w-3 h-3 text-[#A3FF12] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-purple-200/90 font-mono leading-tight">
                    {milestone.highlight}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Big University Highlight Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-12 p-6 md:p-8 bg-gradient-to-r from-[#0A0E1A]/70 via-[#040404] to-[#0A0E1A]/70 border border-white/5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xs font-mono text-[#A3FF12] uppercase tracking-[0.2em] font-bold">Primary Alma Mater</h4>
            <h3 className="text-lg md:text-xl font-mono font-bold text-white">Vimal Jyothi Engineering College</h3>
            <p className="text-xs text-gray-400 font-sans">Affiliated with APJ Abdul Kalam Technological University (KTU)</p>
          </div>
        </div>
        <div className="text-right md:text-right w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 flex md:flex-col justify-between items-center md:items-end">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Active Standing</span>
          <span className="text-3xl font-mono text-purple-400 font-bold">7.35 <span className="text-xs text-gray-400 font-sans font-normal">CGPA</span></span>
        </div>
      </motion.div>
    </section>
  );
}
