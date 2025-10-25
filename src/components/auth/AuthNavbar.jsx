import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../auth.css';

const AuthNavbar = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <header className="w-full border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-900/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-14 flex items-center justify-between">
          <Link to="/auth/landing" className="flex items-center gap-2 select-none">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm" />
            <span className="text-slate-900 dark:text-slate-100 font-semibold tracking-tight">Visitor Management</span>
          </Link>
          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick={() => setDark((v) => !v)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;
