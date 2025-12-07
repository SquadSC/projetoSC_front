import { useState, useEffect } from 'react';
import { DashboardView } from '../view/dashboard.view';
import { formatDateToLocalString } from '../../../utils/date/date.utils';

export function DashboardController() {
  const [operationalData, setOperationalData] = useState(null);
  const [managerialData, setManagerialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    setStartDate(formatDateToLocalString(thirtyDaysAgo));
    setEndDate(formatDateToLocalString(today));
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchOperationalData();
      const interval = setInterval(fetchOperationalData, 30000);
      return () => clearInterval(interval);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchManagerialData();
    }
  }, [startDate, endDate]);

  const fetchOperationalData = async () => {
    try {
      setLoading(true);
      const baseUrl = 'http://localhost:8080/dashboard';

      const overviewResponse = await fetch(`${baseUrl}/overview`);
      if (!overviewResponse.ok) {
        const errorText = await overviewResponse.text();
        throw new Error(`Erro ao buscar dados principais: ${errorText}`);
      }
      const overviewData = await overviewResponse.json();

      // O endpoint /top-ingredientes não aceita parâmetros de data
      const ingredientsResponse = await fetch(`${baseUrl}/top-ingredientes`);
      if (!ingredientsResponse.ok) {
        const errorText = await ingredientsResponse.text();
        throw new Error(`Erro ao buscar ingredientes: ${errorText}`);
      }
      const ingredientsData = await ingredientsResponse.json();

      // Debug: verificar estrutura dos dados
      console.log('[DashboardController] Resposta completa:', ingredientsData);
      if (ingredientsData.massa && ingredientsData.massa.length > 0) {
        console.log('[DashboardController] Primeiro item de massa:', ingredientsData.massa[0]);
        console.log('[DashboardController] Todas propriedades do primeiro item de massa:', Object.keys(ingredientsData.massa[0]));
      }
      if (ingredientsData.recheio && ingredientsData.recheio.length > 0) {
        console.log('[DashboardController] Primeiro item de recheio:', ingredientsData.recheio[0]);
        console.log('[DashboardController] Todas propriedades do primeiro item de recheio:', Object.keys(ingredientsData.recheio[0]));
      }
      if (ingredientsData.adicional && ingredientsData.adicional.length > 0) {
        console.log('[DashboardController] Primeiro item de adicional:', ingredientsData.adicional[0]);
        console.log('[DashboardController] Todas propriedades do primeiro item de adicional:', Object.keys(ingredientsData.adicional[0]));
      }

      const ingredientsByCategory = {
        massa: ingredientsData.massa || [],
        recheio: ingredientsData.recheio || [],
        adicional: ingredientsData.adicional || [],
      };

      setOperationalData({
        todayOrders: overviewData.pedidosHoje,
        pendingOrders: overviewData.pendentes,
        completingOrders: overviewData.produzindo,
        completedOrders: overviewData.concluidos,
        topIngredientsByCategory: ingredientsByCategory,
      });

      setError(null);
    } catch (err) {
      console.error('Erro ao carregar dashboard operacional:', err);
      setError(
        err.message || 'Erro desconhecido ao carregar dados operacionais',
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchManagerialData = async () => {
    try {
      setLoading(true);
      const baseUrl = 'http://localhost:8080/dashboard';

      const statsParams = new URLSearchParams({
        dataInicio: startDate,
        dataFim: endDate,
      });
      const statsResponse = await fetch(
        `${baseUrl}/estatisticas?${statsParams}`,
      );
      if (!statsResponse.ok) {
        const errorText = await statsResponse.text();
        throw new Error(`Erro ao buscar estatísticas: ${errorText}`);
      }
      const statsData = await statsResponse.json();

      const clientsParams = new URLSearchParams({
        dataInicio: startDate,
        dataFim: endDate,
      });
      const clientsResponse = await fetch(
        `${baseUrl}/top-clientes?${clientsParams}`,
      );
      if (!clientsResponse.ok) {
        const errorText = await clientsResponse.text();
        throw new Error(`Erro ao buscar top clientes: ${errorText}`);
      }
      const clientsData = await clientsResponse.json();

      setManagerialData({
        totalRevenue: statsData.receitaTotalPeriodo,
        averageOrderValue: statsData.ticketMedio,
        totalOrders: statsData.totalPedidosPeriodo, // Total de pedidos concluídos no período
        completionRate: statsData.taxaConclusao,
        topClients: clientsData.map(client => ({
          name: client.nome,
          orders: client.quantidadePedidos,
          email: client.email,
          total: client.valorTotal,
          position: client.posicao,
        })),
      });

      setError(null);
    } catch (err) {
      console.error('Erro ao carregar dashboard gerencial:', err);
      setError(err.message || 'Erro desconhecido ao carregar dados gerenciais');
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = () => {
    if (!startDate || !endDate) {
      alert('Por favor, selecione as datas de início e fim.');
      return;
    }
    fetchManagerialData();
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchOperationalData();
    if (startDate && endDate) {
      fetchManagerialData();
    }
  };

  return (
    <DashboardView
      operationalData={operationalData}
      managerialData={managerialData}
      loading={loading}
      error={error}
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      onDateFilter={handleDateFilter}
      onRefresh={handleRefresh}
    />
  );
}
