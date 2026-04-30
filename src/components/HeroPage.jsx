import { motion } from 'framer-motion';
import { useState } from 'react';

const titleText = "WILL YOU WIN?";

const HeroPage = ({ onEnter }) => {
  const [clicked, setClicked] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    },
    exit: {
      y: '-100vh',
      opacity: 0,
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: -40,
      rotateX: 90
    },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.6, 
        delay: i * 0.08,
        ease: 'easeOut'
      }
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const handleClick = (e) => {
    setClickPos({ x: e.clientX, y: e.clientY });
    setClicked(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center min-h-screen z-10 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 
        className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text text-shimmer mb-6 text-center flex flex-wrap justify-center"
      >
        {titleText.split('').map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            className="inline-block"
            style={{ perspective: '1000px' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p 
        variants={itemVariants}
        className="font-inter text-xl text-lol-muted mb-12 text-center"
      >
        Feed the Oracle. Get the Verdict.
      </motion.p>

      <motion.button
        variants={itemVariants}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-8 py-4 border-2 border-lol-gold text-lol-gold font-cinzel text-lg tracking-widest uppercase hover:bg-lol-gold hover:text-lol-dark transition-colors duration-300 animate-pulse-glow"
      >
        ENTER THE RIFT →
      </motion.button>

      <motion.div 
        variants={itemVariants}
        className="flex space-x-4 mt-12 flex-wrap justify-center gap-y-4"
      >
        <span className="px-4 py-1.5 text-xs font-cinzel text-lol-gold bg-lol-card/80 border border-lol-gold/25 rounded-full backdrop-blur-md">
          90.05% Accuracy
        </span>
        <span className="px-4 py-1.5 text-xs font-cinzel text-lol-gold bg-lol-card/80 border border-lol-gold/25 rounded-full backdrop-blur-md">
          95.73% ROC-AUC
        </span>
        <span className="px-4 py-1.5 text-xs font-cinzel text-lol-gold bg-lol-card/80 border border-lol-gold/25 rounded-full backdrop-blur-md">
          18 Features
        </span>
      </motion.div>

      {/* Simple Custom Burst on Click */}
      {clicked && (
        <div 
          className="absolute pointer-events-none"
          style={{ left: clickPos.x, top: clickPos.y }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-lol-gold rounded-full"
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{
                x: Math.cos((i * 30) * Math.PI / 180) * 100,
                y: Math.sin((i * 30) * Math.PI / 180) * 100,
                scale: 0,
                opacity: 0
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HeroPage;
