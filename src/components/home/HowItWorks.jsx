
  import { FaUserPlus, FaChartLine, FaShareAlt, FaArrowRight, FaRocket } from 'react-icons/fa';

  const steps = [
    {
      icon: FaUserPlus,
      title: "Join a Challenge",
      description: "Pick a goal that fits your lifestyle - plastic-free weeks, water savings, transit swaps - and get started in one tap.",
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-base-200",
      number: "01",
    },
    {
      icon: FaChartLine,
      title: "Track Progress",
      description: "Log actions from the dashboard, visualize CO2, water, or waste reductions, and stay motivated with weekly milestones.",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50 dark:bg-base-200",
      number: "02",
    },
    {
      icon: FaShareAlt,
      title: "Share Tips",
      description: "Celebrate wins, post practical advice, and help neighbors follow your lead in the EcoTrack community feed.",
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-base-200",
      number: "03",
    },
  ];

  const HowItWorks = () => {
    const containerClass = "relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-base-200 dark:via-base-300 dark:to-base-200 rounded-2xl shadow-xl p-8 overflow-hidden";

    const getCardClass = (bgColor) => {
      const base = "relative flex flex-col items-center text-center p-6 rounded-2xl";
      const border = "border-2 border-transparent hover:border-primary/20";
      const animation = "transition-all duration-500 hover:shadow-xl hover:-translate-y-2";
      return base + " " + border + " " + animation + " " + bgColor;
    };


    const getIconClass = (color) => {
      return "w-16 h-16 rounded-2xl bg-gradient-to-br " + color + " flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300";
    };

    return (
      <div className={containerClass}>
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-info/10 to-transparent rounded-full blur-2xl"></div>

        <div className="relative text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-3">
            <FaRocket className="text-primary" />
            <span className="text-sm font-semibold text-primary">Get Started</span>
          </div>
          <h2 className="text-2xl font-bold text-base-content">How EcoTrack Works</h2>
          <p className="text-sm text-base-content/60 mt-1">Three simple steps to make a difference</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-base-content/20 to-transparent z-0 -translate-x-1/2"></div>
              )}

              <div className={getCardClass(step.bgColor)}>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-base-content to-base-content/80 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-base-100">{step.number}</span>
                </div>

                <div className={getIconClass(step.color)}>
                  <step.icon className="text-white text-2xl" />
                </div>

                <h3 className="font-bold text-lg text-base-content mb-2">{step.title}</h3>
                <p className="text-sm text-base-content/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative text-center mt-8">
          <button className="btn btn-lg bg-gradient-to-r from-success to-emerald-500 hover:from-success hover:to-green-600 text-white border-none shadow-lg hover:shadow-xl hover:scale-105 tran
sition-all duration-300 gap-2 group">
            Start Your Eco Journey
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute -bottom-4 -left-4 w-24 h-24 border-4 border-primary/20 rounded-full"></div>
      </div>
    );
  };

  export default HowItWorks;
