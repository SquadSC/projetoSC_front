import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import TextField from '@mui/material/TextField';
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='(#0) 00000-0000'
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={value => onChange({ target: { value } })}
      overwrite
      unmask={true}
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
      {...props}
    />
  );
}
