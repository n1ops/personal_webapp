import { projects } from '../data/projects';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionBlock from '../components/SectionBlock';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import TechBadge from '../components/TechBadge';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import CodeBlock from '../components/CodeBlock';
import './ProjectNBA.css';

const project = projects.find((p) => p.id === 'nba');

export default function ProjectNBA() {
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
          <SectionBlock title="Architecture">
            <ArchitectureDiagram nodes={project.architecture} />
          </SectionBlock>

          <SectionBlock title={project.mlDetails.title}>
            <p>{project.mlDetails.description}</p>
            <div className="ml-components">
              {project.mlDetails.components.map((c) => (
                <Reveal key={c.name}>
                  <div className="ml-card">
                    <h4>{c.name}</h4>
                    <p>{c.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                language="python"
                code={`# NBA Prediction Engine - Ensemble Model
from sklearn.ensemble import GradientBoostingRegressor

model = GradientBoostingRegressor(
    n_estimators=100,
    max_depth=4,
    learning_rate=0.1,
)

# 26-feature vector per player
features = build_feature_vector(player, opponent)
prediction = model.predict(features) * 0.6 + weighted_avg * 0.4`}
              />
            </div>
          </SectionBlock>

          <SectionBlock title="Tech Stack">
            <div className="tech-grid">
              {project.tech.map((t) => (
                <TechBadge key={t.name} name={t.name} color={t.color} />
              ))}
            </div>
          </SectionBlock>

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

          <SectionBlock title="Security">
            <div className="feature-list">
              {project.security.map((s, i) => (
                <Reveal key={s} delay={i * 0.05} direction="left">
                  <div className="feature-item">
                    <span className="feature-item-dot" style={{ background: 'var(--success)' }} />
                    {s}
                  </div>
                </Reveal>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="What I Learned">
            <ul className="learned-list">
              {project.learned.map((l) => (
                <Reveal key={l}>
                  <li>{l}</li>
                </Reveal>
              ))}
            </ul>
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
