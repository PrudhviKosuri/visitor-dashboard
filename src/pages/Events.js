import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
  Avatar,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Business,
  Person,
  EventAvailable,
  Event,
  Block,
  Close,
  Cancel,
  LocationOn,
  Groups,
  Schedule,
  ChecklistRtl,
} from '@mui/icons-material';
import { useVisitors } from '../context/VisitorContext';
import { format } from 'date-fns';

const Events = () => {
  const { eventRequests, rejectedEvents, approveEvent, rejectEvent, approveRejectedEvent } = useVisitors();
  const [openRejected, setOpenRejected] = useState(false);

  const handleApprove = (eventId) => {
    approveEvent(eventId);
  };

  const handleReject = (eventId) => {
    rejectEvent(eventId);
  };

  const handleApproveRejected = (eventId) => {
    approveRejectedEvent(eventId);
  };

  const handleOpenRejected = () => {
    setOpenRejected(true);
  };

  const handleCloseRejected = () => {
    setOpenRejected(false);
  };



  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#1e3a5f', mb: 0.5 }}>
            Event Requests
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review and manage event requests
          </Typography>
        </Box>
        <IconButton
          onClick={handleOpenRejected}
          sx={{
            backgroundColor: '#ffebee',
            '&:hover': { backgroundColor: '#ffcdd2' },
          }}
        >
          <Badge badgeContent={rejectedEvents.length} color="error">
            <Block sx={{ color: '#d32f2f' }} />
          </Badge>
        </IconButton>
      </Box>

      {eventRequests.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No pending event requests at this time.
        </Alert>
      ) : (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You have {eventRequests.length} pending event request(s) waiting for approval.
        </Alert>
      )}

      <Grid container spacing={3}>
        {eventRequests.map((event) => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 44,
                        height: 44,
                        bgcolor: '#1e3a5f',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      <Event />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
                        {event.eventName}
                      </Typography>
                      <Chip
                        label={event.eventType}
                        size="small"
                        sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }}
                      />
                    </Box>
                  </Box>
                  <Chip
                    icon={<Schedule />}
                    label="Pending"
                    color="warning"
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Person fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Organizer:
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 3 }}>
                    {event.organizer}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Business fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Company:
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 3 }}>
                    {event.company}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EventAvailable fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Event Date:
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 3 }}>
                    {format(event.eventDate, 'MMM dd, yyyy HH:mm')}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Venue:
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 3 }}>
                    {event.venue}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Groups fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Expected Attendees:
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 3 }}>
                    {event.expectedAttendees} people
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ChecklistRtl fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Requirements:
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 3, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {event.requirements.map((req, idx) => (
                      <Chip key={idx} label={req} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Cancel />}
                    onClick={() => handleReject(event.id)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => handleApprove(event.id)}
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
          Event Approval Process
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Approve:</strong> Event will be scheduled and venue/resources will be allocated
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Reject:</strong> Event request will be declined and organizer will be notified
        </Typography>
        <Typography variant="body2">
          • All actions are logged with timestamps for audit purposes
        </Typography>
      </Paper>

      {/* Rejected Events Dialog */}
      <Dialog
        open={openRejected}
        onClose={handleCloseRejected}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Block color="error" />
            <Typography variant="h6">Rejected Event Requests</Typography>
          </Box>
          <IconButton onClick={handleCloseRejected} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {rejectedEvents.length === 0 ? (
            <Box sx={{ py: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No rejected event requests
              </Typography>
            </Box>
          ) : (
            <List>
              {rejectedEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: 1,
                    mb: 1,
                    border: '1px solid #e0e0e0',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1.5, flex: 1 }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: '#1e3a5f',
                            width: 40,
                            height: 40,
                          }}
                        >
                          <Event fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {event.eventName}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {event.organizer} • {event.company}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {format(event.eventDate, 'MMM dd, yyyy HH:mm')} • {event.venue}
                            </Typography>
                            <Typography variant="caption" color="error">
                              Rejected: {format(event.rejectedTime, 'MMM dd, HH:mm')}
                            </Typography>
                          </>
                        }
                      />
                    </Box>
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      startIcon={<CheckCircle />}
                      onClick={() => handleApproveRejected(event.id)}
                      sx={{ minWidth: '100px' }}
                    >
                      Approve
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Events;
