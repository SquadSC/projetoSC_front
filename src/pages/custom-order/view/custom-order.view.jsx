import { Box, Button, Container, Typography } from '@mui/material';
import { StepperComponent } from '../../../components/stepper/stepper-component';
import * as React from 'react';

export function CustomOrderView() {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'];

  const [activeStep, setActiveStep] = React.useState(0);
  const [maxStepReached, setMaxStepReached] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prev => {
      const nextStep = prev + 1;
      setMaxStepReached(Math.max(maxStepReached, nextStep));
      return nextStep;
    });
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <Typography variant='h6'>Conteúdo da Etapa 1</Typography>;
      case 1:
        return <Typography variant='h6'>Conteúdo da Etapa 2</Typography>;
      case 2:
        return <Typography variant='h6'>Conteúdo da Etapa 3</Typography>;
      case 3:
        return <Typography variant='h6'>Conteúdo da Etapa 4</Typography>;
      default:
        return <Typography>Etapa desconhecida</Typography>;
    }
  };

  return (
    <Container sx={{ p: 3 }}>
      <StepperComponent
        steps={steps}
        activeStep={activeStep}
        maxStepReached={maxStepReached}
        onStepChange={setActiveStep}
      />

      <Box>
        {getStepContent(activeStep)}
      </Box>

      <Button
        variant='contained'
        color='primary'
        sx={{ mt: 2 }}
        onClick={handleNext}
        disabled={activeStep === steps.length - 1}
      >
        Próximo
      </Button>
    </Container>
  );
}
