import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ show, message, type = 'success', onClose, duration = 3000 }) => {
  const types = {
    success: {
      bg: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500 to-red-600',
      icon: XCircle,
    },
    warning: {
      bg: 'bg-gradient-to-r from-amber-500 to-amber-600',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: Info,
    },
  };

  const { bg, icon: Icon } = types[type];

  React.useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: 100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -50, x: 100 }}
          className="fixed top-6 right-6 z-50 max-w-md"
        >
          <div className={`${bg} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3`}>
            <Icon size={24} className="flex-shrink-0" />
            <p className="font-semibold flex-1">{message}</p>
            {onClose && (
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
