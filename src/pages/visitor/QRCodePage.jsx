import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import VisitorSidebar from '../../components/VisitorSidebar';
import { Download, ArrowLeft, CheckCircle, Calendar, User, FileText } from 'lucide-react';

const QRCodePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const qrRef = useRef();

  // Get visit data from navigation state or use dummy data
  const visitData = location.state?.visitData || {
    fullName: 'John Doe',
    purpose: 'Business Meeting',
    dateTime: '2025-10-25T10:00',
    whomToMeet: 'Dr. Sarah Johnson - Innovation Lead',
  };

  // Generate QR code data
  const qrData = JSON.stringify({
    visitorId: 'VIS-' + Date.now(),
    name: visitData.fullName,
    purpose: visitData.purpose,
    dateTime: visitData.dateTime,
    host: visitData.whomToMeet,
  });

  const handleDownload = () => {
    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `visitor-qr-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <VisitorSidebar />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <CheckCircle className="text-emerald-500" size={36} />
            Your Visit QR Code
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Show this QR code at the entrance for quick check-in
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* QR Code Card */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* QR Code Section */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <QRCode
                    ref={qrRef}
                    value={qrData}
                    size={256}
                    level="H"
                  />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                  Scan this QR code at the entrance
                </p>
              </div>

              {/* Visit Details Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Visit Details
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <User className="text-blue-600 mt-0.5" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Visitor Name</p>
                      <p className="text-slate-900 dark:text-slate-100 font-semibold">{visitData.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <FileText className="text-purple-600 mt-0.5" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Purpose</p>
                      <p className="text-slate-900 dark:text-slate-100">{visitData.purpose}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <Calendar className="text-emerald-600 mt-0.5" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Date & Time</p>
                      <p className="text-slate-900 dark:text-slate-100">{formatDateTime(visitData.dateTime)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <User className="text-orange-600 mt-0.5" size={20} />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Meeting With</p>
                      <p className="text-slate-900 dark:text-slate-100">{visitData.whomToMeet}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Visit ID: <span className="font-mono font-semibold">VIS-{Date.now()}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-sky-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Download size={20} />
                Download QR Code
              </button>
              <button
                onClick={() => navigate('/visitor/dashboard')}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold py-3 px-6 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">Important Notes:</h4>
            <ul className="text-sm text-amber-800 dark:text-amber-400 space-y-1 list-disc list-inside">
              <li>Please arrive 10 minutes before your scheduled time</li>
              <li>Keep this QR code ready on your mobile device</li>
              <li>Valid ID proof is required at the entrance</li>
              <li>QR code is valid for the scheduled date and time only</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QRCodePage;
