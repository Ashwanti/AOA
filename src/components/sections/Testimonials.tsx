import Reveal from '@/components/interactive/Reveal';

export default function Testimonials() {
  return (
    <section className="section-pad" id="testimonials">
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">What partners say</p>
            <h2>
              Trust, earned
              <br />
              one project at a time.
            </h2>
          </div>
          <span className="heading-note">Honest feedback from the people we build for.</span>
        </div>
      </Reveal>

      <div className="testi-grid">
        <Reveal>
          <div className="testi-card">
            <div>
              <span className="quote-mark">&ldquo;</span>
              <p className="quote">
                AOA translated our vibe into a site that actually gets people through the door.
                The process was effortless from kickoff to launch.
              </p>
            </div>
            <div className="testi-attrib">
              <span className="avatar-sm">GD</span>
              <div>
                <strong>Good Day Café</strong>
                <span>First client partner, 2026</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="testi-soon">
            <strong>More stories, coming soon</strong>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7 }}>
              We&apos;re early — and proud of it. As we wrap more projects, this space will
              fill with the people behind them.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
