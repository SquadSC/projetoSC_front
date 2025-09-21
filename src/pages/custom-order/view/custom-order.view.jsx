import { Box, Button, Container, Typography } from '@mui/material';
import { StepperComponent } from '../../../components/stepper/stepper-component';
import * as React from 'react';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { OrderSummary } from '../components/order-summary/order-summary.component';

export function CustomOrderView({ product, onSubmit }) {
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
        return <Typography variant='h6'>Personalize seu bolo</Typography>;
      case 1:
        return <Typography variant='h6'>Qual vai ser o tema?</Typography>;
      case 2:
        return <Typography variant='h6'>Detalhes adicionais</Typography>;
      case 3:
        return <OrderSummary product={product} onSubmit={onSubmit} />;
      default:
        return <Typography>Etapa desconhecida</Typography>;
    }
  };

  return (
    <>
    <Container sx={{ p: 3 }}>
      <PageHeader titulo='Pedido Personalizado' showBackButton={true} />
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
    </>
  );
}
