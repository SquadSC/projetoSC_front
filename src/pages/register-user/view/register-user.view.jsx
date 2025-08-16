import { Button, Container, Stack, Typography, Link, Box } from '@mui/material';
import { HeaderComponent } from '../components/header/header-component';
import { TextFieldComponent } from '../components/text-field/text-field-component.style';

export function RegisterUserView() {
  return (
    <>
      <HeaderComponent />
      <Container sx={{ p: 3, }}>
        <Stack spacing={{ xs: 1, sm: 2, md: 4 }} mb={3}>
          <Typography variant='h5'> Crie sua conta! </Typography>
          <Typography variant='body1'> Rápido, fácil e gratuito. </Typography>
        </Stack>

        <TextFieldComponent />

        <Button
          variant='contained'
          sx={{ width: '100%', height: '48px', mt: 4 }}
        >
          Cadastrar
        </Button>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="/" underline="none">
            Já tem conta? Entre
          </Link>
        </Box>
      </Container>
    </>
  );
}
