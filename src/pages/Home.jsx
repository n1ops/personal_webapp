import { useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import AuroraBackground from '../components/AuroraBackground';
import MagneticButton from '../components/MagneticButton';

const HeroScene = lazy(() => import('../components/HeroScene'));
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';
import BentoGrid, { BentoCard } from '../components/BentoGrid';
import AnimatedCounter from '../components/AnimatedCounter';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const timelineRef = useRef(null);

  // GSAP scroll-driven timeline animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.5,
          },
          opacity: 0,
          x: -30,
          duration: 1,
        });
      });

      gsap.to('.experience-section h2', {
        scrollTrigger: {
          trigger: '.experience-section',
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
        y: -30,
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <div className="home">
        {/* ===== Hero ===== */}
        <section className="hero">
          <AuroraBackground />
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>

          <div className="container hero-content">
            <motion.p
              className="hero-greeting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hi, I'm
            </motion.p>

            <h1 className="hero-name">
              <TextReveal text="Norman Banks Jr." delay={0.4} />
            </h1>

            <motion.p
              className="hero-title"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              Amazon SOC Support Engineer III | Developer | MS Cybersecurity
            </motion.p>

            <motion.div
              className="hero-certs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {['Security+', 'CySA+', 'MS Cybersecurity'].map((cert, i) => (
                <motion.span
                  key={cert}
                  className="hero-cert"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.3 + i * 0.1,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {cert}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              className="hero-bio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Cybersecurity professional with a deep passion for protecting systems and
              solving complex problems. I thrive on collaboration and take pride in seeing projects
              through from concept to completion.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.7 }}
            >
              <MagneticButton>
                <Link to="/projects" className="hero-btn hero-btn--primary">
                  View Projects
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://github.com/n1ops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn hero-btn--ghost"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/normanbanksjr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn hero-btn--ghost"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            className="hero-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <span>Scroll</span>
            <div className="hero-scroll-line" />
          </motion.div>
        </section>

        {/* ===== Core Strengths — Bento Grid ===== */}
        <section className="skills-section container">
          <Reveal>
            <h2>Core Strengths</h2>
            <div className="accent-line" />
          </Reveal>

          <BentoGrid>
            <BentoCard colSpan={2} rowSpan={2} className="bento-card--featured">
              <Reveal>
                <span className="skill-card-icon skill-card-icon--lg">{'\u{1F50D}'}</span>
                <h3 className="bento-card-title--lg">Problem-Solving</h3>
                <p className="bento-card-desc--lg">
                  Breaking down complex systems to identify vulnerabilities and build
                  robust solutions. From automated ML pipelines to SOC incident
                  response — every challenge is a puzzle worth solving.
                </p>
              </Reveal>
            </BentoCard>

            <BentoCard className="bento-card--stat">
              <Reveal>
                <div className="stat-number">
                  <AnimatedCounter target={3} suffix="+" />
                </div>
                <div className="stat-label">Years in Cyber</div>
              </Reveal>
            </BentoCard>

            <BentoCard className="bento-card--stat">
              <Reveal delay={0.1}>
                <div className="stat-number">
                  <AnimatedCounter target={5} suffix="+" />
                </div>
                <div className="stat-label">Projects Built</div>
              </Reveal>
            </BentoCard>

            <BentoCard colSpan={2}>
              <Reveal delay={0.15}>
                <span className="skill-card-icon">{'\u{1F4A1}'}</span>
                <h3>Innovation</h3>
                <p>Spearheading automation projects and building tools from scratch — from serverless ML pipelines to analysis bots.</p>
              </Reveal>
            </BentoCard>

            <BentoCard>
              <Reveal delay={0.2}>
                <span className="skill-card-icon">{'\u{1F504}'}</span>
                <h3>Adaptability</h3>
                <p>Moving fluidly between SOC operations, vulnerability management, cloud security, and software engineering.</p>
              </Reveal>
            </BentoCard>

            <BentoCard>
              <Reveal delay={0.25}>
                <span className="skill-card-icon">{'\u{1F6E1}\uFE0F'}</span>
                <h3>Security</h3>
                <p>Applying defense-in-depth principles across every system — from incident response to NIST compliance.</p>
              </Reveal>
            </BentoCard>
          </BentoGrid>
        </section>

        {/* ===== Experience — Scroll-driven Timeline ===== */}
        <section className="experience-section container" ref={timelineRef}>
          <Reveal>
            <h2>Experience</h2>
            <div className="accent-line" />
          </Reveal>
          <div className="timeline">
            <div className="timeline-item">
              <h3>SOC Support Engineer III</h3>
              <p className="timeline-org">Amazon &middot; Aug 2025 &ndash; Present</p>
              <p>
                Developing solutions with Python and AWS Cloud tooling. Triaging security alerts
                daily and spearheading multiple automation projects and initiatives for the team.
              </p>
            </div>
            <div className="timeline-item">
              <h3>Information Security Engineer</h3>
              <p className="timeline-org">AMERICAN SYSTEMS &middot; Mar 2024 &ndash; Jul 2025</p>
              <p>
                Primary SOC incident responder and alert triager in Azure Sentinel. Led
                vulnerability management using Tenable/Nessus with NIST-compliant ARPs.
                Dynamic malware analysis, threat intelligence, dark web monitoring (ZeroFox),
                and automation projects in Bash, PowerShell, and Python.
              </p>
            </div>
            <div className="timeline-item">
              <h3>Cyber Threat Analyst</h3>
              <p className="timeline-org">ECS &middot; Jun 2023 &ndash; Mar 2024</p>
              <p>
                Triaged threats in a 24/7 SOC environment. Performed proactive monitoring,
                investigation, and mitigation for multiple clients. Analyzed over 1,000 phishing
                emails and malicious attachments.
              </p>
            </div>
            <div className="timeline-item">
              <h3>M.S. Cybersecurity &middot; Security+ &middot; CySA+</h3>
              <p className="timeline-org">Liberty University</p>
              <p>
                Graduate degree in Cybersecurity with CompTIA Security+ and CySA+ certifications.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
