import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX, FiArrowRight } from 'react-icons/fi';
import { projects } from '../data/portfolio';
import SpaceBackground from './SpaceBackground';

const ProjectCard = ({ project, onClick, index, isInView }) => {
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    setRot({ x: ((e.clientY - r.top) / r.height - 0.5) * 12, y: -((e.clientX - r.left) / r.width - 0.5) * 12 });
  }, []);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 65, filter: 'blur(12px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setRot({ x: 0, y: 0 }); setHovered(false); }}
      className="cursor-pointer" style={{ perspective: '900px' }}
      onClick={() => onClick(project)}>
      <motion.div
        className="rounded-2xl overflow-hidden neon-border"
        style={{ background: 'rgba(34,45,55,0.65)', transformStyle: 'preserve-3d' }}
        animate={{
          rotateX: rot.x, rotateY: rot.y,
          boxShadow: hovered ? '0 40px 80px -15px rgba(0,0,0,0.98), 0 0 50px rgba(2,219,218,0.2)' : '0 30px 60px -15px rgba(0,0,0,0.9)',
          borderColor: hovered ? 'rgba(2,219,218,0.4)' : 'rgba(2,219,218,0.15)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}>
        <div className="relative overflow-hidden aspect-video">
          <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.1 : 1 }} transition={{ duration: 0.6 }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <motion.div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(2,219,218,0.08)' }}
            animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25 }}>
            <motion.span className="px-5 py-2 rounded-full text-sm font-racing"
              style={{ background: 'rgba(2,219,218,0.2)', border: '1px solid rgba(2,219,218,0.5)', backdropFilter: 'blur(10px)', color: '#02dbda' }}
              animate={{ scale: hovered ? 1 : 0.7, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25 }}>
              View Details
            </motion.span>
          </motion.div>
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-racing rounded-full"
                style={{ background: 'linear-gradient(135deg,#02dbda,#017a79)', color: '#050a0e', boxShadow: '0 0 15px rgba(2,219,218,0.5)' }}>
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg text-white mb-2 transition-colors duration-300 font-racing"
            style={{ color: hovered ? '#02dbda' : '#ffffff' }}>
            {project.title}
          </h3>
          <p className="text-sm mb-4 line-clamp-2 leading-relaxed font-roboto" style={{ color: 'var(--text-dim)' }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="px-2 py-1 text-xs rounded-lg font-roboto font-medium"
                style={{ background: 'rgba(2,219,218,0.08)', color: '#02dbda', border: '1px solid rgba(2,219,218,0.18)' }}>
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-lg font-roboto" style={{ background: 'rgba(34,45,55,0.8)', color: 'var(--text-muted)' }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(2,219,218,0.08)' }}>
            <div className="flex gap-3">
              {[{ icon: FiExternalLink, href: project.live }, { icon: FiGithub, href: project.github }].map(({ icon: Icon, href }) => (
                <motion.a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(34,45,55,0.8)', color: 'var(--text-muted)' }}
                  whileHover={{ scale: 1.2, color: '#02dbda', background: 'rgba(2,219,218,0.12)' }}
                  whileTap={{ scale: 0.9 }} onClick={e => e.stopPropagation()}>
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <motion.span className="flex items-center gap-1 text-xs font-racing"
              style={{ color: '#02dbda' }}
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }} transition={{ duration: 0.2 }}>
              Details <FiArrowRight className="w-3 h-3" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Modal = ({ project, onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: 'rgba(5,10,14,0.97)', backdropFilter: 'blur(24px)' }}
    onClick={onClose}>
    <motion.div
      initial={{ opacity: 0, scale: 0.78, y: 45, rotateX: -12 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.78, y: 45 }}
      transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      className="relative w-full max-w-4xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto neon-border"
      style={{ background: 'rgba(34,45,55,0.95)', boxShadow: '0 0 80px rgba(2,219,218,0.2), 0 40px 80px rgba(0,0,0,0.95)' }}
      onClick={e => e.stopPropagation()}>
      <motion.button
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
        style={{ background: 'rgba(22,31,39,0.9)', border: '1px solid rgba(2,219,218,0.2)', color: 'var(--text-dim)' }}
        whileHover={{ scale: 1.1, rotate: 90, color: '#02dbda' }} whileTap={{ scale: 0.9 }} onClick={onClose}>
        <FiX className="w-5 h-5" />
      </motion.button>
      <div className="relative aspect-video">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-3xl text-white font-racing">{project.title}</h2>
          {project.featured && (
            <span className="px-3 py-1 text-xs font-racing rounded-full"
              style={{ background: 'linear-gradient(135deg,#02dbda,#017a79)', color: '#050a0e' }}>Featured</span>
          )}
        </div>
        <p className="mb-6 leading-relaxed font-roboto" style={{ color: 'var(--text-dim)' }}>{project.description}</p>
        <div className="mb-8">
          <h3 className="text-sm font-racing text-white mb-3 uppercase tracking-widest">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="px-4 py-2 text-sm font-roboto font-medium rounded-xl"
                style={{ background: 'rgba(2,219,218,0.08)', color: '#02dbda', border: '1px solid rgba(2,219,218,0.2)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          {[
            { href: project.live,   icon: FiExternalLink, label: 'Live Demo', primary: true },
            { href: project.github, icon: FiGithub,       label: 'View Code', primary: false },
          ].map(({ href, icon: Icon, label, primary }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className={primary ? 'btn-primary' : 'btn-outline'}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Icon className="w-5 h-5" /> {label}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const [sel, setSel] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-28 relative overflow-hidden" style={{ background: '#050a0e' }} ref={ref}>
      <SpaceBackground intensity={0.5} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(2,219,218,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="section-label">My Work</span>
          <h2 className="text-display gradient-text">Featured Projects</h2>
          <p className="max-w-xl mx-auto mt-4 font-roboto" style={{ color: 'var(--text-dim)' }}>
            A showcase of my best work and personal projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} isInView={inView} onClick={setSel} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }} className="text-center mt-14">
          <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="btn-outline inline-flex" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <FiGithub className="w-5 h-5" /> View All on GitHub <FiArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      <AnimatePresence>{sel && <Modal project={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </section>
  );
};

export default Projects;
