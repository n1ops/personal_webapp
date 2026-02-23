import { motion } from 'framer-motion';
import './TechBadge.css';

export default function TechBadge({ name, color = 'var(--accent)' }) {
  return (
    <motion.span
      className="tech-badge"
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <span className="tech-badge-dot" style={{ background: color }} />
      {name}
    </motion.span>
  );
}
