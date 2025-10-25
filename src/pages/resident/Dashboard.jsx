import React from 'react';
import { motion } from 'framer-motion';
import ResidentSidebar from '../../components/ResidentSidebar';
import { Users, Clock, CheckCircle, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const startupName = 'TechVenture Inc.'; // Dummy data

  const stats = [
    {
      icon: Users,
      title: "Today's Visitors",
      value: '8',
      change: '+12%',
      color: 'bg-gradient-to-br from-blue-600 to-sky-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Clock,
      title: 'Pending Approvals',
      value: '3',
      change: '-2 from yesterday',
      color: 'bg-gradient-to-br from-sky-500 to-sky-600',
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-600',
    },
    {
      icon: CheckCircle,
      title: 'Approved Visits',
      value: '24',
      change: '+8% this week',
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Calendar,
      title: 'Total This Month',
      value: '127',
      change: '+18%',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
  ];

  // Dummy data for daily visitors bar chart
  const dailyVisitorsData = [
    { day: 'Mon', visitors: 12 },
    { day: 'Tue', visitors: 19 },
    { day: 'Wed', visitors: 15 },
    { day: 'Thu', visitors: 22 },
    { day: 'Fri', visitors: 28 },
    { day: 'Sat', visitors: 8 },
    { day: 'Sun', visitors: 5 },
  ];

  // Dummy data for visitor categories pie chart
  const visitorCategoriesData = [
    { name: 'Clients', value: 45, color: '#3b82f6' },
    { name: 'Delivery', value: 25, color: '#10b981' },
    { name: 'Partners', value: 20, color: '#f59e0b' },
    { name: 'Others', value: 10, color: '#8b5cf6' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <ResidentSidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">{startupName}</span>! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Here's your visitor management overview for today.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
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
          ))}
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Analytics Overview
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Visitors Bar Chart */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                Daily Visitors This Week
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyVisitorsData}>
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
                  <Bar dataKey="visitors" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Visitor Categories Pie Chart */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                Visitor Categories
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={visitorCategoriesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {visitorCategoriesData.map((entry, index) => (
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
              <div className="grid grid-cols-2 gap-2 mt-4">
                {visitorCategoriesData.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {category.name}: {category.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <CheckCircle className="text-emerald-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Approved visit from John Doe
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Business meeting • 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="text-blue-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  New visitor request from Sarah Smith
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Product demo • 4 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Calendar className="text-purple-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Scheduled visit for tomorrow
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Client meeting • 6 hours ago
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
