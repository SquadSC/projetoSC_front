import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../../services/api';

export function useNewOrders(autoFetch = true) {
  const [newOrders, setNewOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const newOrdersData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('/pedidos/pendentes');
      if (response && response.data && Array.isArray(response.data)) {
        setNewOrders(response.data);
      } else {
        setNewOrders([]);
      }
    } catch (error) {
      console.error('Error fetching new orders:', error);
      setError(error.response?.data?.message || 'Error fetching new orders');
      setNewOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      newOrdersData();
    }
  }, [autoFetch, newOrdersData]);

  return {
    newOrders,
    isLoading,
    error,
    newOrdersData,
  };
}
