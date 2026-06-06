import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface Point {
  x: number;
  y: number;
  tx: number; // target x
  ty: number; // target y
  cx: number; // current x
  cy: number; // current y
  ox: number; // original random x
  oy: number; // original random y
  size: number;
  opacity: number;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showText, setShowText] = useState(false);
  const [statusText, setStatusText] = useState('Initializing neural pathways...');
  const containerRef = useRef<HTMLDivElement>(null);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const list = [
      'Initializing neural pathways...',
      'Synchronizing intelligence clusters...',
      'Constructing cognitive networks...',
      'Preparing intelligent systems...',
      'Establishing signal integrity...'
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % list.length;
      setStatusText(list[index]);
    }, 850);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Define vertices forming the letters "AR" centered
    const getLetterVertices = (w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2 - 20;
      const scale = w < 768 ? 60 : 100; // smaller on mobile

      const pts: { x: number; y: number }[] = [];

      // Letter A:
      // Apex
      pts.push({ x: cx - scale * 0.4, y: cy + scale * 0.6 });
      pts.push({ x: cx - scale * 0.2, y: cy + scale * 0.0 });
      pts.push({ x: cx, y: cy - scale * 0.6 }); // peak
      pts.push({ x: cx + scale * 0.2, y: cy + scale * 0.0 });
      pts.push({ x: cx + scale * 0.4, y: cy + scale * 0.6 });
      // Cross-bar
      pts.push({ x: cx - scale * 0.24, y: cy + scale * 0.2 });
      pts.push({ x: cx, y: cy + scale * 0.2 });
      pts.push({ x: cx + scale * 0.24, y: cy + scale * 0.2 });

      // Letter R (shifted Right):
      const rx = cx + scale * 0.8;
      // Stem
      pts.push({ x: rx - scale * 0.3, y: cy + scale * 0.6 });
      pts.push({ x: rx - scale * 0.3, y: cy + scale * 0.2 });
      pts.push({ x: rx - scale * 0.3, y: cy - scale * 0.2 });
      pts.push({ x: rx - scale * 0.3, y: cy - scale * 0.6 });
      // Loop
      pts.push({ x: rx - scale * 0.1, y: cy - scale * 0.6 });
      pts.push({ x: rx + scale * 0.1, y: cy - scale * 0.5 });
      pts.push({ x: rx + scale * 0.1, y: cy - scale * 0.2 });
      pts.push({ x: rx - scale * 0.1, y: cy - scale * 0.2 });
      // Slant Leg
      pts.push({ x: rx + scale * 0.15, y: cy + scale * 0.2 });
      pts.push({ x: rx + scale * 0.3, y: cy + scale * 0.6 });

      return pts;
    };

    const targetPoints = getLetterVertices(width, height);
    const starCount = 300;
    const points: Point[] = [];

    // Initialize random star coordinates
    for (let i = 0; i < starCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      
      // If we are part of the letters, we route them specifically. Otherwise, let them float.
      const hasTarget = i < targetPoints.length;
      const tx = hasTarget ? targetPoints[i].x : rx + (Math.random() - 0.5) * 80;
      const ty = hasTarget ? targetPoints[i].y : ry + (Math.random() - 0.5) * 80;

      points.push({
        x: rx,
        y: ry,
        cx: rx,
        cy: ry,
        ox: rx,
        oy: ry,
        tx,
        ty,
        size: hasTarget ? 2.5 : Math.random() * 1.5 + 0.5,
        opacity: 0
      });
    }

    const startTime = Date.now();
    let animationFrame: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      // Phase timing thresholds (total of 4 seconds)
      // 0.0 - 0.6s: Complete darkness
      // 0.6 - 1.4s: Stars gradually fade in across screen
      // 1.4 - 2.5s: Stars move to cluster and align as neural "AR" connections
      // 2.5 - 3.4s: Assemble initials and light up neural networks
      // 3.4 - 4.2s: Dissolve letters and transition into professional credits Fading
      
      let currentPhase: 'darkness' | 'stars-fade-in' | 'neural' | 'assemble-ar' | 'dissolving' | 'complete' = 'darkness';
      if (elapsed > 3400) {
        currentPhase = 'dissolving';
      } else if (elapsed > 2400) {
        currentPhase = 'assemble-ar';
      } else if (elapsed > 1200) {
        currentPhase = 'neural';
      } else if (elapsed > 500) {
        currentPhase = 'stars-fade-in';
      }

      if (elapsed >= 3300) {
        setShowText(true);
      }

      // Draw starry sky
      points.forEach((pt, idx) => {
        // Opacity mapping based on phase
        if (currentPhase === 'stars-fade-in') {
          // Slowly fadeIn
          pt.opacity = Math.min(1, (elapsed - 500) / 700) * (pt.size / 2);
        } else if (currentPhase === 'neural' || currentPhase === 'assemble-ar') {
          pt.opacity = 0.9;
        } else if (currentPhase === 'dissolving') {
          // Dissolve outward
          const dProgress = (elapsed - 3400) / 800;
          pt.opacity = Math.max(0, 1 - dProgress) * (pt.size / 2.5);
        }

        // Kinetic transitions
        if (currentPhase === 'neural') {
          // Begin migrating to assemble target paths
          const progress = (elapsed - 1200) / 1200; // 0 to 1
          const ease = Math.min(1, progress * progress);
          pt.cx = pt.ox + (pt.tx - pt.ox) * ease;
          pt.cy = pt.oy + (pt.ty - pt.oy) * ease;
        } else if (currentPhase === 'assemble-ar') {
          // Locked in place with subtle breathing vibration
          const breathe = Math.sin(elapsed * 0.004 + idx) * 1.5;
          pt.cx = pt.tx + Math.cos(idx) * breathe;
          pt.cy = pt.ty + Math.sin(idx) * breathe;
        } else if (currentPhase === 'dissolving') {
          // Burst outwards from center of letters
          const centerOffsetX = pt.cx - width / 2;
          const centerOffsetY = pt.cy - (height / 2 - 20);
          const dist = Math.sqrt(centerOffsetX * centerOffsetX + centerOffsetY * centerOffsetY);
          
          // Speed vectors directed away from center
          const driftSpeed = 0.015 * (elapsed - 3400);
          pt.cx += (centerOffsetX / (dist || 1)) * driftSpeed + (Math.random() - 0.5) * 2;
          pt.cy += (centerOffsetY / (dist || 1)) * driftSpeed + (Math.random() - 0.5) * 2;
        }

        // Render point
        if (pt.opacity > 0) {
          ctx.beginPath();
          ctx.arc(pt.cx, pt.cy, pt.size, 0, Math.PI * 2);
          ctx.fillStyle = idx < targetPoints.length && currentPhase !== 'dissolving'
            ? 'rgba(0, 212, 255, 0.95)' // glowing blue for letters
            : 'rgba(255, 255, 255, 0.7)';
          
          if (idx < targetPoints.length && currentPhase === 'assemble-ar') {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00D4FF';
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Connect constellation lines for initials
      if (currentPhase === 'assemble-ar' || currentPhase === 'neural') {
        const lineProgress = currentPhase === 'neural' ? (elapsed - 1200) / 1200 : 1;
        ctx.lineWidth = 0.85 * lineProgress;
        
        // Let's connect vertex pairs to draw neat lines
        ctx.beginPath();
        
        // Drawing Letter 'A' connections
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.4 * lineProgress})`;
        
        // Apex to bottom left
        ctx.moveTo(points[2].cx, points[2].cy);
        ctx.lineTo(points[1].cx, points[1].cy);
        ctx.lineTo(points[0].cx, points[0].cy);

        // Apex to bottom right
        ctx.moveTo(points[2].cx, points[2].cy);
        ctx.lineTo(points[3].cx, points[3].cy);
        ctx.lineTo(points[4].cx, points[4].cy);

        // Cross bar
        ctx.moveTo(points[5].cx, points[5].cy);
        ctx.lineTo(points[6].cx, points[6].cy);
        ctx.lineTo(points[7].cx, points[7].cy);

        ctx.stroke();

        // Drawing Letter 'R' connections
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.4 * lineProgress})`; // Cosmic purple for letter R
        const rOffset = 8; // R starts at index 8
        
        // Stem
        ctx.moveTo(points[rOffset + 0].cx, points[rOffset + 0].cy);
        ctx.lineTo(points[rOffset + 1].cx, points[rOffset + 1].cy);
        ctx.lineTo(points[rOffset + 2].cx, points[rOffset + 2].cy);
        ctx.lineTo(points[rOffset + 3].cx, points[rOffset + 3].cy);

        // Loop top
        ctx.lineTo(points[rOffset + 4].cx, points[rOffset + 4].cy);
        ctx.lineTo(points[rOffset + 5].cx, points[rOffset + 5].cy);
        ctx.lineTo(points[rOffset + 6].cx, points[rOffset + 6].cy);
        ctx.lineTo(points[rOffset + 7].cx, points[rOffset + 7].cy);
        ctx.lineTo(points[rOffset + 1].cx, points[rOffset + 1].cy); // connects back to middle stem

        // Leg
        ctx.moveTo(points[rOffset + 7].cx, points[rOffset + 7].cy);
        ctx.lineTo(points[rOffset + 8].cx, points[rOffset + 8].cy);
        ctx.lineTo(points[rOffset + 9].cx, points[rOffset + 9].cy);

        ctx.stroke();

        // Add intricate spider-web AI neural nodes
        // Mutual interconnection of A and R nodes
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * lineProgress})`;
        ctx.lineWidth = 0.4;
        for (let j = 0; j < targetPoints.length; j++) {
          for (let k = j + 1; k < targetPoints.length; k++) {
            const dx = points[j].cx - points[k].cx;
            const dy = points[j].cy - points[k].cy;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Connect nearby layout nodes across letter segments
            if (distance < width * 0.11) {
              ctx.moveTo(points[j].cx, points[j].cy);
              ctx.lineTo(points[k].cx, points[k].cy);
            }
          }
        }
        ctx.stroke();
      }

      // Check for completion
      if (elapsed > 4500) {
        onCompleteRef.current();
      } else {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    // Resize tracking
    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <div id="loading-screen" ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#040404] select-none text-white overflow-hidden">
      {/* Background stars canvas drawing */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />

      {/* Centerpiece Text Overlays */}
      <div className="relative z-10 text-center flex flex-col items-center pointer-events-none px-6">
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center space-y-3"
            >
              <h1 id="loader-title" className="text-3xl md:text-5xl font-mono tracking-[0.3em] uppercase text-white font-semibold">
                ANGEL ROSE C D
              </h1>
              
              <div id="loader-subtitle-wrapper" className="flex items-center space-x-2">
                <span className="h-[2px] w-8 bg-cyan-400 block" />
                <p id="loader-subtitle" className="text-xs md:text-sm tracking-[0.2em] font-mono text-cyan-400 uppercase font-medium">
                  AI & Data Science Engineer
                </p>
                <span className="h-[2px] w-8 bg-cyan-400 block" />
              </div>

              {/* Progress Bar micro-indicator */}
              <div id="loader-bar-bg" className="w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden rounded-full">
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-2/3 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent"
                />
              </div>

              {/* Rotating Status Text */}
              <p id="loader-status-text" className="text-[10.5px] md:text-xs tracking-[0.15em] font-mono text-cyan-400/70 mt-4 animate-pulse h-4 min-w-[240px] text-center uppercase">
                {statusText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Matrix Vignette Overlay */}
      <div id="loader-vignette" className="absolute inset-0 bg-gradient-to-t from-[#040404] via-transparent to-[#040404] pointer-events-none opacity-40" />
    </div>
  );
}
