import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { ShieldAlert, Target, Zap } from 'lucide-react';

const VerdictPage = ({ predictionData, onPredictAgain, onStartOver }) => {
  const { win_probability, top_features } = predictionData || { win_probability: 0.5, top_features: [] };
  const isVictory = win_probability > 0.50;
  const percentage = Math.round(win_probability * 100);
  
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const verdictRef = useRef(null);
  const isInView = useInView(verdictRef, { once: true });

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setDisplayPercentage(Math.round(easeProgress * percentage));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [percentage]);

  useEffect(() => {
    if (isVictory && isInView) {
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#C89B3C', '#1E96FF', '#F0C96C'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.5 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.5 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
      
      // Big burst on mount
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
      });
    }
  }, [isVictory, isInView]);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const featureIcons = [<Target key="1" />, <Zap key="2" />, <ShieldAlert key="3" />];

  return (
    <motion.div 
      ref={verdictRef}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center p-6 z-10 ${
        isVictory ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a1a3a] to-lol-dark' : 'bg-lol-dark'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Red pulse glow for defeat */}
      {!isVictory && (
        <motion.div 
          className="absolute inset-0 shadow-[inset_0_0_100px_rgba(232,64,87,0.2)] pointer-events-none"
          animate={{ boxShadow: ['inset 0 0 50px rgba(232,64,87,0.1)', 'inset 0 0 150px rgba(232,64,87,0.3)', 'inset 0 0 50px rgba(232,64,87,0.1)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      {/* Background flash for defeat */}
      {!isVictory && (
        <motion.div 
          className="absolute inset-0 bg-[#2a0a0a] pointer-events-none z-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}

      {/* Confetti for victory */}
      {isVictory && (
        <div className="absolute inset-0 z-0 pointer-events-none" />
      )}

      <div className="z-10 flex flex-col items-center w-full max-w-4xl">
        {isVictory ? (
          <motion.h1 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="font-cinzel text-6xl md:text-8xl font-bold text-transparent bg-clip-text text-shimmer-fast mb-2 text-center"
          >
            VICTORY
          </motion.h1>
        ) : (
          <motion.h1 
            className="font-cinzel text-6xl md:text-8xl font-bold text-lol-red mb-2 text-center glitch-text"
            animate={{ x: [0, -4, 4, -4, 4, 0] }}
            transition={{ duration: 0.3, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
          >
            DEFEAT
          </motion.h1>
        )}

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-lol-muted mb-8 font-inter text-center"
        >
          {isVictory ? "Blue Side Prevails." : "The Odds Are Against You."}
        </motion.p>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`text-8xl md:text-9xl font-cinzel font-bold mb-12 ${isVictory ? 'text-lol-gold' : 'text-lol-red'}`}
          style={{ textShadow: `0 0 40px ${isVictory ? 'rgba(200, 155, 60, 0.4)' : 'rgba(232, 64, 87, 0.4)'}` }}
        >
          {displayPercentage}%
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {top_features.map((feature, idx) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (idx * 0.15), duration: 0.6 }}
              className="glass-panel p-4 flex flex-col items-center text-center"
            >
              <div className="text-lol-gold mb-2">
                {featureIcons[idx % 3]}
              </div>
              <h3 className="font-cinzel text-sm text-lol-text mb-1">{feature.replace(/_/g, ' ')}</h3>
              <p className="text-xs text-lol-muted">Key predictive factor</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-4"
        >
          <button 
            onClick={onPredictAgain}
            className="px-8 py-3 bg-lol-gold text-lol-dark font-cinzel font-bold tracking-wide rounded hover:bg-lol-gold-light transition-colors shadow-[0_0_20px_rgba(200,155,60,0.3)] hover:shadow-[0_0_30px_rgba(200,155,60,0.6)]"
          >
            🔄 PREDICT AGAIN
          </button>
          
          <button 
            onClick={onStartOver}
            className="text-sm text-lol-muted hover:text-lol-text transition-colors font-inter underline underline-offset-4"
          >
            Start Over
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VerdictPage;
