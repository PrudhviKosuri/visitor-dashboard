import React from 'react';
import { motion } from 'framer-motion';
import ComplianceSidebar from '../../components/ComplianceSidebar';
import { Shield, Database, Calendar, CheckCircle, FileText, TrendingUp } from 'lucide-react';
import { complianceStats, auditLogs } from '../../data/dummyComplianceData';

const Dashboard = () => {
  const stats = [
    {
      icon: Database,
      title: 'Data Retention Policy',
      value: `${complianceStats.dataRetentionDays} days`,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: FileText,
      title: 'Total Records Stored',
      value: complianceStats.totalRecordsStored,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Calendar,
      title: 'Last Audit Date',
      value: complianceStats.lastAuditDate,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Shield,
      title: 'Compliance Mode',
      value: complianceStats.complianceMode,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <ComplianceSidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Privacy & Compliance <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Monitor data protection, audit logs, and compliance status
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.iconBg} p-3 rounded-xl`}>
                  <stat.icon className={stat.iconColor} size={24} />
                </div>
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Audit Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Recent Audit Logs
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Action</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">User</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Timestamp</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Details</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-100">{log.action}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{log.user}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{log.timestamp}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{log.details}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        log.status === 'Success' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Compliance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle size={32} />
              <h3 className="text-xl font-bold">GDPR Compliant</h3>
            </div>
            <p className="text-green-100 mb-2">
              Your system is fully compliant with GDPR regulations
            </p>
            <ul className="space-y-1 text-sm text-green-100">
              <li>✓ Data encryption enabled</li>
              <li>✓ Right to access granted</li>
              <li>✓ Right to erasure supported</li>
              <li>✓ Cookie consent implemented</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-purple-600" size={32} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">System Health</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Data Integrity</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">100%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Security Score</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">95%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Compliance Status</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">98%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
