import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Shield, Lock } from 'lucide-react';
import '../../auth.css';
import AuthNavbar from '../../components/auth/AuthNavbar';
import { visitorStats } from '../../data/dummyVisitorData';

const Card = ({ icon: Icon, title, desc, to, direct }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(direct ? to : `/auth/login?role=${to}`)}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-left w-full"
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow">
          <Icon size={26} />
        </div>
        <div>
          <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-lg">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{desc}</p>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-brand-500/0 to-brand-500/0 group-hover:to-brand-500/5 transition" />
    </button>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <AuthNavbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          {/* Welcome Message with Visitor Count */}
          <div className="mb-4 bg-gradient-to-r from-blue-500/10 to-sky-500/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
              🎉 Welcome! <span className="text-blue-900 dark:text-blue-300">{visitorStats.todaysVisitors} visitors</span> registered today
            </p>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Intelligent Visitor Management Ecosystem
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose your portal to continue. Streamlined access for Visitors, Residents, and Admins.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            icon={User}
            title="Visitor Portal"
            desc="Check-in, view passes, and manage your visits."
            to="visitor"
          />
          <Card
            icon={Building2}
            title="Resident Portal"
            desc="Manage invites, approvals, and your profile."
            to="resident"
          />
          <Card
            icon={Shield}
            title="Admin Portal"
            desc="Oversee operations, analytics, and devices."
            to="admin"
          />
          <Card
            icon={Lock}
            title="Privacy & Compliance"
            desc="Data protection, audit logs, and GDPR compliance."
            to="/compliance/dashboard"
            direct={true}
          />
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-12">
          Need an account? <a href="/auth/signup" className="text-brand-600 dark:text-brand-400 hover:underline">Sign up</a>
        </p>
      </main>
    </div>
  );
};

export default LandingPage;
