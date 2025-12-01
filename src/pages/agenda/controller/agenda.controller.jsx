import { useEffect, useState } from 'react';
import { AgendaView } from '../view/agenda.view';
import {
  getWeekMonthName,
  useFormatWeeklyOrder,
} from '../../agenda/utils/format-weekly-order';
import { useSearchParams } from 'react-router-dom';

export function AgendaController() {
  const [agendaView, setAgendaView] = useState('lista');
  const [searchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setSelectedDate(
      searchParams.get('day') || new Date().toISOString().split('T')[0],
    );
  }, [searchParams, setSelectedDate]);

  const {
    weeklyData,
    loading: weeklyLoading,
    error: weeklyError,
  } = useFormatWeeklyOrder();

  const {} = useFormatWeeklyOrder(selectedDate);

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

  const selectedDateOrder = {
    selectedDate,
    setSelectedDate,
    monthName,
  }

  return (
    <AgendaView
      selectViewModeAgenda={selectViewModeAgenda}
      weeklyOrder={weeklyOrder}
      selectedDateOrder={selectedDateOrder}
    />
  );
}
