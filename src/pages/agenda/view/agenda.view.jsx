import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';
import { WeeklyOrder } from '../../agenda/components/weekly-order/weekly-order.component';
import { useState } from 'react';
import { Calendar } from '../components/calendar/calendar.component';

export function AgendaView({ selectViewModeAgenda, weeklyOrder, selectedDateOrder }) {
  const { agendaView, setAgendaView } = selectViewModeAgenda;
  const [viewCalendar, setViewCalendar] = useState(false);
  const { selectedDate, setSelectedDate, monthName } = selectedDateOrder;
  return (
    <Container sx={{ padding: 0, width: '100%' }} maxWidth={false}>
      {viewCalendar && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => setViewCalendar(false)}
        >
          <Box
            sx={{
              zIndex: 11,
              width: 'auto',
              height: 'auto',
              backgroundColor: 'white',
              opacity: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar selectedDateOrder={selectedDateOrder} setViewCalendar={setViewCalendar} />
          </Box>
        </Box>
      )}
      <Stack spacing={2} p={2}>
        <PageHeader titulo='Agenda' showBackButton={true} />
        <Stack spacing={1}>
          <Typography
            variant='subTitle'
            fontWeight={'semiBold'}
            color='primary.main'
          >
            Semana de Pedidos!
          </Typography>
          <Typography variant='text' fontWeight={'medium'} color='primary.main'>
            {monthName.month} {monthName.year}
          </Typography>
        </Stack>
        <WeeklyOrder weeklyData={weeklyOrder} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' onClick={() => setViewCalendar(true)}>
            Trocar semana
          </Button>
        </Box>
        <Stack spacing={2}>
          <Typography
            variant='subTitle'
            fontWeight={'semiBold'}
            color='primary.main'
          >
            Pedidos do dia
          </Typography>
        </Stack>
      </Stack>
      <BottomNavigationComponent />
    </Container>
  );
}
