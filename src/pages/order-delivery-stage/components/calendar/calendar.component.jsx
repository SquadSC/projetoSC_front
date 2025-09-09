import React from 'react';
import {
  Typography,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  FormHelperText,
} from '@mui/material';
import { CalendarComponent } from '../../../../components/calendar/calendar-component';
import theme from '../../../../theme';
export function CalendarUserComponent({
  nextStep,
  date,
  horario,
  errors,
  onDateChange,
  onHorarioChange,
  onNext,
}) {
  const handleChange = event => {
    onHorarioChange?.(event.target.value);
  };

  const handleNext = () => {
    (onNext ?? nextStep)?.();
  };

  return (
    <Container sx={{ p: 2 }}>
      <Typography
        variant='subtitle2'
        mb={1}
        fontWeight='bold'
        pl={1}
        color={theme.palette.primary.main}
      >
        Escolha a data de entrega
      </Typography>
      <CalendarComponent value={date} onChange={onDateChange} />
      {errors?.date && <FormHelperText error>{errors.date}</FormHelperText>}

      <Typography
        variant='subtitle2'
        fontWeight='bold'
        pl={1}
        mt={3}
        mb={1}
        color={theme.palette.primary.main}
      >
        Informe o horário de entrega
      </Typography>

      <FormControl
        sx={{ minWidth: '100%', maxWidth: '100%' }}
        size='medium'
        error={!!errors.horario}
      >
        <InputLabel id='horario-label'>Horário</InputLabel>
        <Select
          labelId='horario-label'
          value={horario}
          label='Horário'
          onChange={handleChange}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {[
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
          ].map(h => (
            <MenuItem key={h} value={h}>
              {h}
            </MenuItem>
          ))}
        </Select>
        {errors?.horario && <FormHelperText>{errors.horario}</FormHelperText>}
      </FormControl>
      <Button
        variant='contained'
        color='primary'
        sx={{ width: '100%', height: '48px', mt: 4 }}
        onClick={handleNext}
      >
        Avançar
      </Button>
    </Container>
  );
}
