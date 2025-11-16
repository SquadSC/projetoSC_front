import { useState, useEffect, useCallback } from 'react';
import { useGetOrderCountDay } from '../../hooks/use-get-order-count-day';
import { useGetTodayDate } from '../../hooks/use-get-today-date';

export function useFormatWeeklyOrder() {
  const {
    data: orderData,
    error: orderError,
    loading: orderLoading,
  } = useGetOrderCountDay();
  const {
    data: todayData,
    error: todayError,
    loading: todayLoading,
  } = useGetTodayDate();

  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateWeekDays = useCallback(currentDate => {
    const [year, month, day] = currentDate.split('-').map(Number);
    const today = new Date(year, month - 1, day);

    const weekDays = [];
    const dayNames = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];

    let currentDay = new Date(today);
    let daysAdded = 0;

    while (daysAdded < 7) {
      const dayIndex = currentDay.getDay();
      const dateString = currentDay.toISOString().split('T')[0];

      weekDays.push({
        data: dateString,
        dayWeek: dayNames[dayIndex],
        dayWeekShort: dayNames[dayIndex].substring(0, 3),
        count: 0,
        isToday: dateString === currentDate,
        isSunday: dayIndex === 0,
      });

      daysAdded++;

      currentDay.setDate(currentDay.getDate() + 1);
    }

    return weekDays;
  }, []);

  const mergeOrderData = useCallback((weekDays, ordersList) => {
    return weekDays.map(day => {
      if (day.isSunday) {
        return {
          ...day,
          count: 0,
          hasOrders: false,
        };
      }

      const orderForDay = ordersList?.find(order => order.data === day.data);

      return {
        ...day,
        count: orderForDay?.quantidade || 0,
        hasOrders: orderForDay ? true : false,
      };
    });
  }, []);

  useEffect(() => {
    if (!orderLoading && !todayLoading) {
      setLoading(true);
      setError(null);

      try {
        const currentDate = todayData?.date;

        if (!currentDate) {
          throw new Error('Data atual não disponível do backend');
        }

        const weekDays = generateWeekDays(currentDate);
        const formattedWeek = mergeOrderData(weekDays, orderData);
        setWeeklyData(formattedWeek);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [
    orderData,
    todayData,
    orderLoading,
    todayLoading,
    generateWeekDays,
    mergeOrderData,
  ]);

  const hasError = orderError || todayError || error;
  const isLoading = orderLoading || todayLoading || loading;

  const getTotalOrders = useCallback(() => {
    return weeklyData.reduce((total, day) => total + day.count, 0);
  }, [weeklyData]);

  const getTodayOrders = useCallback(() => {
    const today = weeklyData.find(day => day.isToday);
    return today?.count || 0;
  }, [weeklyData]);

  const getDaysWithOrders = useCallback(() => {
    return weeklyData.filter(day => day.hasOrders);
  }, [weeklyData]);

  const getAveragePerDay = useCallback(() => {
    const daysWithOrders = getDaysWithOrders();
    if (daysWithOrders.length === 0) return 0;

    const total = getTotalOrders();
    return Math.round(total / daysWithOrders.length);
  }, [getDaysWithOrders, getTotalOrders]);

  return {
    weeklyData,
    loading: isLoading,
    error: hasError,

    getTotalOrders,
    getTodayOrders,
    getDaysWithOrders,
    getAveragePerDay,

    rawOrderData: orderData,
    rawTodayData: todayData,
  };
}

export function formatDayDisplay(dayData) {
  const { dayWeekShort, count, isToday } = dayData;

  if (isToday) {
    return `${dayWeekShort} (Hoje) - ${count} pedidos`;
  }

  return `${dayWeekShort} - ${count} pedidos`;
}

export function getWeeklyStats(weeklyData) {
  if (!weeklyData || weeklyData.length === 0) {
    return {
      totalPedidos: 0,
      diasComPedidos: 0,
      pedidosHoje: 0,
      mediaPerDay: 0,
      melhorDia: null,
    };
  }

  const total = weeklyData.reduce((sum, day) => sum + day.count, 0);
  const daysWithOrders = weeklyData.filter(day => day.hasOrders).length;
  const today = weeklyData.find(day => day.isToday);
  const bestDay = weeklyData.reduce(
    (best, day) => (day.count > (best?.count || 0) ? day : best),
    null,
  );

  return {
    totalPedidos: total,
    diasComPedidos: daysWithOrders,
    pedidosHoje: today?.count || 0,
    mediaPerDay: daysWithOrders > 0 ? Math.round(total / daysWithOrders) : 0,
    melhorDia: bestDay,
  };
}

export function validateBackendData(orderData, todayData) {
  const errors = [];

  if (!todayData || !todayData.date) {
    errors.push('Data atual não fornecida pelo backend');
  }

  if (todayData?.date && !/^\d{4}-\d{2}-\d{2}$/.test(todayData.date)) {
    errors.push('Formato de data inválido (esperado: YYYY-MM-DD)');
  }

  if (orderData && Array.isArray(orderData)) {
    orderData.forEach((order, index) => {
      if (!order.data || !order.quantidade) {
        errors.push(`Pedido ${index + 1} com dados incompletos`);
      }

      if (order.data && !/^\d{4}-\d{2}-\d{2}$/.test(order.data)) {
        errors.push(`Pedido ${index + 1} com formato de data inválido`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: [],
  };
}
