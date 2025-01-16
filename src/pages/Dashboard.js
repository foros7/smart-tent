const Dashboard = ({ darkMode, showEvents }) => {
  // ... υπόλοιπος κώδικας

  return (
    <Box sx={{ py: 4, pb: 10 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Καλώς ήρθατε στο Interactive Tent
      </Typography>
      <List>
        {showEvents && (
          <ListItem>
            <ListItemText primary="Εκδηλώσεις" />
          </ListItem>
        )}
        {/* Υπόλοιπα widgets */}
      </List>
    </Box>
  );
}; 