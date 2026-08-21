import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/interactive/Reveal';

export default function Work() {
  return (
    <section className="section-pad" id="work" style={{ background: 'var(--bg-alt)', paddingBottom: 100 }}>
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>
              Real projects.
              <br />
              Real craft.
            </h2>
          </div>
          <span className="heading-note">01 &mdash; 02</span>
        </div>
      </Reveal>

      <div className="work-grid">
        <Reveal>
          <a className="project-card" href="#contact" data-cursor="hover">
            <div className="project-visual">
              <div className="grid-lines" aria-hidden="true" />
              <span className="stamp">Brand / Web / 2026</span>
              <div className="badge-orb">
                a<br />good<br /><i>day</i>
              </div>
            </div>
            <div className="project-info">
              <div className="tags">
                <span>Brand</span>
                <span>Web design</span>
                <span>Development</span>
              </div>
              <h3>Good Day Café</h3>
              <p>
                A warmer way to start the day — a full brand and web presence for a local
                café, built to turn browsers into regulars.
              </p>
              <div className="project-outcomes">
                <div>
                  <strong>3 wks</strong>
                  <span>Concept to launch</span>
                </div>
                <div>
                  <strong>6</strong>
                  <span>Pages designed &amp; built</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Mobile-first &amp; responsive</span>
                </div>
              </div>
              <span className="project-link">
                View case study <ArrowUpRight size={16} />
              </span>
            </div>
          </a>
        </Reveal>

        <Reveal delay={1}>
          <div className="coming-soon-card">
            <div>
              <span className="tag">02 &mdash; In the works</span>
              <p style={{ marginTop: 10 }}>
                Next case study <em>coming soon</em>
              </p>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase' }}>
              Stay curious
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
