import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/interactive/Reveal';

const team = [
  { initials: 'AG', name: 'Ashwanti', role: 'Design & direction' },
  { initials: 'AP', name: 'Akhilesh', role: 'Development & systems' },
  { initials: 'OS', name: 'Om', role: 'Strategy & experience' },
];

export default function About() {
  return (
    <section className="section-pad about-section" id="about" style={{ background: 'var(--bg-alt)' }}>
      <Reveal>
        <div className="about-intro">
          <p className="eyebrow">A little about us</p>
          <h2
            style={{
              font: '500 clamp(36px, 4.6vw, 56px)/1.1 var(--font-display)',
              letterSpacing: '-.01em',
              margin: '16px 0 0',
            }}
          >
            Small team.
            <br />
            <span className="accent-text">Big intent.</span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <div className="about-copy">
          <p>
            AOA is three developers, designers, and thinkers from Pune who care about the
            uncommon details. We partner with founders and teams &mdash; local and
            international &mdash; to turn ideas into digital places people actually want
            to spend time in.
          </p>
          <a
            className="project-link"
            href="#contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}
          >
            Get to know us <ArrowUpRight size={16} />
          </a>
        </div>
      </Reveal>

      <div className="team-grid">
        {team.map((person, index) => (
          <Reveal key={person.name} delay={(index % 3) as 0 | 1 | 2}>
            <div className="team-card">
              <div className="team-avatar">{person.initials}</div>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
