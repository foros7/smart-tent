import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import CloudIcon from "@mui/icons-material/Cloud";
import PowerIcon from "@mui/icons-material/Power";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const Navigation = () => {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Αρχική"
          value="/"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Πλοήγηση"
          value="/tourist-navigation"
          icon={<ExploreIcon />}
          component={Link}
          to="/tourist-navigation"
        />
        <BottomNavigationAction
          label="Καιρός"
          value="/weather-tracking"
          icon={<CloudIcon />}
          component={Link}
          to="/weather-tracking"
        />
        <BottomNavigationAction
          label="Ενέργεια"
          value="/energy-management"
          icon={<PowerIcon />}
          component={Link}
          to="/energy-management"
        />
        <BottomNavigationAction
          label="Φωτισμός"
          value="/lighting-control"
          icon={<LightbulbIcon />}
          component={Link}
          to="/lighting-control"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;