import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Paper, Box, LinearProgress, Stack, Slider, Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Card, CardContent, IconButton } from '@mui/material';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CACHE_KEY = 'energyData';
const MAX_HISTORY_POINTS = 24; // 24 hours of data

// Simple time formatter
const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const EnergyManagement = ({ darkMode }) => {
  // Simulated live data states
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [solarInput, setSolarInput] = useState(850);
  const [powerConsumption, setPowerConsumption] = useState(400);
  const [timeRemaining, setTimeRemaining] = useState(14.5);
  const [historicalData, setHistoricalData] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {
      battery: [],
      solar: [],
      consumption: [],
      timestamps: []
    };
  });

  const [acSettings, setAcSettings] = useState(() => {
    const saved = localStorage.getItem('ac_settings');
    return saved ? JSON.parse(saved) : {
      isOn: false,
      temperature: 24,
      mode: 'auto',
      fanSpeed: 'auto',
      autoMode: true
    };
  });

  useEffect(() => {
    localStorage.setItem('ac_settings', JSON.stringify(acSettings));
  }, [acSettings]);

  const handleAcToggle = () => {
    setAcSettings(prev => ({
      ...prev,
      isOn: !prev.isOn
    }));
  };

  const handleTempChange = (_, newValue) => {
    setAcSettings(prev => ({
      ...prev,
      temperature: newValue
    }));
  };

  // Update and cache historical data
  useEffect(() => {
    const updateHistory = () => {
      const timestamp = formatTime(new Date());
      
      setHistoricalData(prev => {
        const newData = {
          battery: [...prev.battery, batteryLevel],
          solar: [...prev.solar, solarInput],
          consumption: [...prev.consumption, powerConsumption],
          timestamps: [...prev.timestamps, timestamp]
        };

        // Keep only last MAX_HISTORY_POINTS
        if (newData.battery.length > MAX_HISTORY_POINTS) {
          newData.battery = newData.battery.slice(-MAX_HISTORY_POINTS);
          newData.solar = newData.solar.slice(-MAX_HISTORY_POINTS);
          newData.consumption = newData.consumption.slice(-MAX_HISTORY_POINTS);
          newData.timestamps = newData.timestamps.slice(-MAX_HISTORY_POINTS);
        }

        // Cache the data
        localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        return newData;
      });
    };

    // Update live values and history every 3 seconds
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));
      setSolarInput(prev => Math.max(0, prev + (Math.random() - 0.5) * 50));
      setPowerConsumption(prev => Math.max(0, prev + (Math.random() - 0.5) * 30));
      setTimeRemaining(prev => Math.max(0, prev + (Math.random() - 0.5)));
      updateHistory();
    }, 3000);

    return () => clearInterval(interval);
  }, [batteryLevel, solarInput, powerConsumption]);

  const chartData = {
    labels: historicalData.timestamps,
    datasets: [
      {
        label: 'Μπαταρία (%)',
        data: historicalData.battery,
        borderColor: '#4caf50',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Ηλιακή Ενέργεια (W)',
        data: historicalData.solar,
        borderColor: '#ffa726',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Κατανάλωση (W)',
        data: historicalData.consumption,
        borderColor: '#ef5350',
        tension: 0.4,
        fill: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const getBatteryColor = (level) => {
    if (level > 60) return '#4caf50';
    if (level > 30) return '#ff9800';
    return '#f44336';
  };

  const MetricCard = ({ icon, title, value, unit, color, progress }) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: '100%',
        borderRadius: '12px',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ color: color || 'primary.main' }}>
            {icon}
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Stack>
        
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: color || 'text.primary' }}>
          {value}
          <Typography component="span" variant="h6" color="text.secondary">
            {' '}{unit}
          </Typography>
        </Typography>

        {progress && (
          <Box sx={{ width: '100%', mt: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 10, 
                borderRadius: 5,
                bgcolor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: color,
                  borderRadius: 5
                }
              }} 
            />
          </Box>
        )}
      </Stack>
    </Paper>
  );

  const calculateAcConsumption = () => {
    if (!acSettings.isOn) return 0;
    
    let baseConsumption = 800;
    const tempDiff = Math.abs(24 - acSettings.temperature);
    baseConsumption += tempDiff * 100;
    
    switch(acSettings.fanSpeed) {
      case 'high': baseConsumption *= 1.3; break;
      case 'medium': baseConsumption *= 1.1; break;
      case 'low': baseConsumption *= 0.9; break;
      default: baseConsumption *= 1.0;
    }
    
    return Math.round(baseConsumption);
  };

  // Ενημέρωση κατανάλωσης όταν αλλάζει η κατάσταση του AC
  useEffect(() => {
    if (acSettings.isOn) {
      setPowerConsumption(400 + calculateAcConsumption());
    } else {
      setPowerConsumption(400); // Επιστροφή στη βασική κατανάλωση
    }
  }, [acSettings.isOn, acSettings.temperature, acSettings.fanSpeed]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, pb: { xs: 8, sm: 10 } }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#2c3e50', fontWeight: 'bold' }}>
        Διαχείριση Ενέργειας
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<BatteryChargingFullIcon sx={{ fontSize: 40 }} />}
            title="Μπαταρία"
            value={Math.round(batteryLevel)}
            unit="%"
            color="#4caf50"
            progress={batteryLevel}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<SolarPowerIcon sx={{ fontSize: 40 }} />}
            title="Παραγωγή"
            value={Math.round(solarInput)}
            unit="W"
            color="#ffa726"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<ElectricMeterIcon sx={{ fontSize: 40 }} />}
            title="Κατανάλωση"
            value={Math.round(powerConsumption)}
            unit="W"
            color="#ef5350"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<AccessTimeIcon sx={{ fontSize: 40 }} />}
            title="Αυτονομία"
            value={Math.round(timeRemaining)}
            unit="ώρες"
            color="#66bb6a"
          />
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              borderRadius: '12px'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 3 
            }}>
              <Typography variant="h6" color="text.secondary">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AcUnitIcon /> Έλεγχος Κλιματισμού
                </Box>
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={acSettings.autoMode}
                    onChange={(e) => {
                      setAcSettings(prev => ({
                        ...prev,
                        autoMode: e.target.checked,
                        mode: e.target.checked ? 'auto' : prev.mode
                      }));
                    }}
                  />
                }
                label="Αυτόματη λειτουργία"
              />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{ 
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    zIndex: 1
                  }}>
                    <IconButton 
                      onClick={handleAcToggle}
                      sx={{
                        bgcolor: acSettings.isOn ? 'primary.main' : 'grey.300',
                        color: acSettings.isOn ? 'white' : 'grey.700',
                        '&:hover': {
                          bgcolor: acSettings.isOn ? 'primary.dark' : 'grey.400'
                        },
                        boxShadow: 2
                      }}
                      size="large"
                    >
                      <PowerSettingsNewIcon />
                    </IconButton>
                  </Box>

                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3,
                      color: darkMode ? '#ffffff' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    {acSettings.isOn ? 'Ενεργό' : 'Ανενεργό'}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 2,
                        color: darkMode ? '#b0bec5' : '#546e7a'
                      }}
                    >
                      Θερμοκρασία
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      px: 2 
                    }}>
                      <ThermostatIcon 
                        sx={{ 
                          color: acSettings.temperature > 24 ? '#f44336' : '#2196f3',
                          fontSize: 30
                        }} 
                      />
                      <Slider
                        value={acSettings.temperature}
                        onChange={handleTempChange}
                        min={16}
                        max={30}
                        disabled={!acSettings.isOn || acSettings.autoMode}
                        marks={[
                          { value: 16, label: '16°C' },
                          { value: 23, label: '23°C' },
                          { value: 30, label: '30°C' }
                        ]}
                        sx={{
                          '& .MuiSlider-markLabel': {
                            color: darkMode ? '#b0bec5' : '#546e7a'
                          }
                        }}
                      />
                      <Typography 
                        variant="h6"
                        sx={{ 
                          minWidth: 60,
                          color: darkMode ? '#ffffff' : '#2c3e50'
                        }}
                      >
                        {acSettings.temperature}°C
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>Λειτουργία</InputLabel>
                        <Select
                          value={acSettings.mode}
                          label="Λειτουργία"
                          onChange={(e) => setAcSettings(prev => ({
                            ...prev,
                            mode: e.target.value
                          }))}
                          disabled={!acSettings.isOn || acSettings.autoMode}
                        >
                          <MenuItem value="cool">Ψύξη</MenuItem>
                          <MenuItem value="heat">Θέρμανση</MenuItem>
                          <MenuItem value="auto">Αυτόματο</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>Ταχύτητα</InputLabel>
                        <Select
                          value={acSettings.fanSpeed}
                          label="Ταχύτητα"
                          onChange={(e) => setAcSettings(prev => ({
                            ...prev,
                            fanSpeed: e.target.value
                          }))}
                          disabled={!acSettings.isOn || acSettings.autoMode}
                        >
                          <MenuItem value="low">Χαμηλή</MenuItem>
                          <MenuItem value="medium">Μεσαία</MenuItem>
                          <MenuItem value="high">Υψηλή</MenuItem>
                          <MenuItem value="auto">Αυτόματη</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3,
                      color: darkMode ? '#ffffff' : '#2c3e50'
                    }}
                  >
                    Κατανάλωση Ενέργειας A/C
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: darkMode ? '#4fc3f7' : '#0288d1',
                        mb: 1
                      }}
                    >
                      {calculateAcConsumption()} W
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ color: darkMode ? '#b0bec5' : '#546e7a' }}
                    >
                      Τρέχουσα κατανάλωση
                    </Typography>
                  </Box>
                  {/* Εδώ μπορείς να προσθέσεις το γράφημα κατανάλωσης */}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Historical Graph */}
        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              borderRadius: '12px',
              height: '400px'
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Ιστορικό Ενέργειας (24 ώρες)
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <Line data={chartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnergyManagement;