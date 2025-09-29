import { Box, Container, Stack, Typography, Button } from '@mui/material';
import { CustomTextField } from '../../../../components/text-field/text-field.component';

export function CakeInfoComponent({ nextStep, infoCake }) {
  const { product, setProduct, errors, setErrors } = infoCake;

  console.log('product', product);

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Container
        sx={{
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant='subtitle1'
            fontWeight={'fontWeightSemiBold'}
            color='primary.main'
          >
            Qual vai ser o tema?
          </Typography>

          <CustomTextField
            label='Tema do bolo (opcional):'
            type='text'
            value={product.theme}
            onChange={e => {
              setProduct({ ...product, theme: e.target.value });
              console.log(e.target.value);
            }}
            error={!!errors.theme}
            helperText={errors.theme}
            fullWidth
          />
        </Stack>
      </Container>

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
          Avançar
        </Button>
      </Box>
    </Box>
  );
}