
import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isTouchDevice = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect touch device
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let scrollY = 0;
    let time = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Only track mouse on non-touch devices
      if (!isTouchDevice.current) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    let lastTime = 0;
    const animate = (currentTime: number) => {
      // On touch devices, reduce frame rate even more for better scrolling
      const frameThrottle = isTouchDevice.current ? 100 : 33; // 10fps vs 30fps
      
      if (currentTime - lastTime < frameThrottle) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;
      
      // Reduce animation intensity on touch devices
      if (isTouchDevice.current) {
        time += 0.005; // Slower animation
      } else {
        time += 0.01;
      }
      
      // Simplified grid background animation - disable on touch
      if (!isTouchDevice.current) {
        const gridOffset = (scrollY * 0.3 + time * 10) % 40;
        container.style.backgroundPosition = `${gridOffset}px ${gridOffset}px`;
      }

      // Animate floating orbs with reduced calculations - disable on touch
      if (!isTouchDevice.current) {
        const orbs = container.querySelectorAll('.floating-orb');
        orbs.forEach((orb, i) => {
          const element = orb as HTMLElement;
          const x = Math.sin(time * 0.5 + i) * 30 + (scrollY * 0.05);
          const y = Math.cos(time * 0.3 + i) * 20 + (scrollY * 0.1);
          const scale = 1 + Math.sin(time + i) * 0.2;
          
          element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
          element.style.opacity = (0.4 + Math.sin(time + i) * 0.2).toString();
        });

        // Simplified data flow lines - disable on touch
        const lines = container.querySelectorAll('.data-flow-line');
        lines.forEach((line, i) => {
          const element = line as HTMLElement;
          const x = ((time * 60 + i * 100) % (window.innerWidth + 200)) - 100;
          
          element.style.transform = `translate3d(${x}px, 0, 0)`;
          element.style.opacity = (0.3 + Math.sin(time + i) * 0.2).toString();
        });

        // Reduced binary rain elements - disable on touch
        const binaryElements = container.querySelectorAll('.binary-rain');
        binaryElements.forEach((binary, i) => {
          const element = binary as HTMLElement;
          const y = ((time * 40 + i * 40) % (window.innerHeight + 100)) - 50;
          
          element.style.transform = `translate3d(0, ${y}px, 0)`;
          
          // Less frequent text updates
          if (Math.random() > 0.98) {
            element.textContent = Math.random() > 0.5 ? '1' : '0';
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (!isTouchDevice.current) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    // Only start animation on non-touch devices or with reduced complexity
    if (!isTouchDevice.current) {
      animate(0);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (!isTouchDevice.current) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 ${isTouchDevice.current ? '' : 'touch-scroll-optimized'}`}
      style={{
        backgroundImage: isTouchDevice.current ? 'none' : `linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        willChange: isTouchDevice.current ? 'auto' : 'background-position'
      }}
    >
      {/* Only render animated elements on non-touch devices */}
      {!isTouchDevice.current && (
        <>
          {/* Reduced floating orbs - only 6 instead of 12 */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="floating-orb absolute rounded-full blur-xl"
              style={{
                width: `${60 + i * 8}px`,
                height: `${60 + i * 8}px`,
                background: `radial-gradient(circle, ${
                  i % 3 === 0 ? 'rgba(59,130,246,0.25)' : 
                  i % 3 === 1 ? 'rgba(168,85,247,0.25)' : 
                  'rgba(20,184,166,0.25)'
                }, transparent)`,
                left: `${10 + (i * 15)}%`,
                top: `${10 + (i * 12)}%`,
                willChange: 'transform, opacity'
              }}
            />
          ))}

          {/* Reduced data flow lines - only 4 instead of 8 */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`flow-${i}`}
              className="data-flow-line absolute bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              style={{
                height: '2px',
                width: '200px',
                top: `${15 + i * 20}%`,
                filter: 'blur(0.5px)',
                willChange: 'transform, opacity'
              }}
            />
          ))}

          {/* Reduced binary rain - only 15 instead of 30 */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`binary-${i}`}
              className="binary-rain absolute text-green-400/30 font-mono font-bold select-none"
              style={{
                left: `${5 + i * 6}%`,
                top: '0%',
                fontSize: '14px',
                textShadow: '0 0 8px rgba(34, 197, 94, 0.4)',
                willChange: 'transform'
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}

          {/* Simplified geometric shapes - only 3 instead of 6 */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`shape-${i}`}
              className="absolute border border-blue-400/15 rounded-lg"
              style={{
                width: `${30 + i * 15}px`,
                height: `${30 + i * 15}px`,
                left: `${75 + i * 8}%`,
                top: `${30 + i * 20}%`,
                transform: `rotate(${i * 45}deg)`,
                animation: `spin ${15 + i * 10}s linear infinite`,
              }}
            />
          ))}

          {/* Simplified neural network - only 6 connections instead of 15 */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            {[...Array(6)].map((_, i) => (
              <line
                key={`connection-${i}`}
                className="neural-connection"
                x1={`${15 + i * 10}%`}
                y1={`${20 + i * 8}%`}
                x2={`${25 + i * 8}%`}
                y2={`${30 + i * 6}%`}
                stroke="rgba(6, 182, 212, 0.2)"
                strokeWidth="1"
              />
            ))}
          </svg>

          {/* Simplified data visualization */}
          <div className="absolute bottom-20 right-10 flex items-end space-x-2 opacity-60">
            {[...Array(5)].map((_, i) => (
              <div
                key={`bar-${i}`}
                className="bg-gradient-to-t from-blue-500/20 to-cyan-400/20 rounded-t"
                style={{
                  width: '12px',
                  height: `${20 + Math.sin(Date.now() * 0.002 + i) * 20}px`,
                  animationDelay: `${i * 0.2}s`,
                  willChange: 'height'
                }}
              />
            ))}
          </div>

          {/* Simplified scatter plot */}
          <div className="absolute top-1/3 right-1/4 w-32 h-24 opacity-50">
            {[...Array(8)].map((_, i) => (
              <div
                key={`scatter-${i}`}
                className="absolute w-2 h-2 bg-gradient-to-br from-cyan-400/50 to-blue-500/50 rounded-full"
                style={{
                  left: `${(i * 20) % 100}%`,
                  top: `${Math.sin(i * 0.8) * 40 + 30}%`,
                  willChange: 'transform'
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Static background for touch devices */}
      {isTouchDevice.current && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50" />
      )}
    </div>
  );
};
