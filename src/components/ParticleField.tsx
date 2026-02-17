import { useEffect, useRef, useCallback } from "react";

const PARTICLE_COUNT = 250;
const MOUSE_RADIUS = 120;
const PARTICLE_COLOR = "255, 255, 255";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  speed: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const dimensionsRef = useRef({ w: 0, h: 0 });

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { w, h };
      if (particlesRef.current.length === 0) {
        initParticles(w, h);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const { w, h } = dimensionsRef.current;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift slowly
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 3;
          p.y += Math.sin(angle) * force * 3;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${p.opacity})`;
        ctx.fill();

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.sqrt(
            (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2
          );
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${0.12 * (1 - d / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default ParticleField;
