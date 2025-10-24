import React, { useEffect, useState } from 'react';
import { Container, Paper, Box, Typography, Divider, FormGroup, FormControlLabel, Switch, Button, TextField, MenuItem } from '@mui/material';

const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [defaultPage, setDefaultPage] = useState('/');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('vms_settings') || '{}');
    if (saved.emailNotif !== undefined) setEmailNotif(saved.emailNotif);
    if (saved.pushNotif !== undefined) setPushNotif(saved.pushNotif);
    if (saved.defaultPage) setDefaultPage(saved.defaultPage);
    if (saved.rowsPerPage) setRowsPerPage(saved.rowsPerPage);
  }, []);

  const handleSave = () => {
    localStorage.setItem('vms_settings', JSON.stringify({ emailNotif, pushNotif, defaultPage, rowsPerPage }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: '#1e3a5f', mb: 2 }}>
        General Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>Notifications</Typography>
          <FormGroup>
            <FormControlLabel control={<Switch checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />} label="Email notifications" />
            <FormControlLabel control={<Switch checked={pushNotif} onChange={(e) => setPushNotif(e.target.checked)} />} label="Push notifications" />
          </FormGroup>
        </Box>
        <Divider sx={{ my: 3 }} />
        {/* Appearance section removed: dark mode disabled globally */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            select
            label="Default page"
            value={defaultPage}
            onChange={(e) => setDefaultPage(e.target.value)}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="/">Dashboard</MenuItem>
            <MenuItem value="/visitors">Visitors</MenuItem>
            <MenuItem value="/events">Events</MenuItem>
            <MenuItem value="/devices">Kiosks</MenuItem>
          </TextField>
          <TextField
            type="number"
            label="Rows per page"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Math.max(5, Number(e.target.value) || 10))}
            inputProps={{ min: 5, step: 5 }}
            sx={{ minWidth: 220 }}
          />
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>Save Changes</Button>
          <Button variant="outlined" onClick={() => {
            setEmailNotif(true); setPushNotif(true); setDefaultPage('/'); setRowsPerPage(10);
          }}>Reset</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;
