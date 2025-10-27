import { Box, Button, Container, Stack, Typography } from '@mui/material';

export function DeliveryMethodComponent({ nextStep, driveMethodDelivery }) {
  const handleDeliveryMethodChange = method => {
    driveMethodDelivery(method);
    nextStep();
  };

  return (
    <Container sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant='h6' color='primary.main' fontWeight={'semiBold'}>
          Método de Entrega
        </Typography>
        <Typography variant='text'>
          Caso opte pela entrega em seu endereço, ela será realizada por meio de
          um aplicativo de entrega onde será necessário alinhar com a
          confeiteira o frete dá entrega.
        </Typography>
      </Stack>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          py: 2,
          px: 3,
          backgroundColor: 'background.default',
        }}
      >
        <Stack spacing={2}>
          <Button
            variant='contained'
            fullWidth
            sx={{ borderRadius: '24px', height: '48px' }}
            onClick={() => handleDeliveryMethodChange('pickup')}
          >
            Retirar no Ateliê
          </Button>
          <Button
            variant='outlined'
            fullWidth
            sx={{ borderRadius: '24px', height: '48px' }}
            onClick={() => handleDeliveryMethodChange('delivery')}
          >
            Entregar no meu Endereço
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
