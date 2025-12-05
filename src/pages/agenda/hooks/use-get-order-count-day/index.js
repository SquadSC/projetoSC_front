import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../../services/api';

export function useGetOrderCountDay(autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const orderCountDayData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/pedidos/PedidosSemana');
      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar contagem de pedidos:', error);
      setError(
        error.response?.data?.message || 'Erro ao buscar contagem de pedidos',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      orderCountDayData();
    }
  }, []);

  return {
    data,
    loading,
    error,
    orderCountDayData,
  };
}
