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
  onSubmitOrder,
}) {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'];

  const { nextStep, activeStep, maxStepReached, goToStep, canAdvance } =
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
            cakeData={cakeData}
            ingredients={ingredients}
            essentials={essentials}
            onSubmit={onSubmitOrder}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = step => {
    const titles = [
      'Escolha os Ingredientes',
      'Defina o Tema e Referência',
      'Adicione Observações',
      'Revise e Finalize',
    ];
    return titles[step] || 'Etapa';
  };

  return (
    <>
      <Container sx={{ p: 3 }}>
        <PageHeader
          titulo='Pedido Personalizado'
          subtitulo={getStepTitle(activeStep)}
          showBackButton={true}
        />
        <StepperComponent
          steps={steps}
          activeStep={activeStep}
          maxStepReached={maxStepReached}
          onStepChange={goToStep}
        />
      </Container>

      <Box sx={{ minHeight: 'calc(100vh - 200px)' }}>
        {getStepContent(activeStep)}
      </Box>
    </>
  );
}
