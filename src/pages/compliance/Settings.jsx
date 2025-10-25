import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ComplianceSidebar from '../../components/ComplianceSidebar';
import { Shield, Lock, Bell, Save } from 'lucide-react';
import { privacySettings } from '../../data/dummyComplianceData';

const Settings = () => {
  const [settings, setSettings] = useState(privacySettings);
  const [showToast, setShowToast] = useState(false);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const settingsList = [
    { key: 'gdprCompliant', label: 'GDPR Compliance', description: 'Enable GDPR compliance mode', icon: Shield },
    { key: 'cookieConsent', label: 'Cookie Consent', description: 'Require cookie consent from users', icon: Bell },
    { key: 'dataMinimization', label: 'Data Minimization', description: 'Collect only essential data', icon: Lock },
    { key: 'rightToAccess', label: 'Right to Access', description: 'Allow users to access their data', icon: Shield },
    { key: 'rightToErasure', label: 'Right to Erasure', description: 'Allow users to delete their data', icon: Lock },
    { key: 'dataPortability', label: 'Data Portability', description: 'Allow users to export their data', icon: Shield },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <ComplianceSidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Privacy <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Settings</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Configure privacy and compliance settings
          </p>
        </motion.div>

        {/* Settings Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200/50 dark:border-slate-700/50 mb-6"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Privacy & Compliance Controls
          </h3>
          
          <div className="space-y-4">
            {settingsList.map((setting, index) => (
              <motion.div
                key={setting.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                    <setting.icon className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {setting.label}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {setting.description}
                    </p>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[setting.key]}
                    onChange={() => handleToggle(setting.key)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-purple-600"></div>
                </label>
              </motion.div>
            ))}
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors shadow-lg"
            >
              <Save size={20} />
              Save Settings
            </button>
          </div>
        </motion.div>

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-xl p-6 text-white"
        >
          <h3 className="text-xl font-bold mb-3">Compliance Information</h3>
          <div className="space-y-2 text-purple-100">
            <p>✓ All settings are configured for maximum data protection</p>
            <p>✓ GDPR and CCPA compliant by default</p>
            <p>✓ Regular security audits are performed</p>
            <p>✓ Data encryption is enabled at rest and in transit</p>
          </div>
        </motion.div>

        {/* Toast Notification */}
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <Shield size={20} />
            Settings saved successfully!
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Settings;
