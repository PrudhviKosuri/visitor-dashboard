import React, { useState } from 'react';
import VisitorSidebar from '../../components/VisitorSidebar';
import { CheckCircle, XCircle, Clock, Search, Calendar } from 'lucide-react';

const VisitHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy visit history data
  const visitHistory = [
    {
      id: 1,
      date: '2025-10-23',
      time: '10:00 AM',
      purpose: 'Business Meeting with Innovation Team',
      host: 'Dr. Sarah Johnson',
      status: 'Checked Out',
      checkIn: '10:05 AM',
      checkOut: '11:30 AM',
    },
    {
      id: 2,
      date: '2025-10-20',
      time: '02:00 PM',
      purpose: 'Product Demo and Consultation',
      host: 'Mike Chen',
      status: 'Checked Out',
      checkIn: '02:10 PM',
      checkOut: '03:45 PM',
    },
    {
      id: 3,
      date: '2025-10-18',
      time: '09:00 AM',
      purpose: 'Partnership Discussion',
      host: 'Emily Rodriguez',
      status: 'Checked Out',
      checkIn: '09:05 AM',
      checkOut: '10:20 AM',
    },
    {
      id: 4,
      date: '2025-10-15',
      time: '03:00 PM',
      purpose: 'Workshop Attendance',
      host: 'Alex Kumar',
      status: 'Checked Out',
      checkIn: '03:00 PM',
      checkOut: '05:00 PM',
    },
    {
      id: 5,
      date: '2025-10-12',
      time: '11:00 AM',
      purpose: 'Facility Tour',
      host: 'Lisa Thompson',
      status: 'Checked Out',
      checkIn: '11:10 AM',
      checkOut: '12:00 PM',
    },
    {
      id: 6,
      date: '2025-10-10',
      time: '01:00 PM',
      purpose: 'Investment Meeting',
      host: 'Dr. Sarah Johnson',
      status: 'Cancelled',
      checkIn: '-',
      checkOut: '-',
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      'Checked Out': {
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        text: 'text-emerald-700 dark:text-emerald-400',
        icon: CheckCircle,
      },
      'Checked In': {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-400',
        icon: Clock,
      },
      'Cancelled': {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-400',
        icon: XCircle,
      },
    };

    const style = styles[status] || styles['Checked Out'];
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
        <Icon size={14} />
        {status}
      </span>
    );
  };

  const filteredHistory = visitHistory.filter(visit =>
    visit.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.date.includes(searchTerm)
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <VisitorSidebar />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Visit History
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            View all your past and scheduled visits
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total Visits</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {visitHistory.length}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <Calendar className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {visitHistory.filter(v => v.status === 'Checked Out').length}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">This Month</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  {visitHistory.filter(v => v.date.startsWith('2025-10')).length}
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <Clock className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by purpose, host, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Host
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((visit) => (
                    <tr
                      key={visit.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {new Date(visit.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {visit.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900 dark:text-slate-100 max-w-xs">
                          {visit.purpose}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900 dark:text-slate-100">
                          {visit.host}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-700 dark:text-slate-300">
                          {visit.checkIn}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-700 dark:text-slate-300">
                          {visit.checkOut}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(visit.status)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="text-slate-400" size={48} />
                        <p className="text-slate-600 dark:text-slate-400">
                          No visits found matching your search
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredHistory.length} of {visitHistory.length} visits
          </p>
        </div>
      </main>
    </div>
  );
};

export default VisitHistory;
