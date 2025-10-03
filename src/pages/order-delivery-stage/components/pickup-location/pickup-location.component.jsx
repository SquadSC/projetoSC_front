import { Box, Button, Container, Stack, Typography } from '@mui/material';

export function PickupLocationComponent() {
  return (
    <Container sx={{ p: 3 }}>
      <Typography
        variant='h6'
        color='primary.main'
        fontWeight={'fontWeightSemiBold'}
      >
        Local para retirar o pedido
      </Typography>

      <Stack spacing={2} mt={2}>
        <Box>
          <Typography
            variant='subtitle1'
            color='primary.main'
            fontWeight={'fontWeightSemiBold'}
          >
            CEP:
          </Typography>
          <Typography variant='textBold'>08343-190</Typography>
        </Box>
        <Box>
          <Typography
            variant='subtitle1'
            color='primary.main'
            fontWeight={'fontWeightSemiBold'}
          >
            Bairro:
          </Typography>
          <Typography variant='textBold'>Jardim da Conquista</Typography>
        </Box>
        <Box>
          <Typography
            variant='subtitle1'
            color='primary.main'
            fontWeight={'fontWeightSemiBold'}
          >
            Rua:
          </Typography>
          <Typography variant='textBold'>Trav. La Paloma, 23</Typography>
        </Box>
        <Box>
          <Typography
            variant='subtitle1'
            color='primary.main'
            fontWeight={'fontWeightSemiBold'}
          >
            Telefone para contato:
          </Typography>
          <Typography variant='textBold'>(11) 99673-3647</Typography>
        </Box>
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
        <Button
          variant='contained'
          fullWidth
          sx={{ borderRadius: '24px', height: '48px' }}
          onClick={() => alert('Pedido confirmado!')}
        >
          Confirmar
        </Button>
      </Box>
    </Container>
  );
}
