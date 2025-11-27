import { useState } from 'react';

export function useGetFilterDayOrder(autoFetch = true, day) {
  const [filterOrders, setFilterOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFilterDayOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get(`/orders/agenda/${day}`);
      setFilterOrders(response.data);
    } catch (err) {
      console.error('Error fetching filtered day orders:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [day]);

  useEffect(() => {
    if (autoFetch) {
      fetchFilterDayOrders();
    }
  }, [autoFetch, fetchFilterDayOrders]);

  return { filterOrders, isLoading, error, fetchFilterDayOrders };
}
