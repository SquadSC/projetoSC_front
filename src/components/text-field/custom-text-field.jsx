import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Box,
} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import theme from '../../theme';

export function CustomTextField({
  label,
  type,
  value,
  onChange,
  error,
  sx,
  helperText,
  ...props
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <TextField
      label={label}
      type={isPassword ? (show ? 'text' : 'password') : type}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      slotProps={
        isPassword
          ? {
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShow(s => !s)} edge='end'>
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }
          : undefined
      }
      sx={{
        ...sx,
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
          },
          '& fieldset': {
            borderColor: 'black',
            borderWidth: 2,
          },
        },
      }}
      {...props}
    />
  );
}
