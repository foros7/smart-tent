import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, Stack, Chip, Card, CardContent, CircularProgress } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const WEATHER_API_KEY = '82fb891eb9c80e5ccd5c95deb2c6fcfd';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const WeatherTracking = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    name: "Camping Γαία - Πήλιο",
    location: { lat: 39.3441, lng: 23.0454 }
  });
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState({});

  const campingLocations = [
    {
      name: "Camping Γαία - Πήλιο",
      location: { lat: 39.3441, lng: 23.0454 }
    },
    {
      name: "Παραλία Καλόγρια",
      location: { lat: 38.1566, lng: 21.5967 }
    },
    {
      name: "Camping Μετέωρα",
      location: { lat: 39.7217, lng: 21.6307 }
    },
    {
      name: "Eco Camping Όλυμπος",
      location: { lat: 40.1033, lng: 22.3584 }
    }
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      const locationKey = `${selectedLocation.location.lat},${selectedLocation.location.lng}`;
      const now = Date.now();
      
      // Check if we have cached data that's still valid
      if (lastFetch[locationKey] && 
          weatherData && 
          forecast && 
          (now - lastFetch[locationKey]) < CACHE_DURATION) {
        console.log('Using cached weather data');
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching fresh weather data for:', selectedLocation.name);
        
        // Current weather
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLocation.location.lat}&lon=${selectedLocation.location.lng}&appid=${WEATHER_API_KEY}&units=metric&lang=el`;
        
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
          if (weatherResponse.status === 401) {
            throw new Error('Πρόβλημα με το κλειδί API. Παρακαλώ επικοινωνήστε με τον διαχειριστή.');
          } else {
            throw new Error(`Σφάλμα στην ανάκτηση δεδομένων καιρού (${weatherResponse.status})`);
          }
        }
        const weatherResult = await weatherResponse.json();

        // 5-day forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedLocation.location.lat}&lon=${selectedLocation.location.lng}&appid=${WEATHER_API_KEY}&units=metric&lang=el`;
        
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
          throw new Error(`Σφάλμα στην ανάκτηση πρόγνωσης καιρού (${forecastResponse.status})`);
        }
        const forecastResult = await forecastResponse.json();

        // Update cache timestamp
        setLastFetch(prev => ({
          ...prev,
          [locationKey]: now
        }));

        // Store data in localStorage for persistence
        localStorage.setItem(`weather_${locationKey}`, JSON.stringify({
          weather: weatherResult,
          forecast: forecastResult,
          timestamp: now
        }));

        setWeatherData(weatherResult);
        setForecast(forecastResult);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error.message);

        // Try to load cached data from localStorage if available
        const cachedData = localStorage.getItem(`weather_${locationKey}`);
        if (cachedData) {
          const { weather, forecast } = JSON.parse(cachedData);
          console.log('Using fallback cached data');
          setWeatherData(weather);
          setForecast(forecast);
        }
      }
      setLoading(false);
    };

    // Initial load - try to load from localStorage first
    const locationKey = `${selectedLocation.location.lat},${selectedLocation.location.lng}`;
    const cachedData = localStorage.getItem(`weather_${locationKey}`);
    if (cachedData) {
      const { weather, forecast, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('Loading from localStorage');
        setWeatherData(weather);
        setForecast(forecast);
        setLastFetch(prev => ({
          ...prev,
          [locationKey]: timestamp
        }));
        setLoading(false);
        return;
      }
    }

    fetchWeatherData();
    
    // Refresh every 5 minutes only if the tab is active
    let interval;
    if (document.visibilityState === 'visible') {
      interval = setInterval(fetchWeatherData, CACHE_DURATION);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchWeatherData();
        interval = setInterval(fetchWeatherData, CACHE_DURATION);
      } else {
        clearInterval(interval);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [selectedLocation]);

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case '01d': case '01n': return <WbSunnyIcon sx={{ color: '#FFB300' }} />;
      case '02d': case '02n': case '03d': case '03n': return <CloudIcon sx={{ color: '#90A4AE' }} />;
      case '04d': case '04n': return <CloudIcon sx={{ color: '#78909C' }} />;
      case '09d': case '09n': case '10d': case '10n': return <WaterDropIcon sx={{ color: '#64B5F6' }} />;
      case '11d': case '11n': return <ThunderstormIcon sx={{ color: '#5C6BC0' }} />;
      default: return <WbSunnyIcon sx={{ color: '#FFB300' }} />;
    }
  };

  const getWindDirection = (deg) => {
    const directions = ['Β', 'ΒΑ', 'Α', 'ΝΑ', 'Ν', 'ΝΔ', 'Δ', 'ΒΔ'];
    return directions[Math.round(deg / 45) % 8];
  };

  const getDayName = (date) => {
    const days = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'];
    return days[new Date(date).getDay()];
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', textAlign: 'center' }}>
          <Typography color="error">
            Σφάλμα: {error}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#2c3e50', fontWeight: 'bold' }}>
        Καιρικές Συνθήκες
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        {campingLocations.map((location) => (
          <Chip
            key={location.name}
            label={location.name}
            icon={<LocationOnIcon />}
            onClick={() => setSelectedLocation(location)}
            variant={selectedLocation.name === location.name ? "filled" : "outlined"}
            color={selectedLocation.name === location.name ? "primary" : "default"}
          />
        ))}
      </Stack>

      <Grid container spacing={3}>
        {weatherData && weatherData.weather && weatherData.weather[0] && (
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: '12px' }}>
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5">{selectedLocation.name}</Typography>
                  {getWeatherIcon(weatherData.weather[0].icon)}
                </Stack>
                
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                  {Math.round(weatherData.main?.temp || 0)}°C
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  {weatherData.weather[0].description}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <WaterDropIcon color="primary" />
                      <Typography>
                        Υγρασία: {weatherData.main?.humidity || 0}%
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AirIcon color="primary" />
                      <Typography>
                        Άνεμος: {Math.round((weatherData.wind?.speed || 0) * 3.6)} km/h {getWindDirection(weatherData.wind?.deg || 0)}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CompareArrowsIcon color="primary" />
                      <Typography>
                        Πίεση: {weatherData.main?.pressure || 0} hPa
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <VisibilityIcon color="primary" />
                      <Typography>
                        Ορατότητα: {((weatherData.visibility || 0) / 1000).toFixed(1)} km
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          </Grid>
        )}

        {forecast && forecast.list && (
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>5ήμερη Πρόγνωση</Typography>
              <Stack spacing={2}>
                {forecast.list
                  .filter((item, index) => index % 8 === 0)
                  .slice(0, 5)
                  .map((day, index) => (
                    <Card key={index} variant="outlined">
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6">{index === 0 ? 'Σήμερα' : getDayName(day.dt_txt)}</Typography>
                          <Stack direction="row" spacing={2} alignItems="center">
                            {day.weather && day.weather[0] && getWeatherIcon(day.weather[0].icon)}
                            <Typography variant="h6">{Math.round(day.main?.temp || 0)}°C</Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
              </Stack>
            </Paper>
          </Grid>
        )}

        {!weatherData && !loading && (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', textAlign: 'center' }}>
              <Typography color="error">
                Δεν ήταν δυνατή η φόρτωση των δεδομένων καιρού. Παρακαλώ δοκιμάστε ξανά αργότερα.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default WeatherTracking;