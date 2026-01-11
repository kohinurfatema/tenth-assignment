 import { useEffect, useState } from "react";
  import { Link } from "react-router";
  import { fetchJson } from "../../data/apiClient";
  import { FaUsers, FaClock, FaLeaf, FaFire, FaTrophy, FaArrowRight } from "react-icons/fa";

  const categoryColors = {
    Energy: { gradient: "from-amber-400 to-orange-500", bg: "bg-amber-50 dark:bg-amber-900/20", badge: "bg-gradient-to-r from-amber-400 to-orange-500" },
    Waste: { gradient: "from-emerald-400 to-green-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", badge: "bg-gradient-to-r from-emerald-400 to-green-500" },
    Water: { gradient: "from-blue-400 to-cyan-500", bg: "bg-blue-50 dark:bg-blue-900/20", badge: "bg-gradient-to-r from-blue-400 to-cyan-500" },
    Transport: { gradient: "from-purple-400 to-indigo-500", bg: "bg-purple-50 dark:bg-purple-900/20", badge: "bg-gradient-to-r from-purple-400 to-indigo-500" },
    Food: { gradient: "from-rose-400 to-pink-500", bg: "bg-rose-50 dark:bg-rose-900/20", badge: "bg-gradient-to-r from-rose-400 to-pink-500" },
  };

  const defaultColor = { gradient: "from-gray-400 to-gray-500", bg: "bg-gray-50 dark:bg-gray-900/20", badge: "bg-gradient-to-r from-gray-400 to-gray-500" };

  const ActiveChallengesGrid = () => {
    const [challenges, setChallenges] = useState([]);
    const [status, setStatus] = useState({ loading: true, error: "" });

    useEffect(() => {
      const loadChallenges = async () => {
        try {
          const data = await fetchJson("/api/challenges/active");
          setChallenges(Array.isArray(data) ? data.slice(0, 8) : []);
          setStatus({ loading: false, error: "" });
        } catch (error) {
          setStatus({ loading: false, error: "Unable to load active challenges." });
        }
      };
      loadChallenges();
    }, []);

    const renderSkeletons = () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="card bg-base-200 shadow-lg rounded-2xl overflow-hidden">
            <div className="skeleton h-48 w-full"></div>
            <div className="card-body p-5">
              <div className="skeleton h-5 w-20 mb-3 rounded-full"></div>
              <div className="skeleton h-6 w-full mb-2"></div>
              <div className="skeleton h-4 w-full mb-1"></div>
              <div className="skeleton h-4 w-3/4 mb-4"></div>
              <div className="skeleton h-2 w-full mb-4 rounded-full"></div>
              <div className="skeleton h-11 w-full rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );

    const renderContent = () => {
      if (status.loading) return renderSkeletons();

      if (status.error || !challenges.length) {
        return (
          <div className="alert alert-info shadow-lg">
            <FaLeaf className="text-xl" />
            <span>{status.error || "Challenges will be available soon."}</span>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge) => {
            const colors = categoryColors[challenge.category] || defaultColor;
            const isPopular = challenge.participants > 100;
            return (
              <div
                key={challenge.slug || challenge._id}
                className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full rounded-2xl overflow-hidden border border-base-200"
              >
                {/* Image with overlay */}
                <figure className="relative aspect-video overflow-hidden">
                  <img
                    src={challenge.imageUrl || challenge.imageURL || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"}
                    alt={challenge.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={"absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"}></div>

                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      <FaFire className="text-xs" />
                      Popular
                    </div>
                  )}

                  {/* Category badge on image */}
                  <div className={"absolute bottom-3 left-3 " + colors.badge + " text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg"}>
                    {challenge.category}
                  </div>
                </figure>

                <div className={"card-body p-5 flex flex-col " + colors.bg}>
                  {/* Title */}
                  <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-success transition-colors">
                    {challenge.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-base-content/70 line-clamp-2 mb-4">{challenge.description}</p>

                  {/* Stats row */}
                  <div className="flex items-center justify-between text-xs text-base-content/60 mb-4">
                    <div className="flex items-center gap-1.5 bg-base-200/50 px-2 py-1 rounded-full">
                      <FaClock className="text-primary" />
                      <span>{challenge.duration} days</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-base-200/50 px-2 py-1 rounded-full">
                      <FaUsers className="text-success" />
                      <span>{challenge.participants} joined</span>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-base-content/60">Progress</span>
                      <span className="font-semibold text-success">Active</span>
                    </div>
                    <div className="w-full h-2 bg-base-300 rounded-full overflow-hidden">
                      <div className={"h-full bg-gradient-to-r " + colors.gradient + " rounded-full w-3/4 animate-pulse"}></div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Link
                      to={"/challenges/" + (challenge.slug || challenge._id)}
                      className="btn w-full bg-gradient-to-r from-success to-emerald-500 hover:from-success hover:to-green-600 text-white border-none shadow-md hover:shadow-lg hover:scale-[1.0
2] transition-all duration-300 gap-2 group/btn"
                    >
                      Join Challenge
                      <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <section className="py-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-success/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full mb-4">
              <FaTrophy className="text-success" />
              <span className="text-sm font-semibold text-success">Join the Movement</span>
            </div>
            <h2 className="text-4xl font-bold text-base-content mb-3">Active Challenges</h2>
            <p className="text-base-content/60 max-w-2xl mx-auto text-lg">
              Join a challenge and start tracking your impact today!
            </p>
          </div>

          {renderContent()}

          {/* Browse all button */}
          <div className="text-center mt-10">
            <Link
              to="/challenges"
              className="btn btn-lg bg-gradient-to-r from-primary to-indigo-500 hover:from-primary hover:to-blue-600 text-white border-none shadow-lg hover:shadow-xl hover:scale-105 transition
-all duration-300 gap-2 group"
            >
              Browse All Challenges
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    );
  };

  export default ActiveChallengesGrid;