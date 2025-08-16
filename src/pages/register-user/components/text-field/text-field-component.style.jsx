import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function TextFieldComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(show => !show);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        id='complete-name-basic'
        label='Nome completo'
        variant='outlined'
        autoComplete='name'
      />
      <TextField
        id='telephone-basic'
        label='Telefone'
        variant='outlined'
        autoComplete='tel'
        type='tel'
      />
      <TextField
        id='email-basic'
        label='E-mail'
        variant='outlined'
        autoComplete='email'
        type='email'
      />
      <TextField
        id='password-basic'
        label='Senha'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        autoComplete='new-password'
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        id='confirm-password-basic'
        label='Confirmar Senha'
        variant='outlined'
        type={showConfirmPassword ? 'text' : 'password'}
        autoComplete='new-password'
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle confirm password visibility'
                  onClick={handleClickShowConfirmPassword}
                  edge='end'
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
