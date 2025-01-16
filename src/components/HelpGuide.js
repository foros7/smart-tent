import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EventIcon from '@mui/icons-material/Event';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const HelpGuide = ({ open, onClose, startTour }) => {
  const sections = [
    {
      title: 'Επιλογή Camping',
      icon: <LocationOnIcon color="primary" />,
      content: 'Επιλέξτε το camping στο οποίο βρίσκεστε για να ξεκλειδώσετε όλες τις λειτουργίες της εφαρμογής. Μπορείτε να το κάνετε αυτό από την καρτέλα "Τοποθεσία" στην αρχική οθόνη ή από το μενού πλοήγησης.'
    },
    {
      title: 'Καιρός',
      icon: <WbSunnyIcon sx={{ color: '#FFB300' }} />,
      content: 'Παρακολουθήστε τον τρέχοντα καιρό και την πρόγνωση για το camping σας. Δείτε θερμοκρασία, υγρασία και άλλες μετεωρολογικές πληροφορίες.'
    },
    {
      title: 'Διαχείριση Ενέργειας',
      icon: <BatteryChargingFullIcon sx={{ color: '#4CAF50' }} />,
      content: 'Ελέγξτε την κατανάλωση ενέργειας της σκηνής σας, την κατάσταση της μπαταρίας και την παραγωγή ενέργειας από τα ηλιακά πάνελ.'
    },
    {
      title: 'Έλεγχος Φωτισμού',
      icon: <LightbulbIcon sx={{ color: '#FFA726' }} />,
      content: 'Ρυθμίστε το φωτισμό της σκηνής σας. Επιλέξτε χρώματα, φωτεινότητα και προκαθορισμένες ρυθμίσεις για διάφορες περιστάσεις.'
    },
    {
      title: 'Εκδηλώσεις',
      icon: <EventIcon sx={{ color: '#E91E63' }} />,
      content: 'Ανακαλύψτε και δηλώστε συμμετοχή σε εκδηλώσεις που διοργανώνονται στο camping. Συζητήστε με άλλους συμμετέχοντες μέσω του chat.'
    },
    {
      title: 'Παραγγελία Φαγητού',
      icon: <RestaurantIcon sx={{ color: '#9C27B0' }} />,
      content: 'Παραγγείλτε φαγητό και ποτά από το εστιατόριο του camping απευθείας μέσω της εφαρμογής.'
    }
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Οδηγός Χρήσης</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Καλώς ήρθατε στο Interactive Tent! Εδώ θα βρείτε όλες τις πληροφορίες για τη χρήση της εφαρμογής.
        </Typography>
        
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mb: 2 }}
          onClick={() => {
            onClose();
            startTour();
          }}
        >
          Ξεκινήστε την Περιήγηση
        </Button>

        <Divider sx={{ mb: 2 }} />

        {sections.map((section, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {section.icon}
                <Typography>{section.title}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{section.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default HelpGuide; 