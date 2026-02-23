import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursorStore } from '../hooks/useCursorStore';
import './CustomCursor.css';

export default function CustomCursor() {
  const { variant, label } = useCursorStore();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto-detect interactive elements
  useEffect(() => {
    const { setCursor, reset } = useCursorStore.getState();

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (!target) return;

      const cursorType = target.getAttribute('data-cursor');
      const cursorLabel = target.getAttribute('data-cursor-label') || '';

      if (cursorType) {
        setCursor(cursorType, cursorLabel);
      } else {
        setCursor('pointer');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) reset();
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const sizes = {
    default: 12,
    pointer: 40,
    text: 2,
    project: 80,
    hidden: 0,
  };

  const size = sizes[variant] || 12;

  return (
    <motion.div
      className={`custom-cursor custom-cursor--${variant}`}
      style={{
        x: cursorX,
        y: cursorY,
        width: size,
        height: size,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        opacity: variant === 'hidden' ? 0 : 1,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {variant === 'project' && label && (
        <span className="custom-cursor-label">{label}</span>
      )}
    </motion.div>
  );
}
