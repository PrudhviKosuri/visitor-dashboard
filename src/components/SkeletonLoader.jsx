import React from 'react';
import { motion } from 'framer-motion';

export const CardSkeleton = () => (
  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50">
    <div className="animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-slate-200 dark:bg-slate-700 h-12 w-12 rounded-xl"></div>
        <div className="bg-slate-200 dark:bg-slate-700 h-6 w-16 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="bg-slate-200 dark:bg-slate-700 h-4 w-24 rounded"></div>
        <div className="bg-slate-200 dark:bg-slate-700 h-8 w-16 rounded"></div>
      </div>
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-200 dark:border-slate-700">
          {Array.from({ length: columns }).map((_, i) => (
            <th key={i} className="text-left py-3 px-4">
              <div className="animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-20 rounded"></div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex} className="border-b border-slate-100 dark:border-slate-800">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex} className="py-3 px-4">
                <div className="animate-pulse">
                  <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded"></div>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const ChartSkeleton = () => (
  <div className="w-full h-64 flex items-end justify-around gap-2 p-4">
    <div className="animate-pulse flex items-end justify-around gap-2 w-full h-full">
      {[60, 80, 40, 90, 70, 50, 85].map((height, i) => (
        <div
          key={i}
          className="bg-slate-200 dark:bg-slate-700 rounded-t w-full"
          style={{ height: `${height}%` }}
        ></div>
      ))}
    </div>
  </div>
);

export const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 rounded-full ${sizeClasses[size]}`}
      ></motion.div>
      {text && <p className="text-sm text-slate-600 dark:text-slate-400">{text}</p>}
    </div>
  );
};

export const FullPageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
    <LoadingSpinner size="lg" text="Loading..." />
  </div>
);
