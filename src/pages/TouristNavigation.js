import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  Rating,
  ListItemIcon
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CampingIcon from '@mui/icons-material/Campaign';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ForestIcon from '@mui/icons-material/Forest';
import HikingIcon from '@mui/icons-material/Hiking';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { campingLocations } from '../data/locations';
import EventIcon from '@mui/icons-material/Event';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZm9yb3M3Z3IiLCJhIjoiY201czloOWkxMGZodDJpc2Nlc3lqb3plbSJ9.nfbeESQ73VcpOSomQDSYpw';

const TouristNavigation = ({ darkMode }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [currentLocation, setCurrentLocation] = useState(() => {
    const saved = sessionStorage.getItem('selectedCampsite');
    return saved ? JSON.parse(saved) : null;
  });
  const [viewState, setViewState] = useState({
    longitude: 23.7275,
    latitude: 37.9838,
    zoom: 6
  });

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setOpenDialog(true);
  };

  const handleConfirmLocation = () => {
    setCurrentLocation(selectedLocation);
    sessionStorage.setItem('selectedCampsite', JSON.stringify(selectedLocation));
    sessionStorage.setItem('weatherLocation', JSON.stringify({
      lat: selectedLocation.coordinates[1],
      lon: selectedLocation.coordinates[0]
    }));
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('locationChanged'));
    
    setViewState({
      longitude: selectedLocation.coordinates[0],
      latitude: selectedLocation.coordinates[1],
      zoom: 13
    });
    
    setOpenDialog(false);
    setNotification({
      open: true,
      message: `Επιλέξατε το ${selectedLocation.name}`,
      severity: 'success'
    });
  };

  const getIconByType = (type) => {
    switch (type) {
      case 'beach':
        return <BeachAccessIcon />;
      case 'forest':
        return <ForestIcon />;
      default:
        return <CampingIcon />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1: return '#4caf50'; // Πράσινο - Πολύ Εύκολο
      case 2: return '#8bc34a'; // Ανοιχτό πράσινο - Εύκολο
      case 3: return '#ffc107'; // Κίτρινο - Μέτριο
      case 4: return '#ff9800'; // Πορτοκαλί - Δύσκολο
      case 5: return '#f44336'; // Κόκκινο - Πολύ Δύσκολο
      default: return '#757575';
    }
  };

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          margin: 0,
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 700,
          fontSize: '2.125rem',
          lineHeight: 1.235,
          letterSpacing: '0em',
          color: darkMode ? '#ffffff' : '#2c3e50',
          mb: 3
        }}
      >
        Πλοήγηση & Αξιοθέατα
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3,
          bgcolor: darkMode ? '#132f4c' : '#ffffff'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            color: darkMode ? '#ffffff' : '#2c3e50'
          }}
        >
          Τρέχουσα Τοποθεσία
        </Typography>
        {currentLocation ? (
          <Box>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 1,
                color: darkMode ? '#ffffff' : '#2c3e50',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <LocationOnIcon color="secondary" />
              {currentLocation.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: darkMode ? '#b0bec5' : '#546e7a'
              }}
            >
              {currentLocation.type === 'beach' ? 'Παραθαλάσσιο' : 'Ορεινό'} Camping
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: darkMode ? '#b0bec5' : '#546e7a'
              }}
            >
              Υψόμετρο: {currentLocation.elevation}m
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography 
              variant="body1" 
              color="error" 
              sx={{ mb: 1, fontWeight: 'medium' }}
            >
              Δεν έχει επιλεγεί camping
            </Typography>
            <Typography color="text.secondary">
              Παρακαλώ επιλέξτε camping από τον χάρτη ή την λίστα
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Mapbox Map */}
      <Paper sx={{ height: '400px', mb: 3, overflow: 'hidden' }}>
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <NavigationControl position="top-right" />
          {campingLocations.map((location) => (
            <Marker
              key={location.id}
              longitude={location.coordinates[0]}
              latitude={location.coordinates[1]}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleLocationSelect(location);
              }}
            >
              <LocationOnIcon 
                sx={{ 
                  color: currentLocation && location.id === currentLocation.id ? '#E91E63' : '#1976d2',
                  cursor: 'pointer',
                  '&:hover': { color: '#E91E63' }
                }} 
              />
            </Marker>
          ))}
        </Map>
      </Paper>

      {/* Location Cards */}
      <Grid container spacing={3}>
        {campingLocations.map((location) => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
              onClick={() => handleLocationSelect(location)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getIconByType(location.type)}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {location.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {location.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {location.amenities.map((amenity, index) => (
                    <Chip
                      key={index}
                      label={amenity}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                {location.nearbyTrails.map((trail, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <HikingIcon sx={{ mr: 1, color: getDifficultyColor(trail.difficulty) }} />
                      <Typography variant="body2">
                        {trail.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                      <Rating 
                        value={trail.difficulty} 
                        readOnly 
                        max={5}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {trail.length} • {trail.elevation}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Location Selection Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Επιβεβαίωση Τοποθεσίας</DialogTitle>
        <DialogContent>
          {selectedLocation && (
            <>
              <Typography variant="h6">{selectedLocation.name}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{selectedLocation.description}</Typography>
              <Typography variant="subtitle1">Παροχές:</Typography>
              <Box sx={{ mb: 2 }}>
                {selectedLocation.amenities.map((amenity, index) => (
                  <Chip
                    key={index}
                    label={amenity}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
              <Typography variant="subtitle1">Κοντινά Μονοπάτια:</Typography>
              {selectedLocation.nearbyTrails.map((trail, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HikingIcon sx={{ mr: 1, color: getDifficultyColor(trail.difficulty) }} />
                    <Typography variant="body2">
                      {trail.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                    <Rating 
                      value={trail.difficulty} 
                      readOnly 
                      max={5}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {trail.length} • {trail.elevation}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Άκυρο</Button>
          <Button onClick={handleConfirmLocation} variant="contained">
            Επιβεβαίωση
          </Button>
        </DialogActions>
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

export default TouristNavigation;
