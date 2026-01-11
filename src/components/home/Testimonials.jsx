import { FaStar, FaQuoteLeft, FaLeaf } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Environmental Advocate',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'EcoTrack has completely transformed how I approach sustainability. The challenges keep me motivated and the community support is incredible!',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'from-emerald-50 to-teal-50',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Developer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    text: 'I never thought tracking my eco habits could be so engaging. The statistics feature really opened my eyes to my environmental impact.',
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'from-blue-50 to-indigo-50',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Teacher',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'My students love participating in the challenges. EcoTrack makes environmental education fun and measurable.',
    color: 'from-purple-400 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Business Owner',
    avatar: 'https://i.pravatar.cc/150?img=8',
    rating: 4,
    text: 'We implemented EcoTrack at our company and saw a 30% reduction in waste within the first month. Highly recommend!',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'from-amber-50 to-orange-50',
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-success/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full mb-4">
            <FaLeaf className="text-success" />
            <span className="text-sm font-semibold text-success">Community Voices</span>
          </div>
          <h2 className="text-4xl font-bold text-base-content mb-4">What Our Community Says</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
            Join thousands of eco-conscious individuals making a real difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative"
              style={{ animationDelay: index * 100 + 'ms' }}
            >
              {/* Card */}
              <div className={"relative bg-gradient-to-br " + testimonial.bgColor + " dark:from-base-200 dark:to-base-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 dark:border-base-content/10 h-full flex flex-col"}>
                {/* Quote icon with gradient background */}
                <div className={"absolute -top-4 left-6 w-10 h-10 bg-gradient-to-br " + testimonial.color + " rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"}>
                  <FaQuoteLeft className="text-white text-sm" />
                </div>

                {/* Content */}
                <div className="mt-4 flex-1">
                  <p className="text-base-content/80 text-sm leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 my-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={"w-4 h-4 transition-transform duration-300 group-hover:scale-110 " + (i < testimonial.rating ? "text-warning drop-shadow-sm" : "text-base-300 dark:text-base-content/20")}
                      style={{ transitionDelay: i * 50 + 'ms' }}
                    />
                  ))}
                </div>

                {/* Divider */}
                <div className={"h-0.5 w-full bg-gradient-to-r " + testimonial.color + " rounded-full opacity-30 mb-4"}></div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={"absolute inset-0 bg-gradient-to-br " + testimonial.color + " rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity"}></div>
                    <div className="avatar relative">
                      <div className="w-12 rounded-full ring-2 ring-white dark:ring-base-300 shadow-md">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base-content">{testimonial.name}</h4>
                    <p className={"text-xs bg-gradient-to-r " + testimonial.color + " bg-clip-text text-transparent font-medium"}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className={"absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br " + testimonial.color + " opacity-10 rounded-tl-full"}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex items-center gap-2 bg-base-100 dark:bg-base-200 px-4 py-2 rounded-full shadow-md">
            <span className="text-2xl font-bold text-success">10K+</span>
            <span className="text-sm text-base-content/70">Active Users</span>
          </div>
          <div className="flex items-center gap-2 bg-base-100 dark:bg-base-200 px-4 py-2 rounded-full shadow-md">
            <span className="text-2xl font-bold text-primary">4.9</span>
            <div className="flex items-center gap-1">
              <FaStar className="text-warning text-sm" />
              <span className="text-sm text-base-content/70">Rating</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-base-100 dark:bg-base-200 px-4 py-2 rounded-full shadow-md">
            <span className="text-2xl font-bold text-secondary">50K+</span>
            <span className="text-sm text-base-content/70">Challenges Completed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
