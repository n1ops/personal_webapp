import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import TechBadge from './TechBadge';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1000}
      scale={1.02}
      transitionSpeed={400}
      gyroscope={true}
      glareEnable={true}
      glareMaxOpacity={0.08}
      glareColor="#6c63ff"
      glarePosition="all"
      glareBorderRadius="14px"
    >
      <div
        className="project-card"
        data-cursor="project"
        data-cursor-label="View"
      >
        <div className="project-card-header">
          <h3 className="project-card-title">{project.title}</h3>
          <span className="project-card-lang">{project.language}</span>
        </div>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-card-tech">
          {project.tech.map((t) => (
            <TechBadge key={t.name} name={t.name} color={t.color} />
          ))}
        </div>
        <div className="project-card-actions">
          <Link to={project.route} className="project-card-btn project-card-btn--primary">
            Deep Dive
          </Link>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-btn project-card-btn--secondary"
          >
            GitHub
          </a>
        </div>
      </div>
    </Tilt>
  );
}
