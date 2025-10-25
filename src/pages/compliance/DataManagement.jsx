import React from 'react';
import { motion } from 'framer-motion';
import ComplianceSidebar from '../../components/ComplianceSidebar';
import { FileText, Trash2, Download, AlertCircle } from 'lucide-react';
import { accessRequests, dataRetentionPolicy } from '../../data/dummyComplianceData';

const DataManagement = () => {
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
            Data <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Management</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage data retention policies and access requests
          </p>
        </motion.div>

        {/* Data Retention Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50 mb-6"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Data Retention Policy
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Retention Period</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">{dataRetentionPolicy.retentionPeriod} days</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Auto Delete</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={dataRetentionPolicy.autoDelete} readOnly className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Backup Enabled</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={dataRetentionPolicy.backupEnabled} readOnly className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Encryption</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={dataRetentionPolicy.encryptionEnabled} readOnly className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-blue-600 dark:text-blue-400 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Policy Active</p>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                      Data older than {dataRetentionPolicy.retentionPeriod} days will be automatically archived
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Access Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Data Access Requests
          </h3>
          
          <div className="space-y-4">
            {accessRequests.map((request) => (
              <motion.div
                key={request.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {request.requester}
                      </h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {request.email}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <span className="font-medium">Type:</span> {request.requestType}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {request.description}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      Requested on: {request.date}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    {request.status === 'Pending' && (
                      <>
                        <button className="p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 rounded-lg transition-colors">
                          <Download size={18} />
                        </button>
                        <button className="p-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                    {request.status === 'Completed' && (
                      <button className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg transition-colors">
                        <FileText size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DataManagement;
