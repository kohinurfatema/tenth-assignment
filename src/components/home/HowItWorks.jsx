// src/components/home/HowItWorks.jsx
import { FaUserPlus, FaChartLine, FaShareAlt } from 'react-icons/fa'; // Requires react-icons

const steps = [
  {
    icon: FaUserPlus,
    title: "1. Join a Challenge",
    description: "Browse our diverse list of sustainable challenges (e.g., Plastic Fast, Water Saver) and join the one that fits your lifestyle. Your journey starts here!",
    color: "text-success",
  },
  {
    icon: FaChartLine,
    title: "2. Track Your Progress",
    description: "Use our dashboard to log your actions, measure your impact (CO₂ saved, water conserved), and watch your positive contribution grow.",
    color: "text-info",
  },
  {
    icon: FaShareAlt,
    title: "3. Share & Inspire",
    description: "Connect with the community! Share your achievements, post practical eco-tips, and inspire others to start or accelerate their own green journey.",
    color: "text-warning",
  },
];

const HowItWorks = () => {
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="card-title text-3xl mb-8 text-center justify-center">How EcoTrack Works</h2>
      
      {/* Grid structure for the three steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg hover:bg-base-200 transition-colors duration-200">
            
            {/* Step Icon */}
            <step.icon className={`w-10 h-10 mb-3 ${step.color}`} />
            
            {/* Step Title */}
            <h3 className="font-bold text-xl mb-2">{step.title}</h3>
            
            {/* Step Description */}
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
      
      {/* Optional CTA */}
      <div className="text-center mt-6">
        <button className="btn btn-lg btn-success">Start Your Eco Journey</button>
      </div>
    </div>
  );
};

export default HowItWorks;