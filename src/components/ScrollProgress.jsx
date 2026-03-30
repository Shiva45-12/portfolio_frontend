import { useScroll, motion } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #017a79, #02dbda, #01a8a7)',
        boxShadow: '0 0 12px rgba(2,219,218,0.9), 0 0 24px rgba(2,219,218,0.5)',
      }}
    />
  );
};

export default ScrollProgress;
