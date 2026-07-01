import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Github, Linkedin, GraduationCap, MapPin, Target, Zap } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full text-white z-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading and Story */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 block" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-medium">Professional Background</span>
            </div>
            <h2 id="about-section-heading" className="text-4xl md:text-5xl font-mono tracking-tight text-white font-bold">
              MY JOURNEY
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6 text-gray-300 md:text-lg leading-relaxed font-sans"
          >
            <p>
              I'm a final-year BTech student specializing in Artificial Intelligence and Data Science at Vimal Jyothi Engineering College. My passion lies in building AI systems that solve meaningful real-world problems. From optimizing neural networks for efficiency to designing emotion-aware travel assistants and AI-powered educational tools, I enjoy transforming ideas into practical solutions.
            </p>
            <p>
              I believe technology should be intelligent, accessible, and human-centered. Through every project I build, my goal is to create experiences that make a positive impact while continuously learning and pushing the boundaries of what AI can achieve.
            </p>
          </motion.div>

          {/* Social Media Row */}
          <div className="flex items-center space-x-4 pt-4">
            <a
              href="https://github.com/angelrosecd554"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/[0.02] border border-white/10 rounded-full text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 hover:-translate-y-1"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/angelrosecd/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/[0.02] border border-white/10 rounded-full text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-all duration-300 hover:-translate-y-1"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/[0.02] border border-white/10 rounded-full text-gray-400 hover:text-[#4285F4] hover:border-[#4285F4]/50 hover:bg-[#4285F4]/10 transition-all duration-300 hover:-translate-y-1"
              aria-label="Google Scholar Profile"
            >
              <GraduationCap className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column: Bento Grid Structure */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Focus Card */}
            <div className="p-6 bg-gradient-to-br from-[#0A0E1A]/60 to-[#040404]/80 border border-white/5 rounded-2xl hover:border-cyan-400/30 transition-colors backdrop-blur-md">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-2">Current Focus</h4>
              <p className="text-xl font-mono text-white font-bold tracking-tight">Data Science & Predictive ML</p>
            </div>
            
            {/* Origin Card */}
            <div className="p-6 bg-gradient-to-br from-[#0A0E1A]/60 to-[#040404]/80 border border-white/5 rounded-2xl hover:border-cyan-400/30 transition-colors backdrop-blur-md">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-lime-500/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-lime-400" />
                </div>
              </div>
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-2">Origin</h4>
              <p className="text-xl font-mono text-white font-bold tracking-tight">Kerala, India</p>
              <p className="text-sm rounded-full text-gray-400 font-sans mt-1">Velur, Thrissur</p>
            </div>
          </div>

          {/* Domains & Values Card */}
          <div className="p-6 bg-gradient-to-br from-[#0A0E1A]/60 to-[#040404]/80 border border-white/5 rounded-2xl hover:border-cyan-400/30 transition-colors backdrop-blur-md relative overflow-hidden group">
             <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500/5 group-hover:text-cyan-500/10 transition-colors duration-500">
               <Target className="w-24 h-24" />
             </div>
             
             {/* Executing Domain */}
             <div className="relative z-10 mb-6">
               <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-4">Executing Domain</h4>
               <div className="flex flex-wrap gap-2">
                 <span className="px-3 py-1.5 text-xs font-mono rounded-lg border border-white/5 bg-white/5 text-gray-300 hover:border-cyan-400/30 transition-colors">Analytical</span>
                 <span className="px-3 py-1.5 text-xs font-mono rounded-lg border border-white/5 bg-white/5 text-gray-300 hover:border-cyan-400/30 transition-colors">Innovator</span>
                 <span className="px-3 py-1.5 text-xs font-mono rounded-lg border border-white/5 bg-white/5 text-gray-300 hover:border-cyan-400/30 transition-colors">Empathy</span>
                 <span className="px-3 py-1.5 text-xs font-mono rounded-lg border border-white/5 bg-white/5 text-gray-300 hover:border-cyan-400/30 transition-colors">Problem Solver</span>
                 <span className="px-3 py-1.5 text-xs font-mono rounded-lg border border-white/5 bg-white/5 text-gray-300 hover:border-cyan-400/30 transition-colors">Futuristic</span>
               </div>
             </div>

             {/* Divider */}
             <div className="h-px w-full bg-white/5 relative z-10 mb-6" />

             {/* Values */}
             <div className="relative z-10">
               <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-3">My Values</h4>
               <p className="text-sm font-sans text-gray-200 font-medium tracking-wide leading-relaxed">
                  Intelligence • Impact • Accessibility • Productivity • Exploration
               </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
