import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackgroundOverlay from '../components/BackgroundOverlay';
import { Droplet, Castle, ShieldAlert, Skull, Flame, Eye, Sword, Wand2, Crosshair, Target, HeartPulse, Shield, RotateCw } from 'lucide-react';

const OBJECTIVES = [
  { id: 'firstBlood', label: 'First Blood', icon: Droplet },
  { id: 'firstTower', label: 'First Tower', icon: Castle },
  { id: 'firstInhibitor', label: 'First Inhibitor', icon: ShieldAlert },
  { id: 'firstBaron', label: 'First Baron', icon: Skull },
  { id: 'firstDragon', label: 'First Dragon', icon: Flame },
  { id: 'firstRiftHerald', label: 'First Herald', icon: Eye },
];

const ROLES = [
  { id: 'Fighter', label: 'Fighter', icon: Sword },
  { id: 'Mage', label: 'Mage', icon: Wand2 },
  { id: 'Assassin', label: 'Assassin', icon: Crosshair },
  { id: 'Marksman', label: 'Marksman', icon: Target },
  { id: 'Support', label: 'Support', icon: HeartPulse },
  { id: 'Tank', label: 'Tank', icon: Shield },
];

export default function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstBlood: 0, firstTower: 0, firstInhibitor: 0, firstBaron: 0, firstDragon: 0, firstRiftHerald: 0,
    t1_Fighter_count: 0, t1_Mage_count: 0, t1_Assassin_count: 0, t1_Marksman_count: 0, t1_Support_count: 0, t1_Tank_count: 0,
    t2_Fighter_count: 0, t2_Mage_count: 0, t2_Assassin_count: 0, t2_Marksman_count: 0, t2_Support_count: 0, t2_Tank_count: 0,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchPrediction = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      setPrediction(result);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchPrediction(formData);
      if(initialLoading) setInitialLoading(false);
    }, 300);
    return () => clearTimeout(handler);
  }, [formData]);

  const handleObjectiveChange = (id, team) => {
    setFormData(prev => ({ ...prev, [id]: team }));
  };

  const handleRoleChange = (team, role, delta) => {
    const key = `t${team}_${role}_count`;
    setFormData(prev => ({
      ...prev,
      [key]: Math.max(0, Math.min(5, prev[key] + delta))
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/verdict', { state: { prediction, formData } });
    }, 800);
  };

  // SVg Gauge logic
  const gaugeRadius = 110;
  const circumference = 2 * Math.PI * gaugeRadius;
  const winProb = prediction ? prediction.win_probability : 0.5;
  const blueOffset = circumference - (winProb * circumference);
  
  return (
    <BackgroundOverlay imageUrl="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg">
      <div className="min-h-screen py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 relative z-20">
          
          {/* LEFT COLUMN */}
          <motion.div 
            className="w-full md:w-[55%] flex flex-col gap-8"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div>
              <h2 className="text-2xl font-cinzel text-[#C89B3C] mb-2 relative inline-block group">
                MATCH DATA
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute -bottom-1 left-0 h-[2px] bg-[#C89B3C]"
                />
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OBJECTIVES.map((obj, idx) => {
                const Icon = obj.icon;
                return (
                  <motion.div 
                    key={obj.id}
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18, delay: idx * 0.06 }}
                    className="glass-panel p-4 flex flex-col items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2 text-[#F0E6D3]">
                      <Icon size={24} className="text-[#C89B3C]" />
                      <span className="font-cinzel text-sm">{obj.label}</span>
                    </div>
                    <div className="flex bg-[#0A0E1A]/50 rounded-full p-1 border border-[#C89B3C]/20">
                      {[1, 0, 2].map((team) => {
                        const isSelected = formData[obj.id] === team;
                        let bgClass = "transparent";
                        let textClass = "text-[#7A7A8C]";
                        if (isSelected) {
                          if (team === 1) { bgClass = "bg-[#1E96FF] shadow-[0_0_10px_#1E96FF]"; textClass = "text-white"; }
                          else if (team === 2) { bgClass = "bg-[#E84057] shadow-[0_0_10px_#E84057]"; textClass = "text-white"; }
                          else { bgClass = "bg-[#C89B3C] shadow-[0_0_10px_#C89B3C]"; textClass = "text-[#0A0E1A]"; }
                        }
                        
                        return (
                          <motion.button
                            key={team}
                            onClick={() => handleObjectiveChange(obj.id, team)}
                            whileTap={{ scale: 0.9 }}
                            className={`px-4 py-1 text-xs font-bold rounded-full transition-colors duration-200 ${bgClass} ${textClass}`}
                          >
                            {team === 1 ? 'BLUE' : team === 2 ? 'RED' : 'NONE'}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="glass-panel p-6">
              <div className="flex justify-between items-center mb-6 border-b border-[#C89B3C]/20 pb-2">
                <span className="font-cinzel text-[#1E96FF] text-xl drop-shadow-[0_0_5px_#1E96FF]">BLUE SIDE</span>
                <span className="font-cinzel text-[#C89B3C]">ROLES</span>
                <span className="font-cinzel text-[#E84057] text-xl drop-shadow-[0_0_5px_#E84057]">RED SIDE</span>
              </div>
              
              <div className="flex flex-col gap-4">
                {ROLES.map((role) => {
                  const Icon = role.icon;
                  return (
                    <div key={role.id} className="flex justify-between items-center bg-[#0A0E1A]/40 rounded-lg p-2">
                      <div className="flex items-center gap-3 w-1/3 justify-start">
                        <button onClick={() => handleRoleChange(1, role.id, -1)} className="w-8 h-8 rounded-full border border-[#C89B3C]/50 text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#0A0E1A] transition-colors">-</button>
                        <span className="font-cinzel text-xl text-[#C89B3C] w-4 text-center">{formData[`t1_${role.id}_count`]}</span>
                        <button onClick={() => handleRoleChange(1, role.id, 1)} className="w-8 h-8 rounded-full border border-[#C89B3C]/50 text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#0A0E1A] transition-colors">+</button>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center w-1/3 text-[#F0E6D3] opacity-80">
                        <Icon size={18} />
                        <span className="text-[10px] font-cinzel mt-1">{role.label}</span>
                      </div>

                      <div className="flex items-center gap-3 w-1/3 justify-end">
                        <button onClick={() => handleRoleChange(2, role.id, -1)} className="w-8 h-8 rounded-full border border-[#C89B3C]/50 text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#0A0E1A] transition-colors">-</button>
                        <span className="font-cinzel text-xl text-[#C89B3C] w-4 text-center">{formData[`t2_${role.id}_count`]}</span>
                        <button onClick={() => handleRoleChange(2, role.id, 1)} className="w-8 h-8 rounded-full border border-[#C89B3C]/50 text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#0A0E1A] transition-colors">+</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || initialLoading}
              className="relative w-full h-14 bg-gradient-to-r from-[#C89B3C] to-[#F0C96C] text-[#0A0E1A] font-cinzel text-xl tracking-[0.15em] rounded-sm transition-all duration-300 hover:brightness-115 hover:scale-[1.02] disabled:opacity-50 group flex items-center justify-center overflow-hidden"
            >
              {loading ? (
                <RotateCw className="animate-spin text-[#0A0E1A]" />
              ) : (
                <>
                  <span className="relative z-10">⚡ CONSULT THE ORACLE</span>
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xs animate-orbit origin-[200px_0]">✦</span>
                    <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs animate-orbit origin-[-200px_0]" style={{ animationDelay: '-2s' }}>✦</span>
                  </div>
                </>
              )}
            </button>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div 
            className="w-full md:w-[45%] sticky top-12 h-fit"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className="glass-panel p-8 flex flex-col items-center">
              <h2 className="text-2xl font-cinzel text-[#C89B3C] mb-8">ORACLE'S VISION</h2>
              
              <div className="relative w-[260px] h-[260px] flex items-center justify-center mb-8">
                {/* SVG Gauge */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(30,150,255,0.3)]">
                  {/* Red Track (Background) */}
                  <circle
                    cx="130" cy="130" r={gaugeRadius}
                    fill="none"
                    stroke="#E84057"
                    strokeWidth="16"
                    className="transition-all duration-1000 ease-out"
                  />
                  {/* Blue Track (Foreground) */}
                  <circle
                    cx="130" cy="130" r={gaugeRadius}
                    fill="none"
                    stroke="#1E96FF"
                    strokeWidth="16"
                    strokeDasharray={circumference}
                    strokeDashoffset={initialLoading ? circumference : blueOffset}
                    strokeLinecap="round"
                    className="transition-all duration-[1200ms] ease-out drop-shadow-[0_0_10px_#1E96FF]"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0E1A]/40 rounded-full backdrop-blur-sm m-4 border border-[#C89B3C]/20">
                  {initialLoading ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="text-4xl text-[#C89B3C] font-cinzel"
                    >
                      ?
                    </motion.div>
                  ) : (
                    <>
                      <span className="text-4xl font-cinzel text-[#C89B3C] drop-shadow-[0_0_8px_#C89B3C]">
                        {(winProb * 100).toFixed(1)}%
                      </span>
                      <span className="text-xs font-inter text-[#1E96FF] mt-1 tracking-widest">BLUE WIN</span>
                    </>
                  )}
                </div>
              </div>

              <div className="w-full">
                <h3 className="font-cinzel text-sm text-[#7A7A8C] mb-4 uppercase text-center border-b border-[#7A7A8C]/30 pb-2">Key Factors</h3>
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {!initialLoading && prediction?.top_features?.map((feat, idx) => (
                      <motion.div 
                        key={feat}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative h-10 bg-[#0A0E1A]/60 rounded-md overflow-hidden flex items-center px-4 border border-[#C89B3C]/10"
                      >
                        <motion.div 
                          initial={{ x: "-100%" }}
                          animate={{ x: 0 }}
                          transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-[#C89B3C]/10 to-[#C89B3C]/30 z-0"
                        />
                        <span className="relative z-10 font-cinzel text-sm text-[#F0E6D3]">{feat}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </BackgroundOverlay>
  );
}
