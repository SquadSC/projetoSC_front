import dayjs from 'dayjs';
import updateLocale from "dayjs/plugin/updateLocale";
import 'dayjs/locale/pt-br';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';


// Locale + início da semana
dayjs.extend(updateLocale);
dayjs.updateLocale("pt-br", {
  weekdaysMin: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
  weekStart: 1, // deixe 1 (segunda) ou 0 (domingo) conforme seu layout
});
dayjs.locale("pt-br");

export default function CalendarUserView() {
  return (
        <ThemeProvider theme={theme}>

    <Container maxWidth="sm" sx={{ p: 2  }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DateCalendar
          // Gera "dom/seg/ter..." de acordo com a coluna real (sem deslocar)
          dayOfWeekFormatter={(date) =>
            dayjs(date).format('ddd').replace('.', '').toLowerCase()
          }
          sx={(theme) => ({
              width: '100%',
              maxWidth: '100%',
              mx: 'auto',
              border: `1px solid ${theme.palette.primary.main}`, // usa a cor primária do tema
              borderRadius: 4,
    '& .MuiDayCalendar-weekDayLabel': {
      width: 48,
      lineHeight: '48px',
      margin: 0,
      textAlign: 'center',
      fontWeight: 600,
      textTransform: 'none',
      boxSizing: 'border-box',
      color: theme.palette.primary.main,
    },
    '& .MuiPickersDay-root': {
        borderRadius: 0,
        border: `1px solid #e0e0e0`,
        margin: 0,
        height: 48,
        width: 48,
        minWidth: 0,
        minHeight: 0,
        boxSizing: 'border-box',
    },
    '& .MuiPickersCalendarHeader-label': {
        textTransform: 'capitalize',
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        fontSize: '1.25rem',
    },
    '& .MuiDayCalendar-weekContainer': { margin: 0 },
    '& .MuiDayCalendar-header': { px: 0, mx: 0 },
  })}
        />
      </LocalizationProvider>
    </Container>
    </ThemeProvider>
  );
}
