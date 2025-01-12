import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper 
      sx={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: '12px 12px 0 0'
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
        sx={{ 
          height: 60,
          '& .MuiBottomNavigationAction-root': {
            minWidth: { xs: 'auto', sm: 100 },
            padding: { xs: '6px 8px', sm: '6px 16px' }
          }
        }}
      >
        <BottomNavigationAction
          label="Αρχική"
          value="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction 
          label="Πλοήγηση" 
          value="/tourist-navigation" 
          icon={<LocationOnIcon />} 
        />
        <BottomNavigationAction
          label="Καιρός"
          value="/weather-tracking"
          icon={<WbSunnyIcon />}
        />
        <BottomNavigationAction
          label="Ενέργεια"
          value="/energy-management"
          icon={<BatteryChargingFullIcon />}
        />
        <BottomNavigationAction
          label="Φωτισμός"
          value="/lighting-control"
          icon={<LightbulbIcon />}
        />
        <BottomNavigationAction
          label="Φαγητό"
          value="/food-ordering"
          icon={<RestaurantIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;