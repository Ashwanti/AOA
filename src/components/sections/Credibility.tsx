import { Clock, ShieldCheck, UserCheck, Workflow } from 'lucide-react';
import Reveal from '@/components/interactive/Reveal';

const pillars = [
  {
    number: '01',
    icon: Clock,
    title: 'Timezone-friendly',
    copy: 'Based in Pune, working hours that overlap comfortably with the US, UK, and EU. Replies within 24 hours, always.',
  },
  {
    number: '02',
    icon: Workflow,
    title: 'Transparent process',
    copy: 'Fixed milestones, a clear scope document, and a shared board you can check in on any time — no black boxes.',
  },
  {
    number: '03',
    icon: UserCheck,
    title: 'Direct, never outsourced',
    copy: 'The three people you talk to are the three people who build your project. No subcontracting, no handoffs.',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Quality-checked',
    copy: 'Cross-browser tested, accessibility-checked, and code-reviewed before anything reaches production.',
  },
];

export default function Credibility() {
  return (
    <section className="section-pad" id="why-us" style={{ background: 'var(--bg-alt)' }}>
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Why teams trust us</p>
            <h2>
              Built for clients
              <br />
              who can&apos;t afford surprises.
            </h2>
          </div>
          <span className="heading-note">
            An Indian team built for how international clients actually work.
          </span>
        </div>
      </Reveal>

      <div className="credibility-grid">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <Reveal key={pillar.number} delay={(index % 4) as 0 | 1 | 2 | 3}>
              <div className="credibility-card">
                <span className="num">{pillar.number}</span>
                <div className="credibility-icon">
                  <Icon size={19} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
