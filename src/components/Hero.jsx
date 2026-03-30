import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolio';
import SpaceBackground from './SpaceBackground';

const MagBtn = ({ children, className, onClick, href, download }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 18 });
  const sy = useSpring(my, { stiffness: 260, damping: 18 });
  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.38);
    my.set((e.clientY - r.top - r.height / 2) * 0.38);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);
  const Tag = href ? motion.a : motion.button;
  const extra = href
    ? download
      ? { href, download: true }
      : { href, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick };
  return (
    <Tag ref={ref} {...extra} style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className={className} whileTap={{ scale: 0.93 }}>
      {children}
    </Tag>
  );
};

const LogoOrbit = () => (
  <div className="relative flex items-center justify-center w-48 h-48 mx-auto mb-10">
    {[
      { size: 180, dur: 8,  color: 'rgba(2,219,218,0.4)',  dot: '#02dbda', rev: false },
      { size: 140, dur: 5,  color: 'rgba(1,168,167,0.35)', dot: '#01a8a7', rev: true  },
      { size: 105, dur: 3,  color: 'rgba(2,219,218,0.45)', dot: '#02dbda', rev: false },
    ].map((r, i) => (
      <motion.div key={i} className="absolute rounded-full"
        style={{
          width: r.size, height: r.size,
          border: `1px solid ${r.color}`,
          boxShadow: `0 0 15px ${r.color} inset, 0 0 15px ${r.color}`,
        }}
        animate={{ rotate: r.rev ? -360 : 360 }}
        transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute w-2.5 h-2.5 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: r.dot, boxShadow: `0 0 10px ${r.dot}, 0 0 20px ${r.dot}` }} />
      </motion.div>
    ))}

    <motion.div className="absolute w-28 h-28 rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(2,219,218,0.2) 0%, transparent 70%)' }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3, repeat: Infinity }} />

    <motion.div className="relative z-10 w-24 h-24 rounded-2xl overflow-hidden"
      style={{
        border: '2px solid rgba(2,219,218,0.55)',
        boxShadow: '0 0 30px rgba(2,219,218,0.5), 0 0 60px rgba(2,219,218,0.2)',
      }}
      initial={{ scale: 0, rotateY: -180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, delay: 0.5, type: 'spring', stiffness: 80, damping: 14 }}
      whileHover={{ scale: 1.08 }}
    >
      <img src="/SHIVA.png" alt={personalInfo.name} className="w-full h-full object-cover" />
      <motion.div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, transparent 30%, rgba(2,219,218,0.1) 50%, transparent 70%)' }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
    </motion.div>
  </div>
);

const Hero = () => {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState('');
  const phrases = useMemo(() => [
    personalInfo.tagline, 'Full Stack Developer', 'React & Node.js Expert', 'UI / UX Enthusiast',
  ], []);

  useEffect(() => {
    let i = 0, del = false, t;
    const tick = () => {
      const full = phrases[phase];
      if (!del) {
        setTyped(full.slice(0, i + 1)); i++;
        if (i === full.length) { t = setTimeout(() => { del = true; tick(); }, 2400); return; }
      } else {
        setTyped(full.slice(0, i - 1)); i--;
        if (i === 0) { del = false; setPhase(p => (p + 1) % phrases.length); return; }
      }
      t = setTimeout(tick, del ? 32 : 52);
    };
    t = setTimeout(tick, 52);
    return () => clearTimeout(t);
  }, [phase, phrases]);

  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.4 } } };
  const item = { hidden: { opacity: 0, y: 50, filter: 'blur(14px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      <SpaceBackground intensity={1} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(2,219,218,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div variants={stagger} initial="hidden" animate="visible">

          {/* Badge */}
          <motion.div variants={item} className="mb-6">
            <motion.span
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{ border: '1px solid rgba(2,219,218,0.25)', background: 'rgba(2,219,218,0.06)', backdropFilter: 'blur(12px)' }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(2,219,218,0.55)' }}
            >
              <motion.span className="w-2 h-2 rounded-full"
                style={{ background: '#02dbda', boxShadow: '0 0 8px #02dbda' }}
                animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.3, repeat: Infinity }} />
              <span className="font-bold text-sm tracking-wide font-roboto" style={{ color: '#02dbda' }}>Available</span>
              <span className="text-sm font-roboto" style={{ color: 'var(--text-dim)' }}>for new projects</span>
            </motion.span>
          </motion.div>

          {/* Logo orbit */}
          <motion.div variants={item}><LogoOrbit /></motion.div>

          {/* Code tag */}
          <motion.div variants={item} className="mb-4">
            <span className="font-mono text-xs tracking-[0.28em] uppercase" style={{ color: 'rgba(2,219,218,0.5)' }}>
              &lt; Hello World /&gt;
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={item} className="mb-5">
            <h1 className="text-hero leading-none">
              <span className="block font-roboto font-light tracking-widest mb-1" style={{ fontSize: 'clamp(1.2rem,3vw,1.8rem)', color: 'var(--text-dim)' }}>
                Hi, I'm
              </span>
              <motion.span className="racing-gradient block"
                initial={{ opacity: 0, scale: 0.65, rotateX: -40 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.1, delay: 1.0, type: 'spring', stiffness: 70, damping: 14 }}>
                {personalInfo.name}
              </motion.span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div variants={item} className="mb-5">
            <h2 className="font-racing text-xl sm:text-2xl md:text-3xl tracking-[0.15em]" style={{ color: 'rgba(2,219,218,0.35)' }}>
              {personalInfo.title}
            </h2>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={item} className="mb-12 h-9 flex items-center justify-center">
            <p className="font-mono text-base md:text-lg" style={{ color: 'var(--text-dim)' }}>
              <span style={{ color: '#02dbda' }}>{'> '}</span>
              <span style={{ color: 'var(--text)' }}>{typed}</span>
              <motion.span className="inline-block w-[2px] h-5 ml-0.5 align-middle"
                style={{ background: '#02dbda' }}
                animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <MagBtn onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
              Hire Me
              <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.3, repeat: Infinity }}>
                <FiArrowRight className="w-4 h-4" />
              </motion.span>
            </MagBtn>
            <MagBtn onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline">
              View Projects <FiArrowRight className="w-4 h-4" />
            </MagBtn>
            <MagBtn href="/shiva_modern_resume.pdf" className="btn-outline" download>
              <FiDownload className="w-4 h-4" /> Resume
            </MagBtn>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="flex items-center justify-center gap-4">
            {[
              { icon: FiGithub,   href: socialLinks.github,   label: 'GitHub' },
              { icon: FiLinkedin, href: socialLinks.linkedin,  label: 'LinkedIn' },
              { icon: FiTwitter,  href: socialLinks.twitter,   label: 'Twitter' },
            ].map((s, i) => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 neon-border"
                style={{ background: 'rgba(34,45,55,0.5)', color: 'var(--text-dim)' }}
                whileHover={{ y: -7, scale: 1.18, color: '#02dbda' }} whileTap={{ scale: 0.87 }}
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + i * 0.1 }}>
                <s.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}>
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
          <motion.div className="w-5 h-8 rounded-full flex justify-center pt-1.5"
            style={{ border: '1px solid rgba(2,219,218,0.3)' }}
            animate={{ borderColor: ['rgba(2,219,218,0.3)', 'rgba(2,219,218,0.7)', 'rgba(2,219,218,0.3)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}>
            <motion.div className="w-1 h-2 rounded-full" style={{ background: '#02dbda' }}
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
