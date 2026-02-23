import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectNBA from './pages/ProjectNBA';
import ProjectChess from './pages/ProjectChess';
import ProjectWeather from './pages/ProjectWeather';
import ProjectTerraform from './pages/ProjectTerraform';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  useLenis();

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/nba" element={<ProjectNBA />} />
            <Route path="/projects/chess" element={<ProjectChess />} />
            <Route path="/projects/weather" element={<ProjectWeather />} />
            <Route path="/projects/terraform" element={<ProjectTerraform />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
