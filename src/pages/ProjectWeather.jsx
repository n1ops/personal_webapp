import { projects } from '../data/projects';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionBlock from '../components/SectionBlock';
import TechBadge from '../components/TechBadge';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import './ProjectWeather.css';

const project = projects.find((p) => p.id === 'weather');

export default function ProjectWeather() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <PageTransition>
      <div className="project-deep">
        {/* Hero with parallax */}
        <motion.div
          className="project-hero container"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="project-hero-bg" />
          <h1>{project.title}</h1>
          <div className="accent-line" />
          <p>{project.overview}</p>
        </motion.div>

        {/* Body */}
        <div className="project-body container">
          <SectionBlock title="Features">
            <div className="feature-list">
              {project.features.map((f, i) => (
                <Reveal key={f} delay={i * 0.05} direction="left">
                  <div className="feature-item">
                    <span className="feature-item-dot" />
                    {f}
                  </div>
                </Reveal>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="How It Works">
            <div className="flow-diagram">
              {project.howItWorks.map((node, i) => (
                <Reveal key={node.label} delay={i * 0.15} direction="left">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {i > 0 && <span className="flow-arrow">&rarr;</span>}
                    <span className={`flow-node ${node.variant ? `flow-node--${node.variant}` : ''}`}>
                      {node.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Example Output">
            <Reveal>
              <div className="discord-embed">
                <div className="discord-embed-title">{project.exampleOutput.title}</div>
                <div className="discord-embed-location">{project.exampleOutput.location}</div>
                <div className="discord-embed-message">{project.exampleOutput.message}</div>
              </div>
            </Reveal>
          </SectionBlock>

          <SectionBlock title="Tech Stack">
            <div className="tech-grid">
              {project.tech.map((t) => (
                <TechBadge key={t.name} name={t.name} color={t.color} />
              ))}
            </div>
          </SectionBlock>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-github-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </PageTransition>
  );
}
