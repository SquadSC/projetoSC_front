import { Button, Container, Stack, Typography, Link, Box } from '@mui/material';
import { HeaderComponent } from '../../../components/header/header-component';
import { PhoneField } from '../components/phone-field/phone-field.component';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { CustomTextField } from '../../../components/text-field/text-field.component';

export function RegisterUserView({ fields, errors, onChange, onSubmit }) {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent
        titulo='Bem-vindo à Elê Doces!'
        pagina='Peça seus doces de forma rápida, prática e com todo o carinho de
            sempre.'
      />
      <Container sx={{ p: 3 }}>
        <Stack spacing={{ xs: 1, sm: 2, md: 4 }} mb={3}>
          <Typography variant='subTitle' fontWeight={'semiBold'}>
            Crie sua conta!
          </Typography>
          <Typography variant='text'> Rápido, fácil e gratuito. </Typography>
        </Stack>

        <Box
          component='form'
          onSubmit={onSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <CustomTextField
            label='Nome completo'
            type='text'
            value={fields.name}
            onChange={e => onChange('name', e.target.value)}
            error={errors.name}
            helperText={errors.name}
          />
          <PhoneField
            label='Telefone'
            value={fields.phone}
            onChange={e => onChange('phone', e.target.value)}
            error={errors.phone}
            helperText={errors.phone}
          />
          <CustomTextField
            label='E-mail'
            type='email'
            value={fields.email}
            onChange={e => onChange('email', e.target.value)}
            error={errors.email}
            helperText={errors.email}
          />
          <CustomTextField
            label='Senha'
            type='password'
            value={fields.password}
            onChange={e => onChange('password', e.target.value)}
            error={errors.password}
            helperText={errors.password}
          />
          <CustomTextField
            label='Confirmar Senha'
            type='password'
            value={fields.confirmPassword}
            onChange={e => onChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ width: '100%', height: '48px', mt: 4 }}
          >
            Cadastrar
          </Button>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant='text'
            color='primary'
            onClick={() => navigate(ROUTES_PATHS.LOGIN)}
          >
            Já tem conta? Entre
          </Button>
        </Box>
      </Container>
    </>
  );
}
