import { Box, Container, Typography } from '@mui/material';
import { lineGolden } from './header-component.style';
import { LogoComponent } from '../logo/logo.component';

export function HeaderComponent({ titulo, pagina }) {
  return (
    <>
      <Container sx={{ bgcolor: 'secondary.main', p: 3 }}>
        <LogoComponent />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
          mt={2}
        >
          <Typography
            variant='subTitle'
            fontWeight={'medium'}
            color='primary.main'
          >
            {titulo}
          </Typography>
          <Typography variant='text' mt={1}>
            {pagina}
          </Typography>
        </Box>
      </Container>
      <Box sx={lineGolden} />
    </>
  );
}
