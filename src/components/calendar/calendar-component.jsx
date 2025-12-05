// components/calendar/calendar-component.js
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/pt-br';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container } from '@mui/material';
import { styleCalendar } from './style';

dayjs.extend(updateLocale);
dayjs.updateLocale('pt-br', {
  weekdaysMin: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  weekStart: 0,
});
dayjs.locale('pt-br');

export function CalendarComponent({ value, onChange }) {
  return (
    <Container 
      sx={{ 
        width: '345px', 
        p: 0, 
        height: '342px',
        transition: 'height 0.3s ease-in-out', // Transição suave
        '& .MuiDateCalendar-root': {
          minHeight: '285px',
          transition: 'min-height 0.3s ease-in-out',
        },
        '& .MuiPickersSlideTransition-root': {
          minHeight: '285px',
          overflow: 'visible',
          transition: 'min-height 0.3s ease-in-out',
        },
        '& .MuiDayCalendar-monthContainer': {
          minHeight: '285px',
          transition: 'min-height 0.3s ease-in-out',
        },
        // Detecta quando há 6 semanas e aumenta a altura
        '& .MuiDayCalendar-weekContainer:nth-of-type(6)': {
          '~ * .MuiDateCalendar-root': {
            minHeight: '390px',
          },
        },
        // Usando seletor para detectar presença da 6ª semana
        '&:has(.MuiDayCalendar-weekContainer:nth-of-type(6))': {
          height: '385px !important', // Aumenta o container pai também
          '& .MuiDateCalendar-root': {
            minHeight: '385px !important',
          },
          '& .MuiPickersSlideTransition-root': {
            minHeight: '385px !important',
          },
          '& .MuiDayCalendar-monthContainer': {
            minHeight: '385px !important',
          },
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
        <DateCalendar
          value={value}
          onChange={onChange}
          showDaysOutsideCurrentMonth
          minDate={dayjs().startOf('day')}
          dayOfWeekFormatter={date =>
            dayjs(date).format('ddd').replace('.', '').toLowerCase()
          }
          sx={styleCalendar}
        />
      </LocalizationProvider>
    </Container>
  );
}
