import { Box, Container, Typography } from '@mui/material';
import { lineGolden } from './header-component.style';
import { LogoComponent } from '../logo/logo.component';

export function HeaderComponent({ titulo, pagina }) {
  return (
    <>
      <Container sx={{ bgcolor: 'secondary.main', p: 3 }}>
        <LogoComponent />
        <Box mt={2}>
          <Typography variant='h5' fontWeight={'medium'}>{titulo}</Typography>
          <Typography variant='body1' mt={1}>
            {pagina}
          </Typography>
        </Box>
      </Container>
      <Box sx={lineGolden} />
    </>
  );
}
