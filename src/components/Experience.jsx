import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiCode, FiCalendar } from 'react-icons/fi';
import { experience } from '../data/portfolio';
import SpaceBackground from './SpaceBackground';

const TimelineItem = ({ exp, index, isInView }) => (
  <div className="relative flex gap-6 md:gap-10">
    <div className="relative flex flex-col items-center flex-shrink-0">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
        className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: 'linear-gradient(135deg,#02dbda,#017a79)', boxShadow: '0 0 20px rgba(2,219,218,0.6), 0 0 40px rgba(2,219,218,0.2)' }}>
        {exp.type === 'freelance' ? <FiCode className="w-5 h-5 text-white" /> : <FiBriefcase className="w-5 h-5 text-white" />}
        {[1, 2].map(r => (
          <motion.div key={r} className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(2,219,218,0.4)' }}
            animate={{ scale: [1, 1.8 + r * 0.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 + r * 0.4 }} />
        ))}
      </motion.div>
      {index < experience.length - 1 && (
        <motion.div className="w-px flex-1 mt-2"
          style={{ background: 'linear-gradient(to bottom, rgba(2,219,218,0.5), rgba(1,168,167,0.3), transparent)' }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.9 }} />
      )}
    </div>

    <motion.div
      initial={{ opacity: 0, x: -42, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, delay: index * 0.15 + 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 pb-14">
      <motion.div className="rounded-2xl p-6 neon-border cursor-default"
        style={{ background: 'rgba(34,45,55,0.6)' }}
        whileHover={{ y: -5, x: 4, boxShadow: '0 30px 60px -15px rgba(0,0,0,0.98), 0 0 30px rgba(2,219,218,0.2)' }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}>
        <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-racing uppercase tracking-wider"
            style={exp.type === 'freelance'
              ? { background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }
              : { background: 'rgba(2,219,218,0.1)', color: '#02dbda', border: '1px solid rgba(2,219,218,0.2)' }}>
            {exp.type === 'freelance' ? '🔗 Freelance' : '💼 Full-time'}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            <FiCalendar className="w-3 h-3" />{exp.duration}
          </span>
        </div>
        <h3 className="text-xl text-white mb-1 font-racing transition-colors duration-300 hover:text-cyan-DEFAULT"
          style={{ '--tw-text-opacity': 1 }}>
          {exp.role}
        </h3>
        <p className="font-bold text-sm mb-3 font-roboto" style={{ color: '#02dbda' }}>{exp.company}</p>
        <p className="text-sm leading-relaxed mb-4 font-roboto" style={{ color: 'var(--text-dim)' }}>{exp.description}</p>
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map(t => (
            <span key={t} className="px-2.5 py-1 text-xs rounded-lg font-roboto font-medium"
              style={{ background: 'rgba(34,45,55,0.9)', color: 'var(--text-dim)', border: '1px solid rgba(2,219,218,0.1)' }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </div>
);

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-28 relative overflow-hidden" style={{ background: '#050a0e' }} ref={ref}>
      <SpaceBackground intensity={0.45} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(2,219,218,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="section-label">My Journey</span>
          <h2 className="text-display gradient-text">Work Experience</h2>
          <p className="max-w-xl mx-auto mt-4 font-roboto" style={{ color: 'var(--text-dim)' }}>
            A timeline of my professional growth and career highlights
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experience.map((exp, i) => <TimelineItem key={exp.id} exp={exp} index={i} isInView={inView} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { v: '1+',   label: 'Years Experience',   g: 'linear-gradient(135deg,#02dbda,#01a8a7)' },
            { v: '1+',    label: 'Companies',           g: 'linear-gradient(135deg,#01a8a7,#017a79)' },
            { v: '50+',  label: 'Projects Delivered',  g: 'linear-gradient(135deg,#02dbda,#017a79)' },
            { v: '100%', label: 'Client Satisfaction', g: 'linear-gradient(135deg,#017a79,#02dbda)' },
          ].map((s, i) => (
            <motion.div key={s.label} className="rounded-2xl p-6 text-center neon-border cursor-default"
              style={{ background: 'rgba(34,45,55,0.6)' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + i * 0.1 }} whileHover={{ y: -8, scale: 1.05 }}>
              <div className="text-4xl mb-2 font-racing"
                style={{ background: s.g, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {s.v}
              </div>
              <p className="text-xs uppercase tracking-wider font-roboto" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
