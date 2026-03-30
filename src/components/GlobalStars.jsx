import { memo } from 'react';

const GlobalStars = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
    <div className="stars-sm absolute inset-0" />
    <div className="stars-md absolute inset-0" />
    <div className="stars-lg absolute inset-0" />
  </div>
));

GlobalStars.displayName = 'GlobalStars';
export default GlobalStars;
