import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import PageTransition from '../components/PageTransition';
import Reveal from '../components/Reveal';
import './Projects.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Projects() {
  return (
    <PageTransition>
      <div className="projects-page container">
        <div className="projects-header">
          <Reveal>
            <h1>Projects</h1>
            <div className="accent-line" />
            <p>
              A collection of personal projects spanning machine learning, automation, and cloud
              engineering — each built to solve a real problem.
            </p>
          </Reveal>
        </div>
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((p) => (
            <motion.div key={p.id} variants={itemVariants}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
