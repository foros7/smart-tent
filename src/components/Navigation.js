import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        zIndex: 1000
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          navigate(newValue);
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
          label="Παραγγελίες" 
          value="/food-ordering" 
          icon={<RestaurantIcon />} 
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;