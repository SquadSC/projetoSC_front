import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import TextField from '@mui/material/TextField';
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='00000-000'
      inputRef={ref}
      onAccept={value => onChange({ target: { value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export function CepField({
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
