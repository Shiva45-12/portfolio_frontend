import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { FiCode, FiDatabase, FiTool, FiStar } from 'react-icons/fi';
import { skills } from '../data/portfolio';
import SpaceBackground from './SpaceBackground';

const SkillBar = ({ skill, isInView, delay }) => {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => {
      const c = animate(0, skill.level, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: v => setW(Math.round(v)) });
      return c.stop;
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [isInView, skill.level, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-medium text-sm font-roboto">{skill.name}</span>
        <span className="font-mono text-xs" style={{ color: '#02dbda' }}>{w}%</span>
      </div>
      <div className="skill-bar">
        <motion.div className="skill-bar-fill" style={{ width: `${w}%` }} />
      </div>
    </div>
  );
};

const SkillCard = ({ title, icon: Icon, data, delay, isInView, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 45, rotateX: -18 }}
    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
    transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    className="rounded-2xl p-6 neon-border cursor-default"
    style={{ background: 'rgba(34,45,55,0.6)', transformStyle: 'preserve-3d' }}
    whileHover={{ y: -10, rotateX: 4, rotateY: 2, boxShadow: '0 40px 80px -15px rgba(0,0,0,0.98), 0 0 40px rgba(2,219,218,0.2)' }}>
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: accent }}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg text-white font-racing">{title}</h3>
    </div>
    <div className="space-y-5">
      {data.map((s, i) => <SkillBar key={s.name} skill={s} isInView={isInView} delay={delay + i * 0.1} />)}
    </div>
  </motion.div>
);

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const cats = [
    { title: 'Frontend',       icon: FiCode,     data: skills.frontend, delay: 0.2, accent: 'linear-gradient(135deg,#02dbda,#01a8a7)' },
    { title: 'Backend',        icon: FiDatabase, data: skills.backend,  delay: 0.3, accent: 'linear-gradient(135deg,#017a79,#02dbda)' },
    { title: 'Tools & DevOps', icon: FiTool,     data: skills.tools,    delay: 0.4, accent: 'linear-gradient(135deg,#222d37,#02dbda)' },
  ];

  return (
    <section id="skills" className="py-28 relative overflow-hidden" style={{ background: '#050a0e' }} ref={ref}>
      <SpaceBackground intensity={0.45} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(2,219,218,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="section-label">What I Know</span>
          <h2 className="text-display gradient-text">Skills & Expertise</h2>
          <p className="max-w-xl mx-auto mt-4 font-roboto" style={{ color: 'var(--text-dim)' }}>
            A comprehensive overview of my technical abilities and professional competencies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cats.map(c => <SkillCard key={c.title} {...c} isInView={inView} />)}
        </div>

        {/* Soft Skills */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl p-6 neon-border" style={{ background: 'rgba(34,45,55,0.6)' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#02dbda,#017a79)' }}>
              <FiStar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg text-white font-racing">Soft Skills</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.softSkills.map((s, i) => (
              <motion.span key={s}
                className="px-4 py-2 text-sm rounded-xl cursor-default font-roboto font-medium"
                style={{ background: 'rgba(34,45,55,0.8)', color: 'var(--text-dim)', border: '1px solid rgba(2,219,218,0.1)' }}
                initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.07 }}
                whileHover={{ y: -4, color: '#02dbda', borderColor: 'rgba(2,219,218,0.45)', background: 'rgba(2,219,218,0.08)', scale: 1.06 }}>
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Continuous Learning */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 rounded-2xl p-8 neon-border" style={{ background: 'rgba(34,45,55,0.6)' }}>
          <h3 className="text-lg text-white text-center mb-6 font-racing">Continuous Learning</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { v: '🚀', label: 'Always Learning',  sub: 'New Tech Weekly' },
              { v: '🔍', label: 'Code Reviews',     sub: 'Daily Practice' },
              { v: '🌐', label: 'Open Source',      sub: 'Regular Contributor' },
              { v: '🤝', label: 'Tech Community',   sub: 'Active Member' },
            ].map((x, i) => (
              <motion.div key={x.label} className="p-4 rounded-xl cursor-default"
                style={{ background: 'rgba(22,31,39,0.8)', border: '1px solid rgba(2,219,218,0.08)' }}
                initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.07, y: -5, borderColor: 'rgba(2,219,218,0.3)' }}>
                <div className="text-2xl mb-2">{x.v}</div>
                <p className="font-bold text-xs font-racing" style={{ color: '#02dbda' }}>{x.sub}</p>
                <p className="text-xs mt-1 font-roboto" style={{ color: 'var(--text-muted)' }}>{x.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
