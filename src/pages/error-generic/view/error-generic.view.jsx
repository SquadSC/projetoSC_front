import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function ErrorGenericView({ error }) {
  return (
    <Container
      sx={{
        px: 3,
        pt: 4,
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <Box>
        <ErrorOutlineIcon color='error' sx={{ fontSize: 70, mb: 3 }} />
        <Stack spacing={1}>
          <Typography variant='h5'>Ocorreu um erro!</Typography>
          <Typography variant='body1'>{error}</Typography>
        </Stack>
      </Box>

      <Stack spacing={2}>
        <Button
          variant='contained'
          color='primary'
          sx={{ width: '100%', height: '48px' }}
        >
          Tentar Novamente
        </Button>
        <Button
          variant='outlined'
          color='primary'
          sx={{ width: '100%', height: '48px' }}
        >
          Voltar
        </Button>
      </Stack>
    </Container>
  );
}
