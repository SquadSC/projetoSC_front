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
    <Container sx={{ width: '345px', p: 0, height: '342px' }}>
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
