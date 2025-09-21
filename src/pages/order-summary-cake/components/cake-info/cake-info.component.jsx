import { Box, Button, Container, Stack, Typography } from '@mui/material';
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

        <Button
          variant='contained'
          color='primary'
          sx={{ width: '100%', height: '48px', mt: 4 }}
          onClick={nextStep}
        >
          Avançar
        </Button>
      </Container>
    </Box>
  );
}
