import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldAlert, Sparkles, Milestone, ExternalLink } from 'lucide-react';
import { Certification } from '../types';

export default function CertificationsGrid() {
  const certifications: Certification[] = [
    {
      title: 'Introduction to Machine Learning',
      issuer: 'NPTEL – IIT Madras',
      date: 'NPTEL Scholastic Lab',
      link: '#'
    },
    {
      title: 'Applied Artificial Intelligence Diploma',
      issuer: 'Lets Code AI',
      date: 'Engineering Program Diploma',
      link: '#'
    },
    {
      title: 'Tink-Her-Hack 3.0 Hacker Certificate',
      issuer: 'TinkerHub Foundation',
      date: 'Women in Tech Hackathon Winner',
      link: '#'
    }
  ];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-local-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-local-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="certifications" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full text-white z-20">
      <div className="space-y-4 text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 block" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400 font-medium">Badges & Credentials</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-mono tracking-tight font-bold">
          CERTIFICATIONS
        </h2>
        <p className="text-sm text-gray-400 font-mono max-w-xl mx-auto">
          Professional development courses, industry certifications, and academic achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onMouseMove={handleCardMouseMove}
            className="p-6 bg-gradient-to-br from-[#0A0E1A]/60 to-[#040404]/80 border border-white/5 hover:border-purple-500/30 rounded-xl flex flex-col justify-between h-56 relative group backdrop-blur-md lantern-glow-card"
          >
            {/* Top row */}
            <div className="flex justify-between items-start">
              <div className="p-2 bg-gradient-to-br from-indigo-950 to-black rounded-lg border border-purple-500/20 text-purple-400">
                <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </div>
              <span className="text-[9px] font-mono tracking-wider px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-gray-400">
                CREDENTIAL
              </span>
            </div>

            {/* Title & Issuer details */}
            <div className="space-y-2 mt-4 flex-1">
              <h3 className="text-sm md:text-base font-mono font-bold text-white group-hover:text-[#00D4FF] transition-colors leading-snug">
                {cert.title}
              </h3>
              <p className="text-xs text-purple-300 font-mono">
                {cert.issuer}
              </p>
            </div>

            {/* Bottom details row */}
            <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto">
              <span className="text-[10px] text-gray-500 font-mono tracking-wider font-semibold">
                {cert.date}
              </span>

              {/* Icon visual clue */}
              <div id="credential-arrow" className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-3 h-3 text-[#A3FF12]" />
              </div>
            </div>

            {/* Background decor matrix dot pattern */}
            <div id="matrix-decor-dots" className="absolute bottom-2 right-4 w-12 h-12 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none opacity-30" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
