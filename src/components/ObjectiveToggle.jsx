import { motion } from 'framer-motion';

const ObjectiveToggle = ({ icon, label, value, onChange }) => {
  const getBtnClass = (targetVal) => {
    const base = "flex-1 py-1.5 text-xs font-cinzel rounded-md transition-all duration-150 border";
    
    if (value === targetVal) {
      if (targetVal === 1) return `${base} bg-[#1E96FF] text-white border-transparent shadow-[0_0_10px_rgba(30,150,255,0.5)]`;
      if (targetVal === 2) return `${base} bg-[#E84057] text-white border-transparent shadow-[0_0_10px_rgba(232,64,87,0.5)]`;
      if (targetVal === 0) return `${base} bg-white/10 text-lol-muted border-transparent`;
    }
    
    return `${base} bg-transparent text-lol-muted border-lol-muted/30 hover:border-lol-muted/60`;
  };

  const springTransition = {
    type: "spring",
    stiffness: 500,
    damping: 15
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 glass-panel mb-2">
      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
        <span className="text-xl">{icon}</span>
        <span className="font-cinzel text-sm text-lol-text">{label}</span>
      </div>
      
      <div className="flex space-x-1 sm:space-x-2 w-full sm:w-auto">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          animate={value === 1 ? { scale: [0.9, 1.05, 1.0] } : {}}
          transition={value === 1 ? springTransition : {}}
          onClick={() => onChange(1)}
          className={getBtnClass(1)}
        >
          🔵 BLUE
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          animate={value === 2 ? { scale: [0.9, 1.05, 1.0] } : {}}
          transition={value === 2 ? springTransition : {}}
          onClick={() => onChange(2)}
          className={getBtnClass(2)}
        >
          🔴 RED
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          animate={value === 0 ? { scale: [0.9, 1.05, 1.0] } : {}}
          transition={value === 0 ? springTransition : {}}
          onClick={() => onChange(0)}
          className={getBtnClass(0)}
        >
          — NONE
        </motion.button>
      </div>
    </div>
  );
};

export default ObjectiveToggle;
