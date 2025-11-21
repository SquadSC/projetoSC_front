import { useState } from 'react';
import { AgendaView } from '../view/agenda.view';

export function AgendaController() {
  const [agendaView, setAgendaView] = useState('lista');
  const selectViewModeAgenda = {
    agendaView,
    setAgendaView,
  };
  return <AgendaView selectViewModeAgenda={selectViewModeAgenda} />;
}
