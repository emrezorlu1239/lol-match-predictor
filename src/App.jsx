import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import Hero from './pages/Hero';
import Form from './pages/Form';
import Verdict from './pages/Verdict';

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Hero />} />
          <Route path="/form" element={<Form />} />
          <Route path="/verdict" element={<Verdict />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
