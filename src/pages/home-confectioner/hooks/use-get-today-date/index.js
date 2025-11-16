import { useEffect, useCallback, useState } from 'react';
import { api } from '../../../../services/api';

export function useGetTodayDate(autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const todayDate = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/today-date');
      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar a data de hoje:', error);
      setError(
        error.response?.data?.message || 'Erro ao buscar a data de hoje',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      todayDate();
    }
  }, [autoFetch, todayDate]);

  return {
    data,
    loading,
    error,
    todayDate,
  };
}
