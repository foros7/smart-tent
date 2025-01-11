import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Paper, Box, LinearProgress, Stack } from '@mui/material';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const EnergyManagement = () => {
  // Simulated live data states
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [solarInput, setSolarInput] = useState(850);
  const [powerConsumption, setPowerConsumption] = useState(420);
  const [timeRemaining, setTimeRemaining] = useState(14.5);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuations in values
      setBatteryLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));
      setSolarInput(prev => Math.max(0, prev + (Math.random() - 0.5) * 50));
      setPowerConsumption(prev => Math.max(0, prev + (Math.random() - 0.5) * 30));
      setTimeRemaining(prev => Math.max(0, prev + (Math.random() - 0.5)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#2c3e50', fontWeight: 'bold' }}>
        Διαχείριση Ενέργειας
      </Typography>

      <Grid container spacing={3}>
        {/* Battery Level */}
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            icon={<BatteryChargingFullIcon sx={{ fontSize: 40 }} />}
            title="Στάθμη Μπαταρίας"
            value={batteryLevel.toFixed(1)}
            unit="%"
            color={getBatteryColor(batteryLevel)}
            progress={batteryLevel}
          />
        </Grid>

        {/* Solar Input */}
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            icon={<SolarPowerIcon sx={{ fontSize: 40 }} />}
            title="Ηλιακή Ενέργεια"
            value={solarInput.toFixed(0)}
            unit="W"
            color="#ffa726"
          />
        </Grid>

        {/* Power Consumption */}
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            icon={<ElectricMeterIcon sx={{ fontSize: 40 }} />}
            title="Κατανάλωση"
            value={powerConsumption.toFixed(0)}
            unit="W"
            color="#ef5350"
          />
        </Grid>

        {/* Time Remaining */}
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            icon={<AccessTimeIcon sx={{ fontSize: 40 }} />}
            title="Εκτίμηση Αυτονομίας"
            value={timeRemaining.toFixed(1)}
            unit="ώρες"
            color="#66bb6a"
          />
        </Grid>

        {/* Historical Graph could be added here */}
        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: '12px',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Ιστορικό Ενέργειας (24 ώρες)
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnergyManagement;