import { Box, Container } from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { StepperComponent } from '../../../components/stepper/stepper-component';
import { ModelComponent } from '../components/model/model.component';

export function OrderSummaryCakeView({
  stepConfig: { nextStep, activeStep, maxStepReached, setActiveStep },
}) {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'];

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <ModelComponent nextStep={nextStep} />;
      case 1:
        return <ModelComponent nextStep={nextStep} />;
      case 2:
        return <ModelComponent nextStep={nextStep} />;
      case 3:
        return <ModelComponent nextStep={nextStep} />;
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
      </Container>
      <Box> {getStepContent(activeStep)} </Box>
    </>
  );
}
