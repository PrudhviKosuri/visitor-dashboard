import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisitorSidebar from '../../components/VisitorSidebar';
import { User, Mail, Phone, MapPin, Building, Calendar, Edit2, Save, X, LogOut } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Innovations Inc.',
    address: '123 Business Street, San Francisco, CA 94102',
    memberSince: '2024-01-15',
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({ ...profileData });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    // Show success message (you could add a toast here)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    navigate('/auth/landing');
  };

  const InfoField = ({ icon: Icon, label, value, name, editable = true }) => (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
          <Icon className="text-blue-600" size={20} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">{label}</p>
          {isEditing && editable ? (
            <input
              type="text"
              name={name}
              value={editData[name]}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="text-slate-900 dark:text-slate-100 font-medium">{value}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <VisitorSidebar />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              My Profile
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Manage your personal information and preferences
            </p>
          </div>
          <button
            onClick={handleEditToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
              isEditing
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isEditing ? (
              <>
                <X size={20} />
                Cancel
              </>
            ) : (
              <>
                <Edit2 size={20} />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="max-w-4xl">
          {/* Profile Card */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-emerald-500 to-sky-500"></div>
            
            {/* Avatar and Basic Info */}
            <div className="px-8 pb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white dark:border-slate-800">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-lg">
                      <Edit2 size={16} />
                    </button>
                  )}
                </div>
                <div className="text-center sm:text-left mb-4">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {profileData.fullName}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">{profileData.company}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar size={16} />
                    <span>Member since {new Date(profileData.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Profile Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <InfoField
                  icon={User}
                  label="Full Name"
                  value={profileData.fullName}
                  name="fullName"
                />
                <InfoField
                  icon={Mail}
                  label="Email Address"
                  value={profileData.email}
                  name="email"
                />
                <InfoField
                  icon={Phone}
                  label="Phone Number"
                  value={profileData.phone}
                  name="phone"
                />
                <InfoField
                  icon={Building}
                  label="Company"
                  value={profileData.company}
                  name="company"
                />
                <InfoField
                  icon={MapPin}
                  label="Address"
                  value={profileData.address}
                  name="address"
                />
                <InfoField
                  icon={Calendar}
                  label="Member Since"
                  value={new Date(profileData.memberSince).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  name="memberSince"
                  editable={false}
                />
              </div>

              {/* Save Button (shown when editing) */}
              {isEditing && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleSave}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-sky-600 transition-all duration-200 shadow-lg"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 px-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
            >
              <Edit2 size={20} />
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-red-700 transition-all duration-200"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          {/* Stats Card */}
          <div className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Your Activity Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm text-blue-100 mt-1">Total Visits</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">5</p>
                <p className="text-sm text-blue-100 mt-1">This Month</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">3</p>
                <p className="text-sm text-blue-100 mt-1">Upcoming</p>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Change Password
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  <X size={24} />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(false);
                  }}
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
