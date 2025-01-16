import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';

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
          overflowX: 'auto',
          '& .MuiBottomNavigationAction-root': {
            minWidth: { xs: 'auto', sm: 80 },
            padding: { xs: '6px 8px', sm: '6px 12px' },
            '& .MuiBottomNavigationAction-label': {
              fontSize: { xs: '0.625rem', sm: '0.75rem' }
            }
          }
        }}
      >
        <BottomNavigationAction
          label="Αρχική"
          value="/"
          icon={<HomeIcon />}
          sx={{ flex: { xs: '1 1 auto', sm: 'none' } }}
        />
        <BottomNavigationAction 
          label="Χάρτης" 
          value="/tourist-navigation" 
          icon={<LocationOnIcon />} 
          sx={{ flex: { xs: '1 1 auto', sm: 'none' } }}
        />
        <BottomNavigationAction
          label="Καιρός"
          value="/weather-tracking"
          icon={<WbSunnyIcon />}
          sx={{ flex: { xs: '1 1 auto', sm: 'none' } }}
        />
        <BottomNavigationAction
          label="Ενέργεια"
          value="/energy-management"
          icon={<BatteryChargingFullIcon />}
          sx={{ flex: { xs: '1 1 auto', sm: 'none' } }}
        />
        <BottomNavigationAction
          label="Φωτισμός"
          value="/lighting-control"
          icon={<LightbulbIcon />}
          sx={{ flex: { xs: '1 1 auto', sm: 'none' } }}
        />
        <BottomNavigationAction
          label="Φαγητό"
          value="/food-ordering"
          icon={<RestaurantIcon />}
          sx={{ flex: { xs: '1 1 auto', sm: 'none' } }}
        />
        <BottomNavigationAction
          label="Events"
          value="/events"
          icon={<EventIcon />}
          sx={{ flex: { xs: '1 1 auto', sm: 'none' } }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;