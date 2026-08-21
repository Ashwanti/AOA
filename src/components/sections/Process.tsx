import Reveal from '@/components/interactive/Reveal';

const steps = [
  {
    number: '01',
    title: 'Discover',
    copy: 'We dig into your business, audience, and goals before a single pixel moves.',
  },
  {
    number: '02',
    title: 'Design',
    copy: 'Concepting and high-fidelity design exploring bold, on-brand directions.',
  },
  {
    number: '03',
    title: 'Build',
    copy: 'Pixel-accurate development with performance, accessibility, and SEO baked in from the start.',
  },
  {
    number: '04',
    title: 'Launch & grow',
    copy: 'We ship, monitor, and iterate — your site keeps improving well after go-live.',
  },
];

export default function Process() {
  return (
    <section className="section-pad" id="process">
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">How we work</p>
            <h2>
              Four steps.
              <br />
              Zero surprises.
            </h2>
          </div>
          <span className="heading-note">A process built for founders who value momentum.</span>
        </div>
      </Reveal>

      <div className="process-list">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={(index % 4) as 0 | 1 | 2 | 3}>
            <div className="process-row">
              <span className="num">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
