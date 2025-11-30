import { useState } from 'react';
import { AgendaView } from '../view/agenda.view';
import {
  getWeekMonthName,
  useFormatWeeklyOrder,
} from '../../agenda/utils/format-weekly-order';
import { useSearchParams } from 'react-router-dom';

export function AgendaController() {
  const [agendaView, setAgendaView] = useState('lista');
  const [searchParams] = useSearchParams();

  const selectedDate =
    searchParams.get('day') || new Date().toISOString().split('T')[0];

  const {
    weeklyData,
    loading: weeklyLoading,
    error: weeklyError,
  } = useFormatWeeklyOrder();

  const {

  } = useFormatWeeklyOrder(selectedDate);

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
      selectedDate={selectedDate}
    />
  );
}
