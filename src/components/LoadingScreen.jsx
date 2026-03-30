import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import SpaceBackground from './SpaceBackground';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 5 + 2;
        if (next >= 100) {
          clearInterval(iv);
          setTimeout(() => { setExit(true); setTimeout(onComplete, 700); }, 400);
          return 100;
        }
        return next;
      });
    }, 55);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{ background: '#050a0e' }}
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(24px)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}>
          <SpaceBackground intensity={0.7} />

          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(2,219,218,0.1) 0%, transparent 70%)' }} />

          {/* Rings */}
          <div className="absolute flex items-center justify-center">
            {[
              { size: 260, dur: 7,   color: 'rgba(2,219,218,0.4)',  rev: false },
              { size: 195, dur: 5,   color: 'rgba(1,168,167,0.35)', rev: true  },
              { size: 135, dur: 3.5, color: 'rgba(2,219,218,0.45)', rev: false },
            ].map((r, i) => (
              <motion.div key={i} className="absolute rounded-full"
                style={{ width: r.size, height: r.size, border: `1px solid ${r.color}`, boxShadow: `0 0 20px ${r.color} inset, 0 0 20px ${r.color}` }}
                animate={{ rotate: r.rev ? -360 : 360 }}
                transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}>
                <div className="absolute w-3 h-3 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ background: '#02dbda', boxShadow: '0 0 12px #02dbda, 0 0 24px rgba(2,219,218,0.6)' }} />
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div initial={{ scale: 0, rotateY: -180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              transition={{ duration: 1.1, type: 'spring', stiffness: 90, damping: 14 }}
              className="mb-8 relative">
              <div className="absolute inset-0 rounded-2xl blur-xl"
                style={{ background: 'linear-gradient(135deg,#02dbda,#017a79)', opacity: 0.6 }} />
              <motion.div className="relative w-24 h-24 rounded-2xl overflow-hidden"
                style={{ border: '2px solid rgba(2,219,218,0.6)', boxShadow: '0 0 30px rgba(2,219,218,0.6), 0 0 60px rgba(2,219,218,0.3)' }}
                animate={{ boxShadow: [
                  '0 0 30px rgba(2,219,218,0.5), 0 0 60px rgba(2,219,218,0.2)',
                  '0 0 50px rgba(2,219,218,0.9), 0 0 100px rgba(2,219,218,0.4)',
                  '0 0 30px rgba(2,219,218,0.5), 0 0 60px rgba(2,219,218,0.2)',
                ]}} transition={{ duration: 2.5, repeat: Infinity }}>
                <img src="/SHIVA.png" alt={personalInfo.name} className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-3xl text-neon mb-1 font-racing tracking-wider">
              {personalInfo.name}.dev
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="font-mono text-xs tracking-[0.22em] uppercase mb-10"
              style={{ color: 'var(--text-muted)' }}>
              {personalInfo.title}
            </motion.p>

            <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }} className="w-72">
              <div className="skill-bar mb-2">
                <motion.div className="skill-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Initializing</span>
                <span className="font-mono text-[10px]" style={{ color: '#02dbda' }}>{Math.min(Math.round(progress), 100)}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
