import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Slider, Card, CardContent, IconButton, Stack, Button } from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

const LightingControl = ({ darkMode }) => {
  const [color, setColor] = useState('#ffffff');
  const [brightness, setBrightness] = useState(100);

  const presets = [
    { name: 'Ημέρα', color: '#FFE5B4', brightness: 100, icon: <WbSunnyIcon /> },
    { name: 'Νύχτα', color: '#4A5899', brightness: 30, icon: <NightlightIcon /> },
    { name: 'Χαλάρωση', color: '#FF7F50', brightness: 60, icon: <WbTwilightIcon /> },
    { name: 'Πάρτι', color: '#FF1493', brightness: 85, icon: <TheaterComedyIcon /> },
    { name: 'Ζεστό', color: '#FF4500', brightness: 75, icon: <LocalFireDepartmentIcon /> },
    { name: 'Ψυχρό', color: '#87CEEB', brightness: 80, icon: <AcUnitIcon /> },
  ];

  const applyPreset = (preset) => {
    setColor(preset.color);
    setBrightness(preset.brightness);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, pb: { xs: 8, sm: 10 } }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 3, 
          color: darkMode ? '#ffffff' : '#2c3e50',
          fontWeight: 'bold' 
        }}
      >
        Έλεγχος Φωτισμού
      </Typography>

      <Grid container spacing={2}>
        {/* Color Preview */}
        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              height: '100px', 
              borderRadius: '12px',
              bgcolor: color,
              opacity: brightness / 100,
              transition: 'all 0.3s ease'
            }} 
          />
        </Grid>

        {/* Presets */}
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              p: 3, 
              bgcolor: darkMode ? '#132f4c' : '#ffffff',
              borderRadius: '12px'
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: darkMode ? '#ffffff' : '#2c3e50' 
              }}
            >
              Προεπιλογές
            </Typography>
            <Grid container spacing={2}>
              {presets.map((preset, index) => (
                <Grid item xs={6} sm={4} md={2} key={index}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      bgcolor: darkMode ? '#0a1929' : '#ffffff',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        bgcolor: darkMode ? '#173954' : '#f5f5f5'
                      }
                    }}
                    onClick={() => applyPreset(preset)}
                  >
                    <CardContent>
                      <Stack 
                        direction="column" 
                        spacing={1} 
                        alignItems="center"
                      >
                        <IconButton 
                          sx={{ 
                            bgcolor: preset.color,
                            opacity: preset.brightness / 100,
                            '&:hover': { bgcolor: preset.color }
                          }}
                        >
                          {preset.icon}
                        </IconButton>
                        <Typography 
                          variant="body2"
                          sx={{ 
                            color: darkMode ? '#ffffff' : '#2c3e50'
                          }}
                        >
                          {preset.name}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Color Picker */}
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: '12px',
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
              Επιλογή Χρώματος
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <HexColorPicker color={color} onChange={setColor} />
            </Box>
          </Paper>
        </Grid>

        {/* Brightness Control */}
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: '12px',
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
              Φωτεινότητα
            </Typography>
            <Box sx={{ px: 2 }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <NightlightIcon sx={{ color: darkMode ? '#ffffff' : '#666' }} />
                <Slider
                  value={brightness}
                  onChange={(e, newValue) => setBrightness(newValue)}
                  aria-labelledby="brightness-slider"
                  valueLabelDisplay="auto"
                  sx={{
                    '& .MuiSlider-thumb': {
                      width: 24,
                      height: 24,
                    }
                  }}
                />
                <WbSunnyIcon sx={{ color: darkMode ? '#ffffff' : '#666' }} />
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LightingControl;
