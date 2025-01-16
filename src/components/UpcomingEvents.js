import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsIcon from '@mui/icons-material/Sports';
import HikingIcon from '@mui/icons-material/Hiking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const UpcomingEvents = ({ darkMode, userParticipation, events }) => {
  const getEventIcon = (iconType) => {
    switch(iconType) {
      case 'music':
        return <MusicNoteIcon sx={{ color: '#E91E63' }} />;
      case 'sports':
        return <SportsIcon sx={{ color: '#2196F3' }} />;
      case 'hiking':
        return <HikingIcon sx={{ color: '#4CAF50' }} />;
      case 'food':
        return <RestaurantIcon sx={{ color: '#FF9800' }} />;
      default:
        return <EventIcon sx={{ color: '#9C27B0' }} />;
    }
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('el-GR', { 
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Φιλτράρουμε τα events που συμμετέχουμε και τα ταξινομούμε κατά ημερομηνία
  const myEvents = events
    .filter(event => userParticipation.includes(event.id))
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
    .slice(0, 3); // Παίρνουμε μόνο τα 3 πρώτα για το dashboard

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <EventIcon sx={{ mr: 1, color: '#9C27B0' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Εκδηλώσεις
          </Typography>
        </Box>
        
        {myEvents.length > 0 ? (
          <List sx={{ p: 0 }}>
            {myEvents.map((event) => (
              <ListItem 
                key={event.id}
                sx={{ 
                  px: 0,
                  py: 0.5
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getEventIcon(event.iconType)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography 
                      variant="body1"
                      sx={{ 
                        fontWeight: 'medium',
                        color: darkMode ? '#ffffff' : '#2c3e50'
                      }}
                    >
                      {event.title}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 0.5,
                      mt: 0.5
                    }}>
                      <AccessTimeIcon sx={{ fontSize: 16 }} />
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: darkMode ? '#b0bec5' : '#546e7a'
                        }}
                      >
                        {formatDateTime(event.date, event.time)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography 
            sx={{ 
              color: darkMode ? '#b0bec5' : '#546e7a',
              textAlign: 'center',
              py: 2
            }}
          >
            Δεν έχετε δηλώσει συμμετοχή σε κάποια εκδήλωση
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents; 