import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaLeaf, FaTasks, FaTrophy, FaChartLine, FaCalendarCheck, FaUsers, FaFire } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_BASE_URL } from '../data/apiClient';

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [impactData, setImpactData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [chartsLoading, setChartsLoading] = useState(true);

  const isAdmin = user?.role === 'admin' || user?.email?.includes('admin');
  const isManager = user?.role === 'manager' || user?.email?.includes('manager');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        if (isAdmin || isManager) {
          const roleHeaders = {
            'x-user-role': user?.role || (user?.email?.includes('admin') ? 'admin' : 'manager'),
            'x-user-email': user?.email || '',
          };
          const statsRes = await fetch(API_BASE_URL + '/api/stats', { headers: roleHeaders });
          if (statsRes.ok) {
            const data = await statsRes.json();
            setStats({
              totalUsers: data.totalUsers,
              totalChallenges: data.totalChallenges,
              activeParticipants: data.activeParticipants,
              co2Saved: data.co2Saved,
              weeklyGrowth: data.weeklyGrowth,
              completionRate: data.completionRate,
            });
          } else {
            throw new Error('Stats fetch failed');
          }
        } else {
          // Fetch user-specific joined challenges
          const activitiesRes = await fetch(
            API_BASE_URL + '/api/activities?user=' + encodeURIComponent(user?.email || '')
          );
          const activities = activitiesRes.ok ? await activitiesRes.json() : [];

          const completed = activities.filter(a => a.status === 'completed').length;
          const totalPoints = activities.reduce((sum, a) => sum + (a.points || 0), 0);
          const co2 = activities.reduce((sum, a) => sum + (a.co2Saved || 0), 0);

          setStats({
            challengesJoined: activities.length,
            challengesCompleted: completed,
            totalPoints,
            co2Saved: co2.toFixed(1) + ' kg',
            currentStreak: 0,
            rank: '#--',
          });

          setRecentActivities(
            activities.slice(0, 5).map((a, i) => ({
              id: a._id || i,
              action: 'Joined ' + (a.challengeTitle || a.title || 'a challenge'),
              date: a.joinedAt ? new Date(a.joinedAt).toLocaleDateString() : 'Recently',
              type: a.status === 'completed' ? 'complete' : 'join',
            }))
          );
          return;
        }
      } catch {
        // Show zeroed stats on failure instead of fake numbers
        setStats(
          isAdmin || isManager
            ? { totalUsers: 0, totalChallenges: 0, activeParticipants: 0, co2Saved: '0 kg', weeklyGrowth: '0 active', completionRate: '0%' }
            : { challengesJoined: 0, challengesCompleted: 0, totalPoints: 0, co2Saved: '0 kg', currentStreak: 0, rank: '#--' }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin, isManager, user?.email]);

  // Fetch chart data separately
  useEffect(() => {
    const fetchCharts = async () => {
      setChartsLoading(true);
      const userParam = user?.email ? '?user=' + encodeURIComponent(user.email) : '';

      const roleHeaders = {
        'x-user-role': user?.role || (user?.email?.includes('admin') ? 'admin' : user?.email?.includes('manager') ? 'manager' : 'user'),
        'x-user-email': user?.email || '',
      };

      try {
        const [weeklyRes, impactRes] = await Promise.all([
          fetch(API_BASE_URL + '/api/stats/weekly' + userParam, { headers: roleHeaders }),
          fetch(API_BASE_URL + '/api/stats/impact' + userParam, { headers: roleHeaders }),
        ]);
        if (weeklyRes.ok) setActivityData(await weeklyRes.json());
        if (impactRes.ok) setImpactData(await impactRes.json());

        if (isAdmin || isManager) {
          const growthRes = await fetch(API_BASE_URL + '/api/stats/growth', { headers: roleHeaders });
          if (growthRes.ok) setMonthlyData(await growthRes.json());
        }
      } catch {
        // Charts stay empty — no fake fallback
      } finally {
        setChartsLoading(false);
      }
    };

    if (user?.email) fetchCharts();
  }, [isAdmin, isManager, user?.email]);

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
            {chartsLoading ? (
              <div className="skeleton h-64 w-full rounded-lg" />
            ) : activityData.length === 0 || activityData.every(d => d.tasks === 0) ? (
              <div className="h-64 flex items-center justify-center text-base-content/40 text-sm">No activity data yet</div>
            ) : (
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
            )}
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Impact Breakdown</h2>
            {chartsLoading ? (
              <div className="skeleton h-64 w-full rounded-lg" />
            ) : impactData.length === 0 || impactData.every(d => d.value === 0) ? (
              <div className="h-64 flex items-center justify-center text-base-content/40 text-sm">No impact data yet</div>
            ) : (
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
            )}
          </div>
        </div>
      </div>

      {/* Admin Charts */}
      {(isAdmin || isManager) && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Platform Growth</h2>
            {chartsLoading ? (
              <div className="skeleton h-72 w-full rounded-lg" />
            ) : monthlyData.length === 0 || monthlyData.every(d => d.users === 0 && d.challenges === 0) ? (
              <div className="h-72 flex items-center justify-center text-base-content/40 text-sm">No growth data yet</div>
            ) : (
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
            )}
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
