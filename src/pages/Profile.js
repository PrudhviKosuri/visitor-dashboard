import React, { useState, useEffect } from 'react';
import { Container, Paper, Box, Typography, TextField, Button, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: '#3f5c85', width: 48, height: 48 }}>{(name?.[0] || 'U').toUpperCase()}</Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e3a5f' }}>Edit Profile</Typography>
            <Typography variant="body2" color="text.secondary">Update your personal information</Typography>
          </Box>
        </Box>
        <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Email" value={email} InputProps={{ readOnly: true }} helperText="Email is your login identifier" fullWidth />
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button type="submit" variant="contained">Save</Button>
            <Button type="button" variant="outlined" onClick={() => setName(user?.name || '')}>Reset</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
