import { useEffect, useState, useCallback, useRef } from 'react';
import { api } from '../../../../services/api';

// Cache simples para evitar chamadas desnecessárias
const cache = new Map();

export function useGetOrderDay(autoFetch = true, day) {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastDayRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchOrderDay = useCallback(async () => {
    if (!day) {
      setOrderData([]);
      setIsLoading(false);
      lastDayRef.current = null;
      return;
    }

    // Se é o mesmo dia que já foi buscado, não faz nova requisição
    if (lastDayRef.current === day) {
      return;
    }

    // Verificar cache primeiro - se tiver, não mostra loading
    if (cache.has(day)) {
      const cachedData = cache.get(day);
      // Atualiza dados sem alterar estado de loading
      if (isMountedRef.current) {
        setOrderData(cachedData);
        setError(null);
        lastDayRef.current = day;
      }
      // Não seta loading como true quando usa cache
      return;
    }

    // Só marca loading se não há dados no cache
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get(`/pedidos/PedidosData?data=${day}`);

      let data = response.data;

      if (data && typeof data === 'object' && !Array.isArray(data)) {
        const possibleArrayProps = [
          'pedidos',
          'data',
          'items',
          'orders',
          'results',
        ];
        for (const prop of possibleArrayProps) {
          if (Array.isArray(data[prop])) {
            data = data[prop];
            break;
          }
        }
      }

      const finalData = Array.isArray(data) ? data : [];

      // Salvar no cache
      cache.set(day, finalData);

      if (isMountedRef.current) {
        setOrderData(finalData);
        lastDayRef.current = day;
      }
    } catch (err) {
      console.error('Error fetching order day:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Erro ao buscar pedidos do dia';
      if (isMountedRef.current) {
        setError(errorMessage);
        setOrderData([]);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [day]);

  useEffect(() => {
    if (autoFetch && day) {
      fetchOrderDay();
    } else if (autoFetch && !day) {
      setOrderData([]);
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
