import React from 'react';
import { motion } from 'framer-motion';

// Consistent container animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Reusable Page Header Component
export const PageHeader = ({ title, subtitle, gradient = "from-blue-600 to-sky-500" }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
      {title.split(' ').map((word, i) => {
        if (i === title.split(' ').length - 1 && gradient) {
          return (
            <span key={i} className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {' '}{word}
            </span>
          );
        }
        return <span key={i}>{i > 0 ? ' ' : ''}{word}</span>;
      })}
    </h1>
    {subtitle && (
      <p className="text-slate-600 dark:text-slate-400 mt-2">
        {subtitle}
      </p>
    )}
  </motion.div>
);

// Reusable Stat Card Component
export const StatCard = ({ icon: Icon, title, value, change, iconBg, iconColor, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-200/50 dark:border-slate-700/50"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`${iconBg} p-3 rounded-xl`}>
        <Icon className={iconColor} size={24} />
      </div>
      {change && (
        <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          {change}
        </div>
      )}
    </div>
    <div>
      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
        {title}
      </p>
      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </p>
    </div>
  </motion.div>
);

// Reusable Search Bar Component
export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  </div>
);

// Reusable Empty State Component
export const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16"
  >
    {Icon && (
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
        <Icon className="text-slate-400 dark:text-slate-600" size={48} />
      </div>
    )}
    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-400 text-center max-w-md mb-6">
      {description}
    </p>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </motion.div>
);

// Reusable Badge Component
export const StatusBadge = ({ status, variant = 'default' }) => {
  const variants = {
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {status}
    </span>
  );
};

// Reusable Table Component
export const Table = ({ headers, data, onRowClick }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-200 dark:border-slate-700">
          {headers.map((header, i) => (
            <th key={i} className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, i) => (
            <motion.tr
              key={i}
              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
              onClick={() => onRowClick && onRowClick(row)}
              className="border-b border-slate-100 dark:border-slate-800 cursor-pointer transition-colors"
            >
              {row.map((cell, j) => (
                <td key={j} className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100">
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="py-8 text-center text-slate-500 dark:text-slate-400">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Reusable Button Component
export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  icon: Icon,
  loading = false
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all
        ${variants[variant]} ${sizes[size]}
        ${(disabled || loading) && 'opacity-50 cursor-not-allowed'}
      `}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {Icon && !loading && <Icon size={18} />}
      {children}
    </motion.button>
  );
};
