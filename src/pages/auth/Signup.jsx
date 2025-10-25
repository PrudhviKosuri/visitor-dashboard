import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserCircle } from 'lucide-react';
import '../../auth.css';
import AuthNavbar from '../../components/auth/AuthNavbar';

const roleLabels = {
  visitor: 'Visitor',
  resident: 'Resident (Startup Member)',
  admin: 'Admin (Incubator Manager)',
};

const Input = ({ icon: Icon, type = 'text', placeholder, value, onChange }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
      <Icon size={18} />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/60 shadow-sm"
    />
  </div>
);

const Signup = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const role = useMemo(() => new URLSearchParams(search).get('role') || 'visitor', [search]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // Dummy signup → redirect to role dashboard
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <AuthNavbar />
      <main className="max-w-md mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl p-6">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Create your account</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Sign up for the {roleLabels[role]} portal</p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800">
              <UserCircle size={18} className="text-brand-600 dark:text-brand-400" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Signing up as {roleLabels[role]}</span>
            </div>
            <Input icon={User} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input icon={Mail} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 shadow-sm transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-xs text-slate-500 dark:text-slate-500 mt-6 text-center">
            Already have an account? <Link to={`/auth/login?role=${role}`} className="text-brand-600 dark:text-brand-400 hover:underline">Log in</Link> · <Link to="/auth/landing" className="text-brand-600 dark:text-brand-400 hover:underline">Change role</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
