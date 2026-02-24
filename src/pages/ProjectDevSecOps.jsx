import { projects } from '../data/projects';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionBlock from '../components/SectionBlock';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import TechBadge from '../components/TechBadge';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import CodeBlock from '../components/CodeBlock';
import './ProjectDevSecOps.css';

const project = projects.find((p) => p.id === 'devsecops');

export default function ProjectDevSecOps() {
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
          <SectionBlock title="Pipeline Architecture">
            <ArchitectureDiagram nodes={project.architecture} />
          </SectionBlock>

          <SectionBlock title="Pipeline Stages">
            <div className="ml-components">
              {project.pipelineStages.map((s) => (
                <Reveal key={s.name}>
                  <div className="ml-card">
                    <h4>{s.name}</h4>
                    <p>{s.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                language="yaml"
                code={`# Any repo can call this pipeline with ~20 lines
name: Security Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security:
    uses: n1ops/devsecops-pipeline-reference/.github/workflows/reusable-pipeline.yml@main
    with:
      language: python
      test-command: "pytest tests/ -v"
      image-name: "my-app"
    secrets: inherit`}
              />
            </div>
          </SectionBlock>

          <SectionBlock title="Test Coverage">
            <div className="test-summary">
              <div className="test-total">
                <span className="test-total-number">{project.testCoverage.total}</span>
                <span className="test-total-label">security tests</span>
              </div>
              <div className="test-categories">
                {project.testCoverage.categories.map((c) => (
                  <Reveal key={c.name}>
                    <div className="test-category">
                      <span className="test-category-count">{c.count}</span>
                      <span className="test-category-name">{c.name}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </SectionBlock>

          <SectionBlock title="Application Security">
            <div className="feature-list">
              {project.appSecurity.map((s, i) => (
                <Reveal key={s} delay={i * 0.05} direction="left">
                  <div className="feature-item">
                    <span className="feature-item-dot" style={{ background: 'var(--accent)' }} />
                    {s}
                  </div>
                </Reveal>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Infrastructure Security">
            <div className="feature-list">
              {project.infraSecurity.map((s, i) => (
                <Reveal key={s} delay={i * 0.05} direction="left">
                  <div className="feature-item">
                    <span className="feature-item-dot" style={{ background: 'var(--success)' }} />
                    {s}
                  </div>
                </Reveal>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Reusable Pipeline">
            <Reveal>
              <div className="reusable-callout">
                <p>{project.reusable}</p>
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
