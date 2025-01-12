import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  IconButton,
  Badge,
  Fab
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import DeleteIcon from '@mui/icons-material/Delete';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CloseIcon from '@mui/icons-material/Close';
import { Slide } from '@mui/material';
import { AppBar, Toolbar } from '@mui/material';

const menuItems = [
  // Καφέδες
  {
    id: 1,
    name: 'Καφές Ελληνικός',
    price: 2.50,
    category: 'coffee',
    description: 'Παραδοσιακός ελληνικός καφές'
  },
  {
    id: 2,
    name: 'Freddo Espresso',
    price: 3.00,
    category: 'coffee',
    description: 'Παγωμένος εσπρέσο με πάγο'
  },
  {
    id: 3,
    name: 'Cappuccino',
    price: 3.50,
    category: 'coffee',
    description: 'Εσπρέσο με αφρόγαλα'
  },
  {
    id: 4,
    name: 'Freddo Cappuccino',
    price: 3.50,
    category: 'coffee',
    description: 'Παγωμένος καπουτσίνο με κρύο αφρόγαλα'
  },
  // Ποτά
  {
    id: 5,
    name: 'Coca Cola',
    price: 2.00,
    category: 'drinks',
    description: 'Αναψυκτικό 330ml'
  },
  {
    id: 6,
    name: 'Φυσικός Χυμός Πορτοκάλι',
    price: 3.50,
    category: 'drinks',
    description: 'Φρεσκοστυμμένος χυμός'
  },
  {
    id: 7,
    name: 'Νερό',
    price: 0.50,
    category: 'drinks',
    description: 'Εμφιαλωμένο νερό 500ml'
  },
  {
    id: 8,
    name: 'Sprite',
    price: 2.00,
    category: 'drinks',
    description: 'Αναψυκτικό 330ml'
  },
  {
    id: 9,
    name: 'Λεμονάδα',
    price: 3.00,
    category: 'drinks',
    description: 'Σπιτική λεμονάδα με δυόσμο'
  },
  // Πρωινά
  {
    id: 10,
    name: 'Τοστ',
    price: 3.00,
    category: 'breakfast',
    description: 'Με ζαμπόν και τυρί'
  },
  {
    id: 11,
    name: 'Ομελέτα',
    price: 6.00,
    category: 'breakfast',
    description: 'Με τυρί, ζαμπόν, μπέικον και λαχανικά'
  },
  {
    id: 12,
    name: 'Γιαούρτι με μέλι',
    price: 4.50,
    category: 'breakfast',
    description: 'Ελληνικό γιαούρτι με μέλι και καρύδια'
  },
  {
    id: 13,
    name: 'Pancakes',
    price: 6.50,
    category: 'breakfast',
    description: 'Με σιρόπι σφενδάμου και φρούτα'
  },
  // Κυρίως Πιάτα
  {
    id: 14,
    name: 'Club Sandwich',
    price: 6.50,
    category: 'food',
    description: 'Με ζαμπόν, τυρί, μπέικον, μαρούλι, ντομάτα'
  },
  {
    id: 15,
    name: 'Χωριάτικη Σαλάτα',
    price: 7.00,
    category: 'food',
    description: 'Ντομάτα, αγγούρι, κρεμμύδι, ελιές, φέτα'
  },
  {
    id: 16,
    name: 'Πίτα Γύρο Χοιρινό',
    price: 4.50,
    category: 'food',
    description: 'Με τζατζίκι, ντομάτα, κρεμμύδι, πατάτες'
  },
  {
    id: 17,
    name: 'Μπιφτέκια Σχάρας',
    price: 9.50,
    category: 'food',
    description: 'Με πατάτες και σαλάτα'
  },
  {
    id: 18,
    name: 'Σουβλάκι Κοτόπουλο',
    price: 8.50,
    category: 'food',
    description: 'Με πιτάκια, τζατζίκι και πατάτες'
  },
  // Σνακς
  {
    id: 19,
    name: 'Πατάτες Τηγανητές',
    price: 3.50,
    category: 'snacks',
    description: 'Φρέσκιες τηγανητές πατάτες'
  },
  {
    id: 20,
    name: 'Nachos',
    price: 5.50,
    category: 'snacks',
    description: 'Με τυρί, guacamole και σάλτσα'
  },
  {
    id: 21,
    name: 'Onion Rings',
    price: 4.00,
    category: 'snacks',
    description: 'Τραγανά κρεμμύδια πανέ'
  },
  // Επιδόρπια
  {
    id: 22,
    name: 'Σοκολατόπιτα',
    price: 5.00,
    category: 'desserts',
    description: 'Με παγωτό βανίλια'
  },
  {
    id: 23,
    name: 'Cheesecake',
    price: 5.50,
    category: 'desserts',
    description: 'Με σάλτσα φρούτων του δάσους'
  },
  {
    id: 24,
    name: 'Παγωτό',
    price: 3.00,
    category: 'desserts',
    description: 'Διάφορες γεύσεις (ανά μπάλα)'
  }
];

const FoodOrdering = ({ darkMode }) => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [selectedTime, setSelectedTime] = useState('');
  const [openCart, setOpenCart] = useState(false);

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    setNotification({
      open: true,
      message: 'Προστέθηκε στο καλάθι',
      severity: 'success'
    });
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
        Παραγγελία Φαγητού
      </Typography>

      <Grid container spacing={2}>
        {/* Menu Categories */}
        <Grid item xs={12}>
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 1, 
              mb: 2, 
              flexWrap: 'wrap',
              '& .MuiChip-root': {
                mb: 1  // Προσθήκη margin για καλύτερη εμφάνιση σε μικρές οθόνες
              }
            }}
          >
            <Chip 
              icon={<RestaurantIcon />} 
              label="Όλα" 
              onClick={() => setSelectedCategory('all')}
              color={selectedCategory === 'all' ? 'primary' : 'default'}
            />
            <Chip 
              icon={<LocalCafeIcon />} 
              label="Καφέδες" 
              onClick={() => setSelectedCategory('coffee')}
              color={selectedCategory === 'coffee' ? 'primary' : 'default'}
            />
            <Chip 
              icon={<LocalBarIcon />} 
              label="Ποτά" 
              onClick={() => setSelectedCategory('drinks')}
              color={selectedCategory === 'drinks' ? 'primary' : 'default'}
            />
            <Chip 
              icon={<BrunchDiningIcon />} 
              label="Πρωινά" 
              onClick={() => setSelectedCategory('breakfast')}
              color={selectedCategory === 'breakfast' ? 'primary' : 'default'}
            />
            <Chip 
              icon={<RestaurantIcon />} 
              label="Κυρίως Πιάτα" 
              onClick={() => setSelectedCategory('food')}
              color={selectedCategory === 'food' ? 'primary' : 'default'}
            />
            <Chip 
              icon={<LunchDiningIcon />} 
              label="Σνακς" 
              onClick={() => setSelectedCategory('snacks')}
              color={selectedCategory === 'snacks' ? 'primary' : 'default'}
            />
            <Chip 
              icon={<IcecreamIcon />} 
              label="Επιδόρπια" 
              onClick={() => setSelectedCategory('desserts')}
              color={selectedCategory === 'desserts' ? 'primary' : 'default'}
            />
          </Box>
        </Grid>

        {/* Menu Items & Cart */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Card sx={{ 
                  display: 'flex', 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: { xs: 'none', sm: 'translateY(-4px)' },  // Απενεργοποίηση hover σε κινητά
                    boxShadow: 3
                  }
                }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      {item.price.toFixed(2)}€
                    </Typography>
                    <Button 
                      variant="contained" 
                      size="small" 
                      sx={{ mt: 1 }}
                      onClick={() => addToCart(item)}
                    >
                      Προσθήκη
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Shopping Cart - Sticky σε desktop, Modal σε κινητά */}
        <Grid 
          item 
          xs={12} 
          md={4} 
          sx={{ 
            display: { xs: 'none', md: 'block' }  // Απόκρυψη σε κινητά
          }}
        >
          <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Badge badgeContent={getTotalItems()} color="primary">
                <ShoppingCartIcon sx={{ mr: 1 }} />
              </Badge>
              <Typography variant="h6" sx={{ ml: 1 }}>
                Καλάθι
              </Typography>
            </Box>
            
            {cart.map((item) => (
              <Box key={item.id} sx={{ 
                mb: 2, 
                p: 1, 
                borderRadius: 1,
                bgcolor: 'background.default'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1">
                    {item.name}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Button 
                    size="small" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <Button 
                    size="small" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Typography sx={{ ml: 'auto' }}>
                    {(item.price * item.quantity).toFixed(2)}€
                  </Typography>
                </Box>
              </Box>
            ))}

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">
                Σύνολο: {getTotalPrice().toFixed(2)}€
              </Typography>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => setOpenDialog(true)}
                disabled={cart.length === 0}
              >
                Ολοκλήρωση Παραγγελίας
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Floating Cart Button για κινητά */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 80,  // Πάνω από το bottom navigation
            right: 16,
            display: { xs: 'block', md: 'none' },
            zIndex: 1000
          }}
        >
          <Fab
            color="primary"
            onClick={() => setOpenCart(true)}
            sx={{ boxShadow: 3 }}
          >
            <Badge badgeContent={getTotalItems()} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Fab>
        </Box>

        {/* Cart Modal για κινητά */}
        <Dialog
          fullScreen
          open={openCart}
          onClose={() => setOpenCart(false)}
          TransitionComponent={Slide}
          TransitionProps={{ direction: 'up' }}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setOpenCart(false)}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
                Καλάθι
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Badge badgeContent={getTotalItems()} color="primary">
                <ShoppingCartIcon sx={{ mr: 1 }} />
              </Badge>
              <Typography variant="h6" sx={{ ml: 1 }}>
                Καλάθι
              </Typography>
            </Box>
            
            {cart.map((item) => (
              <Box key={item.id} sx={{ 
                mb: 2, 
                p: 1, 
                borderRadius: 1,
                bgcolor: 'background.default'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1">
                    {item.name}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Button 
                    size="small" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <Button 
                    size="small" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Typography sx={{ ml: 'auto' }}>
                    {(item.price * item.quantity).toFixed(2)}€
                  </Typography>
                </Box>
              </Box>
            ))}

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">
                Σύνολο: {getTotalPrice().toFixed(2)}€
              </Typography>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => setOpenDialog(true)}
                disabled={cart.length === 0}
              >
                Ολοκλήρωση Παραγγελίας
              </Button>
            </Box>
          </Box>
        </Dialog>
      </Grid>

      {/* Checkout Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Ολοκλήρωση Παραγγελίας</DialogTitle>
        <DialogContent>
          <TextField
            label="Επιθυμητή ώρα παράδοσης"
            type="time"
            fullWidth
            sx={{ mt: 2 }}
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Ακύρωση</Button>
          <Button 
            onClick={() => {
              setOpenDialog(false);
              setCart([]);
              setNotification({
                open: true,
                message: 'Η παραγγελία σας καταχωρήθηκε!',
                severity: 'success'
              });
            }} 
            variant="contained"
          >
            Επιβεβαίωση
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
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

export default FoodOrdering; 