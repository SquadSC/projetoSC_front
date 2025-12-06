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

/**
 * Calcula a data mínima permitida (3 dias úteis após hoje, sem contar domingos)
 * Exemplo: Se hoje é sexta (06/12), a data mínima é terça (10/12)
 */
function getMinDate() {
  let currentDate = dayjs().startOf('day');
  let businessDaysAdded = 0;

  // Adiciona 3 dias úteis (sem contar domingos)
  while (businessDaysAdded < 3) {
    currentDate = currentDate.add(1, 'day');
    // Se não for domingo (0 = domingo)
    if (currentDate.day() !== 0) {
      businessDaysAdded++;
    }
  }

  return currentDate;
}

/**
 * Verifica se uma data deve ser desabilitada
 * @param {dayjs.Dayjs} date - Data a ser verificada
 * @returns {boolean} - true se a data deve ser desabilitada
 */
function shouldDisableDate(date) {
  const minDate = getMinDate();

  // Desabilitar domingos (day() === 0)
  if (date.day() === 0) {
    return true;
  }

  // Desabilitar datas antes da data mínima (hoje + 3 dias úteis)
  if (date.isBefore(minDate, 'day')) {
    return true;
  }

  return false;
}

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
          minDate={getMinDate()}
          shouldDisableDate={shouldDisableDate}
          dayOfWeekFormatter={date =>
            dayjs(date).format('ddd').replace('.', '').toLowerCase()
          }
          sx={styleCalendar}
        />
      </LocalizationProvider>
    </Container>
  );
}
