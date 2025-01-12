import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  CssBaseline, 
  Grid, 
  Card, 
  CardContent, 
  Box, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Components
import Navigation from "./components/Navigation";
import TouristNavigation from "./pages/TouristNavigation";
import WeatherTracking from "./pages/WeatherTracking";
import EnergyManagement from "./pages/EnergyManagement";
import LightingControl from "./pages/LightingControl";
import FoodOrdering from './pages/FoodOrdering';

// Data
import { campingLocations } from './data/locations';

// Charts
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

// Icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DragHandleIcon from '@mui/icons-material/DragHandle';

// Drag and Drop
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

// Card Components
const WeatherCard = ({ data, onClick, layout }) => (
  <Paper
    elevation={3}
    sx={{
      height: '100%',
      transition: 'transform 0.2s',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
      borderRadius: 2,
      overflow: 'hidden'
    }}
    onClick={onClick}
  >
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <WbSunnyIcon sx={{ mr: 1, color: '#FFB300' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Καιρός
          </Typography>
        </Box>
        {data.weather ? (
          <>
            <Typography variant="h4" sx={{ mb: 1, color: data.weather.main?.temp > 30 ? '#f44336' : '#4caf50' }}>
              {Math.round(data.weather.main?.temp)}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Υγρασία: {data.weather.main?.humidity}%
            </Typography>
          </>
        ) : (
          <Typography color="text.secondary">Φόρτωση...</Typography>
        )}
      </CardContent>
    </Card>
  </Paper>
);

const EnergyCard = ({ data, onClick, layout }) => (
  <Paper
    elevation={3}
    sx={{
      height: '100%',
      transition: 'transform 0.2s',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
      borderRadius: 2,
      overflow: 'hidden'
    }}
    onClick={onClick}
  >
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BatteryChargingFullIcon 
            sx={{ 
              mr: 1, 
              color: data.energy.batteryLevel > 60 ? '#4caf50' : data.energy.batteryLevel > 30 ? '#ff9800' : '#f44336' 
            }} 
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Ενέργεια
          </Typography>
        </Box>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1, 
            color: data.energy.batteryLevel > 60 ? '#4caf50' : data.energy.batteryLevel > 30 ? '#ff9800' : '#f44336'
          }}
        >
          {data.energy.batteryLevel}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Παραγωγή: {data.energy.solarInput}W
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Απόδοση: {data.energy.efficiency}%
        </Typography>
      </CardContent>
    </Card>
  </Paper>
);

const LightingCard = ({ data, onClick, layout }) => (
  <Paper
    elevation={3}
    sx={{
      height: '100%',
      transition: 'transform 0.2s',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
      borderRadius: 2,
      overflow: 'hidden'
    }}
    onClick={onClick}
  >
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LightbulbIcon sx={{ mr: 1, color: '#FFA726' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Φωτισμός
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {data.lighting.brightness}%
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              bgcolor: data.lighting.color,
              border: '2px solid #ddd'
            }} 
          />
          <Typography variant="body2" color="text.secondary">
            {data.lighting.mode === 'auto' ? 'Αυτόματη' : 'Χειροκίνητη'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Paper>
);

const LocationCard = ({ data, onClick, layout }) => (
  <Paper
    elevation={3}
    sx={{
      height: '100%',
      transition: 'transform 0.2s',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
      borderRadius: 2,
      overflow: 'hidden'
    }}
    onClick={onClick}
  >
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOnIcon sx={{ mr: 1, color: '#E91E63' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Τοποθεσία
          </Typography>
        </Box>
        {data.location ? (
          <>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {data.location.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.location.type === 'beach' ? 'Παραθαλάσσιο' : 'Ορεινό'} Camping
            </Typography>
          </>
        ) : (
          <Typography color="text.secondary">Επιλέξτε τοποθεσία...</Typography>
        )}
      </CardContent>
    </Card>
  </Paper>
);

// Helper function for card titles
const getCardTitle = (cardType) => {
  const titles = {
    weather: 'Καιρός',
    energy: 'Ενέργεια',
    lighting: 'Φωτισμός',
    location: 'Τοποθεσία'
  };
  return titles[cardType];
};

const Dashboard = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  
  const defaultSettings = {
    layout: 'grid',
    visibleCards: {
      weather: true,
      location: true,
      energy: true,
      lighting: true
    },
    showChart: true
  };
  
  const [dashboardSettings, setDashboardSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('dashboard_settings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch (error) {
      console.error('Error loading dashboard settings:', error);
      return defaultSettings;
    }
  });

  // Add settings menu state
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('dashboard_settings', JSON.stringify(dashboardSettings));
  }, [dashboardSettings]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    if (source.index === destination.index) return;
    
    const newOrder = Array.from(dashboardSettings.cardsOrder);
    const [removed] = newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, removed);
    
    const newSettings = {
      ...dashboardSettings,
      cardsOrder: newOrder
    };
    
    setDashboardSettings(newSettings);
    localStorage.setItem('dashboard_settings', JSON.stringify(newSettings));
  };

  const getCardSize = () => {
    return dashboardSettings.layout === 'list' ? 12 : 3;
  };

  // Settings menu component
  const SettingsMenu = () => (
    <Dialog 
      open={settingsOpen} 
      onClose={() => setSettingsOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SettingsIcon sx={{ mr: 1 }} />
          Ρυθμίσεις Dashboard
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          {/* Layout Selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Διάταξη</InputLabel>
            <Select
              value={dashboardSettings.layout}
              label="Διάταξη"
              onChange={(e) => {
                const newSettings = {
                  ...dashboardSettings,
                  layout: e.target.value
                };
                setDashboardSettings(newSettings);
                localStorage.setItem('dashboard_settings', JSON.stringify(newSettings));
              }}
            >
              <MenuItem value="grid">Πλέγμα</MenuItem>
              <MenuItem value="list">Λίστα</MenuItem>
            </Select>
          </FormControl>

          {/* Visible Cards */}
          <Typography variant="subtitle1" gutterBottom>
            Ορατές Κάρτες
          </Typography>
          <Paper 
            variant="outlined" 
            sx={{ 
              mb: 3,
              p: 2,
              borderRadius: 1
            }}
          >
            <List>
              {Object.entries(dashboardSettings.visibleCards).map(([card, isVisible]) => (
                <ListItem 
                  key={card}
                  secondaryAction={
                    <Switch
                      edge="end"
                      checked={isVisible}
                      onChange={() => {
                        const newSettings = {
                          ...dashboardSettings,
                          visibleCards: {
                            ...dashboardSettings.visibleCards,
                            [card]: !isVisible
                          }
                        };
                        setDashboardSettings(newSettings);
                        localStorage.setItem('dashboard_settings', JSON.stringify(newSettings));
                      }}
                    />
                  }
                >
                  <ListItemIcon>
                    {card === 'weather' && <WbSunnyIcon />}
                    {card === 'energy' && <BatteryChargingFullIcon />}
                    {card === 'lighting' && <LightbulbIcon />}
                    {card === 'location' && <LocationOnIcon />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={getCardTitle(card)}
                    secondary={isVisible ? 'Ενεργό' : 'Ανενεργό'}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Show/Hide Chart */}
          <FormControlLabel
            control={
              <Switch
                checked={dashboardSettings.showChart}
                onChange={(e) => {
                  const newSettings = {
                    ...dashboardSettings,
                    showChart: e.target.checked
                  };
                  setDashboardSettings(newSettings);
                  localStorage.setItem('dashboard_settings', JSON.stringify(newSettings));
                }}
              />
            }
            label="Εμφάνιση γραφήματος ενέργειας"
          />

          {/* Dark Mode Switch */}
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                icon={<Brightness4Icon />}
                checkedIcon={<Brightness7Icon />}
              />
            }
            label={darkMode ? "Σκούρο θέμα" : "Φωτεινό θέμα"}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSettingsOpen(false)}>Κλείσιμο</Button>
      </DialogActions>
    </Dialog>
  );

  // Helper function to get card component by type
  const getCardComponent = (type) => {
    const cards = {
      weather: WeatherCard,
      energy: EnergyCard,
      lighting: LightingCard,
      location: LocationCard
    };
    return cards[type];
  };

  const [tentData, setTentData] = useState({
    weather: null,
    energy: {
      batteryLevel: 75,
      solarInput: 850,
      consumption: {
        lighting: 120,
        heating: 200,
        devices: 180
      },
      dailyProduction: 2400,
      efficiency: 92,
      temperature: 28
    },
    lighting: {
      brightness: 80,
      color: '#FFE5B4',
      mode: 'auto',
      schedule: {
        start: '18:00',
        end: '06:00'
      }
    },
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

      setTentData(prev => ({
        ...prev,
        weather: weatherData ? JSON.parse(weatherData).data : null,
        energy: energyData ? JSON.parse(energyData) : prev.energy,
        lighting: lightingData ? JSON.parse(lightingData) : prev.lighting,
        location: currentLocation
      }));
    };

    loadCachedData();
  }, []);

  const getStatusColor = (value, type) => {
    switch(type) {
      case 'battery':
        return value > 60 ? '#4caf50' : value > 30 ? '#ff9800' : '#f44336';
      case 'temperature':
        return value > 30 ? '#f44336' : value > 20 ? '#4caf50' : '#2196f3';
      case 'efficiency':
        return value > 90 ? '#4caf50' : value > 70 ? '#ff9800' : '#f44336';
      default:
        return '#4caf50';
    }
  };

  const handleCardClick = (cardType) => {
    const routes = {
      weather: '/weather-tracking',
      energy: '/energy-management',
      lighting: '/lighting-control',
      location: '/tourist-navigation'
    };

    navigate(routes[cardType]);
  };

  const getCardBgColor = (darkMode) => {
    return darkMode ? '#132f4c' : '#ffffff';
  };

  const getTextColor = (darkMode) => {
    return darkMode ? '#ffffff' : '#2c3e50';
  };

  const getSecondaryTextColor = (darkMode) => {
    return darkMode ? '#b0bec5' : '#546e7a';
  };

  // Ενημερώνουμε το style των καρτών
  const cardStyle = (darkMode) => ({
    backgroundColor: getCardBgColor(darkMode),
    color: getTextColor(darkMode),
    '& .MuiTypography-root': {
      color: getTextColor(darkMode)
    },
    '& .MuiTypography-secondary': {
      color: getSecondaryTextColor(darkMode)
    },
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: darkMode ? '#173954' : '#ffffff',
      transform: 'translateY(-4px)',
      boxShadow: darkMode ? '0 8px 16px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.1)'
    }
  });

  return (
    <Box sx={{ 
      py: 4, 
      pb: 10,
      bgcolor: 'background.default',
      minHeight: '100vh'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold',
            color: darkMode ? '#ffffff' : '#2c3e50'
          }}
        >
          Καλώς ήρθατε στο Interactive Tent
        </Typography>
        <IconButton onClick={() => setSettingsOpen(true)}>
          <SettingsIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {Object.entries(dashboardSettings?.visibleCards || defaultSettings.visibleCards)
          .filter(([_, isVisible]) => isVisible)
          .map(([cardType]) => (
            <Grid 
              item 
              xs={12} 
              md={getCardSize()}
              key={cardType}
            >
              {React.createElement(getCardComponent(cardType), {
                data: tentData,
                onClick: () => handleCardClick(cardType),
                layout: dashboardSettings?.layout || 'grid',
                sx: (dashboardSettings?.layout || 'grid') === 'list' ? {
                  '& .MuiPaper-root': {
                    display: 'flex',
                    flexDirection: 'row',
                    '& .MuiCardContent-root': {
                      flex: 1
                    }
                  }
                } : {}
              })}
            </Grid>
          ))}
      </Grid>

      {dashboardSettings.showChart && (
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ημερήσια Κατανάλωση Ενέργειας
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line
                data={{
                  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                  datasets: [
                    {
                      label: 'Παραγωγή (W)',
                      data: [200, 180, 600, 1200, 800, 300],
                      borderColor: '#4caf50',
                      tension: 0.4
                    },
                    {
                      label: 'Κατανάλωση (W)',
                      data: [400, 300, 350, 500, 600, 800],
                      borderColor: '#f44336',
                      tension: 0.4
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
      )}

      <SettingsMenu />
    </Box>
  );
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    secondary: {
      main: '#E91E63',
      light: '#ec407a',
      dark: '#c2185b'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: 8
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 8
        }
      }
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#b3e5fc',
      dark: '#42a5f5'
    },
    secondary: {
      main: '#f48fb1',
      light: '#f8bbd0',
      dark: '#ec407a'
    },
    background: {
      default: '#0a1929',
      paper: '#132f4c'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5'
    },
    action: {
      active: '#90caf9',
      hover: 'rgba(144, 202, 249, 0.08)',
      selected: 'rgba(144, 202, 249, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#132f4c',
          '&:hover': {
            backgroundColor: '#173954'
          },
          borderRadius: 8
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#132f4c',
          borderRadius: 8
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a1929',
          borderRadius: 0
        }
      }
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a1929'
        }
      }
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#90caf9',
          '&.Mui-selected': {
            color: '#ffffff'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff'
        },
        h4: {
          color: '#ffffff'
        },
        h5: {
          color: '#ffffff'
        },
        h6: {
          color: '#ffffff'
        },
        body1: {
          color: '#ffffff'
        },
        body2: {
          color: '#b0bec5'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#ffffff'
        },
        secondary: {
          color: '#b0bec5'
        }
      }
    }
  }
});

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router basename="/smart-tent">
        <Box sx={{ pb: 7 }}>
          <AppBar 
            position="static" 
            elevation={4}
            sx={{
              borderRadius: 0,
              mb: 2
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6">Interactive Tent</Typography>
              <IconButton 
                color="inherit" 
                onClick={() => setDarkMode(!darkMode)}
                sx={{ ml: 1 }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/smart-tent" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/tourist-navigation" element={<TouristNavigation darkMode={darkMode} />} />
              <Route path="/weather-tracking" element={<WeatherTracking darkMode={darkMode} />} />
              <Route path="/energy-management" element={<EnergyManagement darkMode={darkMode} />} />
              <Route path="/lighting-control" element={<LightingControl darkMode={darkMode} />} />
              <Route path="/food-ordering" element={<FoodOrdering darkMode={darkMode} />} />
            </Routes>
          </Container>
          <Navigation />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;