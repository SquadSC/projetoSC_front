import { Box, Container } from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { StepperComponent } from '../../../components/stepper/stepper-component';
import { CakeInfoComponent } from '../components/cake-info/cake-info.component';
import { AdditionalDetailsComponent } from '../components/detail/add-detail.component';
import { OrderSummary } from '../components/order-summary/order-summary.component';
import CustomCake from '../components/custom-cake/custom-cake';

export function OrderSummaryCakeView({
  stepConfig,
  cakeData,
  imageData,
  ingredients,
  essentials,
}) {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'];
  const { nextStep, activeStep, maxStepReached, setActiveStep, canAdvance } =
    stepConfig;

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <CustomCake
            nextStep={nextStep}
            cakeData={cakeData}
            essentials={essentials}
            canAdvance={canAdvance}
          />
        );
      case 1:
        return (
          <CakeInfoComponent
            nextStep={nextStep}
            cakeData={cakeData}
            imageData={imageData}
            canAdvance={canAdvance}
          />
        );
      case 2:
        return (
          <AdditionalDetailsComponent
            nextStep={nextStep}
            cakeData={cakeData}
            canAdvance={canAdvance}
          />
        );
      case 3:
        return (
          <OrderSummary
            product={cakeData.product}
            onSubmit={() => console.log('Pedido finalizado!')}
          />
        );
      default:
        return null;
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
