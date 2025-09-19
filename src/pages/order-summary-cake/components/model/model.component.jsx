import { Box, Button, Typography } from '@mui/material';

export function ModelComponent({ nextStep }) {
  return (
    <Box>
      <Box>
        <Typography variant='h6'>Modelo do Produto</Typography>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Button
          variant='contained'
          fullWidth
          sx={{ borderRadius: '24px', height: '48px' }}
          onClick={nextStep}
        >
          Confirmar
        </Button>
      </Box>
    </Box>
  );
}
