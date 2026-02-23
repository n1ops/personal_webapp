import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const directionMap = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export default function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: '-10% 0px',
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directionMap[direction],
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
