import { Box, Container } from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { StepperComponent } from '../../../components/stepper/stepper-component';
import { ModelComponent } from '../components/model/model.component';
import { CakeInfoComponent } from '../components/cake-info/cake-info.component';

export function OrderSummaryCakeView({
  stepConfig,
  infoCake,
}) {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'];
  const { nextStep, activeStep, maxStepReached, setActiveStep } = stepConfig;

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <ModelComponent nextStep={nextStep} />;
      case 1:
        return <CakeInfoComponent nextStep={nextStep} infoCake={infoCake} />;
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
