
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('cursor-pointer')) {
        setIsHovering(true);
        setCursorVariant('hover');
      } else if (target.classList.contains('data-element')) {
        setCursorVariant('data');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 2,
    },
    data: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1.5,
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-slate-300 mix-blend-difference pointer-events-none z-[9999] hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />
      
      {/* Data particles around cursor */}
      {cursorVariant === 'data' && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-[9998] hidden md:block"
            animate={{
              x: mousePosition.x + Math.sin(Date.now() * 0.005) * 20,
              y: mousePosition.y + Math.cos(Date.now() * 0.005) * 20,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-1 h-1 bg-green-400 rounded-full pointer-events-none z-[9998] hidden md:block"
            animate={{
              x: mousePosition.x + Math.cos(Date.now() * 0.008) * 15,
              y: mousePosition.y + Math.sin(Date.now() * 0.008) * 15,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-1 h-1 bg-blue-400 rounded-full pointer-events-none z-[9998] hidden md:block"
            animate={{
              x: mousePosition.x + Math.sin(Date.now() * 0.006) * 25,
              y: mousePosition.y + Math.cos(Date.now() * 0.006) * 10,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </>
      )}
    </>
  );
};
