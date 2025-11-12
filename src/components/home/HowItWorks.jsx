// src/components/home/HowItWorks.jsx
import { FaUserPlus, FaChartLine, FaShareAlt } from 'react-icons/fa'; // Requires react-icons

const steps = [
  {
    icon: FaUserPlus,
    title: "Join a Challenge",
    description: "Pick a goal that fits your lifestyle — plastic-free weeks, water savings, transit swaps — and get started in one tap.",
    color: "text-success",
  },
  {
    icon: FaChartLine,
    title: "Track Progress",
    description: "Log actions from the dashboard, visualize CO₂, water, or waste reductions, and stay motivated with weekly milestones.",
    color: "text-info",
  },
  {
    icon: FaShareAlt,
    title: "Share Tips",
    description: "Celebrate wins, post practical advice, and help neighbors follow your lead in the EcoTrack community feed.",
    color: "text-warning",
  },
];

const HowItWorks = () => {
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="section-title text-center justify-center">How EcoTrack Works</h2>
      
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