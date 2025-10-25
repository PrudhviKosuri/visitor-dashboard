import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResidentSidebar from '../../components/ResidentSidebar';
import { Search, CheckCircle, XCircle, Clock, User } from 'lucide-react';

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Dummy visitor requests data
  const [requests, setRequests] = useState([
    {
      id: 1,
      visitorName: 'John Doe',
      purpose: 'Business Meeting - Partnership Discussion',
      dateTime: '2025-10-25T10:00',
      status: 'Pending',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
    },
    {
      id: 2,
      visitorName: 'Sarah Smith',
      purpose: 'Product Demo',
      dateTime: '2025-10-25T14:00',
      status: 'Pending',
      email: 'sarah.smith@example.com',
      phone: '+1 (555) 234-5678',
    },
    {
      id: 3,
      visitorName: 'Mike Johnson',
      purpose: 'Delivery - Office Supplies',
      dateTime: '2025-10-24T09:00',
      status: 'Approved',
      email: 'mike.j@delivery.com',
      phone: '+1 (555) 345-6789',
    },
    {
      id: 4,
      visitorName: 'Emily Chen',
      purpose: 'Technical Support Visit',
      dateTime: '2025-10-26T11:00',
      status: 'Pending',
      email: 'emily.chen@support.com',
      phone: '+1 (555) 456-7890',
    },
    {
      id: 5,
      visitorName: 'David Wilson',
      purpose: 'Client Meeting',
      dateTime: '2025-10-23T15:00',
      status: 'Denied',
      email: 'david.w@client.com',
      phone: '+1 (555) 567-8901',
    },
  ]);

  const handleApprove = (request) => {
    setModalData({ action: 'approve', request });
    setShowModal(true);
  };

  const handleReject = (request) => {
    setModalData({ action: 'reject', request });
    setShowModal(true);
  };

  const confirmAction = () => {
    const updatedRequests = requests.map((req) =>
      req.id === modalData.request.id
        ? { ...req, status: modalData.action === 'approve' ? 'Approved' : 'Denied' }
        : req
    );
    setRequests(updatedRequests);
    setShowModal(false);
    
    // Show toast
    setToastMessage(
      `Visit request ${modalData.action === 'approve' ? 'approved' : 'rejected'} successfully!`
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-700 dark:text-orange-400',
        icon: Clock,
      },
      Approved: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        icon: CheckCircle,
      },
      Denied: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-400',
        icon: XCircle,
      },
    };

    const style = styles[status];
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
        <Icon size={14} />
        {status}
      </span>
    );
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <ResidentSidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
            >
              <CheckCircle size={24} />
              <p className="font-semibold">{toastMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Visitor Requests
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage and approve visitor access requests
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col sm:flex-row gap-4"
        >
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by visitor name or purpose..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
          </select>
        </motion.div>

        {/* Requests Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Visitor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                            <User className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {request.visitorName}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {request.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900 dark:text-slate-100 max-w-xs">
                          {request.purpose}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-700 dark:text-slate-300">
                          {formatDateTime(request.dateTime)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.status === 'Pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(request)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                              <CheckCircle size={16} />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                              <XCircle size={16} />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            No action needed
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="text-slate-400" size={48} />
                        <p className="text-slate-600 dark:text-slate-400">
                          No requests found matching your criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-md w-full border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="text-center mb-6">
                  <div
                    className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      modalData?.action === 'approve'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}
                  >
                    {modalData?.action === 'approve' ? (
                      <CheckCircle className="text-green-600" size={32} />
                    ) : (
                      <XCircle className="text-red-600" size={32} />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {modalData?.action === 'approve' ? 'Approve Request' : 'Reject Request'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Are you sure you want to {modalData?.action} the visit request from{' '}
                    <strong>{modalData?.request.visitorName}</strong>?
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                    className={`flex-1 px-4 py-3 text-white font-semibold rounded-xl transition-colors ${
                      modalData?.action === 'approve'
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Requests;
