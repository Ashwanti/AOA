import { ArrowUpRight, ArrowDown } from 'lucide-react';
import Counter from '@/components/interactive/Counter';
import AmbientField from '@/components/canvas/AmbientField';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-canvas-layer" aria-hidden="true">
        <AmbientField />
      </div>

      <span className="hero-badge">
        <span className="pulse" />
        Open for new projects &middot; Pune, India
      </span>

      <h1>
        Digital craft,
        <br />
        built to earn{' '}
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <em>trust.</em>
          <svg className="hero-underline" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
            <path d="M2 14 C 60 4, 240 4, 298 14" />
          </svg>
        </span>
      </h1>

      <p className="hero-intro">
        AOA is a small web design &amp; development team in Pune, India, building fast,
        considered websites for founders and teams across timezones &mdash; from first
        sketch to shipped product.
      </p>

      <div className="hero-ctas">
        <a className="btn-primary" href="#contact" data-cursor="hover">
          Start a project <ArrowUpRight size={16} />
        </a>
        <a className="btn-ghost" href="#work" data-cursor="hover">
          See our work <ArrowDown size={14} />
        </a>
      </div>

      <div className="hero-credentials">
        <div className="hero-credential">
          <strong><Counter value={3} /></strong>
          <span>The same three people on every project &mdash; never subcontracted</span>
        </div>
        <div className="hero-credential">
          <strong>GMT+5:30</strong>
          <span>Overlapping working hours with US, UK &amp; EU teams</span>
        </div>
        <div className="hero-credential">
          <strong><Counter value={24} suffix="h" /></strong>
          <span>Average first response time, every inquiry</span>
        </div>
      </div>
    </section>
  );
}
