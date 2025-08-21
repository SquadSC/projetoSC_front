import { Box, Container, Typography } from '@mui/material';
import { lineGolden } from './header-component.style';
import { LogoComponent } from '../../../../components/logo/logo-component';

export function HeaderComponent() {
  return (
    <>
      <Container sx={{ bgcolor: 'secondary.main', p: 3 }}>
        <LogoComponent />
        <Box mt={2}>
          <Typography variant='h5'>Bem-vindo à Elê Doces!</Typography>
          <Typography variant='body1' mt={1}>
            Peça seus doces de forma rápida, prática e com todo o carinho de
            sempre.
          </Typography>
        </Box>
      </Container>
      <Box sx={lineGolden} />
    </>
  );
}
