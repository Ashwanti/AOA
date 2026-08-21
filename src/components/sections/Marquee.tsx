const stack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'MySQL',
  'Accessible by default',
  'Built for search',
];

export default function Marquee() {
  const items = [...stack, ...stack];

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, index) => (
          <div className="marquee-item" key={`${item}-${index}`}>
            <span>&#9670;</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
