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

export function CustomTextField({
  label,
  type,
  value,
  onChange,
  error,
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
      {...props}
    />
  );
}
