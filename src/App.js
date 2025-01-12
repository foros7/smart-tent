import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, CssBaseline, Grid, Card, CardContent, Box, Paper } from "@mui/material";
import Navigation from "./components/Navigation";
import TouristNavigation from "./pages/TouristNavigation";
import WeatherTracking from "./pages/WeatherTracking";
import EnergyManagement from "./pages/EnergyManagement";
import LightingControl from "./pages/LightingControl";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FoodOrdering from './pages/FoodOrdering';
import { campingLocations } from './data/locations';

const Dashboard = () => {
  const [tentData, setTentData] = useState({
    weather: null,
    energy: null,
    lighting: null,
    location: null
  });

  useEffect(() => {
    const loadCachedData = () => {
      const savedLocation = sessionStorage.getItem('selectedCampsite');
      const currentLocation = savedLocation ? JSON.parse(savedLocation) : campingLocations[0];
      
      const weatherCacheKey = `weather_${currentLocation.coordinates[1]}_${currentLocation.coordinates[0]}`;
      const weatherData = localStorage.getItem(weatherCacheKey);
      const energyData = localStorage.getItem('energy_data');
      const lightingData = localStorage.getItem('lighting_settings');

      setTentData({
        weather: weatherData ? JSON.parse(weatherData).data : null,
        energy: energyData ? JSON.parse(energyData) : { batteryLevel: 75, solarInput: 850 },
        lighting: lightingData ? JSON.parse(lightingData) : { brightness: 80, color: '#FFE5B4' },
        location: currentLocation
      });
    };

    loadCachedData();
  }, []);

  const getStatusColor = (value, type) => {
    switch(type) {
      case 'battery':
        return value > 60 ? '#4caf50' : value > 30 ? '#ff9800' : '#f44336';
      case 'temperature':
        return value > 30 ? '#f44336' : value > 20 ? '#4caf50' : '#2196f3';
      default:
        return '#4caf50';
    }
  };

  return (
    <Box sx={{ py: 4, pb: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography 
            variant="h3" 
            sx={{
              mb: 4,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#2c3e50'
            }}
          >
            Καλώς ήρθατε στο Interactive Tent
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WbSunnyIcon sx={{ mr: 1, color: '#FFB300' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Καιρός
                  </Typography>
                </Box>
                {tentData.weather ? (
                  <>
                    <Typography variant="h4" sx={{ mb: 1, color: getStatusColor(tentData.weather.main.temp, 'temperature') }}>
                      {Math.round(tentData.weather.main.temp)}°C
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Υγρασία: {tentData.weather.main.humidity}%
                    </Typography>
                  </>
                ) : (
                  <Typography color="text.secondary">Φόρτωση...</Typography>
                )}
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BatteryChargingFullIcon sx={{ mr: 1, color: getStatusColor(tentData.energy?.batteryLevel, 'battery') }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Ενέργεια
                  </Typography>
                </Box>
                {tentData.energy ? (
                  <>
                    <Typography variant="h4" sx={{ mb: 1, color: getStatusColor(tentData.energy.batteryLevel, 'battery') }}>
                      {tentData.energy.batteryLevel}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ηλιακή Ενέργεια: {tentData.energy.solarInput}W
                    </Typography>
                  </>
                ) : (
                  <Typography color="text.secondary">Φόρτωση...</Typography>
                )}
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LightbulbIcon sx={{ mr: 1, color: '#FFA726' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Φωτισμός
                  </Typography>
                </Box>
                {tentData.lighting ? (
                  <>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {tentData.lighting.brightness}%
                    </Typography>
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        bgcolor: tentData.lighting.color,
                        border: '2px solid #ddd'
                      }} 
                    />
                  </>
                ) : (
                  <Typography color="text.secondary">Φόρτωση...</Typography>
                )}
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1, color: '#E91E63' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Τοποθεσία
                  </Typography>
                </Box>
                {tentData.location ? (
                  <>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {tentData.location.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tentData.location.coordinates}
                    </Typography>
                  </>
                ) : (
                  <Typography color="text.secondary">Φόρτωση...</Typography>
                )}
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Interactive Tent</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tourist-navigation" element={<TouristNavigation />} />
          <Route path="/weather-tracking" element={<WeatherTracking />} />
          <Route path="/energy-management" element={<EnergyManagement />} />
          <Route path="/lighting-control" element={<LightingControl />} />
          <Route path="/food-ordering" element={<FoodOrdering />} />
        </Routes>
        <Navigation />
      </Container>
    </Router>
  );
};

export default App;