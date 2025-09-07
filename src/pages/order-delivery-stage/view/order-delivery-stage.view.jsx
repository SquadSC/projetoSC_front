import * as React from 'react';
import { Box, Container } from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { StepperComponent } from '../../../components/stepper/stepper-component';
import { CalendarUserComponent } from '../components/calendar/calendar.component';
import { DeliveryMethodComponent } from '../components/delivery-method/delivery-method.component';
import { PickupLocationComponent } from '../components/pickup-location/pickup-location.component';
import { AddressRedirectorComponent } from '../components/address-redirector/address-redirector.component';

export function OrderDeliveryStageView({
  stepConfig: { nextStep, activeStep, maxStepReached, setActiveStep },
  methodDeliveryConfig: { methodDelivery, driveMethodDelivery, addAddress },
  addressConfig: {
    addresses,
    selectedAddressId,
    isAddingAddress,
    fields,
    errors,
    isCepLoading,
    onSelectAddress: handleSelectAddress,
    onAddNewAddress: handleAddNewAddress,
    onBackToAddressMenu: handleBackToAddressMenu,
    onChange: handleChange,
    onSubmit: handleSubmit,
  },
}) {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3'];

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <CalendarUserComponent nextStep={nextStep} />;
      case 1:
        return (
          <DeliveryMethodComponent
            nextStep={nextStep}
            methodDelivery={methodDelivery}
            driveMethodDelivery={driveMethodDelivery}
          />
        );
      case 2:
        return methodDelivery === 'delivery' && addAddress ? (
          <AddressRedirectorComponent 
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            isAddingAddress={isAddingAddress}
            fields={fields}
            errors={errors}
            isCepLoading={isCepLoading}
            onSelectAddress={handleSelectAddress}
            onAddNewAddress={handleAddNewAddress}
            onBackToAddressMenu={handleBackToAddressMenu}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        ) : (
          <PickupLocationComponent nextStep={nextStep} />
        );
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
      <Box> {getStepContent(activeStep)} </Box>
    </>
  );
}
