import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import TextField from '@mui/material/TextField';
import theme from '../../../../theme';
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='(#0) 90000-0000'
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={value => onChange({ target: { value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export function PhoneField({
  label,
  value,
  onChange,
  error,
  helperText,
  sx,
  ...props
}) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      InputProps={{
        inputComponent: TextMaskCustom,
      }}
      fullWidth
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
