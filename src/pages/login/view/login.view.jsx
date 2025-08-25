import { Button, Container, Stack, Typography, Link, Box } from '@mui/material';
import { HeaderComponent } from '../../../components/header/header-component';
import { CustomTextField } from '../../../components/text-field/text-field.component';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { useNavigate } from 'react-router-dom';
export function LoginView({ fields, error, onSubmit, onChange }) {
    const navigate = useNavigate();
  return (
    <>
      <HeaderComponent
        titulo='Bem-vindo à Elê Doces!'
        pagina='Peça seus doces de forma rápida, prática e com todo o carinho de sempre.'
        variant='loggoff'
      />
      <Container sx={{ p: 3 }}>
        <Stack spacing={{ xs: 1, sm: 2, md: 4 }} mb={3}>
          <Typography variant='h5'>Que bom te ver de novo!</Typography>
          <Typography variant='body1'>
            Entre e continue adoçando seus dias com a gente
          </Typography>
        </Stack>
        <Box
          component='form'
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={onSubmit}
        >
          <CustomTextField
            label='E-mail'
            type='email'
            value={fields.email}
            onChange={e => onChange('email', e.target.value)}
            error={error.email}
            helperText={error.email}
          />
          <CustomTextField
            label='Senha'
            type='password'
            value={fields.password}
            onChange={e => onChange('password', e.target.value)}
            error={error.password}
            helperText={error.password}
          />
          <Link variant='body2' sx={{ alignSelf: 'flex-end' }} onClick={() => navigate(ROUTES_PATHS.HOME)}>
            Esqueceu sua senha?
          </Link>

          <Button
            variant='contained'
            color='primary'
            type='submit'
            sx={{ width: '100%', height: '48px', mt: 4 }}
          >
            Entrar
          </Button>
          <Button
            variant='outlined'
            color='transparent'
            sx={{ width: '100%', height: '48px', mt: 1 }}
            onClick={() => navigate(ROUTES_PATHS.REGISTER_USER)}
          >
            Cadastrar-se
          </Button>
        </Box>
      </Container>
    </>
  );
}
