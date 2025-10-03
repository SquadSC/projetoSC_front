import { Box, Container } from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { StepperComponent } from '../../../components/stepper/stepper-component';
import { ModelComponent } from '../components/model/model.component';
import { CakeInfoComponent } from '../components/cake-info/cake-info.component';
import { AdditionalDetailsComponent } from '../components/detail/add-detail.component';
import { OrderSummary } from '../components/order-summary/order-summary.component';
import CustomCake from '../components/custom-cake/custom-cake';

export function OrderSummaryCakeView({ stepConfig, infoCake, refImages, ingredients }) {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'];
  const { nextStep, activeStep, maxStepReached, setActiveStep } = stepConfig;

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <CustomCake nextStep={nextStep} infoCake={infoCake} ingredients={ingredients} />;
      case 1:
        return <CakeInfoComponent nextStep={nextStep} infoCake={infoCake} refImages={refImages} />;
      case 2:
        return <AdditionalDetailsComponent nextStep={nextStep} infoCake={infoCake} />;
      case 3:
        return (
          <OrderSummary
            product={infoCake.product}
            onSubmit={() => console.log('Pedido finalizado!')}
          />
        );
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
