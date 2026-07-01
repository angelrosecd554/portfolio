import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Plane, Activity, Cpu, X, Target, Zap, Network } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Project } from '../types';

function ProjectCard({ project, styles, onClick }: { project: Project; styles: any; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    
    e.currentTarget.style.setProperty('--mouse-local-x', `${mouseX}px`);
    e.currentTarget.style.setProperty('--mouse-local-y', `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layoutId={`project-container-${project.id}`}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
      className={`border border-white/5 bg-[#0A0E1A]/40 hover:bg-[#0A0E1A]/60 rounded-2xl transition-colors duration-300 backdrop-blur-md overflow-hidden lantern-glow-card p-6 md:p-8 flex flex-col gap-6 hover:shadow-2xl hover:border-white/10 cursor-pointer`}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start w-full pointer-events-none">
        <motion.div layoutId={`project-icon-${project.id}`} className={`p-4 bg-white/5 rounded-xl border border-white/10 shrink-0`}>
          {styles.icon}
        </motion.div>
        
        <div className="space-y-4 w-full">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
              <motion.h3 layoutId={`project-title-${project.id}`} className="text-lg md:text-xl font-mono font-bold text-white leading-tight">
                {project.title}
              </motion.h3>
              <motion.span layoutId={`project-date-${project.id}`} className="text-xs font-mono text-gray-400 border border-white/10 px-2 py-1 rounded bg-white/5 shrink-0 whitespace-nowrap">
                {project.date}
              </motion.span>
            </div>
            
            <motion.div layoutId={`project-tech-${project.id}`} className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 text-xs font-mono rounded bg-[#0A0E1A]/80 border ${styles.accent}`}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
          
          <motion.p layoutId={`project-desc-${project.id}`} className="text-sm text-gray-300 leading-relaxed font-sans">
            {project.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const projects: Project[] = [
    {
      id: 'tripmate',
      title: 'TRIPMATE : AI - POWERED TRAVEL BUDDY',
      date: 'AUG 2025 - PRESENT',
      description: 'An AI-powered travel recommendation platform that personalizes tourism experiences through emotion-aware destination suggestions and intelligent travel buddy matching.',
      challenge: 'Traditional travel platforms offer static recommendations and lack context-aware personalization, failing to account for a user\'s current emotional state or facilitate social engagement with like-minded travelers.',
      solution: 'Developed a system utilizing sentiment analysis and facial emotion recognition (OpenCV) to align tour recommendations with user moods. Integrated collaborative filtering and cosine similarity (scikit-learn) to match users with similar travel preferences, built using Python and Flask.',
      metrics: ['Lightweight & modular architecture', 'Real-time mood analysis precision', 'Social engagement matching'],
      technologies: ['Python', 'Flask', 'OpenCV', 'Scikit-learn', 'Collaborative Filtering'],
      visualType: 'travel'
    },
    {
      id: 'onemed',
      title: 'ONEMED AI : AI - POWERED MEDICAL ASSISTANT',
      date: 'APR 2025 - JUN 2025',
      description: 'Designed an AI-powered medical assistant to intelligently analyze medical documents using NLP and Retrieval-Augmented Generation (RAG).',
      challenge: 'Healthcare professionals require efficient ways to intelligently analyze and summarize complex medical documents such as CT scans, MRIs, and general health records to improve diagnostic precision and patient support.',
      solution: 'Built AI models using supervised learning and transformer models (RoBERTa, GPT) to classify report types and generate summaries. Implemented a RAG architecture using Qdrant Vector Database to fetch semantically relevant context, and integrated the pipeline via FastAPI.',
      metrics: ['Precision diagnostic analysis', 'Scalable FastAPI endpoint integration', 'Efficient vector search context'],
      technologies: ['NLP', 'RAG', 'Transformers', 'FastAPI'],
      visualType: 'medical'
    },
    {
      id: 'efficient',
      title: 'EFFICIENT AI : DYNAMIC LAYER SKIPPING',
      date: 'JAN 2025 - MAR 2025',
      description: 'Investigated dynamic neural networks to enhance computational efficiency by selectively skipping layers during inference based on input complexity.',
      challenge: 'Deep learning models deployed in real-time and resource-constrained environments, such as mobile devices, IoT systems, and embedded AI applications, often face significant computational and memory limitations.',
      solution: 'Designed neural architectures with gating mechanisms and implemented regularization strategies to balance accuracy and efficiency. Benchmarked performance across datasets like CIFAR-10, Fashion-MNIST, and MedMNIST to analyze trade-offs in inference time, memory usage, and FLOPs.',
      metrics: ['Reduced inference time latency', 'Optimized memory usage footprint', 'Lower computational FLOPs'],
      technologies: ['Neural Networks', 'Model Optimization', 'Edge AI'],
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
          Explore research and software solutions.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto relative z-10">
        {projects.map((project) => {
          const styles = getVisualStyles(project.visualType);
          return <ProjectCard key={project.id} project={project} styles={styles} onClick={() => setSelectedProject(project)} />;
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            
            <div className="fixed inset-0 z-[110] overflow-y-auto pointer-events-none flex items-center justify-center p-4 sm:p-6 md:p-12">
              <motion.div
                layoutId={`project-container-${selectedProject.id}`}
                className="w-full max-w-4xl bg-[#0A0E1A] border border-white/10 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden relative"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-20"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>

                <div className="p-6 md:p-10 space-y-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <motion.div layoutId={`project-icon-${selectedProject.id}`} className={`p-4 bg-white/5 rounded-xl border border-white/10 shrink-0`}>
                      {getVisualStyles(selectedProject.visualType).icon}
                    </motion.div>
                    
                    <div className="space-y-4 w-full pr-8">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                          <motion.h3 layoutId={`project-title-${selectedProject.id}`} className="text-xl md:text-2xl font-mono font-bold text-white leading-tight">
                            {selectedProject.title}
                          </motion.h3>
                          <motion.span layoutId={`project-date-${selectedProject.id}`} className="text-xs font-mono text-gray-400 border border-white/10 px-2 py-1 rounded bg-white/5 shrink-0 whitespace-nowrap self-start">
                            {selectedProject.date}
                          </motion.span>
                        </div>
                        
                        <motion.div layoutId={`project-tech-${selectedProject.id}`} className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`px-3 py-1 text-xs font-mono rounded bg-[#0A0E1A]/80 border ${getVisualStyles(selectedProject.visualType).accent}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </motion.div>
                      </div>
                      
                      <motion.p layoutId={`project-desc-${selectedProject.id}`} className="text-sm md:text-base text-gray-300 leading-relaxed font-sans pt-2">
                        {selectedProject.description}
                      </motion.p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10"
                  >
                    {selectedProject.challenge && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Target className="w-5 h-5 text-red-400" />
                          <h4 className="text-sm font-mono uppercase tracking-[0.2em] text-white font-bold">
                            Problem Statement
                          </h4>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {selectedProject.challenge}
                        </p>
                      </div>
                    )}
                    {selectedProject.solution && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-5 h-5 text-[#00D4FF]" />
                          <h4 className="text-sm font-mono uppercase tracking-[0.2em] text-white font-bold">
                            Our Approach
                          </h4>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {selectedProject.solution}
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {selectedProject.metrics && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="pt-8 border-t border-white/10"
                    >
                      <div className="flex items-center space-x-2 mb-6">
                        <Network className="w-5 h-5 text-lime-400" />
                        <h4 className="text-sm font-mono uppercase tracking-[0.2em] text-white font-bold">
                          Performance & Impact
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {selectedProject.metrics.map((metric, i) => (
                          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                            <p className="text-sm font-mono text-gray-300">{metric}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
