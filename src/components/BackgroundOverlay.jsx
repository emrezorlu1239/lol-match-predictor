import React, { useEffect, useState, useRef } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundOverlay({ imageUrl, children, grayscale = false }) {
  const [init, setInit] = useState(false);
  const bgRef = useRef(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    let animationFrameId;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * -40; // Parallax opposite to mouse
      targetY = (e.clientY / window.innerHeight - 0.5) * -40;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    updateParallax();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const particlesOptions = {
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 60,
    particles: {
      color: { value: "#C89B3C" },
      move: {
        direction: "top",
        enable: true,
        random: true,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: { enable: true },
        value: window.innerWidth < 768 ? 20 : 50,
      },
      opacity: { value: { min: 0.1, max: 0.3 } },
      shape: { type: "polygon", polygon: { sides: 6 } },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0E1A]">
      <AnimatePresence mode="wait">
        <motion.div
          key={imageUrl}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1, filter: grayscale ? 'grayscale(0.4)' : 'grayscale(0)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {/* We wrap another div inside to handle parallax without conflicting with Framer Motion */}
          <div ref={bgRef} className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-110" style={{ backgroundImage: `url(${imageUrl})` }} />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0E1A] via-[rgba(10,14,26,0.7)] to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(10,14,26,0.3)] to-transparent h-1/3" />
      
      {init && (
        <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen opacity-50">
          <Particles id="tsparticles" options={particlesOptions} />
        </div>
      )}

      <div className="relative z-30 min-h-screen">
        {children}
      </div>
    </div>
  );
}
