import { ArrowUpRight, Compass, Database, Gauge, Layers, PenTool } from 'lucide-react';
import Reveal from '@/components/interactive/Reveal';

const services = [
  {
    number: '01',
    icon: PenTool,
    title: 'Web design',
    copy: 'Visual systems and interfaces designed with restraint — built to earn attention, not just hold it.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Development',
    copy: 'Fast, resilient, type-safe builds on Next.js and React that scale as your business grows.',
  },
  {
    number: '03',
    icon: Compass,
    title: 'Digital strategy',
    copy: 'Clear positioning, sharp roadmaps, and decisions grounded in data, not guesswork.',
  },
  {
    number: '04',
    icon: Database,
    title: 'Backend & infrastructure',
    copy: 'Secure Node.js APIs and MySQL-backed systems architected to grow alongside you.',
  },
  {
    number: '05',
    icon: Gauge,
    title: 'Performance & SEO',
    copy: 'Core Web Vitals, structured data, and technical SEO built in from day one — not bolted on after launch.',
  },
];

export default function Services() {
  return (
    <section className="section-pad" id="services">
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">What we do</p>
            <h2>
              Built for now.
              <br />
              Ready for next.
            </h2>
          </div>
          <span className="heading-note">Five disciplines. One dedicated team, end to end.</span>
        </div>
      </Reveal>

      <div className="service-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.number} delay={(index % 3) as 0 | 1 | 2}>
              <div className="service-card">
                <span className="num">{service.number}</span>
                <div className="service-icon">
                  <Icon size={20} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
            </Reveal>
          );
        })}

        <Reveal delay={3}>
          <a className="service-card service-card-cta" href="#contact" data-cursor="hover">
            <span className="num" style={{ color: 'rgba(245,241,231,.5)' }}>06</span>
            <h3>
              Got a project?
              <br />
              <span className="accent-text">Let&apos;s talk.</span>
            </h3>
            <span className="service-cta-link">
              Start a conversation <ArrowUpRight size={16} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
