import * as React from 'react';
import { Button, Container, Stack, Typography, Box } from '@mui/material';
import { AddressCard } from '../../../../components/address-card/address-card';

// A View agora recebe a lista de 'addresses' e uma função 'onSelectAddress'
export function AddressMenuComponent({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddNewAddress,
  onFinishDelivery,
}) {
  return (
    // Box principal
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Container
        sx={{
          p: 3,
        }}
      >
        <Typography variant='text' sx={{ mb: 2 }}>
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
            <Typography variant='text' sx={{ textAlign: 'center', mt: 4 }}>
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
          onClick={onFinishDelivery}
          disabled={!selectedAddressId}
        >
          Confirmar
        </Button>
      </Box>
    </Box>
  );
}
