import { useState, useEffect, useCallback } from 'react';
import { useGetOrderCountDay } from '../../hooks/use-get-order-count-day';
import { getMonthName } from '../../../../utils/date/date.utils';

export function useFormatWeeklyOrder() {
  const {
    data: orderData,
    error: orderError,
    loading: orderLoading,
  } = useGetOrderCountDay();

  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const transformOrders = useCallback((ordersList = []) => {
    const dayNames = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const todayStr = new Date().toISOString().split('T')[0];

    return ordersList.map(order => {
      const [year, month, day] = (order.data || '').split('-').map(Number);
      const dateObj = new Date(year, (month || 1) - 1, day || 1);
      const dayIndex = dateObj.getDay();

      return {
        data: order.data,
        dayWeek: dayNames[dayIndex],
        dayWeekShort: dayNames[dayIndex].substring(0, 3),
        count: order.quantidade || 0,
        isToday: order.data === todayStr,
        isSunday: dayIndex === 0,
        hasOrders: (order.quantidade || 0) > 0,
      };
    });
  }, []);

  useEffect(() => {
    if (!orderLoading) {
      setLoading(true);
      setError(null);
      try {
        const formatted = transformOrders(orderData || []);
        setWeeklyData(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [orderData, orderLoading, transformOrders]);

  const hasError = orderError || error;
  const isLoading = orderLoading || loading;

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

  const getCurrentMonthName = useCallback(() => {
    return getWeekMonthName(weeklyData);
  }, [weeklyData]);

  return {
    weeklyData,
    loading: isLoading,
    error: hasError,

    getTotalOrders,
    getTodayOrders,
    getDaysWithOrders,
    getAveragePerDay,
    getCurrentMonthName,

    rawOrderData: orderData,
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

export function validateBackendData(orderData) {
  const errors = [];

  if (orderData && Array.isArray(orderData)) {
    orderData.forEach((order, index) => {
      if (!order.data || order.quantidade === undefined) {
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

export function getWeekMonthName(weeklyData) {
  if (!weeklyData || weeklyData.length === 0) {
    return '';
  }

  const firstValidDate = weeklyData.find(day => day.data);

  if (!firstValidDate) {
    return '';
  }

  const monthName = getMonthName(firstValidDate.data);

  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}
