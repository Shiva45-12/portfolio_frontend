import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart, FiArrowUp } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolio';

const Footer = () => {
  const year = new Date().getFullYear();
  const socials = [
    { icon: FiGithub,   href: socialLinks.github,   label: 'GitHub' },
    { icon: FiLinkedin, href: socialLinks.linkedin,  label: 'LinkedIn' },
    { icon: FiTwitter,  href: socialLinks.twitter,   label: 'Twitter' },
  ];

  return (
    <footer className="relative" style={{ background: '#050a0e' }}>
      {/* Cyan top border */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #02dbda, #01a8a7, #02dbda, transparent)' }} />
      <div className="h-px mt-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(2,219,218,0.2), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl blur-md"
                  style={{ background: 'linear-gradient(135deg,#02dbda,#017a79)', opacity: 0.5 }} />
                <div className="relative w-9 h-9 rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(2,219,218,0.45)' }}>
                  <img src="/SHIVA.png" alt={personalInfo.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-xl text-white font-racing tracking-wide">
                {personalInfo.name}
                <span className="text-neon">.dev</span>
              </span>
            </div>
            <p className="text-sm font-roboto" style={{ color: 'var(--text-muted)' }}>© {year} {personalInfo.name}. All rights reserved.</p>
            <p className="text-xs mt-1 flex items-center justify-center md:justify-start gap-1 font-roboto" style={{ color: 'var(--text-muted)' }}>
              Made with <FiHeart className="w-3 h-3" style={{ color: '#02dbda' }} /> using React & Tailwind
            </p>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-3">
            {socials.map(s => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 neon-border"
                style={{ background: 'rgba(34,45,55,0.6)', color: 'var(--text-muted)' }}
                whileHover={{ y: -4, scale: 1.12, color: '#02dbda' }} whileTap={{ scale: 0.9 }}>
                <s.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

          {/* Back to top */}
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative w-12 h-12 rounded-full flex items-center justify-center group"
            style={{ background: 'linear-gradient(135deg,#02dbda,#017a79)', boxShadow: '0 0 20px rgba(2,219,218,0.5)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.15, y: -3, boxShadow: '0 0 40px rgba(2,219,218,0.8)' }}
            whileTap={{ scale: 0.9 }} aria-label="Back to top">
            <FiArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" style={{ color: '#050a0e' }} />
            <div className="absolute inset-0 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg,#02dbda,#017a79)' }} />
          </motion.button>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 pt-8 text-center" style={{ borderTop: '1px solid rgba(2,219,218,0.06)' }}>
          <p className="text-xs tracking-wider font-roboto" style={{ color: 'var(--text-muted)' }}>
            Designed & Built with passion · Transforming ideas into digital reality
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
