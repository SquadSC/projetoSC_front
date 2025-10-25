import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../../hooks/use-navigation/use-nagivation';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

export function ErrorGenericView({ error }) {
  const navigate = useNavigate();
  const { goBack } = useNavigation();

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
          <Typography variant='text'>{error}</Typography>
        </Stack>
      </Box>

      <Stack spacing={2}>
        <Button
          variant='contained'
          color='primary'
          sx={{ width: '100%', height: '48px' }}
          onClick={() => {
            goBack(navigate);
          }}
        >
          Tentar Novamente
        </Button>
        <Button
          variant='outlined'
          color='primary'
          sx={{ width: '100%', height: '48px' }}
          onClick={() => {
            navigate(ROUTES_PATHS.HOME);
          }}
        >
          Voltar ao Início
        </Button>
      </Stack>
    </Container>
  );
}
