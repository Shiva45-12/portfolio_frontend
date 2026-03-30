import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiSend, FiCheck } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolio';
import SpaceBackground from './SpaceBackground';

const Field = ({ label, name, type = 'text', value, onChange, placeholder, required }) => (
  <div>
    <label className="block text-xs font-racing mb-2 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder}
      className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-300 font-roboto"
      style={{ background: 'rgba(34,45,55,0.5)', border: '1px solid rgba(2,219,218,0.12)', color: 'var(--text)' }}
      onFocus={e => { e.target.style.borderColor = 'rgba(2,219,218,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(2,219,218,0.08), 0 0 20px rgba(2,219,218,0.08)'; e.target.style.background = 'rgba(2,219,218,0.04)'; }}
      onBlur={e => { e.target.style.borderColor = 'rgba(2,219,218,0.12)'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(34,45,55,0.5)'; }}
    />
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Error: ' + (data.error || 'Failed to send email'));
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const info = [
    { icon: FiMail,   label: 'Email',    value: personalInfo.email,    href: `mailto:${personalInfo.email}`, g: 'linear-gradient(135deg,#02dbda,#01a8a7)' },
    { icon: FiMapPin, label: 'Location', value: personalInfo.location, href: null,                           g: 'linear-gradient(135deg,#01a8a7,#017a79)' },
    { icon: FiPhone,  label: 'Phone',    value: personalInfo.phone,    href: `tel:${personalInfo.phone}`,    g: 'linear-gradient(135deg,#017a79,#02dbda)' },
  ];
  const socials = [
    { icon: FiGithub,   href: socialLinks.github,   label: 'GitHub' },
    { icon: FiLinkedin, href: socialLinks.linkedin,  label: 'LinkedIn' },
    { icon: FiTwitter,  href: socialLinks.twitter,   label: 'Twitter' },
  ];

  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: '#050a0e' }} ref={ref}>
      <SpaceBackground intensity={0.5} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(2,219,218,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="section-label">Get In Touch</span>
          <h2 className="text-display gradient-text">Contact Me</h2>
          <p className="max-w-xl mx-auto mt-4 font-roboto" style={{ color: 'var(--text-dim)' }}>
            Have a project in mind? Let's work together to create something amazing
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, delay: 0.2 }} className="lg:col-span-2 space-y-5">
            {info.map((x, i) => (
              <motion.a key={x.label} href={x.href || undefined}
                className="flex items-center gap-4 p-4 rounded-2xl neon-border transition-all duration-300"
                style={{ background: 'rgba(34,45,55,0.6)' }}
                initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }} whileHover={{ x: 6 }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: x.g }}>
                  <x.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-racing" style={{ color: 'var(--text-muted)' }}>{x.label}</p>
                  <p className="font-medium text-sm mt-0.5 font-roboto text-white">{x.value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}>
              <p className="text-xs font-racing uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Connect With Me</p>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 neon-border"
                    style={{ background: 'rgba(34,45,55,0.6)', color: 'var(--text-muted)' }}
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ y: -6, scale: 1.12, color: '#02dbda' }} whileTap={{ scale: 0.9 }}>
                    <s.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div className="p-5 rounded-2xl"
              style={{ background: 'rgba(34,45,55,0.5)', border: '1px solid rgba(2,219,218,0.15)' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }} whileHover={{ borderColor: 'rgba(2,219,218,0.4)' }}>
              <div className="flex items-center gap-2 mb-2">
                <motion.div className="w-2.5 h-2.5 rounded-full"
                  style={{ background: '#02dbda', boxShadow: '0 0 8px #02dbda' }}
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                <span className="font-bold text-sm font-racing" style={{ color: '#02dbda' }}>Available for new projects</span>
              </div>
              <p className="text-xs leading-relaxed font-roboto" style={{ color: 'var(--text-muted)' }}>
                Currently accepting freelance work and exciting full-time opportunities.
              </p>
            </motion.div>
          </motion.div>

          {/* Right – Form */}
          <motion.div initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, delay: 0.4 }} className="lg:col-span-3">
            <form onSubmit={onSubmit} className="rounded-3xl p-8 space-y-6 neon-border"
              style={{ background: 'rgba(34,45,55,0.65)' }}>
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Your Name"     name="name"    value={form.name}    onChange={onChange} placeholder="John Doe"         required />
                <Field label="Email Address" name="email"   value={form.email}   onChange={onChange} placeholder="john@example.com" required type="email" />
              </div>
              <Field label="Subject" name="subject" value={form.subject} onChange={onChange} placeholder="Project Inquiry" required />
              <div>
                <label className="block text-xs font-racing mb-2 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Message</label>
                <textarea name="message" value={form.message} onChange={onChange} required rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-300 resize-none font-roboto"
                  style={{ background: 'rgba(34,45,55,0.5)', border: '1px solid rgba(2,219,218,0.12)', color: 'var(--text)' }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(2,219,218,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(2,219,218,0.08)'; e.target.style.background = 'rgba(2,219,218,0.04)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(2,219,218,0.12)'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(34,45,55,0.5)'; }}
                />
              </div>
              <motion.button type="submit" disabled={submitting}
                className={submitted ? 'w-full py-4 rounded-xl font-racing flex items-center justify-center gap-2 text-white uppercase tracking-widest text-sm' : 'btn-primary w-full justify-center'}
                style={submitted ? { background: 'linear-gradient(135deg,#02dbda,#017a79)', boxShadow: '0 0 30px rgba(2,219,218,0.4)', color: '#050a0e' } : {}}
                whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                {submitting ? (
                  <><motion.div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />Sending...</>
                ) : submitted ? (
                  <><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}><FiCheck className="w-5 h-5" /></motion.div>Message Sent!</>
                ) : (
                  <><FiSend className="w-4 h-4" /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
