// src/components/Footer.jsx
import { Link } from 'react-router';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-green-50 dark:bg-base-200 text-base-content p-10 gap-8">
      <nav>
        <header className="footer-title">EcoTrack</header>
        <p className="text-sm leading-relaxed">
          A community platform for everyday sustainability actions.<br />
          <span className="font-semibold">© 2025 EcoTrack.</span> All rights reserved.
        </p>
      </nav>

      <nav>
        <header className="footer-title">Quick Links</header>
        <Link to="/" className="link link-hover">Home</Link>
        <Link to="/challenges" className="link link-hover">Challenges</Link>
        <Link to="/about" className="link link-hover">About</Link>
        <Link to="/contact" className="link link-hover">Contact</Link>
      </nav>

      <nav>
        <header className="footer-title">Legal</header>
        <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
        <Link to="/terms" className="link link-hover">Terms of Service</Link>
      </nav>

      <nav>
        <h6 className="footer-title">Connect With Us</h6>
        <div className="flex gap-4 text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="EcoTrack on Facebook" className="hover:text-success transition-colors">
            <FaFacebook />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="EcoTrack on X" className="hover:text-success transition-colors">
            <FaXTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="EcoTrack on Instagram" className="hover:text-success transition-colors">
            <FaInstagram />
          </a>
        </div>
        <p className="text-sm text-base-content/60 mt-2">
          Follow us for eco-tips and updates!
        </p>
      </nav>
    </footer>
  );
};

export default Footer;
