import { Button, Container, Stack, Typography, Box } from '@mui/material';
import { AddressCard } from '../../../components/address-card/address-card';
import { PageHeader } from '../../../components/header-jornada/header-jornada-component';
import { StepperComponent } from '../../../components/stepper/stepper-component';
import * as React from 'react';

// A View agora recebe a lista de 'addresses' e uma função 'onSelectAddress'
export function AddressMenuView({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddNewAddress,
  onConfirm,
}) {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3'];
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    // Box principal
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PageHeader titulo='' showBackButton={true} />
      <PageHeader titulo='Entrega do Pedido' showBackButton={false} />

      {/* Container principal que ocupa o espaço disponível */}
      <Container
        sx={{
          pt: 0,
          px: 3,
          pb: 3,
          flexGrow: 1,
          mb: '96px' /* Margem no fundo para não sobrepor o botão fixo */,
        }}
      >
        <StepperComponent
          steps={steps}
          activeStep={activeStep}
          onStepChange={setActiveStep}
        />

        <Typography variant='body1' sx={{ mb: 2 }}>
          Endereços de entregas cadastrados
        </Typography>

        <Stack spacing={2}>
          {addresses.length > 0 ? (
            addresses.map(address => (
              <AddressCard
                key={address.idEndereco}
                address={address}
                // A View passa a função do controller para a prop 'onSelect' do card
                onSelect={onSelectAddress}
                // A lógica para saber se o card está selecionado está perfeita
                isSelected={address.idEndereco === selectedAddressId}
              />
            ))
          ) : (
            <Typography variant='body1' sx={{ textAlign: 'center', mt: 4 }}>
              Nenhum endereço cadastrado.
            </Typography>
          )}
        </Stack>

        {}
        <Button
          variant='outlined'
          fullWidth
          sx={{ mt: 3, borderRadius: '24px', height: '48px' }}
          onClick={onAddNewAddress}
        >
          Adicionar Endereço
        </Button>
      </Container>

      {/*BOTÃO FIXO */}
      <Box
        sx={{
          position: 'fixed', // Posição fixa
          bottom: 0,
          left: 0,
          right: 0,
          p: 2, // Padding interno
          backgroundColor: 'background.default',
        }}
      >
        <Button
          variant='contained'
          fullWidth
          sx={{ borderRadius: '24px', height: '48px' }}
          onClick={onConfirm}
        >
          Confirmar
        </Button>
      </Box>
    </Box>
  );
}
