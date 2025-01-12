import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box,
  Button,
  Slider,
  Alert,
  Snackbar,
  Switch,
  FormControlLabel,
  CircularProgress,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RefreshIcon from '@mui/icons-material/Refresh';
import { campingLocations } from '../data/locations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WEATHER_API_KEY = '82fb891eb9c80e5ccd5c95deb2c6fcfd';

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

const WeatherTracking = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: 25,
    humidity: 60,
    windSpeed: 15,
    isRaining: false,
    description: 'Αίθριος',
    feelsLike: 26,
    pressure: 1013,
    visibility: 10000,
    location: "Camping Γαία - Πήλιο"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [protectiveCovers, setProtectiveCovers] = useState({
    front: false,
    back: false,
    left: false,
    right: false
  });
  const [coverAngle, setCoverAngle] = useState(45);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [historicalData, setHistoricalData] = useState({
    labels: [],
    temperature: [],
    humidity: [],
    windSpeed: []
  });

  const fetchWeatherData = async () => {
    if (getCachedWeather()) return;

    setLoading(true);
    setError(null);
    
    try {
      const savedLocation = sessionStorage.getItem('selectedCampsite');
      const currentLocation = savedLocation ? JSON.parse(savedLocation) : campingLocations[0];
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.coordinates[1]}&lon=${currentLocation.coordinates[0]}&appid=${WEATHER_API_KEY}&units=metric&lang=el`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the new data
      const cacheKey = `weather_${currentLocation.coordinates[1]}_${currentLocation.coordinates[0]}`;
      localStorage.setItem(cacheKey, JSON.stringify({
        data,
        timestamp: Date.now()
      }));

      setWeatherData({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: (data.wind?.speed || 0) * 3.6,
        isRaining: ['Rain', 'Drizzle', 'Thunderstorm'].includes(data.weather?.[0]?.main),
        description: data.weather?.[0]?.description?.charAt(0).toUpperCase() + 
                    data.weather?.[0]?.description?.slice(1) || 'Άγνωστο',
        feelsLike: data.main.feels_like,
        pressure: data.main.pressure,
        visibility: Math.round(data.visibility / 100) / 10,
        location: currentLocation.name
      });

    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Σφάλμα κατά τη λήψη δεδομένων καιρού');
      getCachedWeather(); // Fallback to cached data
    } finally {
      setLoading(false);
    }
  };

  const getCachedWeather = () => {
    const savedLocation = sessionStorage.getItem('selectedCampsite');
    const currentLocation = savedLocation ? JSON.parse(savedLocation) : campingLocations[0];
    
    const cacheKey = `weather_${currentLocation.coordinates[1]}_${currentLocation.coordinates[0]}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;
      
      if (!isExpired) {
        setWeatherData({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: (data.wind?.speed || 0) * 3.6,
          isRaining: ['Rain', 'Drizzle', 'Thunderstorm'].includes(data.weather?.[0]?.main),
          description: data.weather?.[0]?.description?.charAt(0).toUpperCase() + 
                      data.weather?.[0]?.description?.slice(1) || 'Άγνωστο',
          feelsLike: data.main.feels_like,
          pressure: data.main.pressure,
          visibility: Math.round(data.visibility / 100) / 10,
          location: currentLocation.name
        });
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, CACHE_DURATION);
    return () => clearInterval(interval);
  }, []);

  // Check for dangerous weather conditions
  useEffect(() => {
    if (weatherData.windSpeed > 30) {
      setNotification({
        open: true,
        message: 'Προειδοποίηση: Ισχυροί άνεμοι! Προτείνεται η χρήση προστατευτικών καλυμμάτων.',
        severity: 'warning'
      });
    } else if (weatherData.isRaining && weatherData.windSpeed > 20) {
      setNotification({
        open: true,
        message: 'Προειδοποίηση: Καταιγίδα! Ενεργοποιήστε τα προστατευτικά καλύμματα.',
        severity: 'warning'
      });
    }
  }, [weatherData.windSpeed, weatherData.isRaining]);

  const handleCoverChange = (side) => {
    setProtectiveCovers(prev => {
      const newCovers = { ...prev, [side]: !prev[side] };
      setNotification({
        open: true,
        message: `${newCovers[side] ? 'Ενεργοποίηση' : 'Απενεργοποίηση'} καλύμματος ${side}`,
        severity: 'success'
      });
      return newCovers;
    });
  };

  const MetricCard = ({ icon, title, value, unit, color }) => (
    <Card sx={{ 
      height: '100%',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ color }}>
          {value}{unit}
        </Typography>
      </CardContent>
    </Card>
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          Παρακολούθηση Καιρού
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ mr: 1, color: '#E91E63' }} />
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {weatherData.location}
          </Typography>
          <IconButton onClick={fetchWeatherData} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Weather Metrics */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MetricCard
                icon={<WbSunnyIcon sx={{ fontSize: 40, color: '#ff9800' }} />}
                title="Θερμοκρασία"
                value={weatherData.temperature.toFixed(1)}
                unit="°C"
                color="#ff9800"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                icon={<WaterIcon sx={{ fontSize: 40, color: '#2196f3' }} />}
                title="Υγρασία"
                value={weatherData.humidity}
                unit="%"
                color="#2196f3"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                icon={<AirIcon sx={{ fontSize: 40, color: '#4caf50' }} />}
                title="Ταχύτητα Ανέμου"
                value={weatherData.windSpeed.toFixed(1)}
                unit=" km/h"
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                icon={<UmbrellaIcon sx={{ fontSize: 40, color: weatherData.isRaining ? '#f44336' : '#757575' }} />}
                title="Βροχόπτωση"
                value={weatherData.isRaining ? 'Ναι' : 'Όχι'}
                unit=""
                color={weatherData.isRaining ? '#f44336' : '#757575'}
              />
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Περιγραφή: {weatherData.description}
                </Typography>
                <Typography variant="body1">
                  Αίσθηση: {weatherData.feelsLike}°C
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Protective Covers Control */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Προστατευτικά Καλύμματα
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(protectiveCovers).map(([side, isActive]) => (
                <Grid item xs={6} key={side}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActive}
                        onChange={() => handleCoverChange(side)}
                        color="primary"
                      />
                    }
                    label={`Κάλυμμα ${side}`}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Γωνία Καλυμμάτων: {coverAngle}°
                </Typography>
                <Slider
                  value={coverAngle}
                  onChange={(e, newValue) => setCoverAngle(newValue)}
                  min={0}
                  max={90}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Weather Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Ιστορικό Καιρού
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <Line data={{
                labels: historicalData.labels,
                datasets: [
                  {
                    label: 'Θερμοκρασία (°C)',
                    data: historicalData.temperature,
                    borderColor: '#ff9800',
                    tension: 0.4
                  },
                  {
                    label: 'Υγρασία (%)',
                    data: historicalData.humidity,
                    borderColor: '#2196f3',
                    tension: 0.4
                  },
                  {
                    label: 'Ταχύτητα Ανέμου (km/h)',
                    data: historicalData.windSpeed,
                    borderColor: '#4caf50',
                    tension: 0.4
                  }
                ]
              }} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

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

export default WeatherTracking;