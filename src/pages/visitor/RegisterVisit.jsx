import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisitorSidebar from '../../components/VisitorSidebar';
import { User, FileText, Calendar, Users, CheckCircle } from 'lucide-react';

const RegisterVisit = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    purpose: '',
    dateTime: '',
    whomToMeet: '',
  });

  const peopleToMeet = [
    'Dr. Sarah Johnson - Innovation Lead',
    'Mike Chen - Technology Head',
    'Emily Rodriguez - Business Manager',
    'Alex Kumar - Operations Director',
    'Lisa Thompson - Community Manager',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show success toast
    setShowToast(true);
    
    // Redirect to QR page after 2 seconds
    setTimeout(() => {
      navigate('/visitor/qr', { state: { visitData: formData } });
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <VisitorSidebar />
      
      <main className="flex-1 p-8">
        {/* Success Toast */}
        {showToast && (
          <div className="fixed top-4 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in z-50">
            <CheckCircle size={24} />
            <div>
              <p className="font-semibold">Visit Registered Successfully!</p>
              <p className="text-sm text-green-100">Redirecting to your QR code...</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Register New Visit
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Fill in the details to register your visit and get your QR code
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-200/50 dark:border-slate-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-slate-400" size={20} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Purpose of Visit */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Purpose of Visit
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FileText className="text-slate-400" size={20} />
                  </div>
                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe the purpose of your visit..."
                    required
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Date & Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="text-slate-400" size={20} />
                  </div>
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Whom to Meet */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Whom to Meet
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="text-slate-400" size={20} />
                  </div>
                  <select
                    name="whomToMeet"
                    value={formData.whomToMeet}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select a person</option>
                    {peopleToMeet.map((person, index) => (
                      <option key={index} value={person}>
                        {person}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    ▾
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-sky-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Submit & Generate QR Code
                </button>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> After submitting, you'll receive a QR code that you can use for check-in at the entrance.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterVisit;
