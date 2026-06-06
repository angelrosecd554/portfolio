import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface DiscoveryProps {
  scrollY: number;
}

export default function DiscoverySystem({ scrollY }: DiscoveryProps) {
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive positions for discoveries
  const isMobile = windowWidth < 768;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      
      {/* Discovery 1: Near About Section - System Blueprint */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.18 }}
        viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute left-6 md:left-24 top-[1050px] text-[10px] md:text-xs font-mono text-cyan-400 select-none max-w-sm border-l-2 border-[#00D4FF]/20 pl-4 py-2"
        style={{ transform: `translateY(${scrollY * -0.12}px)` }}
      >
        <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold block mb-1">
          System Blueprint • Self-Attention Path
        </span>
        <code className="text-cyan-300 block mb-2 font-mono">
          Attention(Q,K,V) = softmax(QKᵀ / √d_k)V
        </code>
        
        {/* Intricate SVG layout mapping for the transformer attention head */}
        <svg className="w-48 h-16 mt-2 text-[#00D4FF]/20" viewBox="0 0 200 60" fill="none" stroke="currentColor">
          <rect x="10" y="20" width="30" height="20" rx="3" strokeWidth="1" />
          <text x="25" y="32" fill="currentColor" stroke="none" fontSize="8" textAnchor="middle" fontFamily="monospace">Q</text>
          
          <rect x="50" y="20" width="30" height="20" rx="3" strokeWidth="1" />
          <text x="65" y="32" fill="currentColor" stroke="none" fontSize="8" textAnchor="middle" fontFamily="monospace">K</text>
          
          <rect x="90" y="20" width="30" height="20" rx="3" strokeWidth="1" />
          <text x="105" y="32" fill="currentColor" stroke="none" fontSize="8" textAnchor="middle" fontFamily="monospace">V</text>

          <path d="M 25 20 L 65 20" strokeWidth="0.8" strokeDasharray="3 3" />
          <path d="M 65 20 L 105 20" strokeWidth="0.8" strokeDasharray="3 3"/>
          <circle cx="150" cy="30" r="12" strokeWidth="1" />
          <text x="150" y="33" fill="currentColor" stroke="none" fontSize="7" textAnchor="middle" fontFamily="monospace">Softmax</text>
          
          <path d="M 120 30 L 138 30" strokeWidth="1" />
        </svg>
        <p className="mt-2 text-[9px] text-[#A3FF12]/70">
          Mapping transformer state projection layers for cognitive analysis.
        </p>
      </motion.div>

      {/* Discovery 2: Near Academic Timeline - Research Fragment */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.18 }}
        viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute right-6 md:right-28 top-[1950px] text-[10px] md:text-xs font-mono text-purple-400 select-none max-w-sm border border-white/[0.04] bg-white/[0.01] p-4 rounded-xl"
        style={{ transform: `translateY(${scrollY * -0.07}px)` }}
      >
        <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold block mb-1">
          Research Fragment • Optimizer Convergence
        </span>
        <code className="text-purple-300 block mb-2">
          θ_t+1 = θ_t - η · ∇_θ L(θ_t)
        </code>

        {/* Gradient Descent SVG Loss Curve */}
        <svg className="w-56 h-20 mt-2 text-purple-400/20" viewBox="0 0 200 70" fill="none" stroke="currentColor">
          <path d="M 10 10 C 50 80, 100 65, 120 40 C 140 15, 170 35, 190 35" strokeWidth="1.2" />
          {/* Gradient Descent Dots */}
          <circle cx="20" cy="18" r="2" fill="#8B5CF6" />
          <circle cx="45" cy="42" r="2" fill="#8B5CF6" />
          <circle cx="78" cy="55" r="2" fill="#8B5CF6" />
          <circle cx="102" cy="50" r="2" fill="#8B5CF6" />
          <circle cx="118" cy="41" r="2.5" fill="#A3FF12" />
          <text x="118" y="32" fill="#A3FF12" stroke="none" fontSize="7" textAnchor="middle" fontFamily="monospace">Local Minima</text>
          
          <path d="M 22 18 L 43 42" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M 47 42 L 76 55" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M 80 55 L 100 50" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
        <p className="mt-2 text-[9px] text-gray-400">
          Stochastic gradient descent paths toward optimal weight convergence.
        </p>
      </motion.div>

      {/* Discovery 3: Near Technical Skills Core - Prototype Study */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.18 }}
        viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute left-8 md:left-32 top-[2850px] text-[10px] md:text-xs font-mono text-lime-400 select-none max-w-sm border border-lime-500/10 p-4 rounded-xl"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold block mb-1">
          Prototype Study • Backpropagation Matrix
        </span>
        <code className="text-lime-300 block mb-2">
          δ_l = ((W_l+1)ᵀ · δ_l+1) ⊙ σ'(z_l)
        </code>

        {/* Small neural web wireframe */}
        <svg className="w-52 h-16 mt-2 text-lime-400/25" viewBox="0 0 200 60" fill="none" stroke="currentColor">
          {/* Layer 1 Nodes */}
          <circle cx="15" cy="15" r="3" />
          <circle cx="15" cy="30" r="3" />
          <circle cx="15" cy="45" r="3" />

          {/* Layer 2 Nodes */}
          <circle cx="75" cy="10" r="3" />
          <circle cx="75" cy="25" r="3" />
          <circle cx="75" cy="40" r="3" />
          <circle cx="75" cy="50" r="3" />

          {/* Layer 3 Nodes */}
          <circle cx="155" cy="20" r="3" />
          <circle cx="155" cy="40" r="3" />

          {/* Lines */}
          <line x1="18" y1="15" x2="72" y2="10" strokeWidth="0.5" />
          <line x1="18" y1="15" x2="72" y2="25" strokeWidth="0.5" />
          <line x1="18" y1="30" x2="72" y2="25" strokeWidth="0.5" />
          <line x1="18" y1="30" x2="72" y2="40" strokeWidth="0.5" />
          <line x1="18" y1="45" x2="72" y2="40" strokeWidth="0.5" />
          <line x1="18" y1="45" x2="72" y2="50" strokeWidth="0.5" />

          <line x1="78" y1="10" x2="152" y2="20" strokeWidth="0.5" />
          <line x1="78" y1="25" x2="152" y2="20" strokeWidth="0.5" />
          <line x1="78" y1="40" x2="152" y2="40" strokeWidth="0.5" />
          <line x1="78" y1="50" x2="152" y2="40" strokeWidth="0.5" />
        </svg>
        <p className="mt-2 text-[9px] text-[#A3FF12]/70">
          Calculating error signal indices across deep weight parameters.
        </p>
      </motion.div>

      {/* Discovery 4: Near Projects Details - Development Journal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.18 }}
        viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute right-10 md:right-36 top-[3750px] text-[10px] md:text-xs font-mono text-cyan-400 select-none max-w-sm border-r-2 border-[#00D4FF]/20 pr-4 py-2 text-right"
        style={{ transform: `translateY(${scrollY * -0.08}px)` }}
      >
        <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold block mb-1">
          Development Journal • Entry #824
        </span>
        <p className="italic text-cyan-200/80 leading-relaxed font-sans text-xs mt-1">
          "Pruning performance tests on resource-constrained microcontrollers show high promise. Dynamic skips keep execution latencies down while retaining over 98% of classification accuracy. Next phase: test on real-world medical documents."
        </p>
      </motion.div>

      {/* Discovery 5: Near Certifications - Concept Archive */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute left-6 md:left-24 top-[4500px] text-[10px] md:text-xs font-mono text-cyan-400 select-none max-w-sm border border-white/[0.03] p-4 rounded-xl"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold block mb-1">
          Concept Archive • Latent Dim Projection
        </span>

        {/* Cluster / Scattered points SVG */}
        <svg className="w-48 h-20 mt-2 text-cyan-400/20" viewBox="0 0 160 70" fill="currentColor">
          <circle cx="30" cy="25" r="1.5" />
          <circle cx="35" cy="18" r="1.5" />
          <circle cx="25" cy="35" r="1.5" />
          <circle cx="42" cy="28" r="2" fill="#00D4FF" />
          <path d="M 25 35 Q 35 18 42 28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" fill="none" />

          {/* Another cluster */}
          <circle cx="120" cy="45" r="1.5" />
          <circle cx="135" cy="52" r="1.5" />
          <circle cx="115" cy="58" r="1.5" />
          <circle cx="125" cy="50" r="2.2" fill="#8B5CF6" />
          
          <text x="42" y="44" fill="currentColor" opacity="0.6" fontSize="6" fontFamily="monospace">Cluster α [nlp]</text>
          <text x="125" y="38" fill="currentColor" opacity="0.6" fontSize="6" fontFamily="monospace">Cluster β [vision]</text>
        </svg>
        <p className="mt-1 text-[9px] text-gray-500">
          Supervised clustering of high-dimensional text embedding weights.
        </p>
      </motion.div>

    </div>
  );
}
