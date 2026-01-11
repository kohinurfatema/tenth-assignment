import { FaLeaf, FaPiggyBank, FaHeartbeat, FaGlobeAmericas } from 'react-icons/fa';

const benefits = [
  {
    icon: FaLeaf,
    title: 'Reduce Your Footprint',
    description: 'Shrink daily carbon emissions and conserve energy at home and on the go.',
    color: 'from-emerald-400 to-green-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    icon: FaPiggyBank,
    title: 'Save Money',
    description: 'Lower utility bills, extend product life, and avoid single-use purchases.',
    color: 'from-amber-400 to-yellow-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: FaHeartbeat,
    title: 'Support Health',
    description: 'Cleaner air, water, and soil improve community well-being.',
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
  },
  {
    icon: FaGlobeAmericas,
    title: 'Amplify Impact',
    description: 'Small habits inspire neighbors and scale into global change.',
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
];

const WhyGoGreen = () => {
  return (
    <div className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-base-200 dark:via-base-300 dark:to-base-200 rounded-2xl shadow-xl p-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-success/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="relative mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl shadow-lg">
            <FaLeaf className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-base-content">Why Go Green?</h2>
            <p className="text-sm text-base-content/60">Benefits of sustainable living</p>
          </div>
        </div>
      </div>

      {/* Benefits list */}
      <ul className="relative space-y-4">
        {benefits.map((benefit, index) => (
          <li
            key={benefit.title}
            className={"group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-x-1 " + benefit.bgColor}
          >
            {/* Icon */}
            <div className={"flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br " + benefit.color + " flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"}>
              <benefit.icon className="text-white text-xl" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-bold text-base-content group-hover:text-success transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-base-content/70 mt-1 leading-relaxed">
                {benefit.description}
              </p>
            </div>

            {/* Number indicator */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-base-content/5 flex items-center justify-center">
              <span className="text-sm font-bold text-base-content/40">{index + 1}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Decorative element */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-success/20 rounded-full"></div>
    </div>
  );
};

export default WhyGoGreen;
