import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Fade,
  IconButton,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const tourSteps = [
  {
    target: 'location-card',
    title: 'Επιλογή Camping',
    content: 'Ξεκινήστε επιλέγοντας το camping που βρίσκεστε. Αυτό θα ξεκλειδώσει όλες τις λειτουργίες της εφαρμογής.',
    placement: 'bottom'
  },
  {
    target: 'weather-card',
    title: 'Καιρός',
    content: 'Δείτε τον τρέχοντα καιρό και την πρόγνωση για το camping σας.',
    placement: 'bottom'
  },
  {
    target: 'energy-card',
    title: 'Διαχείριση Ενέργειας',
    content: 'Παρακολουθήστε την κατανάλωση ενέργειας και την κατάσταση της μπαταρίας της σκηνής σας.',
    placement: 'bottom'
  },
  {
    target: 'lighting-card',
    title: 'Έλεγχος Φωτισμού',
    content: 'Ρυθμίστε το φωτισμό της σκηνής σας, επιλέξτε χρώματα και προκαθορισμένες ρυθμίσεις.',
    placement: 'bottom'
  },
  {
    target: 'events-card',
    title: 'Εκδηλώσεις',
    content: 'Ανακαλύψτε και δηλώστε συμμετοχή σε εκδηλώσεις που διοργανώνονται στο camping.',
    placement: 'top'
  }
];

const TourGuide = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      const element = document.getElementById(tourSteps[currentStep].target);
      if (element) {
        const rect = element.getBoundingClientRect();
        const placement = tourSteps[currentStep].placement;
        
        setPosition({
          top: placement === 'bottom' ? rect.bottom + 10 : rect.top - 160,
          left: rect.left + (rect.width / 2) - 150
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0,0,0,0.5)',
          zIndex: 1200
        }}
      />
      <Fade in={true}>
        <Paper
          elevation={4}
          sx={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            width: 300,
            p: 2,
            zIndex: 1300,
            transition: 'all 0.3s ease'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">{tourSteps[currentStep].title}</Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Typography variant="body2" sx={{ mb: 2 }}>
            {tourSteps[currentStep].content}
          </Typography>

          <Stepper activeStep={currentStep} sx={{ mb: 2 }}>
            {tourSteps.map((_, index) => (
              <Step key={index}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              startIcon={<NavigateBeforeIcon />}
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              Πίσω
            </Button>
            <Button
              endIcon={<NavigateNextIcon />}
              onClick={handleNext}
              variant="contained"
            >
              {currentStep === tourSteps.length - 1 ? 'Τέλος' : 'Επόμενο'}
            </Button>
          </Box>
        </Paper>
      </Fade>
    </>
  );
};

export default TourGuide; 