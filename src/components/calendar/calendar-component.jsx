import dayjs from 'dayjs';
import updateLocale from "dayjs/plugin/updateLocale";
import 'dayjs/locale/pt-br';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container } from '@mui/material';
import { styleCalendar } from './style';

dayjs.extend(updateLocale);
dayjs.updateLocale("pt-br", {
    weekdaysMin: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
    weekStart: 0, // deixe 1 (segunda) ou 0 (domingo) conforme seu layout
});
dayjs.locale("pt-br");

export function CalendarComponent() {
    return (
        <Container sx={{width: '345px', p:0, height: '342px'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <DateCalendar
                    showDaysOutsideCurrentMonth
                    minDate={dayjs().startOf('month')}
                    // Gera "dom/seg/ter..." de acordo com a coluna real (sem deslocar)
                    dayOfWeekFormatter={(date) =>
                        dayjs(date).format('ddd').replace('.', '').toLowerCase()
                    }
                    
                    sx={styleCalendar}
                />
            </LocalizationProvider>
        </Container>
    );
}