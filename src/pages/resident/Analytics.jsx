import React from 'react';
import { motion } from 'framer-motion';
import ResidentSidebar from '../../components/ResidentSidebar';
import { TrendingUp, Users, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const Analytics = () => {
  // Dummy data for weekly visits bar chart
  const weeklyVisitsData = [
    { week: 'Week 1', visits: 28, approved: 24, denied: 4 },
    { week: 'Week 2', visits: 35, approved: 32, denied: 3 },
    { week: 'Week 3', visits: 42, approved: 38, denied: 4 },
    { week: 'Week 4', visits: 38, approved: 35, denied: 3 },
  ];

  // Dummy data for monthly trend line chart
  const monthlyTrendData = [
    { month: 'Jan', visitors: 85 },
    { month: 'Feb', visitors: 95 },
    { month: 'Mar', visitors: 110 },
    { month: 'Apr', visitors: 125 },
    { month: 'May', visitors: 140 },
    { month: 'Jun', visitors: 135 },
    { month: 'Jul', visitors: 150 },
    { month: 'Aug', visitors: 165 },
    { month: 'Sep', visitors: 155 },
    { month: 'Oct', visitors: 175 },
  ];

  // Dummy data for visitor types donut chart
  const visitorTypesData = [
    { name: 'Clients', value: 120, color: '#3b82f6' },
    { name: 'Delivery', value: 80, color: '#10b981' },
    { name: 'Partners', value: 65, color: '#f59e0b' },
    { name: 'Consultants', value: 45, color: '#8b5cf6' },
    { name: 'Others', value: 35, color: '#ec4899' },
  ];

  // Dummy data for peak hours
  const peakHoursData = [
    { hour: '8 AM', visitors: 5 },
    { hour: '9 AM', visitors: 12 },
    { hour: '10 AM', visitors: 18 },
    { hour: '11 AM', visitors: 22 },
    { hour: '12 PM', visitors: 15 },
    { hour: '1 PM', visitors: 10 },
    { hour: '2 PM', visitors: 16 },
    { hour: '3 PM', visitors: 20 },
    { hour: '4 PM', visitors: 14 },
    { hour: '5 PM', visitors: 8 },
  ];

  const stats = [
    {
      title: 'Total Visitors',
      value: '1,245',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Avg. Daily Visits',
      value: '42',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Peak Hour',
      value: '11 AM',
      change: '22 visitors',
      trend: 'neutral',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Approval Rate',
      value: '94%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-xl">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <ResidentSidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Comprehensive visitor insights and trends
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  {stat.trend === 'up' && (
                    <>
                      <ArrowUp className="text-green-600" size={16} />
                      <span className="text-green-600">{stat.change}</span>
                    </>
                  )}
                  {stat.trend === 'down' && (
                    <>
                      <ArrowDown className="text-red-600" size={16} />
                      <span className="text-red-600">{stat.change}</span>
                    </>
                  )}
                  {stat.trend === 'neutral' && (
                    <span className="text-slate-600 dark:text-slate-400">{stat.change}</span>
                  )}
                </div>
              </div>
              <h3 className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Visits Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200/50 dark:border-slate-700/50"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Weekly Visits Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyVisitsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="approved" fill="#10b981" radius={[8, 8, 0, 0]} name="Approved" />
                <Bar dataKey="denied" fill="#ef4444" radius={[8, 8, 0, 0]} name="Denied" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Trend Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200/50 dark:border-slate-700/50"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Monthly Visitor Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#2563EB"
                  strokeWidth={3}
                  dot={{ fill: '#2563EB', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Visitors"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitor Types Donut Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200/50 dark:border-slate-700/50"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Visitor Distribution by Type
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={visitorTypesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {visitorTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {visitorTypesData.map((type, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: type.color }}
                  ></div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {type.name}: <strong>{type.value}</strong>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Peak Hours Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200/50 dark:border-slate-700/50"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Peak Visiting Hours
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#8b5cf6"
                  fill="url(#colorPurple)"
                  name="Visitors"
                />
                <defs>
                  <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl shadow-xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <TrendingUp size={32} className="mb-2" />
                <h4 className="font-bold text-lg mb-1">Growing Traffic</h4>
                <p className="text-sm text-blue-100">
                  Visitor numbers increased by 12.5% compared to last month
                </p>
              </div>
            </div>
            <div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <Users size={32} className="mb-2" />
                <h4 className="font-bold text-lg mb-1">Client Focus</h4>
                <p className="text-sm text-blue-100">
                  Clients make up 35% of total visits, showing strong business activity
                </p>
              </div>
            </div>
            <div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <Calendar size={32} className="mb-2" />
                <h4 className="font-bold text-lg mb-1">Peak Period</h4>
                <p className="text-sm text-blue-100">
                  Most visits occur between 10 AM - 3 PM on weekdays
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Analytics;
