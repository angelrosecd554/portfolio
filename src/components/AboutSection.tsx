import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Eye, Workflow, BrainCircuit } from 'lucide-react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'mission' | 'focus' | 'vibe'>('mission');

  const specialties = [
    {
      icon: <BrainCircuit className="w-5 h-5 text-cyan-400" />,
      title: 'Machine Learning',
      desc: 'Formulating robust mathematical and statistical models for predictive analytics, training high-performance neural layers, and optimizing model sizes.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      title: 'Natural Language Processing',
      desc: 'Developing models for text understanding, document parsing, information retrieval, sentiment modeling, and text generation.'
    },
    {
      icon: <Workflow className="w-5 h-5 text-lime-400" />,
      title: 'Intelligent Automation',
      desc: 'Building agents and end-to-end processing systems that automate tedious human actions with cognitive reasoning.'
    }
  ];

  return (
    <section id="about" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full text-white z-20">
      {/* Decorative vertical separator */}
      <div className="absolute top-0 left-0 w-[1px] h-32 bg-gradient-to-b from-cyan-500/30 to-transparent hidden md:block" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading and Story */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 block" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-medium">Professional Background</span>
            </div>
            <h2 id="about-section-heading" className="text-4xl md:text-5xl font-mono tracking-tight text-white font-bold">
              ABOUT ME
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6 text-gray-300 md:text-lg leading-relaxed font-sans"
          >
            <p className="border-l-4 border-cyan-400/50 pl-5 italic text-gray-200">
              "The future belongs to those who transform ideas into intelligent solutions."
            </p>
            <p>
              I am a final-year Bachelor of Technology student specializing in <strong className="text-white font-semibold">Artificial Intelligence and Data Science</strong> at <span className="text-purple-400 font-medium">Vimal Jyothi Engineering College</span>. Passionate about solving real-world challenges through data-driven computational models, I love architecting algorithms that learn, reason, and adapt.
            </p>
            <p>
              My toolkit spans training foundational neural layers, engineering pipeline automations, and crafting Natural Language Processing frameworks to extract structured insights. I explore solutions that remain efficient and scalable, ensuring the complex AI code I write translates directly into tangible human experiences.
            </p>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg text-center backdrop-blur-md">
              <p className="text-2xl md:text-3xl font-mono text-cyan-400 font-bold">2026</p>
              <p className="text-[10px] uppercase tracking-wider font-mono text-gray-400">BTech Grad Year</p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg text-center backdrop-blur-md">
              <p className="text-2xl md:text-3xl font-mono text-purple-400 font-bold">7.35</p>
              <p className="text-[10px] uppercase tracking-wider font-mono text-gray-400">Current CGPA</p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg text-center backdrop-blur-md">
              <p className="text-2xl md:text-3xl font-mono text-lime-400 font-bold">3+</p>
              <p className="text-[10px] uppercase tracking-wider font-mono text-gray-400">Core AI Projects</p>
            </div>
          </div>
        </div>

        {/* Right Column: Key Focus Areas / Interactive Specialties */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-1 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md flex mb-2">
            <button
              onClick={() => setActiveTab('mission')}
              className={`flex-1 py-2 text-xs font-mono rounded-md uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'mission' ? 'bg-[#00D4FF]/20 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              My Focus
            </button>
            <button
              onClick={() => setActiveTab('focus')}
              className={`flex-1 py-1 text-xs font-mono rounded-md uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'focus' ? 'bg-[#8B5CF6]/20 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Ambition
            </button>
          </div>

          {activeTab === 'mission' ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              {specialties.map((spec, i) => (
                <div
                  key={i}
                  className="p-5 bg-gradient-to-br from-[#0A0E1A]/60 to-[#040404]/80 border border-white/5 rounded-xl hover:border-cyan-400/30 transition-all duration-300 backdrop-blur-md group"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                      {spec.icon}
                    </div>
                    <h3 className="text-sm font-mono tracking-wide text-white font-semibold">
                      {spec.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed pl-1">
                    {spec.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-gradient-to-br from-[#0A0E1A]/40 to-transparent border border-white/5 rounded-xl space-y-6 backdrop-blur-md min-h-[300px] flex flex-col justify-center"
            >
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Core Values</h4>
                <p className="text-sm text-gray-200 font-sans leading-relaxed">
                  I believe in sustainable artificial intelligence that respects resource constraints, enhances real-time workflows, and remains ethical. My optimization work demonstrates my commitment to writing lean algorithms.
                </p>
              </div>
              
              <div className="space-y-2 pt-4 border-t border-white/5">
                <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest">The Horizon</h4>
                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  Post BTech graduation, I aspire to lead development cycles in Machine Learning Engineering, creating generative models, neural frameworks, and deep NLP analyzers.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
