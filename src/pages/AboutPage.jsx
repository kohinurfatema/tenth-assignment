import { FaLeaf, FaUsers, FaGlobeAmericas, FaHeart, FaAward, FaHandshake } from "react-icons/fa";

const AboutPage = () => {
  const teamMembers = [
    { name: "Sarah Green", role: "Founder & CEO", image: "https://i.pravatar.cc/200?img=1", bio: "Environmental scientist with 15 years of experience" },
    { name: "Michael Rivers", role: "CTO", image: "https://i.pravatar.cc/200?img=2", bio: "Tech innovator passionate about sustainability" },
    { name: "Emma Woods", role: "Head of Community", image: "https://i.pravatar.cc/200?img=3", bio: "Community builder and eco-lifestyle advocate" },
    { name: "David Chen", role: "Lead Developer", image: "https://i.pravatar.cc/200?img=4", bio: "Full-stack developer focused on green tech" },
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: FaUsers },
    { value: "1M+", label: "Challenges Completed", icon: FaAward },
    { value: "500K kg", label: "CO2 Saved", icon: FaLeaf },
    { value: "100+", label: "Partner Organizations", icon: FaHandshake },
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About EcoTrack</h1>
        <p className="text-xl text-base-content/70 leading-relaxed">
          We are on a mission to make sustainable living accessible, fun, and impactful. 
          Join thousands of eco-warriors making a real difference for our planet.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <FaGlobeAmericas className="text-5xl mb-4" />
            <h2 className="card-title text-2xl">Our Mission</h2>
            <p className="text-lg opacity-90">
              To empower individuals and communities to take meaningful action against climate change 
              through engaging challenges, trackable goals, and a supportive community.
            </p>
          </div>
        </div>
        <div className="card bg-secondary text-secondary-content">
          <div className="card-body">
            <FaHeart className="text-5xl mb-4" />
            <h2 className="card-title text-2xl">Our Vision</h2>
            <p className="text-lg opacity-90">
              A world where every person understands their environmental impact and is motivated 
              to make sustainable choices that collectively heal our planet.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-base-200 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="text-4xl text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-base-content/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="card bg-base-100 shadow-lg">
              <figure className="px-6 pt-6">
                <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 object-cover" />
              </figure>
              <div className="card-body text-center">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary text-sm">{member.role}</p>
                <p className="text-base-content/60 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-base-200 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLeaf className="text-2xl text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2">Sustainability First</h3>
            <p className="text-base-content/70">Every decision we make considers its environmental impact.</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-2xl text-secondary" />
            </div>
            <h3 className="font-bold text-xl mb-2">Community Driven</h3>
            <p className="text-base-content/70">We believe in the power of collective action and support.</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-2xl text-accent" />
            </div>
            <h3 className="font-bold text-xl mb-2">Positive Impact</h3>
            <p className="text-base-content/70">Every small action adds up to make a big difference.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
