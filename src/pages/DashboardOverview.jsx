import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaLeaf, FaTasks, FaTrophy, FaChartLine, FaCalendarCheck, FaUsers, FaFire } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  // Chart data
  const activityData = [
    { name: 'Mon', tasks: 4, points: 40 },
    { name: 'Tue', tasks: 3, points: 30 },
    { name: 'Wed', tasks: 5, points: 50 },
    { name: 'Thu', tasks: 2, points: 25 },
    { name: 'Fri', tasks: 6, points: 65 },
    { name: 'Sat', tasks: 4, points: 45 },
    { name: 'Sun', tasks: 7, points: 80 },
  ];

  const impactData = [
    { name: 'CO2 Saved', value: 45, color: '#22c55e' },
    { name: 'Water Saved', value: 25, color: '#3b82f6' },
    { name: 'Waste Reduced', value: 20, color: '#f59e0b' },
    { name: 'Energy Saved', value: 10, color: '#8b5cf6' },
  ];

  const monthlyData = [
    { month: 'Jan', users: 400, challenges: 24 },
    { month: 'Feb', users: 550, challenges: 28 },
    { month: 'Mar', users: 720, challenges: 32 },
    { month: 'Apr', users: 890, challenges: 35 },
    { month: 'May', users: 1050, challenges: 38 },
    { month: 'Jun', users: 1247, challenges: 42 },
  ];
  
  const isAdmin = user?.role === 'admin' || user?.email?.includes('admin');
  const isManager = user?.role === 'manager' || user?.email?.includes('manager');

  useEffect(() => {
    // Simulate fetching stats
    const fetchStats = async () => {
      setLoading(true);
      // Mock data - in production, this would come from the API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isAdmin || isManager) {
        setStats({
          totalUsers: 1247,
          totalChallenges: 42,
          activeParticipants: 892,
          co2Saved: '15,420 kg',
          weeklyGrowth: '+12%',
          completionRate: '78%'
        });
      } else {
        setStats({
          challengesJoined: 5,
          challengesCompleted: 3,
          totalPoints: 450,
          co2Saved: '12.5 kg',
          currentStreak: 7,
          rank: '#124'
        });
      }

      setRecentActivities([
        { id: 1, action: 'Joined Zero Waste Challenge', date: '2 hours ago', type: 'join' },
        { id: 2, action: 'Completed daily task', date: '5 hours ago', type: 'complete' },
        { id: 3, action: 'Earned 50 points', date: '1 day ago', type: 'points' },
        { id: 4, action: 'Started Plant-Based Week', date: '2 days ago', type: 'join' },
        { id: 5, action: 'Reached 7-day streak\!', date: '3 days ago', type: 'achievement' },
      ]);
      
      setLoading(false);
    };

    fetchStats();
  }, [isAdmin, isManager]);

  const userStatCards = [
    { label: "Challenges Joined", value: stats?.challengesJoined || 0, icon: FaTasks, color: "bg-primary" },
    { label: "Challenges Completed", value: stats?.challengesCompleted || 0, icon: FaTrophy, color: "bg-secondary" },
    { label: "Total Points", value: stats?.totalPoints || 0, icon: FaChartLine, color: "bg-accent" },
    { label: "CO2 Saved", value: stats?.co2Saved || "0 kg", icon: FaLeaf, color: "bg-success" },
    { label: "Current Streak", value: stats?.currentStreak + " days" || "0 days", icon: FaFire, color: "bg-warning" },
    { label: "Your Rank", value: stats?.rank || "-", icon: FaTrophy, color: "bg-info" },
  ];

  const adminStatCards = [
    { label: "Total Users", value: stats?.totalUsers || 0, icon: FaUsers, color: "bg-primary" },
    { label: "Total Challenges", value: stats?.totalChallenges || 0, icon: FaTasks, color: "bg-secondary" },
    { label: "Active Participants", value: stats?.activeParticipants || 0, icon: FaCalendarCheck, color: "bg-accent" },
    { label: "Total CO2 Saved", value: stats?.co2Saved || "0 kg", icon: FaLeaf, color: "bg-success" },
    { label: "Weekly Growth", value: stats?.weeklyGrowth || "0%", icon: FaChartLine, color: "bg-warning" },
    { label: "Completion Rate", value: stats?.completionRate || "0%", icon: FaTrophy, color: "bg-info" },
  ];

  const statCards = (isAdmin || isManager) ? adminStatCards : userStatCards;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-10 w-64"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="skeleton h-8 w-24 mb-2"></div>
                <div className="skeleton h-10 w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.displayName || "User"}!</h1>
        <p className="text-base-content/60 mt-1">
          {isAdmin ? "Here is your admin dashboard overview" : isManager ? "Here is your manager dashboard" : "Track your eco-friendly progress"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/60 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={stat.color + " p-4 rounded-lg"}>
                  <stat.icon className="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Weekly Activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} name="Tasks Completed" />
                  <Line type="monotone" dataKey="points" stroke="#22c55e" strokeWidth={2} name="Points Earned" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Impact Breakdown</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={impactData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {impactData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Charts */}
      {(isAdmin || isManager) && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Platform Growth</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#22c55e" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="users" fill="#3b82f6" name="Total Users" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="challenges" fill="#22c55e" name="Challenges" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activities */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title">Recent Activities</h2>
            <Link to="/dashboard/my-activities" className="btn btn-sm btn-outline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Type</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="hover">
                    <td>{activity.action}</td>
                    <td>
                      <span className={"badge badge-sm " + 
                        (activity.type === "join" ? "badge-primary" : 
                         activity.type === "complete" ? "badge-success" : 
                         activity.type === "points" ? "badge-warning" : "badge-accent")
                      }>
                        {activity.type}
                      </span>
                    </td>
                    <td className="text-base-content/60">{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/challenges" className="btn btn-primary">Browse Challenges</Link>
            <Link to="/dashboard/profile" className="btn btn-outline">Edit Profile</Link>
            {(isAdmin || isManager) && <Link to="/dashboard/add-challenge" className="btn btn-secondary">Add New Challenge</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
