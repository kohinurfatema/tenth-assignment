import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const contactInfo = [
    { icon: FaEnvelope, label: "Email", value: "hello@ecotrack.com", href: "mailto:hello@ecotrack.com" },
    { icon: FaPhone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: FaMapMarkerAlt, label: "Address", value: "123 Green Street, Eco City, EC 12345", href: "#" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-base-content/70 text-lg">
          Have questions or feedback? We would love to hear from you. 
          Reach out and our team will get back to you as soon as possible.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Get in Touch</h2>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a key={index} href={item.href} className="flex items-start gap-4 hover:text-primary transition-colors">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <item.icon className="text-primary text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-base-content/70 text-sm">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Follow Us</h2>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.href} className="btn btn-circle btn-outline" aria-label={social.label}>
                    <social.icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Office Hours</h2>
              <p className="opacity-90">Monday - Friday: 9AM - 6PM</p>
              <p className="opacity-90">Saturday: 10AM - 4PM</p>
              <p className="opacity-90">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-lg">
            <form onSubmit={handleSubmit} className="card-body">
              <h2 className="card-title mb-4">Send us a Message</h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Your Name *</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Your Email *</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Subject *</span></label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Message *</span></label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-32"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div className="form-control mt-4">
                <button type="submit" className="btn btn-primary gap-2" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : <FaPaperPlane />}
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-12 card bg-base-200 h-64 flex items-center justify-center">
        <div className="text-center">
          <FaMapMarkerAlt className="text-5xl text-primary mx-auto mb-4" />
          <p className="text-base-content/60">Interactive map would go here</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
