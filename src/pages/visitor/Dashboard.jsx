import React from 'react';
import { useNavigate } from 'react-router-dom';
import VisitorSidebar from '../../components/VisitorSidebar';
import { Calendar, CheckCircle, Clock, UserPlus } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const visitorName = 'John Doe'; // Dummy data

  const stats = [
    {
      icon: CheckCircle,
      title: 'Active Status',
      value: 'Checked Out',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: Calendar,
      title: 'Upcoming Visit',
      value: 'Tomorrow, 10 AM',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Clock,
      title: 'Total Visits',
      value: '12',
      color: 'bg-gradient-to-br from-purple-500 to-pink-600',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.iconBg} p-3 rounded-xl`}>
                  <stat.icon className={stat.iconColor} size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

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

        {/* Recent Activity */}
        <div className="mt-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <CheckCircle className="text-emerald-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Visit to Tech Startup Hub
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Checked out • October 23, 2025
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Meeting with Innovation Team
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Scheduled • October 25, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
