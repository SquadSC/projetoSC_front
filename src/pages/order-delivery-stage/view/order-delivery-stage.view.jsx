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
  methodDeliveryConfig: { methodDelivery, driveMethodDelivery },
  calendarConfig: {
    date,
    horario,
    errors: calendarErrors,
    onDateChange,
    onHorarioChange,
    onNext,
    formattedDateTime,
  },
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
  onFinishDelivery: onFinishDelivery
}) {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3'];

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <CalendarUserComponent
            nextStep={nextStep}
            date={date}
            horario={horario}
            errors={calendarErrors}
            onDateChange={onDateChange}
            onHorarioChange={onHorarioChange}
            onNext={onNext}
            formattedDateTime={formattedDateTime}
          />
        );
      case 1:
        return (
          <DeliveryMethodComponent
            nextStep={nextStep}
            methodDelivery={methodDelivery}
            driveMethodDelivery={driveMethodDelivery}
          />
        );
      case 2:
        return methodDelivery === false ? (
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
            onFinishDelivery={onFinishDelivery}
          />
        ) : (
          <PickupLocationComponent onConfirm={onFinishDelivery} />
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
