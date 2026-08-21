import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <a className="wordmark" href="#top">
            <span className="dot" />
            AOA
          </a>
          <p style={{ color: 'var(--muted)', fontSize: 13.5, maxWidth: 260, marginTop: 18, lineHeight: 1.7 }}>
            A small web design &amp; development team in Pune, India, building considered
            websites for clients across timezones.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Sitemap</h4>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="mailto:hello@aoa.in">hello@aoa.in</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="footer-col">
            <h4>Studio</h4>
            <span>Pune, India · GMT+5:30</span>
            <span>Open to select projects</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 AOA. All rights reserved.</span>
        <a className="back-to-top" href="#top" aria-label="Back to top">
          <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
}
