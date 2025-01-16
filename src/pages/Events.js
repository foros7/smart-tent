import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
  Avatar,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Stack
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsIcon from '@mui/icons-material/Sports';
import HikingIcon from '@mui/icons-material/Hiking';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { eventsByLocation, mockUsers } from '../data/events';

const Events = ({ darkMode }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [newMessage, setNewMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [currentUserId] = useState(1); // Mock current user
  const [userParticipation, setUserParticipation] = useState(() => {
    // Φορτώνουμε τις συμμετοχές του χρήστη από το localStorage
    const saved = localStorage.getItem('userEventParticipation');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const handleLocationChange = () => {
      const savedLocation = sessionStorage.getItem('selectedCampsite');
      const newLocation = savedLocation ? JSON.parse(savedLocation) : null;
      
      if (newLocation?.type !== currentLocation?.type) {
        setCurrentLocation(newLocation);
        
        const locationType = newLocation?.type === 'beach' ? 'beach' : 'mountain';
        setEvents(eventsByLocation[locationType] || eventsByLocation.beach);
      }
    };

    // Αρχική φόρτωση
    handleLocationChange();

    // Custom event listener
    const handleCustomEvent = () => handleLocationChange();
    window.addEventListener('locationChanged', handleCustomEvent);

    return () => {
      window.removeEventListener('locationChanged', handleCustomEvent);
    };
  }, [currentLocation]);

  useEffect(() => {
    if (events.length > 0) {
      const locationType = currentLocation?.type === 'beach' ? 'beach' : 'mountain';
      localStorage.setItem(`events_${locationType}`, JSON.stringify(events));
    }
  }, [events, currentLocation]);

  useEffect(() => {
    if (selectedEvent) {
      const updatedEvent = events.find(e => e.id === selectedEvent.id);
      if (updatedEvent) {
        setSelectedEvent(updatedEvent);
      }
    }
  }, [events]);

  const handleParticipate = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleConfirmParticipation = () => {
    setOpenDialog(false);
    
    // Προσθέτουμε το event ID στις συμμετοχές του χρήστη
    const newParticipations = [...userParticipation, selectedEvent.id];
    setUserParticipation(newParticipations);
    localStorage.setItem('userEventParticipation', JSON.stringify(newParticipations));
    
    // Προσθέτουμε αυτόματο μήνυμα στο chat
    const newChat = {
      userId: currentUserId,
      message: 'Μόλις δήλωσα συμμετοχή στην εκδήλωση!',
      timestamp: new Date().toISOString()
    };

    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === selectedEvent.id 
          ? { 
              ...event, 
              participants: event.participants + 1,
              chat: [...(event.chat || []), newChat]
            }
          : event
      )
    );

    setNotification({
      open: true,
      message: `Η συμμετοχή σας στο "${selectedEvent.title}" καταχωρήθηκε επιτυχώς!`,
      severity: 'success'
    });
  };

  const handleCancelParticipation = (event) => {
    // Αφαιρούμε το event ID από τις συμμετοχές του χρήστη
    const newParticipations = userParticipation.filter(id => id !== event.id);
    setUserParticipation(newParticipations);
    localStorage.setItem('userEventParticipation', JSON.stringify(newParticipations));

    // Προσθέτουμε αυτόματο μήνυμα στο chat
    const newChat = {
      userId: currentUserId,
      message: 'Ακύρωσα τη συμμετοχή μου από την εκδήλωση.',
      timestamp: new Date().toISOString()
    };

    setEvents(prevEvents => 
      prevEvents.map(e => 
        e.id === event.id 
          ? { 
              ...e, 
              participants: Math.max(0, e.participants - 1),
              chat: [...(e.chat || []), newChat]
            }
          : e
      )
    );

    setNotification({
      open: true,
      message: `Ακυρώσατε τη συμμετοχή σας στο "${event.title}"`,
      severity: 'info'
    });
  };

  const handleOpenChat = (event) => {
    setSelectedEvent(event);
    setOpenChat(true);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newChat = {
      userId: currentUserId,
      message: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    setSelectedEvent(prev => ({
      ...prev,
      chat: [...(prev.chat || []), newChat]
    }));

    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === selectedEvent.id) {
          return {
            ...event,
            chat: [...(event.chat || []), newChat]
          };
        }
        return event;
      })
    );

    setNewMessage('');

    // Scroll στο τελευταίο μήνυμα
    setTimeout(() => {
      const chatList = document.querySelector('.chat-messages');
      if (chatList) {
        chatList.scrollTop = chatList.scrollHeight;
      }
    }, 100);
  };

  const getEventColor = (type) => {
    switch(type) {
      case 'concert': return '#E91E63';
      case 'sports': return '#2196F3';
      case 'hiking': return '#4CAF50';
      default: return '#9C27B0';
    }
  };

  const getEventTypeLabel = (type) => {
    switch(type) {
      case 'concert': return 'Συναυλία';
      case 'sports': return 'Άθληση';
      case 'hiking': return 'Πεζοπορία';
      default: return 'Εκδήλωση';
    }
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('el-GR', { 
      dateStyle: 'full',
      timeStyle: 'short'
    });
  };

  const getEventIcon = (iconType) => {
    switch(iconType) {
      case 'music':
        return <MusicNoteIcon />;
      case 'sports':
        return <SportsIcon />;
      case 'hiking':
        return <HikingIcon />;
      case 'food':
        return <RestaurantIcon />;
      default:
        return <EventIcon />;
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, pb: { xs: 8, sm: 10 } }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 3, 
          color: darkMode ? '#ffffff' : '#2c3e50',
          fontWeight: 'bold' 
        }}
      >
        Εκδηλώσεις & Δραστηριότητες
      </Typography>

      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} md={6} key={event.id}>
            <Card 
              sx={{ 
                height: '100%',
                bgcolor: darkMode ? '#132f4c' : '#ffffff',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton 
                    sx={{ 
                      mr: 1, 
                      color: getEventColor(event.type),
                      bgcolor: `${getEventColor(event.type)}22`
                    }}
                  >
                    {getEventIcon(event.iconType)}
                  </IconButton>
                  <Typography variant="h6" sx={{ color: darkMode ? '#ffffff' : '#2c3e50' }}>
                    {event.title}
                  </Typography>
                </Box>

                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    color: darkMode ? '#b0bec5' : '#546e7a',
                    minHeight: '60px'
                  }}
                >
                  {event.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTimeIcon sx={{ fontSize: 20, mr: 1, color: darkMode ? '#90caf9' : '#1976d2' }} />
                  <Typography variant="body2" sx={{ color: darkMode ? '#ffffff' : '#2c3e50' }}>
                    {formatDateTime(event.date, event.time)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ fontSize: 20, mr: 1, color: darkMode ? '#90caf9' : '#1976d2' }} />
                  <Typography variant="body2" sx={{ color: darkMode ? '#ffffff' : '#2c3e50' }}>
                    {event.location}
                  </Typography>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 2,
                  pt: 2,
                  borderTop: 1,
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'divider'
                }}>
                  <Chip 
                    label={getEventTypeLabel(event.type)}
                    sx={{ 
                      bgcolor: `${getEventColor(event.type)}22`,
                      color: getEventColor(event.type)
                    }}
                  />
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1
                    }}>
                      <GroupsIcon 
                        sx={{ 
                          fontSize: 20,
                          mr: 0.5,
                          color: darkMode ? '#90caf9' : '#1976d2' 
                        }} 
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: darkMode ? '#ffffff' : '#2c3e50'
                        }}
                      >
                        {event.participants}/{event.capacity}
                      </Typography>
                    </Box>
                    {userParticipation.includes(event.id) ? (
                      <>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => handleOpenChat(event)}
                          sx={{ 
                            minWidth: 80,
                            height: 32,
                            borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                          }}
                        >
                          Chat
                        </Button>
                        <Button 
                          variant="contained" 
                          color="error"
                          size="small"
                          onClick={() => handleCancelParticipation(event)}
                          sx={{ 
                            minWidth: 100,
                            height: 32
                          }}
                        >
                          Αποχώρηση
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => handleOpenChat(event)}
                          disabled={!userParticipation.includes(event.id)}
                          sx={{ 
                            minWidth: 80,
                            height: 32,
                            borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                          }}
                        >
                          Chat
                        </Button>
                        <Button 
                          variant="contained" 
                          size="small"
                          onClick={() => handleParticipate(event)}
                          disabled={event.participants >= event.capacity}
                          sx={{ 
                            minWidth: 100,
                            height: 32
                          }}
                        >
                          Συμμετοχή
                        </Button>
                      </>
                    )}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Επιβεβαίωση Συμμετοχής</DialogTitle>
        <DialogContent>
          <Typography>
            Είστε σίγουροι ότι θέλετε να συμμετάσχετε στην εκδήλωση "{selectedEvent?.title}";
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Άκυρο</Button>
          <Button onClick={handleConfirmParticipation} variant="contained">
            Επιβεβαίωση
          </Button>
        </DialogActions>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog 
        open={openChat} 
        onClose={() => setOpenChat(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: darkMode ? '#0a1929' : 'background.paper'
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: 1, 
          borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'divider'
        }}>
          Chat - {selectedEvent?.title}
        </DialogTitle>
        <DialogContent>
          <List className="chat-messages" sx={{ 
            mb: 2, 
            minHeight: '300px', 
            maxHeight: '400px', 
            overflow: 'auto',
            bgcolor: darkMode ? '#0a1929' : 'background.paper'
          }}>
            {selectedEvent?.chat?.map((msg, index) => {
              const user = mockUsers.find(u => u.id === msg.userId);
              const isCurrentUser = user?.id === currentUserId;
              
              return (
                <React.Fragment key={index}>
                  <ListItem 
                    alignItems="flex-start"
                    sx={{ 
                      flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                      '& .MuiListItemAvatar-root': {
                        minWidth: 'auto',
                        mr: isCurrentUser ? 0 : 2,
                        ml: isCurrentUser ? 2 : 0
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: isCurrentUser ? 'primary.main' : 'secondary.main',
                          width: 32,
                          height: 32,
                          fontSize: '0.875rem'
                        }}
                      >
                        {user?.avatar}
                      </Avatar>
                    </ListItemAvatar>
                    <Box
                      sx={{
                        bgcolor: isCurrentUser 
                          ? 'primary.main' 
                          : darkMode ? '#1a2027' : 'grey.100',
                        color: isCurrentUser || darkMode 
                          ? 'white' 
                          : 'text.primary',
                        p: 1.5,
                        borderRadius: 2,
                        maxWidth: '70%',
                        boxShadow: 1
                      }}
                    >
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          mb: 0.5,
                          color: isCurrentUser || darkMode 
                            ? 'white' 
                            : 'text.primary'
                        }}
                      >
                        {isCurrentUser ? 'Εσείς' : user?.name}
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{
                          color: isCurrentUser || darkMode 
                            ? 'white' 
                            : 'text.primary'
                        }}
                      >
                        {msg.message}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          display: 'block',
                          mt: 0.5,
                          color: isCurrentUser 
                            ? 'rgba(255,255,255,0.7)' 
                            : darkMode 
                              ? 'rgba(255,255,255,0.5)'
                              : 'text.secondary'
                        }}
                      >
                        {new Date(msg.timestamp).toLocaleString('el-GR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                    </Box>
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
          {userParticipation.includes(selectedEvent?.id) ? (
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              pt: 2, 
              borderTop: 1, 
              borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'divider' 
            }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Γράψτε ένα μήνυμα..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'transparent'
                  }
                }}
              />
              <IconButton 
                color="primary" 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <SendIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography color="text.secondary">
                Πρέπει να συμμετέχετε στην εκδήλωση για να μπορείτε να στείλετε μήνυμα
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Notifications */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Events; 