import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Fade } from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

const LoginAnimation = ({ onComplete, darkMode }) => {
  const [showSky, setShowSky] = useState(false);
  const [showTrees, setShowTrees] = useState(false);
  const [showTent, setShowTent] = useState(false);
  const [showFire, setShowFire] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowSky(true), 200);
    setTimeout(() => setShowTrees(true), 500);
    setTimeout(() => setShowTent(true), 1000);
    setTimeout(() => setShowFire(true), 1500);
    setTimeout(() => setShowText(true), 2000);
    setTimeout(() => {
      setShowProgress(false);
      setTimeout(onComplete, 500);
    }, 3500);
  }, [onComplete]);

  return (
    <Fade in={true}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: darkMode ? '#0a1929' : '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative', mb: 4, width: 300, height: 200 }}>
          {/* Sky */}
          <Fade in={showSky}>
            <Box sx={{ position: 'absolute', top: -20, right: 20 }}>
              <NightsStayIcon 
                sx={{ 
                  fontSize: 40, 
                  color: darkMode ? '#90caf9' : '#5c6bc0',
                  opacity: 0.8
                }} 
              />
              {[...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    width: 2,
                    height: 2,
                    bgcolor: 'white',
                    borderRadius: '50%',
                    top: Math.random() * 30,
                    left: Math.random() * 30,
                    animation: `twinkle ${1 + Math.random()}s infinite alternate`
                  }}
                />
              ))}
            </Box>
          </Fade>

          {/* Trees in background */}
          <Fade in={showTrees}>
            <Box sx={{ 
              position: 'absolute', 
              width: '140%', 
              display: 'flex', 
              justifyContent: 'space-between',
              bottom: 20,
              left: '-20%'
            }}>
              {[...Array(5)].map((_, i) => (
                <ForestIcon 
                  key={i}
                  sx={{ 
                    fontSize: 50 + Math.random() * 20, 
                    color: darkMode ? '#1b5e20' : '#2e7d32',
                    opacity: 0.8 + Math.random() * 0.2,
                    transform: `translateX(${Math.random() * 10}px)`
                  }} 
                />
              ))}
            </Box>
          </Fade>

          {/* Tent */}
          <Fade in={showTent}>
            <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
             
            </Box>
          </Fade>

          {/* Campfire */}
          <Fade in={showFire}>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1,
                textAlign: 'center'
              }}
            >
              <LocalFireDepartmentIcon 
                sx={{ 
                  fontSize: 40, 
                  color: '#ff9800',
                  animation: 'flicker 0.5s infinite alternate',
                  '@keyframes flicker': {
                    '0%': {
                      opacity: 0.8,
                      transform: 'scale(0.95) rotate(-5deg)',
                      color: '#ff9800'
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'scale(1.05) rotate(5deg)',
                      color: '#f57c00'
                    },
                  },
                }} 
              />
              <Box
                sx={{
                  width: 40,
                  height: 20,
                  background: 'radial-gradient(circle, rgba(255,152,0,0.3) 0%, rgba(255,152,0,0) 70%)',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: 'glow 1s infinite alternate'
                }}
              />
            </Box>
          </Fade>
        </Box>
        
        <Fade in={showText}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              textAlign: 'center',
              color: darkMode ? '#90caf9' : '#1976d2',
              textShadow: darkMode 
                ? '0 2px 4px rgba(0,0,0,0.5)' 
                : '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Interactive Tent
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mt: 1,
                color: darkMode ? '#b0bec5' : '#546e7a',
                fontStyle: 'italic'
              }}
            >
              Your Smart Camping Experience
            </Typography>
          </Typography>
        </Fade>

        <Fade in={showProgress}>
          <CircularProgress 
            size={40} 
            sx={{
              opacity: 0.7,
              color: darkMode ? '#90caf9' : '#1976d2'
            }}
          />
        </Fade>
      </Box>
    </Fade>
  );
};

export default LoginAnimation; 