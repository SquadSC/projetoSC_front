import { useState } from 'react';
import { AgendaView } from '../view/agenda.view';
import { getWeekMonthName, useFormatWeeklyOrder } from '../../agenda/utils/format-weekly-order';

export function AgendaController() {
  const [agendaView, setAgendaView] = useState('lista');

  const {
    weeklyData,
    loading: weeklyLoading,
    error: weeklyError,
  } = useFormatWeeklyOrder();

  const monthName = getWeekMonthName(weeklyData);

  const selectViewModeAgenda = {
    agendaView,
    setAgendaView,
  };

  const weeklyOrder = {
    weeklyData,
    weeklyLoading,
    weeklyError,
  };

  return (
    <AgendaView
      selectViewModeAgenda={selectViewModeAgenda}
      weeklyOrder={weeklyOrder}
      monthName={monthName}
    />
  );
}
