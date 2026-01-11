import { useState } from 'react';
import { FaChevronDown, FaQuestionCircle, FaLeaf, FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  {
    id: 1,
    question: 'How do I join a challenge?',
    answer: 'Simply browse our challenges page, find one that interests you, and click the "Join Challenge" button. You will need to create an account or log in to track your progress.',
    icon: '1',
  },
  {
    id: 2,
    question: 'Are the challenges free to participate in?',
    answer: 'Yes! All challenges on EcoTrack are completely free. Our mission is to make sustainable living accessible to everyone.',
    icon: '2',
  },
  {
    id: 3,
    question: 'How is my environmental impact calculated?',
    answer: 'We use industry-standard calculations based on your logged activities. Each action you take is converted to measurable units like CO2 saved, water conserved, or waste reduced.',
    icon: '3',
  },
  {
    id: 4,
    question: 'Can I create my own challenges?',
    answer: 'Absolutely! Once you have an account, you can create custom challenges for yourself or share them with the community. Go to "Add Challenge" in your dashboard to get started.',
    icon: '4',
  },
  {
    id: 5,
    question: 'How do I track my progress?',
    answer: 'Your dashboard shows all your active challenges with progress bars and statistics. You can update your progress anytime by logging your eco-friendly activities.',
    icon: '5',
  },
  {
    id: 6,
    question: 'Is my data private?',
    answer: 'Yes, your personal data is kept private and secure. Only aggregated, anonymous statistics are shared publicly to inspire the community.',
    icon: '6',
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-success/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full mb-4">
            <FaQuestionCircle className="text-success" />
            <span className="text-sm font-semibold text-success">Got Questions?</span>
          </div>
          <h2 className="text-4xl font-bold text-base-content mb-4">Frequently Asked Questions</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
            Find answers to common questions about EcoTrack. Cannot find what you are looking for? 
            <a href="/contact" className="text-success hover:underline ml-1">Contact us</a>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={"group relative bg-gradient-to-r rounded-2xl shadow-lg transition-all duration-500 overflow-hidden " + (isOpen ? "from-success/10 to-emerald-50 dark:from-success/20 dark:to-base-300 shadow-xl" : "from-white to-gray-50 dark:from-base-200 dark:to-base-300 hover:shadow-xl")}
              >
                {/* Left accent bar */}
                <div className={"absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-success to-emerald-400 transition-all duration-300 " + (isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-50")}></div>

                {/* Question */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  {/* Number badge */}
                  <div className={"flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 " + (isOpen ? "bg-gradient-to-br from-success to-emerald-500 text-white shadow-lg" : "bg-base-content/10 text-base-content/50 group-hover:bg-success/20 group-hover:text-success")}>
                    {faq.icon}
                  </div>

                  {/* Question text */}
                  <span className={"flex-1 text-lg font-semibold transition-colors duration-300 " + (isOpen ? "text-success" : "text-base-content group-hover:text-success")}>
                    {faq.question}
                  </span>

                  {/* Toggle icon */}
                  <div className={"flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 " + (isOpen ? "bg-success text-white rotate-180" : "bg-base-content/10 text-base-content/50 group-hover:bg-success/20 group-hover:text-success")}>
                    <FaChevronDown className="text-sm" />
                  </div>
                </button>

                {/* Answer */}
                <div className={"overflow-hidden transition-all duration-500 " + (isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="px-5 pb-5 pl-19">
                    <div className="ml-14 p-4 bg-white/50 dark:bg-base-100/50 rounded-xl border-l-4 border-success/30">
                      <p className="text-base-content/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-success/10 to-emerald-50 dark:from-success/20 dark:to-base-300 rounded-2xl">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg text-base-content">Still have questions?</h3>
              <p className="text-sm text-base-content/60">We are here to help you on your eco journey</p>
            </div>
            <a href="/contact" className="btn bg-gradient-to-r from-success to-emerald-500 hover:from-success hover:to-green-600 text-white border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
