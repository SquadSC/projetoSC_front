import React, { useState } from 'react';
import { Typography, Container, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import { CalendarComponent } from '../../../components/calendar/calendar-component';
import theme from '../../../theme';

export default function CalendarUserView() {
  const [horario, setHorario] = useState('');

  const handleChange = (event) => {
    setHorario(event.target.value);
  };

  return (
    <>
      <Container sx={{ p: 2 }}>
        <Typography variant='subtitle1' mb={2} fontWeight='bold' pl={2} color={theme.palette.primary.main}>
          Escolha a data de entrega
        </Typography>
        <CalendarComponent />

        <Typography variant='subtitle2' fontWeight='bold' pl={1} mt={2} mb={1} color={theme.palette.primary.main}>
          Informe o horário de entrega
        </Typography>

        <FormControl sx={{ minWidth: '100%',  maxWidth: '100%'}} size="medium">
          <InputLabel id="demo-select-small-label">Horário</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={horario}
            label="Horário"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"09:00"}>9:00</MenuItem>
            <MenuItem value={"10:00"}>10:00</MenuItem>
            <MenuItem value={"11:00"}>11:00</MenuItem>
            <MenuItem value={"12:00"}>12:00</MenuItem>
            <MenuItem value={"13:00"}>13:00</MenuItem>
            <MenuItem value={"14:00"}>14:00</MenuItem>
            <MenuItem value={"15:00"}>15:00</MenuItem>
            <MenuItem value={"16:00"}>16:00</MenuItem>
            <MenuItem value={"17:00"}>17:00</MenuItem>
            <MenuItem value={"18:00"}>18:00</MenuItem>
            <MenuItem value={"19:00"}>19:00</MenuItem>
            <MenuItem value={"20:00"}>20:00</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          sx={{ width: '100%', height: '48px', mt: 4 }}
        >
          Avançar
        </Button>
      </Container>
    </>
  );
}