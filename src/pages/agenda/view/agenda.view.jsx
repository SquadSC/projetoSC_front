import { Container, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';

export function AgendaView({ selectViewModeAgenda }) {
    const { agendaView, setAgendaView } = selectViewModeAgenda;
  return (
    <Container sx={{ padding: 0, width: '100%' }} maxWidth={false}>
      <Stack spacing={2} p={2}>
        <PageHeader titulo='Agenda' showBackButton={true} />
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Visualizar como:</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={agendaView}
            label='Visualizar como:'
            onChange={(e) => setAgendaView(e.target.value)}
          >
            <MenuItem value={'lista'}>Lista</MenuItem>
            <MenuItem value={'calendario'}>Calendário</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <BottomNavigationComponent />
    </Container>
  );
}