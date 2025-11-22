import {
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

export function AgendaView({ selectViewModeAgenda, weeklyOrder, monthName }) {
  const { agendaView, setAgendaView } = selectViewModeAgenda;
  return (
    <Container sx={{ padding: 0, width: '100%' }} maxWidth={false}>
      <Stack spacing={2} p={2}>
        <PageHeader titulo='Agenda' showBackButton={true} />
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>
            Visualizar como:
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={agendaView}
            label='Visualizar como:'
            onChange={e => setAgendaView(e.target.value)}
          >
            <MenuItem value={'lista'}>Semana</MenuItem>
            <MenuItem value={'calendario'}>Calendário</MenuItem>
          </Select>
        </FormControl>
        {agendaView === 'lista' ? (
          <>
            <Stack spacing={1}>
              <Typography variant='subTitle' fontWeight={'semiBold'} color='primary.main'>Semana de Pedidos!</Typography>
              <Typography variant='text' fontWeight={'medium'} color='primary.main'>{monthName}</Typography>
            </Stack>
            <WeeklyOrder weeklyData={weeklyOrder} />
          </>
        ) : (
          <Typography variant='text'>Olá mundo em calendário!</Typography>
        )}
      </Stack>
      <BottomNavigationComponent />
    </Container>
  );
}
