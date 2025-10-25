import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VisitorSidebar from '../../components/VisitorSidebar';
import { Calendar, CheckCircle, Clock, UserPlus, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { visitorService } from '../../services/visitorService';
import { useApi } from '../../hooks/useApi';
import { CardSkeleton, TableSkeleton, ChartSkeleton } from '../../components/SkeletonLoader';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Fetch data from APIs
  const { data: visitorStats, loading: loadingStats } = useApi(visitorService.getSummary, [], true);
  const { data: visitorCheckIns, loading: loadingCheckIns } = useApi(visitorService.getCheckIns, [], true);
  const { data: chartsData, loading: loadingCharts } = useApi(visitorService.getCharts, [], true);
  
  const visitorName = localStorage.getItem('userName') || 'Guest';
  
  // Extract chart data from API response
  const dailyVisitorData = chartsData?.dailyVisitors || [];
  const visitorTypeData = chartsData?.visitorTypes || [];

  const stats = [
    {
      icon: Users,
      title: "Today's Visitors",
      value: visitorStats?.todaysVisitors || 0,
      change: '+12%',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Clock,
      title: 'Pending Approvals',
      value: visitorStats?.pendingApprovals || 0,
      change: '-2 from yesterday',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      icon: CheckCircle,
      title: 'Approved Visits',
      value: visitorStats?.approvedVisits || 0,
      change: '+8% this week',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Calendar,
      title: 'Total This Month',
      value: visitorStats?.totalThisMonth || 0,
      change: '+18%',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <VisitorSidebar />
      
      <main className="flex-1 p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">{visitorName}</span>! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Here's what's happening with your visits today.
          </p>
        </div>

        {/* Quick Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {loadingStats ? (
            // Show skeleton loaders while loading
            Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          ) : (
            stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.iconBg} p-3 rounded-xl`}>
                  <stat.icon className={stat.iconColor} size={24} />
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                  <TrendingUp size={16} />
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))
          )}
        </motion.div>

        {/* Register New Visit Card */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready for a new visit?</h2>
              <p className="text-blue-100 mb-4">
                Register your visit now and get instant QR code for check-in
              </p>
              <button
                onClick={() => navigate('/visitor/register')}
                className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg"
              >
                <UserPlus size={20} />
                Register New Visit
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <Calendar size={80} className="text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Visitor Check-Ins Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Recent Check-Ins
          </h3>
          {loadingCheckIns ? (
            <TableSkeleton rows={5} columns={4} />
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Purpose</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {visitorCheckIns?.map((visitor) => (
                  <tr key={visitor.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-100">{visitor.name}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{visitor.purpose}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{visitor.date}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        visitor.status === 'Approved' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                      }`}>
                        {visitor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </motion.div>

        {/* Analytics Charts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Visitors Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Daily Visitors
            </h3>
            {loadingCharts ? (
              <ChartSkeleton />
            ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyVisitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="visitors" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            )}
          </motion.div>

          {/* Visitor Types Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Visitor Types
            </h3>
            {loadingCharts ? (
              <ChartSkeleton />
            ) : (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={visitorTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {visitorTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {visitorTypeData?.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
