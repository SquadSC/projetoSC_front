import { useEffect, useState, useCallback } from 'react';
import { api } from '../../../../services/api';

export function useGetOrderDay(autoFetch = true, day) {
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrderDay = useCallback(async () => {
    if (!day) {
      setOrderData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/pedidos/PedidosData?data=${day}`);
      setOrderData(response.data);
    } catch (err) {
      console.error('Error fetching order day:', err);
      setError(err.response?.data?.message || 'Erro ao buscar pedidos do dia');
      setOrderData(null);
    } finally {
      setIsLoading(false);
    }
  }, [day]);

  useEffect(() => {
    if (autoFetch && day) {
      fetchOrderDay();
    } else if (autoFetch && !day) {
      setOrderData(null);
      setIsLoading(false);
      setError(null);
    }
  }, [autoFetch, day, fetchOrderDay]);

  return {
    orderData,
    isLoading,
    error,
    fetchOrderDay,
  };
}
