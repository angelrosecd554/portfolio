import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Activity, Cpu, Layers, Sparkles, ChevronDown } from 'lucide-react';
import { Project } from '../types';

export default function ProjectsSection() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>('tripmate');

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-local-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-local-y', `${e.clientY - rect.top}px`);
  };

  const projects: Project[] = [
    {
      id: 'tripmate',
      title: 'TRIPMATE: AI-Powered Travel Assistant',
      description: 'An intelligent planning assistant utilizing real-time emotion recognition to dynamically tailor schedules and travel activities.',
      challenge: 'Traditional travel planners generate rigid, questionnaire-based itineraries. They ignore real-time explorer mood, mental fatigue, or emotional context, leading to exhausted tourists and rigid schedules.',
      solution: 'Constructed an algorithmic travel companion incorporating real-time facial expression mapping and textual sentiment checks. Using emotion vector indexes, TRIPMATE dynamic-adjusts destination scales, selecting calming nature reserves on fatigue detection, or premium activities on peak energy.',
      impact: 'Reduces transit fatigue scores by 30% in user pilot trials, achieving a recommendation relevance rating of 94% on organic local testing.',
      keyLearnings: 'Gained deep expertise in handling latency constraints of continuous video feed inferences. Optimized statistical weight mapping equations to scale output weights harmoniously without degrading system frame rates.',
      technologies: ['Artificial Intelligence', 'Emotion Recognition', 'Recommendation Systems', 'OpenCV', 'TensorFlow', 'Python'],
      visualType: 'travel'
    },
    {
      id: 'onemed',
      title: 'ONEMED AI: Document Analysis Platform',
      description: 'A clinical record NLP parser that structures handwritten files and scans into unified patient profiles.',
      challenge: 'Clinical records, handwritten medication prescriptions, and historical charts are heavily fragmented. Doctors expend hours manually locating historical anomalies inside hundreds of flat files.',
      solution: 'Engineered an intelligent clinical extraction pipeline executing Named Entity Recognition (NER). Developed document intelligence layout converters to parse tabular laboratory receipts, translating chaotic files into unified, queryable medical profiles.',
      impact: 'Boosted patient ingestion analytics speeds by over 45%, operating with an absolute accuracy of 96.4% on complex scientific clinical entities.',
      keyLearnings: 'Successfully solved OCR scanning noise barriers utilizing layered computer vision filters prior to tokenization. Mastered state-of-the-art encoder representations to perform high-precision medical entity classification on highly dense layouts.',
      technologies: ['NLP', 'Healthcare AI', 'Document Intelligence', 'HuggingFace Transformers', 'PyTorch', 'NLTK'],
      visualType: 'medical'
    },
    {
      id: 'efficient',
      title: 'Efficient AI: Dynamic Network Optimization',
      description: 'An edge execution runtime implementing dynamic early-exit mechanisms to optimize deep network inference.',
      challenge: 'Running heavy deep neural networks on edge microcontrollers and low-power IoT units suffers critical latency bottlenecks, extreme thermal throttling, and battery drain.',
      solution: 'Designed and prototyped a dynamic runtime network pruning strategy. The system checks variance margins of intermediate layers during early inference. If the variance margin stays under a computed threshold, downstream redundant weights are bypassed at run-time.',
      impact: 'Reduces neural execution latencies by 34% with a negligible accuracy variation (under 1.2%), enabling smooth inference on edge CPUs.',
      keyLearnings: 'Mastered floating-point arithmetic quantization processes and dynamic execution graphs in PyTorch/ONNX. Discovered that evaluating early-layer activation gradients offers a reliable predictor for subsequent channel redundancies.',
      technologies: ['Deep Learning', 'Neural Networks', 'Model Optimization', 'TensorFlow Lite', 'ONNX Runtime', 'Python'],
      visualType: 'efficiency'
    }
  ];

  const getVisualStyles = (type: 'travel' | 'medical' | 'efficiency') => {
    switch (type) {
      case 'travel':
        return {
          icon: <Plane className="w-5 h-5 text-cyan-400" />,
          color: 'from-cyan-500/20 to-transparent',
          accent: 'text-cyan-400 border-cyan-400/25',
          shadow: 'shadow-cyan-500/10'
        };
      case 'medical':
        return {
          icon: <Activity className="w-5 h-5 text-purple-400" />,
          color: 'from-purple-500/20 to-transparent',
          accent: 'text-purple-400 border-purple-400/25',
          shadow: 'shadow-purple-500/10'
        };
      case 'efficiency':
        return {
          icon: <Cpu className="w-5 h-5 text-lime-400" />,
          color: 'from-lime-500/20 to-transparent',
          accent: 'text-[#A3FF12] border-lime-500/25',
          shadow: 'shadow-lime-500/10'
        };
    }
  };

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full text-white z-20">
      <div className="space-y-4 text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 block" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-medium">Applied Engineering</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-mono tracking-tight font-bold">
          FEATURED PROJECTS
        </h2>
        <p className="text-sm text-gray-400 font-mono max-w-xl mx-auto">
          Explore research and software solutions. Select any card below to expand the complete engineering ledger.
        </p>
      </div>

      <div className="space-y-6 max-w-5xl mx-auto">
        {projects.map((project) => {
          const isExpanded = expandedProjectId === project.id;
          const styles = getVisualStyles(project.visualType);

          return (
            <div
              key={project.id}
              onMouseMove={handleCardMouseMove}
              className={`border border-white/5 bg-[#0A0E1A]/40 hover:bg-[#0A0E1A]/60 rounded-2xl transition-all duration-300 backdrop-blur-md overflow-hidden lantern-glow-card ${
                isExpanded ? 'ring-1 ring-white/10 shadow-xl ' + styles.shadow : ''
              }`}
            >
              {/* Card Header (Standard summary bar) */}
              <button
                onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 transition-all`}>
                    {styles.icon}
                  </div>
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${styles.accent.split(' ')[0]}`}>
                      {project.technologies[0]} • {project.technologies[1]}
                    </span>
                    <h3 className="text-lg md:text-xl font-mono font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end md:self-auto">
                  <span id="card-expand-prompt" className="hidden md:inline-block text-xs font-mono text-gray-500">
                    {isExpanded ? 'Collapse Details' : 'Expand Details'}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${
                    isExpanded ? 'rotate-180 bg-white/5 border-white/20' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </button>

              {/* Expandable Core Sections */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                  >
                    <div className="border-t border-white/5 bg-[#040404]/35 p-6 md:p-8 md:pt-0 space-y-8 font-sans">
                      {/* Short Description */}
                      <p className="text-sm text-purple-200 pl-4 border-l border-purple-500/40 italic leading-relaxed pt-6">
                        "{project.description}"
                      </p>

                      {/* Challenge and Solution Split Column */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 pt-4">
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-red-400 font-bold">
                            1. PROBLEM STATEMENT
                          </h4>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00D4FF] font-bold">
                            2. APPROACH
                          </h4>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      {/* Technical Stack Pills list */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-bold">
                          3. TECHNOLOGIES
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`px-3 py-1 text-xs font-mono rounded bg-[#0A0E1A]/80 border ${styles.accent} hover:bg-white/5 transition-colors`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expanded Impact Statement banner */}
                      <div className="p-4 bg-[#A3FF12]/5 border border-[#A3FF12]/15 rounded-xl flex items-start space-x-3">
                        <Sparkles className="w-4 h-4 text-[#A3FF12] shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A3FF12] font-semibold">
                            4. OUTCOME
                          </h5>
                          <p className="text-xs text-gray-200 mt-1 leading-relaxed">
                            {project.impact}
                          </p>
                        </div>
                      </div>

                      {/* Dynamic Key Learnings section */}
                      <div className="p-4 bg-purple-500/5 border border-purple-500/15 rounded-xl flex items-start space-x-3">
                        <Layers className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400 font-semibold">
                            5. KEY LEARNINGS
                          </h5>
                          <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                            {project.keyLearnings}
                          </p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
