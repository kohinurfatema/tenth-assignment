import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { FaShieldAlt, FaFileContract, FaCookie, FaUserShield } from "react-icons/fa";

const PrivacyTermsPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("privacy");

  // Set initial tab based on URL path
  useEffect(() => {
    if (location.pathname === "/terms") {
      setActiveTab("terms");
    } else if (location.pathname === "/privacy") {
      setActiveTab("privacy");
    }
  }, [location.pathname]);

  const sections = {
    privacy: [
      { title: "Information We Collect", content: "We collect information you provide directly to us, such as when you create an account, participate in challenges, or contact us for support. This includes your name, email address, and activity data related to your eco-friendly challenges." },
      { title: "How We Use Your Information", content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices, respond to your comments and questions, and track your environmental impact and progress." },
      { title: "Information Sharing", content: "We do not sell your personal information. We may share your information with service providers who perform services on our behalf, or when required by law or to protect our rights and the safety of our users." },
      { title: "Data Security", content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction." },
      { title: "Your Rights", content: "You have the right to access, correct, or delete your personal information. You can update your profile settings or contact us to exercise these rights." },
    ],
    terms: [
      { title: "Acceptance of Terms", content: "By accessing and using EcoTrack, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
      { title: "User Accounts", content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account." },
      { title: "Acceptable Use", content: "You agree to use EcoTrack only for lawful purposes and in accordance with these Terms. You may not use the platform to engage in any activity that is harmful, fraudulent, or violates the rights of others." },
      { title: "Content and Intellectual Property", content: "All content on EcoTrack, including text, graphics, logos, and software, is the property of EcoTrack or its licensors and is protected by intellectual property laws." },
      { title: "Limitation of Liability", content: "EcoTrack shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service." },
      { title: "Changes to Terms", content: "We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page." },
    ],
    cookies: [
      { title: "What Are Cookies", content: "Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience by remembering your preferences and login status." },
      { title: "Types of Cookies We Use", content: "We use essential cookies for site functionality, analytics cookies to understand how you use our site, and preference cookies to remember your settings." },
      { title: "Managing Cookies", content: "You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website." },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy & Terms</h1>
        <p className="text-base-content/70">
          Your privacy matters to us. Please review our policies to understand how we collect, use, and protect your information.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="tabs tabs-boxed">
          <button 
            className={"tab gap-2 " + (activeTab === "privacy" ? "tab-active" : "")}
            onClick={() => setActiveTab("privacy")}
          >
            <FaShieldAlt /> Privacy Policy
          </button>
          <button 
            className={"tab gap-2 " + (activeTab === "terms" ? "tab-active" : "")}
            onClick={() => setActiveTab("terms")}
          >
            <FaFileContract /> Terms of Service
          </button>
          <button 
            className={"tab gap-2 " + (activeTab === "cookies" ? "tab-active" : "")}
            onClick={() => setActiveTab("cookies")}
          >
            <FaCookie /> Cookie Policy
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-6">
              {activeTab === "privacy" && <FaUserShield className="text-4xl text-primary" />}
              {activeTab === "terms" && <FaFileContract className="text-4xl text-primary" />}
              {activeTab === "cookies" && <FaCookie className="text-4xl text-primary" />}
              <div>
                <h2 className="text-2xl font-bold">
                  {activeTab === "privacy" && "Privacy Policy"}
                  {activeTab === "terms" && "Terms of Service"}
                  {activeTab === "cookies" && "Cookie Policy"}
                </h2>
                <p className="text-base-content/60 text-sm">Last updated: January 2025</p>
              </div>
            </div>

            <div className="space-y-8">
              {sections[activeTab].map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-2">{index + 1}. {section.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="text-center text-sm text-base-content/60">
              <p>If you have any questions about our policies, please contact us at</p>
              <a href="mailto:privacy@ecotrack.com" className="link link-primary">privacy@ecotrack.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTermsPage;
