import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../hooks/useThemeStore';
import './ThemeToggle.css';

const iconVariants = {
  initial: { rotate: -90, scale: 0.5, opacity: 0 },
  animate: { rotate: 0, scale: 1, opacity: 1 },
  exit: { rotate: 90, scale: 0.5, opacity: 0 },
};

const iconTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      data-cursor="pointer"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            className="theme-toggle-icon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={iconTransition}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            className="theme-toggle-icon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={iconTransition}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
