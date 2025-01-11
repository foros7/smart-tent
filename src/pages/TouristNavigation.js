import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Chip, Stack } from '@mui/material';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ForestIcon from '@mui/icons-material/Forest';
import WaterIcon from '@mui/icons-material/Water';
import TerrainIcon from '@mui/icons-material/Terrain';

const TouristNavigation = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 21.824312,
    latitude: 39.074208,
    zoom: 6
  });

  const campingLocations = [
    {
      name: "Camping Γαία - Πήλιο",
      location: { lat: 39.3441, lng: 23.0454 },
      description: "Καταπράσινο camping στο βουνό του Πηλίου με θέα στο Αιγαίο",
      facilities: ["Ρεύμα", "Ντους", "WiFi"],
      terrain: "forest",
      difficulty: "medium"
    },
    {
      name: "Παραλία Καλόγρια",
      location: { lat: 38.1566, lng: 21.5967 },
      description: "Παραθαλάσσιο camping με κρυστάλλινα νερά",
      facilities: ["Ρεύμα", "Ντους", "Καντίνα"],
      terrain: "beach",
      difficulty: "easy"
    },
    {
      name: "Camping Μετέωρα",
      location: { lat: 39.7217, lng: 21.6307 },
      description: "Camping με θέα τους εντυπωσιακούς βράχους των Μετεώρων",
      facilities: ["Ρεύμα", "Ντους", "Εστιατόριο"],
      terrain: "mountain",
      difficulty: "hard"
    },
    {
      name: "Eco Camping Όλυμπος",
      location: { lat: 40.1033, lng: 22.3584 },
      description: "Οικολογικό camping στους πρόποδες του Ολύμπου",
      facilities: ["Ηλιακό Ρεύμα", "Bio Τουαλέτες"],
      terrain: "mountain",
      difficulty: "hard"
    }
  ];

  const getTerrainIcon = (terrain) => {
    switch(terrain) {
      case 'forest': return <ForestIcon />;
      case 'beach': return <WaterIcon />;
      case 'mountain': return <TerrainIcon />;
      default: return <ForestIcon />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#2c3e50', fontWeight: 'bold' }}>
        Προτάσεις Camping
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: '12px' }}>
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              style={{ width: '100%', height: '60vh', borderRadius: '8px' }}
              mapStyle="mapbox://styles/mapbox/outdoors-v12"
              mapboxAccessToken="pk.eyJ1IjoiZm9yb3M3Z3IiLCJhIjoiY201czloOWkxMGZodDJpc2Nlc3lqb3plbSJ9.nfbeESQ73VcpOSomQDSYpw"
            >
              {campingLocations.map((location, index) => (
                <Marker
                  key={index}
                  latitude={location.location.lat}
                  longitude={location.location.lng}
                  onClick={e => {
                    e.originalEvent.stopPropagation();
                    setSelectedLocation(location);
                  }}
                />
              ))}
              {selectedLocation && (
                <Popup
                  latitude={selectedLocation.location.lat}
                  longitude={selectedLocation.location.lng}
                  onClose={() => setSelectedLocation(null)}
                  closeButton={true}
                >
                  <div>
                    <h3>{selectedLocation.name}</h3>
                    <p>{selectedLocation.description}</p>
                  </div>
                </Popup>
              )}
            </Map>
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ mb: 7 }}>
          <Typography variant="h5" sx={{ mb: 2, mt: 2, color: '#2c3e50' }}>
            Προτεινόμενες Τοποθεσίες Camping
          </Typography>
          <Grid container spacing={2}>
            {campingLocations.map((location, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      {getTerrainIcon(location.terrain)}
                      <Typography variant="h6">
                        {location.name}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {location.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip 
                        label={location.terrain} 
                        size="small" 
                        icon={getTerrainIcon(location.terrain)}
                      />
                      <Chip 
                        label={`Δυσκολία: ${location.difficulty}`} 
                        size="small"
                        color={getDifficultyColor(location.difficulty)}
                      />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
                      {location.facilities.map((facility, idx) => (
                        <Chip key={idx} label={facility} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TouristNavigation;
