import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Settings from './pages/Settings';
import Profile from './pages/Profile';
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
            <Box className="App" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
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
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </VisitorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
