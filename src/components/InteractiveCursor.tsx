import React, { useEffect, useRef } from 'react';

interface CursorProps {
  immersive: boolean;
}

interface OrbitParticle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  color: string;
}

interface ParticlePulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

export default function InteractiveCursor({ immersive }: CursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const hoverTypeRef = useRef<'default' | 'button' | 'card' | 'skill' | 'link'>('default');
  const sizeRef = useRef(1.0); // for scaling smooth transitions
  const pulseRipples = useRef<ParticlePulse[]>([]);
  const particlesRef = useRef<OrbitParticle[]>([
    { angle: 0, radius: 10, speed: 0.04, size: 1.5, color: '#00D4FF' }, // electric blue
    { angle: Math.PI * 0.5, radius: 15, speed: -0.03, size: 1.3, color: '#8B5CF6' }, // soft purple
    { angle: Math.PI * 1.2, radius: 7, speed: 0.06, size: 1.0, color: '#A3FF12' }, // neural green
    { angle: Math.PI * 1.7, radius: 18, speed: -0.02, size: 1.6, color: '#00D4FF' } // electric blue
  ]);

  useEffect(() => {
    if (!immersive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse locations
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;

      // Update global CSS custom properties for hover spotlights (lantern mode)
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleMouseLeaveWindow = () => {
      mouseRef.current.active = false;
    };

    // Global Hover element detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isButton = target.closest('button, [role="button"], input[type="submit"]') !== null;
      const isLink = target.closest('a') !== null;
      const isCard = target.closest('.project-card, [id^="card-"], #projects .border, #certifications .group') !== null;
      const isSkill = target.closest('.skill-node, [id^="skill-"], #skills button') !== null;

      if (isButton) {
        hoverTypeRef.current = 'button';
      } else if (isLink) {
        hoverTypeRef.current = 'link';
      } else if (isCard) {
        hoverTypeRef.current = 'card';
      } else if (isSkill) {
        hoverTypeRef.current = 'skill';
      } else {
        hoverTypeRef.current = 'default';
      }
    };

    // Create a pulse ring trigger on click
    const handleMouseDown = () => {
      pulseRipples.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        radius: 4,
        maxRadius: 40,
        opacity: 1.0,
        color: hoverTypeRef.current === 'skill' ? '#A3FF12' : '#00D4FF'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);

    // Initial position matching immediately to prevent jump
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;

    let time = 0;
    let animationFrameId: number;

    const render = () => {
      time += 0.5;
      ctx.clearRect(0, 0, width, height);

      const m = mouseRef.current;
      if (!m.active) {
        // If inactive, keep animation running but hide custom cursor
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth inertia movement delay
      m.x += (m.targetX - m.x) * 0.12;
      m.y += (m.targetY - m.y) * 0.12;

      // Update size scale multiplier smoothly based on hover styles
      let targetSize = 1.0;
      if (hoverTypeRef.current === 'button') targetSize = 1.6;
      if (hoverTypeRef.current === 'link') targetSize = 0.5;
      if (hoverTypeRef.current === 'card') targetSize = 1.25;
      if (hoverTypeRef.current === 'skill') targetSize = 1.35;

      sizeRef.current += (targetSize - sizeRef.current) * 0.12;

      // Ensure click ripples update and grow
      const ripples = pulseRipples.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.8;
        r.opacity = 1.0 - r.radius / r.maxRadius;
        if (r.opacity <= 0) {
          ripples.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r.color === '#A3FF12' ? '163, 255, 18' : '0, 212, 255'}, ${r.opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Inner Rotating Core
      const coreRadius = 5 * sizeRef.current;
      const themeColor = hoverTypeRef.current === 'skill' 
        ? 'rgba(163, 255, 18, 0.85)' // green for skill core
        : hoverTypeRef.current === 'link'
        ? 'rgba(139, 92, 246, 0.95)' // purple for links
        : 'rgba(0, 212, 255, 0.9)';   // cyan for default/button

      ctx.save();
      ctx.shadowBlur = 8 * sizeRef.current;
      ctx.shadowColor = hoverTypeRef.current === 'skill' ? '#A3FF12' : '#00D4FF';

      // Layered core drawing
      const coreGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, coreRadius);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.5, themeColor);
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(m.x, m.y, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();
      ctx.restore();

      // Outer Breathing ring (with delicate transparency)
      const breath = Math.sin(time * 0.045) * 1.5;
      const baseOuterRadius = hoverTypeRef.current === 'link' ? 12 : 22;
      const outerRadius = (baseOuterRadius + breath) * sizeRef.current;

      ctx.beginPath();
      ctx.arc(m.x, m.y, outerRadius, 0, Math.PI * 2);
      
      let strokeStyle = 'rgba(0, 212, 255, 0.22)';
      let lineWidth = 0.8;

      if (hoverTypeRef.current === 'button') {
        strokeStyle = 'rgba(0, 212, 255, 0.65)';
        lineWidth = 1.3;
      } else if (hoverTypeRef.current === 'link') {
        strokeStyle = 'rgba(139, 92, 246, 0.75)';
        lineWidth = 1.0;
      } else if (hoverTypeRef.current === 'card') {
        strokeStyle = 'rgba(139, 92, 246, 0.4)';
        lineWidth = 1.1;
      } else if (hoverTypeRef.current === 'skill') {
        strokeStyle = 'rgba(163, 255, 18, 0.55)';
        lineWidth = 1.2;
      }

      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // Draw elegant technical dotted crosshairs or sub-arcs around core during hovering states
      if (hoverTypeRef.current === 'button' || hoverTypeRef.current === 'card' || hoverTypeRef.current === 'skill') {
        ctx.save();
        ctx.beginPath();
        // Dynamic rotating arc indicator
        const rotateSpeed = time * 0.02;
        ctx.arc(m.x, m.y, outerRadius + 4, rotateSpeed, rotateSpeed + Math.PI * 0.25);
        ctx.arc(m.x, m.y, outerRadius + 4, rotateSpeed + Math.PI, rotateSpeed + Math.PI * 1.25);
        ctx.strokeStyle = hoverTypeRef.current === 'skill' ? 'rgba(163, 255, 18, 0.4)' : 'rgba(0, 212, 255, 0.35)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.restore();
      }

      // Orbiting energy units (floating particles)
      const particles = particlesRef.current;
      const speedMultiplier = hoverTypeRef.current === 'card' ? 2.5 : 1.0; // accelerate when on cards

      particles.forEach((p) => {
        p.angle += p.speed * speedMultiplier;
        const currentRadius = p.radius * sizeRef.current;
        const px = m.x + Math.cos(p.angle) * currentRadius;
        const py = m.y + Math.sin(p.angle) * currentRadius;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, p.size * (sizeRef.current < 0.8 ? 0.8 : sizeRef.current), 0, Math.PI * 2);
        
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        // Draw delicate trace line between particles and core during idle/general modes
        if (hoverTypeRef.current === 'default' && time % 60 < 20) {
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(px, py);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.05 * (1 - (time % 60) / 20)})`;
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [immersive]);

  if (!immersive) return null;

  return (
    <canvas
      id="immersive-cursor-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
