// src/components/Footer.jsx
import { Link } from 'react-router';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-green-50 text-base-content p-10 gap-8">
      <nav>
        <header className="footer-title">EcoTrack</header>
        <p className="text-sm leading-relaxed">
          A community platform for everyday sustainability actions.<br />
          <span className="font-semibold">© 2025 EcoTrack.</span> All rights reserved.
        </p>
      </nav>

      <nav>
        <header className="footer-title">Quick Links</header>
        <Link to="/about" className="link link-hover">About</Link>
        <Link to="/contact" className="link link-hover">Contact</Link>
      </nav>

      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="flex gap-4 text-2xl">
          <a aria-label="EcoTrack on Facebook" className="hover:text-success transition-colors">
            <FaFacebook />
          </a>
          <a aria-label="EcoTrack on X" className="hover:text-success transition-colors">
            <FaXTwitter />
          </a>
          <a aria-label="EcoTrack on Instagram" className="hover:text-success transition-colors">
            <FaInstagram />
          </a>
        </div>
      </nav>

      <nav>
        <header className="footer-title">Accessibility & Privacy</header>
        <p className="text-sm text-gray-600 max-w-xs">
          EcoTrack strives for WCAG-compliant experiences. Reach out for accessibility support, and review our commitment to responsible data practices in the privacy resources above.
        </p>
      </nav>
    </footer>
  );
};

export default Footer;