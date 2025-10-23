import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Schedule,
  Business,
  Person,
  AccessTime,
} from '@mui/icons-material';
import { useVisitors } from '../context/VisitorContext';
import { format } from 'date-fns';

const Approvals = () => {
  const { pendingApprovals, approveVisitor, rejectVisitor } = useVisitors();

  const handleApprove = (approvalId) => {
    approveVisitor(approvalId);
  };

  const handleReject = (approvalId) => {
    rejectVisitor(approvalId);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Visitor Approval Panel
      </Typography>
      
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Review and approve pending visitor requests
      </Typography>

      {pendingApprovals.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No pending approvals at this time. All visitor requests have been processed.
        </Alert>
      ) : (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You have {pendingApprovals.length} pending visitor request(s) waiting for approval.
        </Alert>
      )}

      <Grid container spacing={3}>
        {pendingApprovals.map((approval) => (
          <Grid item xs={12} md={6} lg={4} key={approval.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="div">
                    {approval.name}
                  </Typography>
                  <Chip
                    icon={<Schedule />}
                    label="Pending"
                    color="warning"
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Business fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Company:
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 3 }}>
                    {approval.company}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Person fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Host:
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 3 }}>
                    {approval.host}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTime fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Requested Time:
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 3 }}>
                    {format(approval.requestedTime, 'MMM dd, yyyy HH:mm')}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Purpose:
                  </Typography>
                  <Typography variant="body1">
                    {approval.purpose}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Cancel />}
                    onClick={() => handleReject(approval.id)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => handleApprove(approval.id)}
                  >
                    Approve
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Instructions */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          Approval Process
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Approve:</strong> Visitor will be immediately checked in and added to the active visitor list
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Reject:</strong> Visitor request will be removed and they will be notified
        </Typography>
        <Typography variant="body2">
          • All actions are logged for security and audit purposes
        </Typography>
      </Paper>
    </Container>
  );
};

export default Approvals;
