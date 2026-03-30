import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Position for the mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Position for the trailing follower (with smooth spring)
  const ringX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  const onMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);

    const handleHover = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = target.closest('a, button, [role="button"], .cursor-pointer, input, select, textarea');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [onMouseMove]);

  if (typeof window === 'undefined') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden lg:block">
      
      {/* Ghost Follower Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isClicked ? 0.7 : isHovered ? 1.6 : 1,
          opacity: isVisible ? (isHovered ? 1 : 0.6) : 0,
          rotate: isHovered ? 180 : 0
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="absolute w-14 h-14 rounded-full border border-[#02dbda]/30 flex items-center justify-center"
      >
        {/* Decorative Compass Ticks */}
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute w-2 h-[2px] bg-[#02dbda]"
            style={{
              transform: `rotate(${deg}deg) translateY(-28px)`,
              boxShadow: '0 0 8px #02dbda',
              opacity: isHovered ? 1 : 0.5
            }}
          />
        ))}

        {/* Inner stylized corners */}
        <div className="absolute inset-2 border-[1px] border-[#02dbda]/10 rounded-lg rotate-45" />
      </motion.div>

      {/* Trailing Soft Glow */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovered ? 2 : 1,
          opacity: isVisible ? (isHovered ? 0.3 : 0.1) : 0,
          background: isHovered 
            ? 'radial-gradient(circle, rgba(2,219,218,0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(2,219,218,0.1) 0%, transparent 70%)',
        }}
        className="absolute w-20 h-20 rounded-full blur-xl"
      />
    </div>
  );
};

export default CustomCursor;
