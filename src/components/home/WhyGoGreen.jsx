const benefits = [
  {
    title: 'Reduce Your Footprint',
    description: 'Shrink daily carbon emissions and conserve energy at home and on the go.',
  },
  {
    title: 'Save Money',
    description: 'Lower utility bills, extend product life, and avoid single-use purchases.',
  },
  {
    title: 'Support Health',
    description: 'Cleaner air, water, and soil improve community well-being.',
  },
  {
    title: 'Amplify Impact',
    description: 'Small habits inspire neighbors and scale into global change.',
  },
];

const WhyGoGreen = () => {
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="section-title text-success mb-4">Why Go Green?</h2>
      <ul className="space-y-3">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="flex flex-col">
            <span className="font-semibold text-base">{benefit.title}</span>
            <span className="text-sm text-gray-600">{benefit.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyGoGreen;