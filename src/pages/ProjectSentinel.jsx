import { projects } from '../data/projects';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionBlock from '../components/SectionBlock';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import TechBadge from '../components/TechBadge';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import CodeBlock from '../components/CodeBlock';
import './ProjectSentinel.css';

const project = projects.find((p) => p.id === 'sentinel');

export default function ProjectSentinel() {
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
          {/* Detection Stats */}
          <SectionBlock title="At a Glance">
            <div className="sentinel-stats">
              {[
                { value: project.detectionStats.rules, label: 'Analytics Rules' },
                { value: project.detectionStats.tactics, label: 'MITRE Tactics' },
                { value: project.detectionStats.resources, label: 'Terraform Resources' },
                { value: project.detectionStats.automationRules, label: 'Automation Rules' },
              ].map((stat) => (
                <Reveal key={stat.label}>
                  <div className="sentinel-stat-card">
                    <span className="sentinel-stat-number">{stat.value}</span>
                    <span className="sentinel-stat-label">{stat.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Architecture">
            <ArchitectureDiagram nodes={project.architecture} />
          </SectionBlock>

          {/* MITRE ATT&CK Coverage Matrix */}
          <SectionBlock title="MITRE ATT&CK Coverage">
            <div className="env-table-wrapper">
              <table className="env-table mitre-table">
                <thead>
                  <tr>
                    <th>Tactic</th>
                    <th>Technique</th>
                    <th>Detection Rule</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {project.mitreMatrix.map((row) => (
                    <tr key={row.detection}>
                      <td>{row.tactic}</td>
                      <td><code>{row.technique}</code></td>
                      <td>{row.detection}</td>
                      <td>
                        <span className={`severity-badge severity-${row.severity.toLowerCase()}`}>
                          {row.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionBlock>

          {/* Detection Highlights */}
          <SectionBlock title="Detection Engineering Highlights">
            <div className="ml-components">
              {project.detectionHighlights.map((d) => (
                <Reveal key={d.name}>
                  <div className="ml-card">
                    <h4>{d.name}</h4>
                    <p>{d.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <CodeBlock
                language="kql"
                code={`// Impossible Travel — Haversine distance in KQL
let haversine_km =
    2 * 6371 * asin(sqrt(
        pow(sin(radians((lat2 - lat1) / 2)), 2) +
        cos(radians(lat1)) * cos(radians(lat2)) *
        pow(sin(radians((lon2 - lon1) / 2)), 2)
    ));
let travel_speed_kmh = haversine_km / time_diff_hours;
// Flag if speed > 900 km/h (faster than commercial flight)
| where travel_speed_kmh > 900 and haversine_km > 500`}
              />
            </div>
          </SectionBlock>

          {/* Automation Rules */}
          <SectionBlock title="Automation Rules">
            <div className="ml-components">
              {project.automationRules.map((r) => (
                <Reveal key={r.name}>
                  <div className="ml-card">
                    <h4>{r.name}</h4>
                    <p>{r.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </SectionBlock>

          {/* IR Dashboard */}
          <SectionBlock title="IR Dashboard">
            <div className="feature-list">
              {project.dashboardTiles.map((tile, i) => (
                <Reveal key={tile} delay={i * 0.05} direction="left">
                  <div className="feature-item">
                    <span className="feature-item-dot" style={{ background: 'var(--accent)' }} />
                    {tile}
                  </div>
                </Reveal>
              ))}
            </div>
          </SectionBlock>

          {/* Terraform IaC */}
          <SectionBlock title="Infrastructure as Code">
            <div style={{ marginTop: 12 }}>
              <CodeBlock
                language="hcl"
                code={`# 12 detection rules deployed from a single resource block
locals {
  detection_files = {
    brute_force_signin = {
      file     = "brute-force-signin.kql"
      name     = "Brute Force Sign-In Attempts"
      severity = "Medium"
      tactics  = ["CredentialAccess"]
    }
    # ... 11 more detection definitions
  }
}

resource "azurerm_sentinel_alert_rule_scheduled" "detection" {
  for_each = local.detection_files

  name         = each.key
  display_name = each.value.name
  severity     = each.value.severity
  tactics      = each.value.tactics
  query        = file("\${path.module}/../detections/\${each.value.file}")
}`}
              />
            </div>
          </SectionBlock>

          {/* Security */}
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
