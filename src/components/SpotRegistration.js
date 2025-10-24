import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import EditIcon from '@mui/icons-material/Edit';
import { useVisitors } from '../context/VisitorContext';

const SpotRegistration = () => {
  const { visitTypes, addVisitType, updateVisitType } = useVisitors();
  const [openRegister, setOpenRegister] = useState(false);
  const [openVisitType, setOpenVisitType] = useState(false);
  const [selectedVisitType, setSelectedVisitType] = useState(null);

  const [visitorForm, setVisitorForm] = useState({
    name: '',
    email: '',
    company: '',
    host: '',
    visitType: '',
  });

  const [visitTypeForm, setVisitTypeForm] = useState({
    name: '',
    defaultDuration: 60,
    requiresApproval: true,
    accessZones: [],
  });

  const [newZone, setNewZone] = useState('');

  const handleRegisterOpen = () => setOpenRegister(true);
  const handleRegisterClose = () => {
    setOpenRegister(false);
    setVisitorForm({ name: '', email: '', company: '', host: '', visitType: '' });
  };

  const handleVisitTypeOpen = (visitType = null) => {
    if (visitType) {
      setSelectedVisitType(visitType);
      setVisitTypeForm({
        name: visitType.name,
        defaultDuration: visitType.defaultDuration,
        requiresApproval: visitType.requiresApproval,
        accessZones: [...visitType.accessZones],
      });
    } else {
      setSelectedVisitType(null);
      setVisitTypeForm({ name: '', defaultDuration: 60, requiresApproval: true, accessZones: [] });
    }
    setOpenVisitType(true);
  };

  const handleVisitTypeClose = () => {
    setOpenVisitType(false);
    setSelectedVisitType(null);
    setVisitTypeForm({ name: '', defaultDuration: 60, requiresApproval: true, accessZones: [] });
    setNewZone('');
  };

  const handleRegisterSubmit = () => {
    console.log('Registering visitor:', visitorForm);
    handleRegisterClose();
  };

  const handleVisitTypeSubmit = () => {
    if (selectedVisitType) {
      updateVisitType(selectedVisitType.id, visitTypeForm);
    } else {
      addVisitType(visitTypeForm);
    }
    handleVisitTypeClose();
  };

  const handleAddZone = () => {
    if (newZone.trim() && !visitTypeForm.accessZones.includes(newZone.trim())) {
      setVisitTypeForm({
        ...visitTypeForm,
        accessZones: [...visitTypeForm.accessZones, newZone.trim()],
      });
      setNewZone('');
    }
  };

  const handleRemoveZone = (zone) => {
    setVisitTypeForm({
      ...visitTypeForm,
      accessZones: visitTypeForm.accessZones.filter(z => z !== zone),
    });
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
              Quick Actions
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Spot registration and visit type management
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Spot Registration */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PersonAddIcon sx={{ color: '#1e3a5f' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
                    Spot Registration
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Quickly register walk-in visitors without prior appointment
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{
                    backgroundColor: '#1e3a5f',
                    '&:hover': { backgroundColor: '#152d4a' },
                    textTransform: 'none',
                    py: 1.5,
                  }}
                  onClick={handleRegisterOpen}
                >
                  Register New Visitor
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Visit Types Configuration */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <SettingsIcon sx={{ color: '#1e3a5f' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
                    Visit Types
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Configure visit types and their access permissions
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{
                    borderColor: '#1e3a5f',
                    color: '#1e3a5f',
                    '&:hover': { borderColor: '#152d4a', backgroundColor: 'rgba(30, 58, 95, 0.04)' },
                    textTransform: 'none',
                    py: 1.5,
                    mb: 2,
                  }}
                  onClick={() => handleVisitTypeOpen()}
                >
                  Add Visit Type
                </Button>
                <Box sx={{ maxHeight: 180, overflowY: 'auto' }}>
                  {visitTypes.map((vt) => (
                    <Box
                      key={vt.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.5,
                        mb: 1,
                        backgroundColor: '#f8f9fa',
                        borderRadius: 1,
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {vt.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {vt.defaultDuration} min • {vt.accessZones.length} zones
                        </Typography>
                      </Box>
                      <IconButton size="small" onClick={() => handleVisitTypeOpen(vt)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Access Zones Overview */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <SecurityIcon sx={{ color: '#1e3a5f' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
                    Access Zones
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Configured access zones across all visit types
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {[...new Set(visitTypes.flatMap(vt => vt.accessZones))].map((zone, index) => (
                    <Chip
                      key={index}
                      label={zone}
                      size="small"
                      sx={{
                        backgroundColor: '#e8eef5',
                        color: '#1e3a5f',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Register Visitor Dialog */}
      <Dialog open={openRegister} onClose={handleRegisterClose} maxWidth="sm" fullWidth>
        <DialogTitle>Register Walk-in Visitor</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Visitor Name"
              fullWidth
              value={visitorForm.name}
              onChange={(e) => setVisitorForm({ ...visitorForm, name: e.target.value })}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={visitorForm.email}
              onChange={(e) => setVisitorForm({ ...visitorForm, email: e.target.value })}
            />
            <TextField
              label="Company"
              fullWidth
              value={visitorForm.company}
              onChange={(e) => setVisitorForm({ ...visitorForm, company: e.target.value })}
            />
            <TextField
              label="Host Name"
              fullWidth
              value={visitorForm.host}
              onChange={(e) => setVisitorForm({ ...visitorForm, host: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Visit Type</InputLabel>
              <Select
                value={visitorForm.visitType}
                onChange={(e) => setVisitorForm({ ...visitorForm, visitType: e.target.value })}
                label="Visit Type"
              >
                {visitTypes.map((vt) => (
                  <MenuItem key={vt.id} value={vt.name}>
                    {vt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterClose}>Cancel</Button>
          <Button onClick={handleRegisterSubmit} variant="contained" sx={{ backgroundColor: '#1e3a5f' }}>
            Register
          </Button>
        </DialogActions>
      </Dialog>

      {/* Visit Type Configuration Dialog */}
      <Dialog open={openVisitType} onClose={handleVisitTypeClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedVisitType ? 'Edit Visit Type' : 'Add Visit Type'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Visit Type Name"
              fullWidth
              value={visitTypeForm.name}
              onChange={(e) => setVisitTypeForm({ ...visitTypeForm, name: e.target.value })}
            />
            <TextField
              label="Default Duration (minutes)"
              type="number"
              fullWidth
              value={visitTypeForm.defaultDuration}
              onChange={(e) => setVisitTypeForm({ ...visitTypeForm, defaultDuration: parseInt(e.target.value) || 0 })}
            />
            <FormControl fullWidth>
              <InputLabel>Requires Approval</InputLabel>
              <Select
                value={visitTypeForm.requiresApproval}
                onChange={(e) => setVisitTypeForm({ ...visitTypeForm, requiresApproval: e.target.value })}
                label="Requires Approval"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
              Access Zones
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label="Add Zone"
                size="small"
                fullWidth
                value={newZone}
                onChange={(e) => setNewZone(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddZone()}
              />
              <Button variant="outlined" onClick={handleAddZone}>
                Add
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {visitTypeForm.accessZones.map((zone, index) => (
                <Chip
                  key={index}
                  label={zone}
                  onDelete={() => handleRemoveZone(zone)}
                  sx={{ backgroundColor: '#e8eef5', color: '#1e3a5f' }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVisitTypeClose}>Cancel</Button>
          <Button onClick={handleVisitTypeSubmit} variant="contained" sx={{ backgroundColor: '#1e3a5f' }}>
            {selectedVisitType ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SpotRegistration;
