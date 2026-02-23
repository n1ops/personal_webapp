import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';

export default function MagneticButton({ children, strength = 0.3 }) {
  const { ref, springX, springY, handlers } = useMagnetic(strength);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      {...handlers}
    >
      {children}
    </motion.div>
  );
}
