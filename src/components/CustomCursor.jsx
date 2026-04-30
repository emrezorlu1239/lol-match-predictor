import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';

    let requestRef;
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const updateCursor = () => {
      if (cursorRef.current) {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        cursorRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      requestRef = requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName?.toLowerCase() === 'button' ||
        e.target.tagName?.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    requestRef = requestAnimationFrame(updateCursor);

    // Hide custom cursor on mobile
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsVisible(false);
        document.body.style.cursor = 'auto';
      } else {
        document.body.style.cursor = 'none';
      }
    };

    window.addEventListener('resize', checkMobile);
    checkMobile();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(requestRef);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="cursor-glow"
      style={{
        left: 0,
        top: 0,
        width: isHovering ? '40px' : '20px',
        height: isHovering ? '40px' : '20px',
        opacity: isHovering ? 0.8 : 1,
        transition: 'width 0.3s, height 0.3s, opacity 0.3s',
        transform: 'translate(-100px, -100px)' // Initial offscreen
      }}
    />
  );
}
