import React, { useEffect, useRef, useState } from 'react';

interface Star {
  x: number; // 3D coordinates relative to center
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
  brightness: number;
}

interface CosmosCanvasProps {
  immersive?: boolean;
}

export default function CosmosCanvas({ immersive = true }: CosmosCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, radius: 180, active: false });
  const scrollRef = useRef(0);
  const starfieldRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Volumetric nebula clouds animation state
  const nebulaRef = useRef([
    { x: -100, y: -100, vx: 0.1, vy: 0.08, size: 400, color: 'rgba(139, 92, 246, 0.08)' }, // soft cosmic purple
    { x: 200, y: 150, vx: -0.07, vy: -0.12, size: 500, color: 'rgba(0, 212, 255, 0.06)' },  // electric blue
    { x: -300, y: 200, vx: 0.05, vy: -0.04, size: 450, color: 'rgba(10, 14, 26, 0.5)' }     // midnight indigo
  ]);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Build the 3D Starfield
    const initStars = (w: number, h: number) => {
      const count = window.innerWidth < 768 ? 140 : 350;
      const stars: Star[] = [];
      const colors = [
        'rgba(240, 244, 255, 0.8)', // soft white/silver
        'rgba(0, 212, 255, 0.7)',   // icy blue
        'rgba(163, 130, 255, 0.65)', // soft purple
        'rgba(200, 220, 255, 0.5)'  // deep background ambient star
      ];

      for (let i = 0; i < count; i++) {
        // Random 3D coordinate distribution inside a sphere/cube around origin (0, 0, 0)
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * Math.min(w, h) * 1.3 + 10;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = Math.random() * 800 - 400; // depth range -400 to 400

        stars.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          size: Math.random() * 1.8 + 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkleSpeed: 0.015 + Math.random() * 0.035,
          twinkleOffset: Math.random() * Math.PI * 2,
          brightness: Math.random()
        });
      }
      starfieldRef.current = stars;
    };

    initStars(width, height);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Setup Resize Observer for optimal responsiveness
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width: entryWidth, height: entryHeight } = entries[0].contentRect;
      width = canvas.width = entryWidth;
      height = canvas.height = entryHeight;
      initStars(entryWidth, entryHeight);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Camera 3D variables
    const focalLength = 350; // controls 3D perspective depth distortion
    let time = 0;

    // Tooltip status text values
    let tooltipTimer = 0;
    let tooltipText = '';
    let tooltipAlpha = 0;
    const tooltipPhrases = [
      'Neural response detected.',
      'Signal amplified.',
      'Pathway stabilized.',
      'Intelligence field active.'
    ];

    // Main 60 FPS animation loop
    const animate = () => {
      const m = mouseRef.current;
      time += 0.5;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Volumetric Nebula Clouds
      ctx.save();
      nebulaRef.current.forEach((cloud) => {
        // Update drift
        cloud.x += cloud.vx;
        cloud.y += cloud.vy;

        // Wrap around boundaries
        if (cloud.x > width + cloud.size) cloud.x = -cloud.size;
        if (cloud.x < -cloud.size) cloud.x = width + cloud.size;
        if (cloud.y > height + cloud.size) cloud.y = -cloud.size;
        if (cloud.y < -cloud.size) cloud.y = height + cloud.size;

        // Immersive fog displacement when mouse approaches
        let renderX = cloud.x;
        let renderY = cloud.y;
        if (immersive && m.active) {
          const dxC = cloud.x - m.x;
          const dyC = cloud.y - m.y;
          const distC = Math.sqrt(dxC * dxC + dyC * dyC);
          if (distC < 600) {
            const shiftFactor = (1 - distC / 600) * 22; // shift away gently
            renderX += (dxC / (distC || 1)) * shiftFactor;
            renderY += (dyC / (distC || 1)) * shiftFactor;
          }
        }

        // Radial gradient for ambient gas cloud feel
        const grad = ctx.createRadialGradient(
          renderX, renderY, 0,
          renderX, renderY, cloud.size
        );
        grad.addColorStop(0, cloud.color);
        grad.addColorStop(1, 'rgba(4, 4, 4, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(renderX, renderY, cloud.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 2. Linear interpolate mouse position for cinematic smoothness
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;

      // 3. Draw Custom Cursor Glow Light (Indirect interactive lighting)
      if (m.active) {
        ctx.save();
        const cursorGrad = ctx.createRadialGradient(
          m.x, m.y, 0,
          m.x, m.y, m.radius
        );
        cursorGrad.addColorStop(0, 'rgba(0, 212, 255, 0.045)');
        cursorGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
        cursorGrad.addColorStop(1, 'rgba(4, 4, 4, 0)');
        ctx.fillStyle = cursorGrad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Parallax scroll variable
      const scrollOffset = scrollRef.current * 0.45;

      const stars = starfieldRef.current;
      const projectedStarsList: { px: number; py: number; size: number; star: Star; rawZ: number }[] = [];

      // 4. Update 3D Stars Positions and Project them to 2D
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Slowly drift stars in Z-depth and rotation over time
        const radAngle = 0.0001 * time;
        // Apply miniature orbital rotation around center
        const cosA = Math.cos(radAngle);
        const sinA = Math.sin(radAngle);
        const rx = star.x * cosA - star.y * sinA;
        const ry = star.x * sinA + star.y * cosA;

        // Dynamic 3D depth, adjusting for window scroll (flight effect)
        let zPos = star.baseZ - scrollOffset;

        // Wrap depth infinitely to avoid running out of stars
        while (zPos < -400) zPos += 800;
        while (zPos > 400) zPos -= 800;

        // 3D coordinate mapping
        const currentZ = zPos + focalLength;

        // Prevent division by zero, negative scales, and extreme values near camera
        if (currentZ < 15) {
          continue;
        }

        // 3D Perspective Projection
        const scale = focalLength / currentZ;
        const px = rx * scale + width / 2;
        const py = ry * scale + height / 2;

        // Calculate twinkle opacity
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.25 + 0.75;
        let brightness = star.brightness * twinkle;

        // Calculate cursor reactions
        let extraScale = 1;
        if (m.active) {
          const dx = px - m.x;
          const dy = py - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < m.radius) {
            const factor = 1 - dist / m.radius;
            brightness += factor * 0.7; // brighten up close stars
            extraScale += factor * 1.5;   // grow stars slightly

            if (immersive) {
              // Smooth gravitational pull towards the conscious guide cursor
              star.x -= (dx * 0.022) * factor;
              star.y -= (dy * 0.022) * factor;
            } else {
              // Establish standard responsive organic push/pull vector
              const wave = Math.sin(time * 0.05 - dist * 0.035) * 6 * factor;
              const force = dist > 0 ? wave * 0.05 / dist : 0;
              star.x += dx * force;
              star.y += dy * force;
            }
          } else {
            // Smoothly ease back to base coordinates
            star.x += (star.baseX - star.x) * 0.02;
            star.y += (star.baseY - star.y) * 0.02;
          }
        }

        // Store projected star details for rendering and connecting neural pathways
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          projectedStarsList.push({
            px,
            py,
            size: Math.max(0.1, star.size * scale * extraScale),
            star,
            rawZ: zPos
          });

          // Draw the Star
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.2, star.size * scale * extraScale), 0, Math.PI * 2);
          ctx.fillStyle = star.color.replace('0.85', brightness.toFixed(2))
                                    .replace('0.9', brightness.toFixed(2))
                                    .replace('0.75', brightness.toFixed(2));
          ctx.shadowBlur = Math.max(0, star.size * 2 * extraScale);
          ctx.shadowColor = star.color;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // 5. Compute and Draw Intelligent Neural Pathways
      // We will only trace connections in space between localized stars
      const connectionMaxDist = window.innerWidth < 768 ? 65 : 95;
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
      ctx.lineWidth = 0.55;

      for (let i = 0; i < projectedStarsList.length; i++) {
        const starA = projectedStarsList[i];

        // Draw dynamic neural networks links to the cursor
        if (m.active) {
          const mdx = starA.px - m.x;
          const mdy = starA.py - m.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < m.radius - 20) {
            const ratio = 1 - mdist / (m.radius - 20);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(starA.px, starA.py);
            ctx.lineTo(m.x, m.y);
            // Blend from soft cyan to purple
            const gradientLine = ctx.createLinearGradient(starA.px, starA.py, m.x, m.y);
            gradientLine.addColorStop(0, `rgba(0, 212, 255, ${0.16 * ratio})`);
            gradientLine.addColorStop(1, `rgba(139, 92, 246, ${0.01 * ratio})`);
            ctx.strokeStyle = gradientLine;
            ctx.lineWidth = 0.65 * ratio;
            ctx.stroke();
            ctx.restore();

            // Send an active neural energy pulse traveling along this temporary connection
            if (immersive) {
              const pulseProgress = (time * 0.025 + i * 0.15) % 1.0;
              const pulseX = starA.px + (m.x - starA.px) * pulseProgress;
              const pulseY = starA.py + (m.y - starA.py) * pulseProgress;
              ctx.save();
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 1.4 * ratio, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(163, 255, 18, 0.85)'; // Neural green accent
              ctx.shadowBlur = 4;
              ctx.shadowColor = '#A3FF12';
              ctx.fill();
              ctx.restore();
            }
          }
        }

        // Connect stars mutually
        // Optimize loops by starting from path threshold bounds
        let connectedCount = 0;
        for (let j = i + 1; j < projectedStarsList.length; j++) {
          if (connectedCount > 3) break; // Limit neural connections per star for organic clarity

          const starB = projectedStarsList[j];

          // Compute 2D distance for paths
          const dx = starA.px - starB.px;
          const dy = starA.py - starB.py;
          const dist2D = Math.sqrt(dx * dx + dy * dy);

          // Connections strengthen near the cursor (dynamic distance extension)
          let nearCursorAmplify = 1;
          if (m.active) {
            const cursorDistA = Math.sqrt((starA.px - m.x) ** 2 + (starA.py - m.y) ** 2);
            if (cursorDistA < m.radius) {
              nearCursorAmplify = 1 + (1 - cursorDistA / m.radius) * 1.5; // up to 2.5x stronger connections near cursor
            }
          }
          const dynamicMaxDist = connectionMaxDist * nearCursorAmplify;

          if (dist2D < dynamicMaxDist) {
            // Also enforce depth similarity to keep 3D layers cohesive
            const depthDiff = Math.abs(starA.rawZ - starB.rawZ);
            if (depthDiff < 200) {
              connectedCount++;
              const alphaRatio = (1 - dist2D / dynamicMaxDist) * (1 - depthDiff / 200) * (nearCursorAmplify * 0.8);

              // Standard straight line vs. wavy guitar string distortion near the cursor
              const midX = (starA.px + starB.px) / 2;
              const midY = (starA.py + starB.py) / 2;
              const dxM = midX - m.x;
              const dyM = midY - m.y;
              const distMid = Math.sqrt(dxM * dxM + dyM * dyM);

              if (immersive && distMid < m.radius) {
                const factorMid = 1 - distMid / m.radius;
                const lineAngle = Math.atan2(starB.py - starA.py, starB.px - starA.px);
                const perpAngle = lineAngle + Math.PI / 2;
                
                // Sinusoidal ripple wiggling like an energized chord
                const wiggle = Math.sin(time * 0.14 - distMid * 0.05) * 7 * factorMid;
                const offsetX = Math.cos(perpAngle) * wiggle;
                const offsetY = Math.sin(perpAngle) * wiggle;

                ctx.beginPath();
                ctx.moveTo(starA.px, starA.py);
                ctx.quadraticCurveTo(midX + offsetX, midY + offsetY, starB.px, starB.py);
              } else {
                ctx.beginPath();
                ctx.moveTo(starA.px, starA.py);
                ctx.lineTo(starB.px, starB.py);
              }

              // Render glowing nerve impulses propagating through pathways
              let impulseCycle = (time * 0.02 + Math.abs(starA.rawZ)) % 1;
              if (impulseCycle < 0) impulseCycle = 0;
              if (impulseCycle > 1) impulseCycle = 1;
              const pathGradient = ctx.createLinearGradient(starA.px, starA.py, starB.px, starB.py);
              
              // Pulsing cyan nerve signals fading gracefully
              const colorIntensity = 0.08 * alphaRatio;
              pathGradient.addColorStop(0, `rgba(0, 212, 255, ${colorIntensity})`);
              pathGradient.addColorStop(impulseCycle, `rgba(163, 255, 18, ${colorIntensity * 2.5})`); // neural green impulse spike
              pathGradient.addColorStop(1, `rgba(139, 92, 246, ${colorIntensity * 1.25})`);

              ctx.strokeStyle = pathGradient;
              ctx.lineWidth = 0.45 * alphaRatio * nearCursorAmplify;
              ctx.stroke();
            }
          }
        }
      }

      // 6. Draw dynamic minimal cursor interaction tooltip
      if (m.active) {
        if (tooltipTimer > 0) {
          tooltipTimer--;
          
          if (tooltipTimer > 150) {
            tooltipAlpha = (180 - tooltipTimer) / 30; // fade in over 30 frames
          } else if (tooltipTimer < 30) {
            tooltipAlpha = tooltipTimer / 30; // fade out over 30 frames
          } else {
            tooltipAlpha = 1;
          }
          
          ctx.save();
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(0, 212, 255, ${0.7 * tooltipAlpha})`;
          
          ctx.fillText(`[ ${tooltipText} ]`, m.x + 14, m.y - 12);
          
          // Draw a delicate indicator line
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.22 * tooltipAlpha})`;
          ctx.lineWidth = 0.55;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x + 10, m.y - 10);
          ctx.stroke();
          ctx.restore();
        } else {
          // Occasional trigger based on random movement and nearby connections
          if (Math.random() < 0.0035) { // Roughly every 5-10 seconds
            tooltipText = tooltipPhrases[Math.floor(Math.random() * tooltipPhrases.length)];
            tooltipTimer = 180; // 3 seconds at 60fps
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div id="cosmos-container" ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-[#040404] pointer-events-auto select-none">
      <canvas id="cosmos-canvas" ref={canvasRef} className="block w-full h-full opacity-90 transition-opacity duration-1000 ease-in-out" />
    </div>
  );
}
