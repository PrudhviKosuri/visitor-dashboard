import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e0e0e0',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon sx={{ fontSize: 22, color: '#1e3a5f' }} />
          <Typography variant="body2" sx={{ color: '#1e3a5f', fontWeight: 600 }}>
            InnoHub VMS
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Contact: <Link href="mailto:support@innohub.example" underline="hover">support@innohub.example</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
