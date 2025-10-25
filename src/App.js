import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import VisitorTable from './pages/VisitorTable';
import Events from './pages/Events';
import DeviceStatus from './pages/DeviceStatus';
import { VisitorProvider } from './context/VisitorContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AuthLanding from './pages/auth/LandingPage';
import AuthLogin from './pages/auth/Login';
import AuthSignup from './pages/auth/Signup';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import VisitorDashboard from './pages/visitor/Dashboard';
import RegisterVisit from './pages/visitor/RegisterVisit';
import QRCodePage from './pages/visitor/QRCodePage';
import VisitHistory from './pages/visitor/VisitHistory';
import VisitorProfile from './pages/visitor/Profile';
import ResidentDashboard from './pages/resident/Dashboard';
import VisitorRequests from './pages/resident/Requests';
import InviteVisitors from './pages/resident/Invite';
import ResidentAnalytics from './pages/resident/Analytics';
import ResidentProfile from './pages/resident/Profile';
import './App.css';
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1e3a5f' },
    secondary: { main: '#4f46e5' },
    background: { default: '#f3f4f6', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#4b5563' },
    divider: '#e5e7eb',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiAppBar: { styleOverrides: { root: { backgroundColor: '#1e3a5f', color: '#ffffff', boxShadow: 'none' } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiTableHead: { styleOverrides: { root: { backgroundColor: '#f5f5f5' } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } } },
  },
});

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <VisitorProvider>
          <Router>
            <AppShell />
          </Router>
        </VisitorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppShell() {
  const location = useLocation();
  const isAuth = location.pathname.startsWith('/auth');
  const isVisitorPortal = location.pathname.startsWith('/visitor');
  const isResidentPortal = location.pathname.startsWith('/resident');

  return (
    <Box className="App" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAuth && !isVisitorPortal && !isResidentPortal && <Navbar />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          {/* Existing app routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/visitors" element={<RequireAuth><VisitorTable /></RequireAuth>} />
          <Route path="/approvals" element={<Navigate to="/visitors" replace />} />
          <Route path="/events" element={<RequireAuth><Events /></RequireAuth>} />
          <Route path="/approved" element={<Navigate to="/events" replace />} />
          <Route path="/analytics" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/devices" element={<RequireAuth><DeviceStatus /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

          {/* New auth section (Tailwind, dummy handlers) */}
          <Route path="/auth/landing" element={<AuthLanding />} />
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/auth/signup" element={<AuthSignup />} />

          {/* Visitor Portal Routes */}
          <Route path="/visitor/dashboard" element={<VisitorDashboard />} />
          <Route path="/visitor/register" element={<RegisterVisit />} />
          <Route path="/visitor/qr" element={<QRCodePage />} />
          <Route path="/visitor/history" element={<VisitHistory />} />
          <Route path="/visitor/profile" element={<VisitorProfile />} />

          {/* Resident Portal Routes */}
          <Route path="/resident/dashboard" element={<ResidentDashboard />} />
          <Route path="/resident/requests" element={<VisitorRequests />} />
          <Route path="/resident/invite" element={<InviteVisitors />} />
          <Route path="/resident/analytics" element={<ResidentAnalytics />} />
          <Route path="/resident/profile" element={<ResidentProfile />} />

          {/* Admin Portal Routes (placeholder) */}
          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="*" element={<Navigate to="/auth/landing" replace />} />
        </Routes>
      </Box>
      {!isAuth && !isVisitorPortal && !isResidentPortal && <Footer />}
    </Box>
  );
}

export default App;
