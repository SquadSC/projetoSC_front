import { useEffect, useState, useCallback } from 'react';
import { AgendaView } from '../view/agenda.view';
import {
  getWeekMonthName,
  useFormatWeeklyOrder,
} from '../../agenda/utils/format-weekly-order';
import { useSearchParams } from 'react-router-dom';
import { useGetWeeklyOrderCount } from '../hooks/use-get-weekly-order-count';

export function AgendaController() {
  const [agendaView, setAgendaView] = useState('lista');
  const [searchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const urlDate = searchParams.get('day');
    if (urlDate) {
      setSelectedDate(urlDate);
    }
  }, [searchParams]);

  const formatSelectedWeekData = useCallback(rawData => {
    if (!rawData || !Array.isArray(rawData)) return [];

    const dayNames = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];

    const dayNamesShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const todayStr = new Date().toISOString().split('T')[0];

    return rawData.map(item => {
      const date = item.data;
      const count = item.quantidade || 0;

      const [year, month, day] = (date || '').split('-').map(Number);
      const dateObj = new Date(year, (month || 1) - 1, day || 1);
      const dayIndex = dateObj.getDay();

      return {
        data: date,
        dayWeek: dayNames[dayIndex],
        dayWeekShort: dayNamesShort[dayIndex],
        count: count,
        isToday: date === todayStr,
        isSunday: dayIndex === 0,
        hasOrders: count > 0,
      };
    });
  }, []);

  const {
    weeklyData: currentWeekData,
    loading: currentWeekLoading,
    error: currentWeekError,
  } = useFormatWeeklyOrder();

  const {
    weeklyData: selectedWeekData,
    loading: selectedWeekLoading,
    error: selectedWeekError,
  } = useGetWeeklyOrderCount(selectedDate !== null, selectedDate);

  const isUsingSelectedDate = selectedDate !== null;

  const formattedSelectedWeekData = selectedWeekData
    ? formatSelectedWeekData(selectedWeekData)
    : null;

  const weeklyData = isUsingSelectedDate
    ? formattedSelectedWeekData
    : currentWeekData;
  const weeklyLoading = isUsingSelectedDate
    ? selectedWeekLoading
    : currentWeekLoading;
  const weeklyError = isUsingSelectedDate
    ? selectedWeekError
    : currentWeekError;

  const safeWeeklyData = weeklyData || [];

  const monthName = getWeekMonthName(safeWeeklyData);

  const selectViewModeAgenda = {
    agendaView,
    setAgendaView,
  };

  const weeklyOrder = {
    weeklyData: safeWeeklyData,
    weeklyLoading,
    weeklyError,
    selectedDate,
    setSelectedDate,
  };

  const selectedDateOrder = {
    selectedDate,
    setSelectedDate,
    monthName,
  };

  return (
    <AgendaView
      selectViewModeAgenda={selectViewModeAgenda}
      weeklyOrder={weeklyOrder}
      selectedDateOrder={selectedDateOrder}
    />
  );
}
