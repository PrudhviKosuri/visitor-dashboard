import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UserPlus, QrCode, History, User, LogOut } from 'lucide-react';

const VisitorSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dummy logout - redirect to auth landing
    navigate('/auth/landing');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/visitor/dashboard' },
    { icon: UserPlus, label: 'Register Visit', path: '/visitor/register' },
    { icon: QrCode, label: 'My QR Code', path: '/visitor/qr' },
    { icon: History, label: 'Visit History', path: '/visitor/history' },
    { icon: User, label: 'Profile', path: '/visitor/profile' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
      {/* Logo/Header */}
      <div className="p-6 border-b border-slate-700/50">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          Visitor Portal
        </h2>
        <p className="text-xs text-slate-400 mt-1">Intelligent Management</p>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default VisitorSidebar;
