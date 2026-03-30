import { memo } from 'react';
import { motion } from 'framer-motion';

const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.7 + 0.1,
  dur: Math.random() * 4 + 2,
  delay: Math.random() * 4,
  color: i % 4 === 0 ? '#02dbda' : i % 4 === 1 ? '#01a8a7' : i % 4 === 2 ? '#ffffff' : '#cdd9e5',
}));

const CUBES = [
  { id: 0, size: 60,  top: '12%', left: '8%',   dur: 22, delay: 0,   color: 'rgba(2,219,218,0.07)',  border: 'rgba(2,219,218,0.25)' },
  { id: 2, size: 80,  top: '20%', right: '6%',  dur: 26, delay: 1.5, color: 'rgba(2,219,218,0.05)',  border: 'rgba(2,219,218,0.18)' },
];

const RINGS = [
  { id: 0, size: 120, top: '15%', left: '15%',  dur: 14, delay: 0,   color: 'rgba(2,219,218,0.22)', rev: false },
  { id: 2, size: 150, top: '25%', right: '12%', dur: 18, delay: 1,   color: 'rgba(2,219,218,0.18)', rev: false },
];

const TRIANGLES = [
  { id: 0, size: 50, top: '30%', left: '18%',  dur: 20, delay: 1,   color: 'rgba(2,219,218,0.18)' },
];

const Cube3D = ({ size, top, left, right, dur, delay, color, border }) => {
  const h = size / 2;
  const face = { position: 'absolute', width: size, height: size, background: color, border: `1px solid ${border}` };
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: size, height: size, top, left, right, transformStyle: 'preserve-3d' }}
      animate={{ rotateY: [0,360], y: [0,-20,0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
    >
      <div style={{ ...face, transform: `translateZ(${h}px)` }} />
      <div style={{ ...face, transform: `rotateY(180deg) translateZ(${h}px)` }} />
      <div style={{ ...face, transform: `rotateY(-90deg) translateZ(${h}px)` }} />
      <div style={{ ...face, transform: `rotateY(90deg) translateZ(${h}px)` }} />
      <div style={{ ...face, transform: `rotateX(90deg) translateZ(${h}px)` }} />
      <div style={{ ...face, transform: `rotateX(-90deg) translateZ(${h}px)` }} />
    </motion.div>
  );
};

const AnimRing = ({ size, top, left, right, dur, delay, color, rev }) => (
  <motion.div
    className="absolute pointer-events-none rounded-full"
    style={{
      width: size, height: size, top, left, right,
      border: `1px solid ${color}`,
      background: `radial-gradient(circle, ${color.replace(')', ',0.04)')} 0%, transparent 70%)`,
      boxShadow: `0 0 12px ${color} inset, 0 0 12px ${color}`,
    }}
    animate={{ rotate: rev ? -360 : 360, scale: [1, 1.06, 1] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
  >
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 6, height: 6,
        background: '#02dbda',
        boxShadow: '0 0 8px #02dbda, 0 0 16px rgba(2,219,218,0.6)',
        top: -3, left: '50%', marginLeft: -3,
      }}
    />
  </motion.div>
);

const Triangle = ({ size, top, left, right, dur, delay, color }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      width: 0, height: 0, top, left, right,
      borderLeft: `${size / 2}px solid transparent`,
      borderRight: `${size / 2}px solid transparent`,
      borderBottom: `${size}px solid ${color}`,
      filter: `drop-shadow(0 0 6px ${color})`,
    }}
    animate={{ rotate: [0,120,240,360], scale: [1,1.15,0.9,1], y: [0,-15,0,15,0] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const SpaceBackground = memo(({ intensity = 1 }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>

    {STARS.map(s => (
      <motion.div
        key={s.id}
        className="absolute rounded-full"
        style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, background: s.color, boxShadow: `0 0 ${s.size * 2}px ${s.color}` }}
        animate={{ opacity: [s.opacity * 0.3, s.opacity, s.opacity * 0.5, s.opacity], scale: [0.8, 1.2, 0.9, 1] }}
        transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
      />
    ))}

    {/* Nebula blobs — cyan tones */}
    <div className="nebula w-[700px] h-[500px] top-[-10%] left-[-15%]"
      style={{ background: 'rgba(2,219,218,0.08)' }} />
    <div className="nebula w-[600px] h-[400px] bottom-[-10%] right-[-15%]"
      style={{ background: 'rgba(34,45,55,0.6)' }} />

    <div className="absolute inset-0 bg-space-grid" style={{ opacity: 0.5 * intensity }} />

    {CUBES.map(c => <Cube3D key={c.id} {...c} />)}
    {RINGS.map(r => <AnimRing key={r.id} {...r} />)}
    {TRIANGLES.map(t => <Triangle key={t.id} {...t} />)}

    {/* Large center orbit rings */}
    <div className="absolute inset-0 flex items-center justify-center">
      {[
        { size: 800, dur: 50, color: 'rgba(2,219,218,0.06)',  rev: false },
      ].map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: r.size, height: r.size,
            border: `1px solid ${r.color}`,
            boxShadow: `0 0 30px ${r.color} inset`,
          }}
          animate={{ rotate: r.rev ? -360 : 360 }}
          transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute w-3 h-3 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: '#02dbda', boxShadow: '0 0 10px #02dbda, 0 0 20px rgba(2,219,218,0.5)' }} />
        </motion.div>
      ))}
    </div>
  </div>
));

SpaceBackground.displayName = 'SpaceBackground';
export default SpaceBackground;
