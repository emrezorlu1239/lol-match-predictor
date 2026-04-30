import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CircularGauge = ({ probability }) => {
  const [currentProb, setCurrentProb] = useState(0);
  const [animatedOffset, setAnimatedOffset] = useState(0);
  const size = 260;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const prevProbRef = useRef(0);

  useEffect(() => {
    if (probability === null) {
      setCurrentProb(0);
      setAnimatedOffset(0);
      return;
    }
    
    const startProb = prevProbRef.current;
    const startTime = performance.now();
    const duration = 1200;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const newProb = startProb + (probability - startProb) * easeProgress;
      setCurrentProb(newProb);
      setAnimatedOffset(circumference - (newProb * circumference));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevProbRef.current = probability;
      }
    };
    
    requestAnimationFrame(animate);
  }, [probability, circumference]);

  const getColor = (prob) => {
    if (prob > 0.65) return '#C89B3C';
    if (prob < 0.35) return '#E84057';
    return '#1E96FF';
  };

  const isMystery = probability === null;
  const activeColor = getColor(currentProb);
  const blueOffset = circumference - (currentProb * circumference);

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <motion.svg 
        width={size} 
        height={size} 
        className="transform"
        animate={isMystery ? { rotate: [0, 360] } : { rotate: 0 }}
        transition={isMystery ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#7A7A8C"
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
        />
        
        {/* Red track (Opposite side) */}
        {!isMystery && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#E84057"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - ((1 - currentProb) * circumference)}
            style={{ 
              transformOrigin: 'center', 
              transform: 'rotate(180deg)',
              transition: 'stroke-dashoffset 1200ms ease-out'
            }}
          />
        )}

        {/* Active Probability Track */}
        {!isMystery && (
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={activeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={blueOffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: blueOffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}
        
        {/* Mystery Spinner Track */}
        {isMystery && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#C89B3C"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.8}
            strokeLinecap="round"
          />
        )}
      </motion.svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span 
          className="font-cinzel text-5xl font-bold" 
          style={{ color: !isMystery ? activeColor : '#F0E6D3' }}
        >
          {isMystery ? '?' : `${Math.round(currentProb * 100)}%`}
        </span>
        <span className="font-cinzel text-xs text-lol-muted mt-2 tracking-widest uppercase">
          Blue Win Chance
        </span>
      </div>
    </div>
  );
};

export default CircularGauge;
