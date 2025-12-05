import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../../services/api';

export function useGetWeeklyOrderCount(autoFetch = true, dayWeekly) {
  const [weeklyData, setWeeklyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeeklyOrderCount = useCallback(async () => {
    if (!dayWeekly) {
      setWeeklyData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `/pedidos/PedidosSemanaData?data=${dayWeekly}`,
      );
      setWeeklyData(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Erro ao buscar contagem semanal de pedidos',
      );
      setWeeklyData(null);
    } finally {
      setLoading(false);
    }
  }, [dayWeekly]);

  useEffect(() => {
    if (autoFetch && dayWeekly) {
      fetchWeeklyOrderCount();
    } else if (autoFetch && !dayWeekly) {
      setWeeklyData(null);
      setLoading(false);
      setError(null);
    }
  }, [autoFetch, dayWeekly, fetchWeeklyOrderCount]);

  return {
    weeklyData,
    loading,
    error,
    fetchWeeklyOrderCount,
  };
}
