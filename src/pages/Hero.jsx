import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackgroundOverlay from '../components/BackgroundOverlay';

export default function Hero() {
  const navigate = useNavigate();
  const title = "WILL YOU WIN?";
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 80) {
      btnRef.current.style.transform = `translate(${distX * 0.15}px, ${distY * 0.15}px)`;
    } else {
      btnRef.current.style.transform = `translate(0px, 0px)`;
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTransition = (e) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = '#0A0E1A';
    overlay.style.zIndex = '9998';
    overlay.style.clipPath = `circle(0% at ${x}px ${y}px)`;
    overlay.style.transition = 'clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1)';
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(150% at ${x}px ${y}px)`;
    });

    setTimeout(() => {
      navigate('/form');
      setTimeout(() => overlay.remove(), 100);
    }, 700);
  };

  return (
    <BackgroundOverlay imageUrl="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg">
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex overflow-hidden mb-4 relative">
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.4 + index * 0.08,
                type: "spring",
                bounce: 0.5,
                duration: 0.8
              }}
              className="text-[clamp(3rem,8vw,7rem)] font-cinzel text-white drop-shadow-[0_0_15px_rgba(200,155,60,0.8)] relative z-10"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "200%" }}
            transition={{ delay: 0.7, duration: 1.5, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[rgba(200,155,60,0.4)] to-transparent z-20 mix-blend-overlay"
            style={{ transform: "skewX(-20deg)" }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-[1.2rem] font-inter text-[rgba(240,230,211,0.7)] mb-12 max-w-xl mx-auto"
        >
          Feed the Oracle. Get the Verdict.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="relative z-50 mb-20"
        >
          <div className="absolute inset-0 rounded-sm animate-pulse-glow" />
          <button
            ref={btnRef}
            onClick={handleTransition}
            className="group relative px-8 py-4 font-cinzel text-xl text-[#F0E6D3] border-2 border-[#C89B3C] rounded-sm transition-all duration-300 hover:bg-[#C89B3C] hover:text-[#0A0E1A] hover:scale-105 bg-[#0A0E1A]/50 backdrop-blur-sm"
          >
            ENTER THE RIFT &rarr;
          </button>
        </motion.div>

        <div className="absolute bottom-10 left-0 right-0 flex flex-wrap justify-center gap-6 px-4">
          {[
            { delay: 1.3, text: "90.05% Accuracy" },
            { delay: 1.5, text: "95.73% ROC-AUC" },
            { delay: 1.7, text: "18 Features" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay, duration: 0.6 }}
              className="glass-panel px-6 py-3 font-cinzel text-[#C89B3C]"
            >
              {stat.text}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </BackgroundOverlay>
  );
}
