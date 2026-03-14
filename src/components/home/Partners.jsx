// src/components/home/Partners.jsx

const partners = [
  { name: 'GreenTech Alliance', logo: '🌍', description: 'Carbon-neutral tech solutions' },
  { name: 'EcoFund Global', logo: '💚', description: 'Sustainability investments' },
  { name: 'CleanOcean Initiative', logo: '🌊', description: 'Ocean plastic cleanup' },
  { name: 'Solar Connect', logo: '☀️', description: 'Renewable energy access' },
  { name: 'UrbanForest Co.', logo: '🌳', description: 'Urban reforestation projects' },
  { name: 'ZeroWaste Labs', logo: '♻️', description: 'Circular economy research' },
];

const Partners = () => {
  return (
    <section className="py-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Our Partners</h2>
        <p className="text-base-content/60 max-w-xl mx-auto">
          We collaborate with leading organizations to amplify environmental impact worldwide.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="card bg-base-100 shadow hover:shadow-md transition-shadow border border-base-200 group"
          >
            <div className="card-body items-center text-center p-4">
              <span className="text-4xl mb-2 group-hover:scale-110 transition-transform inline-block">
                {partner.logo}
              </span>
              <p className="font-semibold text-sm leading-tight">{partner.name}</p>
              <p className="text-xs text-base-content/50 hidden sm:block">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-base-content/40 mt-6">
        Interested in partnering with us?{' '}
        <a href="/contact" className="link link-primary">Get in touch</a>
      </p>
    </section>
  );
};

export default Partners;
