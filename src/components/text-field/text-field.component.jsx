import {
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { formatNumber } from '../../utils/numbers/numbers.utils'

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
  const isNumber = type === 'number';

  return (
    <TextField
      label={label}
      type={
        isPassword ? (show ? 'text' : 'password') : isNumber ? 'number' : type
      }
      value={value}
      onChange={(e) => {
        if (isNumber) {
          const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
          onChange({ ...e, target: { ...e.target, value: onlyNumbers } });
        } else {
          onChange(e);
        }
      }}
      error={!!error}
      helperText={helperText}
      slotProps={
        isPassword
          ? {
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShow((s) => !s)} edge='end'>
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
export function FormField({
  listOptions, 
  value = 1,
  onChange
}) {
  const [selectedValue, setSelectedValue] = useState(value || '');
  const options = listOptions;

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <FormControl sx={{ height: '100%', width:'100%'}}>
      <InputLabel id="demo-simple-select-label">Peso do bolo (Kg)</InputLabel>
      <Select 
        value={selectedValue}
        onChange={handleChange}
        labelId="demo-simple-select-label"
        label="Peso do bolo (Kg)"
      >
        {options.map((item) => (
          <MenuItem key={item} value={item}>
            {formatNumber(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}