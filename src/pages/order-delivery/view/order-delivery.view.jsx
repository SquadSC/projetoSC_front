import { Box, Container } from '@mui/material';
import * as React from 'react';
import { StepperComponent } from '../../../components/stepper/stepper-component';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { CalendarUserComponent } from '../components/calendar-user/calendar-user.component';
import { DeliveryLocationComponent } from '../components/delivery-location/delivery-location.component';

export function OrderDeliveryView({
  addresses,
  selectedAddressId,
  isAddingAddress,
  fields,
  errors,
  isCepLoading,
  onSelectAddress,
  onAddNewAddress,
  onBackToAddressMenu,
  onChange,
  onSubmit
}) {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [maxStepReached, setMaxStepReached] = React.useState(0);

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    if (nextStep > maxStepReached) {
      setMaxStepReached(nextStep);
    }
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <CalendarUserComponent nextStep={handleNext} />;
      case 1:
        return <CalendarUserComponent nextStep={handleNext} />;
      case 2:
        return <DeliveryLocationComponent
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          isAddingAddress={isAddingAddress}
          fields={fields}
          errors={errors}
          isCepLoading={isCepLoading}
          onSelectAddress={onSelectAddress}
          onAddNewAddress={onAddNewAddress}
          onBackToAddressMenu={onBackToAddressMenu}
          onChange={onChange}
          onSubmit={onSubmit}
        />;
      default:
        return null;
    }
  };

  return (
    <>
      <Container sx={{ p: 3 }}>
        <PageHeader titulo='Entrega do Pedido' showBackButton={true} />
        <StepperComponent
          steps={steps}
          activeStep={activeStep}
          maxStepReached={maxStepReached}
          onStepChange={setActiveStep}
        />
      </Container>
      <Box>{getStepContent(activeStep)}</Box>
    </>
  );
}
