import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <MagneticButton strength={0.15}>
          <Link to="/" className="navbar-logo" data-cursor="pointer">
            norman<span>.</span>banks
          </Link>
        </MagneticButton>

        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map(({ to, label }) => (
            <motion.div
              key={to}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Link
                to={to}
                className={`navbar-link ${pathname === to ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
                data-cursor="pointer"
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </div>

        <MagneticButton strength={0.15}>
          <ThemeToggle />
        </MagneticButton>
      </div>
    </nav>
  );
}
