import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiCode, FiMapPin, FiZap } from 'react-icons/fi';
import { personalInfo, stats, education, certifications } from '../data/portfolio';
import SpaceBackground from './SpaceBackground';

const Counter = ({ value, isInView }) => {
  const [n, setN] = useState(0);
  const num = parseInt(value);
  const suffix = value.replace(/[0-9]/g, '');
  useEffect(() => {
    if (!isInView || isNaN(num)) return;
    let cur = 0;
    const step = Math.ceil(num / 60);
    const iv = setInterval(() => { cur = Math.min(cur + step, num); setN(cur); if (cur >= num) clearInterval(iv); }, 22);
    return () => clearInterval(iv);
  }, [isInView, num]);
  return <span>{isNaN(num) ? value : `${n}${suffix}`}</span>;
};

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  return (
    <motion.div ref={ref}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); setRot({ x: ((e.clientY - r.top) / r.height - 0.5) * 16, y: -((e.clientX - r.left) / r.width - 0.5) * 16 }); }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      animate={{ rotateX: rot.x, rotateY: rot.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      style={{ transformStyle: 'preserve-3d' }} className={className}>
      {children}
    </motion.div>
  );
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const item = i => ({
    hidden: { opacity: 0, y: 38, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } },
  });

  return (
    <section id="about" className="py-28 relative overflow-hidden" style={{ background: '#050a0e' }} ref={ref}>
      <SpaceBackground intensity={0.5} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(2,219,218,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={item(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-20">
          <span className="section-label">Get To Know</span>
          <h2 className="text-display gradient-text">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Image */}
          <motion.div variants={item(1)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="perspective-1000">
            <TiltCard className="relative group">
              <div className="absolute -inset-8 rounded-3xl blur-3xl opacity-15 group-hover:opacity-30 transition-opacity duration-700"
                style={{ background: 'linear-gradient(135deg,#02dbda,#017a79)' }} />
              <div className="relative rounded-3xl overflow-hidden glass-card">
                <motion.img src={personalInfo.avatar} alt={personalInfo.name}
                  className="w-full h-auto object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-xl px-4 py-3 neon-border" style={{ background: 'rgba(34,45,55,0.8)', backdropFilter: 'blur(12px)' }}>
                    <p className="text-white font-bold text-sm font-racing">{personalInfo.name}</p>
                    <p className="text-xs mt-0.5 font-roboto" style={{ color: '#02dbda' }}>{personalInfo.title}</p>
                  </div>
                </div>
              </div>
            </TiltCard>

            {[
              { icon: FiMapPin, label: 'Location', value: personalInfo.location, color: '#02dbda', top: '25%', delay: 0.9 },
              { icon: FiZap,    label: 'Status',   value: 'Open to Work',        color: '#22c55e', top: '65%', delay: 1.1 },
            ].map(c => (
              <motion.div key={c.label}
                className="absolute -right-6 rounded-2xl p-4 hidden lg:flex items-center gap-3 neon-border"
                style={{ top: c.top, background: 'rgba(34,45,55,0.85)', backdropFilter: 'blur(16px)' }}
                initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: c.delay }} whileHover={{ y: -5, scale: 1.04 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}18` }}>
                  <c.icon className="w-5 h-5" style={{ color: c.color }} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm font-racing">{c.value}</p>
                  <p className="text-xs font-roboto" style={{ color: 'var(--text-muted)' }}>{c.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <motion.div variants={item(2)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <h3 className="text-title text-white mb-4">Crafting Digital Experiences</h3>
              <p className="leading-relaxed font-roboto" style={{ color: 'var(--text-dim)' }}>{personalInfo.bio}</p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item(3)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map(s => (
                  <motion.div key={s.label} className="rounded-2xl p-4 text-center cursor-default neon-border"
                    style={{ background: 'rgba(34,45,55,0.6)' }}
                    whileHover={{ y: -8, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <div className="text-3xl gradient-text mb-1"><Counter value={s.value} isInView={inView} /></div>
                    <p className="text-xs leading-tight font-roboto" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={item(4)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest font-racing">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(2,219,218,0.15)' }}>
                  <FiAward className="w-3.5 h-3.5" style={{ color: '#02dbda' }} />
                </div>
                Education
              </h4>
              <div className="space-y-3">
                {education.map(edu => (
                  <motion.div key={edu.id} className="rounded-xl p-4 neon-border cursor-default"
                    style={{ background: 'rgba(34,45,55,0.5)' }} whileHover={{ x: 6 }}>
                    <h5 className="text-white font-bold text-sm font-racing">{edu.degree}</h5>
                    <p className="text-xs mt-0.5 font-roboto" style={{ color: '#02dbda' }}>{edu.institution}</p>
                    <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{edu.duration}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certs */}
            <motion.div variants={item(5)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest font-racing">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(2,219,218,0.12)' }}>
                  <FiCode className="w-3.5 h-3.5" style={{ color: '#01a8a7' }} />
                </div>
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {certifications.map((c, i) => (
                  <motion.span key={c}
                    className="px-3 py-1.5 text-xs rounded-full cursor-default font-roboto font-medium"
                    style={{ background: 'rgba(2,219,218,0.08)', color: '#02dbda', border: '1px solid rgba(2,219,218,0.2)' }}
                    initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.07 }}
                    whileHover={{ scale: 1.08, background: 'rgba(2,219,218,0.15)' }}>
                    {c}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
