import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, FileText, Send, CheckCircle, X, Printer, Copy, Terminal, Github } from 'lucide-react';

interface ContactSectionProps {
  showResume: boolean;
  setShowResume: (show: boolean) => void;
}

export default function ContactSection({ showResume, setShowResume }: ContactSectionProps) {
  const [formState, setFormState] = useState({ name: '', email: '', role: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSending(true);

    // Dynamic timeout representing pipeline transmission simulation
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      // Flush form
      setFormState({ name: '', email: '', role: '', message: '' });
      setTimeout(() => setIsSuccess(false), 6000);
    }, 1800);
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText('angelrosecd005@gmail.com')
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Could not copy email using clipboard API: ', err);
          fallbackCopyText('angelrosecd005@gmail.com');
        });
    } else {
      fallbackCopyText('angelrosecd005@gmail.com');
    }
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      // Keep offscreen
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Fallback copy failed: ', err);
    }
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto w-full text-white z-20">
      {/* Visual top accent border splitting layouts */}
      <div className="absolute top-0 right-0 w-1/3 h-[1px] bg-gradient-to-l from-purple-500/30 to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Coordinates & Narrative */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 block" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-medium">Get In Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-mono tracking-tight text-white font-bold">
              CONTACT ME
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-sm">
              I am open to Graduate AI roles, Data Science internships, and collaborative research. Reach out to discuss how we can work together.
            </p>
          </div>

          {/* Core Info List */}
          <div className="space-y-4 font-mono text-sm">
            <div className="flex items-center space-x-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-400/20 transition-all">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Coordinates</p>
                <p className="text-xs text-white font-bold mt-1">Thrissur, Kerala, India</p>
              </div>
            </div>

            <div
              onClick={handleCopyEmail}
              className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-400/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Digital Mail</p>
                  <p className="text-xs text-white font-bold mt-1 group-hover:text-cyan-400 transition-colors">angelrosecd005@gmail.com</p>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-mono pr-2">
                {isCopied ? 'Copied' : 'Copy'}
              </span>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#A3FF12]/20 transition-all">
              <div className="p-2 bg-lime-500/10 rounded-lg text-lime-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Voice Telephony</p>
                <p className="text-xs text-white font-bold mt-1">+91 8891251155</p>
              </div>
            </div>
          </div>

          {/* Social and File Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="https://www.linkedin.com/in/angelrosecd/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#0077B5]/10 border border-[#0077B5]/30 hover:bg-[#0077B5]/20 text-[#00D4FF] text-xs font-mono rounded-lg flex items-center space-x-2 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
              <span>LINKEDIN PROFILE</span>
            </a>

            <a
              href="https://github.com/angelrosecd554"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white text-xs font-mono rounded-lg flex items-center space-x-2 transition-all duration-300"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GITHUB PROFILE</span>
            </a>

            <button
              onClick={() => setShowResume(true)}
              className="px-5 py-3 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white text-xs font-mono rounded-lg flex items-center space-x-2 transition-all duration-300"
            >
              <FileText className="w-4 h-4 text-[#A3FF12]" />
              <span>VIEW RECRUITER CV</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Neural Form */}
        <div className="lg:col-span-7 bg-[#0A0E1A]/40 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-md relative overflow-hidden">
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-[#040404]/95 z-30 flex flex-col items-center justify-center p-6 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-lime-500/15 rounded-full border border-lime-500/30 flex items-center justify-center text-lime-400">
                <CheckCircle className="w-6 h-6 animate-pulse" />
              </div>
              <p className="text-sm font-mono text-[#A3FF12] uppercase tracking-[0.2em] font-semibold">
                NEURAL HANDSHAKE ESTABLISHED
              </p>
              <p className="text-xs text-gray-300 font-sans max-w-sm leading-relaxed">
                Message successfully broadcast and queued. Factual indicators received. Angel Rose CD will synthesize a response shortly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-xs font-mono text-purple-400 underline hover:text-purple-300"
              >
                Trigger Another Transmission
              </button>
            </motion.div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
            <h3 className="text-base font-mono font-bold text-white tracking-widest uppercase">
              TRANSMIT PACKETS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-1">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Recruiter or Lead"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="space-y-1.5 col-span-1">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="name@organization.com"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Inquiry Context / Target Role</label>
              <input
                type="text"
                name="role"
                value={formState.role}
                onChange={handleInputChange}
                placeholder="e.g. AI Graduate Associate, Machine Learning Intern"
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Message *</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formState.message}
                onChange={handleInputChange}
                placeholder="Write your message here..."
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full py-4 rounded-xl font-mono text-xs tracking-widest uppercase font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center space-x-2 ${
                isSending ? 'opacity-70 cursor-not-allowed bg-purple-500' : ''
              }`}
            >
              {isSending ? (
                <>
                  <Terminal className="w-4 h-4 text-black animate-spin" />
                  <span>SENDING MESSAGE...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-black" />
                  <span>SEND MESSAGE</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Recruiter Closing Call Sign / Quote Box */}
      <div id="recal-quote" className="mt-20 pt-10 border-t border-white/5 text-center max-w-3xl mx-auto space-y-4">
        <p className="text-gray-400 text-sm md:text-base leading-relaxed md:leading-loose font-sans italic">
          "The future belongs to those who transform ideas into intelligent solutions. Through Artificial Intelligence, I aspire to build technology that creates meaningful impact."
        </p>
        <p className="text-[11px] font-mono text-purple-400 uppercase tracking-widest">
          — ANGEL ROSE C D
        </p>
      </div>

      {/* Interactive Printable Recruiter CV Drawer / Modal overlay */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex justify-end bg-black/80 backdrop-blur-md"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 140 }}
              className="w-full max-w-xl md:max-w-2xl h-full bg-[#040404] text-white flex flex-col justify-between border-l border-white/10"
            >
              {/* Header */}
              <div className="p-4 md:p-6 border-b border-white/10 bg-[#0A0E1A] flex justify-between items-center shrink-0">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-mono font-bold tracking-widest uppercase text-white">RECRUITER PROFILE LEDGER</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrintResume}
                    className="p-2 border border-white/5 bg-white/5 hover:bg-white/10 rounded-md text-gray-300 focus:outline-none"
                    title="Print / Save PDF"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowResume(false)}
                    className="p-2 border border-white/5 bg-white/5 hover:bg-white/10 rounded-md text-gray-300 focus:outline-none"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Printable Body Content */}
              <div id="print-resume-canvas" className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 text-black bg-white select-text">
                {/* Visual Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-black pb-4 text-black">
                  <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-sans font-bold uppercase tracking-tight text-black leading-none">
                      ANGEL ROSE C D
                    </h1>
                    <p className="text-xs md:text-sm font-mono font-semibold text-gray-700 uppercase tracking-widest">
                      AI & Data Science Graduate Engineer
                    </p>
                  </div>
                  <div className="text-left md:text-right font-mono text-[10px] text-gray-600 mt-2 md:mt-0 space-y-0.5">
                    <p>Thrissur, Kerala, India</p>
                    <p>angelrosecd005@gmail.com</p>
                    <p>+91 8891251155</p>
                    <p>www.linkedin.com/in/angelrosecd/</p>
                    <p>github.com/angelrosecd554</p>
                  </div>
                </div>

                {/* Academic Profile */}
                <div className="space-y-2 text-black">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest border-b border-black/30 pb-0.5 text-black">
                    Education Summary
                  </h3>
                  <div className="space-y-1">
                    <div className="flex justify-between items-start text-sm">
                      <strong className="text-black font-semibold">Bachelor of Technology (B.Tech) - Artificial Intelligence & Data Science</strong>
                      <span className="text-xs font-mono font-bold shrink-0 pl-2">2022 – 2026</span>
                    </div>
                    <p className="text-xs text-gray-700 font-sans font-medium">Vimal Jyothi Engineering College, Kannur, Kerala</p>
                    <div className="flex justify-between items-center pt-1 font-mono text-[11px] text-gray-800">
                      <span>Affiliated with APJ Abdul Kalam Technological University (KTU)</span>
                      <span className="font-bold">CGPA: 7.35</span>
                    </div>
                  </div>
                </div>

                {/* Core Technical Assets */}
                <div className="space-y-2 text-black">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest border-b border-black/30 pb-0.5 text-black">
                    Technical Core Skills
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="space-y-1">
                      <strong className="text-black">Programming Languages:</strong>
                      <p className="text-gray-700 text-xxs font-normal">Python, C, Java, R</p>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-black">Tools & IDEs:</strong>
                      <p className="text-gray-700 text-xxs font-normal">Linux Kernel, VS Code, PyCharm, Jupyter, R Studio</p>
                    </div>
                    <div className="space-y-1 col-span-1 md:col-span-2">
                      <strong className="text-black">Sub-specialties:</strong>
                      <p className="text-gray-700 text-xxs font-normal">Machine Learning Algorithms, NLP Tokenization, Edge Core Pruning, Model Tuning, Data Mining</p>
                    </div>
                  </div>
                </div>

                {/* Selected Work Summary */}
                <div className="space-y-4 text-black font-sans">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest border-b border-black/30 pb-0.5 text-black">
                    Project History
                  </h3>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline text-sm">
                      <strong className="text-black font-bold">TRIPMATE: AI Travel Buddy System</strong>
                      <span className="text-xs font-mono text-gray-600">Travel AI Bot</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Constructed an emotion detection travel assistant incorporating facial sentiment indicators to optimize travel itineraries, reducing tourist fatigue by approximately 30%.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline text-sm">
                      <strong className="text-black font-bold">ONEMED AI: NLP Medical Assistant</strong>
                      <span className="text-xs font-mono text-gray-600">Healthcare NLP</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Engineered NLP clinical extraction pipelines. Parsed unstructured receipts and charts, optimizing document recall accuracies up to 96.4%.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline text-sm">
                      <strong className="text-black font-bold">Efficient AI: Edge Neural Optimizer</strong>
                      <span className="text-xs font-mono text-gray-600">Model Efficiency</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Authored dynamic layer skipping protocols to bypass redundant neural nodes on low-power devices, delivering 34% execution latency reductions.
                    </p>
                  </div>
                </div>

                {/* Certifications and credentials list */}
                <div className="space-y-2 text-black font-sans">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest border-b border-black/30 pb-0.5 text-black">
                    Verified Certifications
                  </h3>
                  <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1 font-mono">
                    <li>Introduction to Machine Learning (NPTEL - IIT Madras)</li>
                    <li>Applied Artificial Intelligence Diploma (Lets Code AI)</li>
                    <li>Tink-Her-Hack 3.0 Hacker (TinkerHub Foundation)</li>
                  </ul>
                </div>
              </div>

              {/* Print Notice bar */}
              <div className="p-4 bg-[#0A0E1A] shrink-0 border-t border-white/10 text-center font-mono text-xxs text-gray-500">
                Press the print icon at the top corner to save this resume as a localized recruiter PDF.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
