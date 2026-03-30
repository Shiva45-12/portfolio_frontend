import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { navigation, personalInfo } from '../data/portfolio';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const reversed = [...navigation].reverse();
      for (const nav of reversed) {
        const el = document.getElementById(nav.href.replace('#', ''));
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(nav.href.replace('#', '')); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = href => {
    setOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(5,10,14,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(30px) saturate(200%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(2,219,218,0.1)' : 'none',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.9)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-2.5' : 'py-4'}`}>

            {/* Logo */}
            <motion.a href="#home" onClick={e => { e.preventDefault(); go('#home'); }}
              className="flex items-center gap-3 group" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <div className="relative">
                <motion.div className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg,#02dbda,#017a79)', filter: 'blur(8px)', opacity: 0.5 }}
                  animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} />
                <div className="relative w-10 h-10 rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(2,219,218,0.5)' }}>
                  <img src="/SHIVA.png" alt={personalInfo.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-xl text-white hidden sm:block font-racing tracking-wide">
                {personalInfo.name}
                <span className="text-neon">Vishwakarma</span>
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
              style={{ background: 'rgba(34,45,55,0.5)', border: '1px solid rgba(2,219,218,0.1)' }}>
              {navigation.map(item => {
                const isActive = active === item.href.replace('#', '');
                return (
                  <motion.a key={item.name} href={item.href}
                    onClick={e => { e.preventDefault(); go(item.href); }}
                    className="relative px-4 py-2 text-sm rounded-full transition-colors duration-300 cursor-pointer font-racing"
                    style={{ color: isActive ? '#050a0e' : 'var(--text-dim)' }}
                    whileHover={{ color: '#02dbda' }} whileTap={{ scale: 0.95 }}>
                    {isActive && (
                      <motion.div layoutId="navPill" className="absolute inset-0 rounded-full"
                        style={{ background: 'linear-gradient(135deg,#02dbda,#01a8a7)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <motion.button onClick={toggleDarkMode}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                style={{ background: 'rgba(34,45,55,0.5)', border: '1px solid rgba(2,219,218,0.15)', color: 'var(--text-dim)' }}
                whileHover={{ scale: 1.1, rotate: 20, borderColor: 'rgba(2,219,218,0.5)' }} whileTap={{ scale: 0.9 }} aria-label="Toggle theme">
                <AnimatePresence mode="wait">
                  {darkMode
                    ? <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><FiSun className="w-4 h-4 text-yellow-400" /></motion.div>
                    : <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><FiMoon className="w-4 h-4" /></motion.div>
                  }
                </AnimatePresence>
              </motion.button>

              <motion.button
                className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                style={{ background: 'rgba(34,45,55,0.5)', border: '1px solid rgba(2,219,218,0.15)', color: 'var(--text-dim)' }}
                onClick={() => setOpen(!open)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Menu">
                <AnimatePresence mode="wait">
                  {open
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><FiX className="w-5 h-5" /></motion.div>
                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><FiMenu className="w-5 h-5" /></motion.div>
                  }
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[68px] z-40 md:hidden rounded-2xl overflow-hidden"
            style={{ background: 'rgba(22,31,39,0.97)', border: '1px solid rgba(2,219,218,0.15)', backdropFilter: 'blur(30px)' }}>
            <div className="p-3 space-y-1">
              {navigation.map((item, i) => (
                <motion.a key={item.name} href={item.href}
                  onClick={e => { e.preventDefault(); go(item.href); }}
                  className="flex items-center px-4 py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer font-racing"
                  style={{
                    background: active === item.href.replace('#', '') ? 'rgba(2,219,218,0.12)' : 'transparent',
                    color: active === item.href.replace('#', '') ? '#02dbda' : 'var(--text-dim)',
                    borderLeft: active === item.href.replace('#', '') ? '2px solid #02dbda' : '2px solid transparent',
                  }}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
