import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import BackgroundOverlay from '../components/BackgroundOverlay';

const Counter = ({ from, to, duration, className }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(from + easeProgress * (to - from));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return <span className={className}>{(count * 100).toFixed(1)}%</span>;
};

export default function Verdict() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, formData } = location.state || {};
  
  const [flash, setFlash] = useState(true);

  // If directly navigated without state, go back
  useEffect(() => {
    if (!prediction) {
      navigate('/form');
    }
  }, [prediction, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setFlash(false), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!prediction) return null;

  const winProb = prediction.win_probability;
  const isVictory = winProb > 0.5;
  
  const bgImage = isVictory 
    ? "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_1.jpg"
    : "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg";

  useEffect(() => {
    if (isVictory && !flash) {
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 360,
          colors: ['#C89B3C', '#1E96FF', '#FFFFFF'],
          origin: { y: 0.5 },
          disableForReducedMotion: true
        });
      }, 1000);
    }
  }, [isVictory, flash]);

  return (
    <>
      {flash && <div className="fixed inset-0 bg-black z-[9999]" />}
      
      <BackgroundOverlay imageUrl={bgImage} grayscale={!isVictory}>
        {!isVictory && (
          <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(232,64,87,0.5)] animate-pulse" />
        )}
        
        {isVictory && (
          <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(10,21,48,0.4)_0%,transparent_70%)] animate-pulse" />
        )}

        <div className="relative z-30 min-h-screen flex flex-col items-center justify-center p-4">
          
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <motion.h1
              initial={isVictory ? { scale: 0.3, opacity: 0 } : { opacity: 0 }}
              animate={isVictory ? { scale: [1.1, 1], opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className={`font-cinzel text-[clamp(4rem,10vw,8rem)] font-bold mb-4 ${
                isVictory 
                  ? "text-[#C89B3C] drop-shadow-[0_0_30px_#C89B3C] text-shimmer" 
                  : "text-[#E84057] drop-shadow-[0_0_30px_#E84057] glitch-text"
              }`}
            >
              {isVictory ? "VICTORY" : "DEFEAT"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`font-inter text-xl md:text-2xl tracking-wider mb-8 ${isVictory ? 'text-[#1E96FF]' : 'text-[#E84057]'}`}
            >
              {isVictory ? "Blue Side Prevails." : "The Nexus Falls."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Counter 
                from={0} 
                to={winProb} 
                duration={2000} 
                className={`font-cinzel text-5xl md:text-7xl drop-shadow-[0_0_15px_currentColor] ${isVictory ? 'text-[#C89B3C]' : 'text-[#E84057]'}`}
              />
            </motion.div>
          </div>

          <div className="w-full max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {prediction.top_features?.map((feat, idx) => (
              <motion.div
                key={feat}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 + (idx * 0.2), type: "spring" }}
                className="glass-panel p-6 flex flex-col items-center text-center group hover:bg-[#C89B3C]/10 transition-colors"
              >
                <span className="font-inter text-[#7A7A8C] text-xs uppercase tracking-widest mb-2">Key Factor {idx + 1}</span>
                <span className="font-cinzel text-[#F0E6D3] text-lg">{feat}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <button
              onClick={() => navigate('/form')}
              className="px-8 py-4 font-cinzel text-xl text-[#0A0E1A] bg-[#C89B3C] border-2 border-[#C89B3C] rounded-sm transition-all duration-300 hover:bg-transparent hover:text-[#C89B3C] hover:shadow-[0_0_20px_#C89B3C]"
            >
              🔄 PREDICT AGAIN
            </button>
            <Link to="/" className="font-inter text-[#7A7A8C] text-sm hover:text-[#C89B3C] transition-colors underline underline-offset-4">
              Start Over
            </Link>
          </motion.div>

        </div>
      </BackgroundOverlay>
    </>
  );
}
