// src/components/Footer.jsx
  import { Link } from 'react-router';
  import { FaFacebook, FaInstagram, FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaArrowRight } from 'react-icons/fa';
  import { FaXTwitter } from 'react-icons/fa6';

  const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
      <footer className="bg-gradient-to-b from-base-200 to-base-300 dark:from-base-300 dark:to-base-200">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Brand Section */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-success">
                <FaLeaf className="text-3xl" />
                <span>EcoTrack</span>
              </Link>
              <p className="text-base-content/70 leading-relaxed">
                A community platform for everyday sustainability actions. Join thousands making a real difference for our planet.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm bg-base-100 hover:bg-success hover:text-white transition-all duration-300"
                >
                  <FaFacebook className="text-lg" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm bg-base-100 hover:bg-success hover:text-white transition-all duration-300"
                >
                  <FaXTwitter className="text-lg" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm bg-base-100 hover:bg-success hover:text-white transition-all duration-300"
                >
                  <FaInstagram className="text-lg" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-success rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-base-content/70 hover:text-success hover:pl-2 transition-all duration-200 flex items-center gap-2">
                    <FaArrowRight className="text-xs opacity-0 -ml-4 group-hover:opacity-100" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/challenges" className="text-base-content/70 hover:text-success hover:pl-2 transition-all duration-200">
                    Challenges
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-base-content/70 hover:text-success hover:pl-2 transition-all duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-base-content/70 hover:text-success hover:pl-2 transition-all duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-base-content/70 hover:text-success hover:pl-2 transition-all duration-200">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-success rounded-full"></span>
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-base-content/70 hover:text-success hover:pl-2 transition-all duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-base-content/70 hover:text-success hover:pl-2 transition-all duration-200">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-base-content/70 hover:text-success hover:pl-2 transition-all duration-200">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-success rounded-full"></span>
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-base-content/70">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-success text-sm" />
                  </div>
                  <span>support@ecotrack.com</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/70">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-success text-sm" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/70">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-success text-sm" />
                  </div>
                  <span>San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-content/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-base-content/60 text-sm text-center md:text-left">
                © {currentYear} EcoTrack. All rights reserved.
              </p>
              <p className="text-base-content/60 text-sm flex items-center gap-1">
                Made with <FaHeart className="text-red-500 animate-pulse" /> for the planet
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;
