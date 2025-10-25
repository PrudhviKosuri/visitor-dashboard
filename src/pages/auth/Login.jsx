import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../auth.css';
import AuthNavbar from '../../components/auth/AuthNavbar';
import { authService } from '../../services/authService';
import { visitorService } from '../../services/visitorService';
import { useApi } from '../../hooks/useApi';

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

const Login = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const role = useMemo(() => new URLSearchParams(search).get('role') || 'visitor', [search]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [apiError, setApiError] = useState('');

  // Fetch visitor stats for display
  const { data: visitorStats } = useApi(
    () => visitorService.getSummary(),
    [],
    true
  );

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ email: '', password: '' });
    
    // Validation
    let hasError = false;
    const newErrors = { email: '', password: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      hasError = true;
    }
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    
    // Call real authentication API
    setIsLoading(true);
    setApiError('');
    
    try {
      const response = await authService.login({
        email,
        password,
        role, // Send role to backend for validation
      });
      
      setIsLoading(false);
      setToastMessage('Login successful! Redirecting...');
      setToastType('success');
      setShowToast(true);
      
      // Redirect based on role from API response
      setTimeout(() => {
        const userRole = response.role || role;
        navigate(`/${userRole}/dashboard`);
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setApiError(errorMessage);
      setToastMessage(errorMessage);
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <AuthNavbar />
      <main className="max-w-md mx-auto px-4 sm:px-6 py-10">
        {/* Welcome Message with Visitor Count */}
        <div className="mb-6 bg-gradient-to-r from-blue-500/10 to-sky-500/10 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-center">
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
            🎉 Welcome! <span className="text-blue-900 dark:text-blue-300">{visitorStats?.todaysVisitors || '--'} visitors</span> registered today
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl p-6">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Welcome back</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Log in to your {roleLabels[role]} portal</p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800">
              <UserCircle size={18} className="text-brand-600 dark:text-brand-400" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Logging in as {roleLabels[role]}</span>
            </div>
            <div>
              <Input icon={Mail} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {errors.email}
                </motion.p>
              )}
            </div>
            <div>
              <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {errors.password}
                </motion.p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <p className="text-xs text-slate-500 dark:text-slate-500 mt-6 text-center">
            No account? <Link to={`/auth/signup?role=${role}`} className="text-brand-600 dark:text-brand-400 hover:underline">Sign up</Link> · <Link to="/auth/landing" className="text-brand-600 dark:text-brand-400 hover:underline">Change role</Link>
          </p>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <div className={`flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg ${
                toastType === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {toastType === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <span className="font-medium">{toastMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Login;
