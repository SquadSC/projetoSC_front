import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PendingOrderView } from '../view/pending-order.view';
import { api } from '../../../services/api';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { getStatusIdFromDescription } from '../../../utils/helper/status-pedido-helper';

export function PendingOrderController() {
  const navigate = useNavigate();

  // Estados do componente
  const [orders, setOrders] = useState([]); // Lista de pedidos pendentes
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial
  const [actionLoading, setActionLoading] = useState(null); // ID do pedido em processamento (avançar/aceitar)
  const [error, setError] = useState(null); // Mensagem de erro

  // ========================================
  // BUSCAR PEDIDOS PENDENTES
  // ========================================
  // Busca pedidos com status 2, 3 ou 4 (pendentes para confeiteira)
  useEffect(() => {
    console.log('🚀 [PendingOrder] useEffect executado!');
    const fetchPendingOrders = async () => {
      console.log('🔍 [PendingOrder] Iniciando busca de pedidos pendentes...');
      setLoading(true);
      setError(null);
      try {
        // Usar o novo endpoint para buscar pedidos pendentes
        console.log('📡 [PendingOrder] Fazendo requisição para /pedidos/pendentes');
        const response = await api.get('/pedidos/pendentes');
        console.log('🎯 [PendingOrder] Requisição completada, processando resposta...');
        console.log('✅ [PendingOrder] Resposta completa:', JSON.stringify(response, null, 2));
        console.log('✅ [PendingOrder] Resposta recebida:', response);
        console.log('📦 [PendingOrder] response.data:', response.data);
        console.log('📦 [PendingOrder] response.data tipo:', typeof response.data);
        console.log('📦 [PendingOrder] response.data é null?', response.data === null);
        console.log('📦 [PendingOrder] response.data é undefined?', response.data === undefined);
        console.log('📦 [PendingOrder] É array?', Array.isArray(response.data));
        console.log('📦 [PendingOrder] response.data.length:', response.data?.length);
        
        if (response && response.data && Array.isArray(response.data)) {
          console.log('📊 [PendingOrder] Total de pedidos recebidos:', response.data.length);
          
          // Mapear os pedidos - converter statusPedido (descrição) para ID
          const ordersData = response.data.map((order, index) => {
            console.log(`📋 [PendingOrder] Pedido ${index + 1}:`, order);
            console.log(`📋 [PendingOrder] Pedido ${index + 1} - statusPedido:`, order.statusPedido);
            
            const statusId = getStatusIdFromDescription(order.statusPedido) || 2;
            console.log(`📋 [PendingOrder] Pedido ${index + 1} - statusId calculado:`, statusId);
            
            const mappedOrder = {
              ...order,
              statusId: statusId,
            };
            console.log(`📋 [PendingOrder] Pedido ${index + 1} - mapeado:`, mappedOrder);
            
            return mappedOrder;
          });
          
          console.log('✅ [PendingOrder] Pedidos mapeados:', ordersData);
          console.log('✅ [PendingOrder] Total de pedidos mapeados:', ordersData.length);
          setOrders(ordersData);
        } else {
          console.warn('⚠️ [PendingOrder] Resposta não é um array válido');
          console.warn('⚠️ [PendingOrder] response:', response);
          console.warn('⚠️ [PendingOrder] response.data:', response?.data);
          setOrders([]);
        }
      } catch (err) {
        console.error('❌ [PendingOrder] Erro ao buscar pedidos pendentes:', err);
        console.error('❌ [PendingOrder] Erro completo:', JSON.stringify(err, null, 2));
        console.error('❌ [PendingOrder] Erro response:', err.response);
        console.error('❌ [PendingOrder] Erro response.data:', err.response?.data);
        console.error('❌ [PendingOrder] Erro response.status:', err.response?.status);
        setError('Não foi possível carregar os pedidos pendentes.');
        setOrders([]);
      } finally {
        console.log('🏁 [PendingOrder] Busca finalizada. Loading: false');
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  // ========================================
  // LÓGICA DE AVANÇO DE ETAPAS
  // ========================================
  // Determina o próximo status baseado no status atual
  // Status 2 (Enviado) -> 3 (Validação) -> 4 (Pagamento) -> 5 (Produção)
  const getNextStatus = (currentStatusId) => {
    // Status 2 (Enviado) -> Status 3 (Validação)
    // Status 3 (Validação) -> Status 4 (Pagamento)
    // Status 4 (Pagamento) -> Status 5 (Produção) - Aceitar pedido
    if (currentStatusId === 2) return 3;
    if (currentStatusId === 3) return 4;
    if (currentStatusId === 4) return 5; // Aceitar = colocar em produção
    return currentStatusId;
  };

  // ========================================
  // HANDLER: AVANÇAR ETAPA / ACEITAR PEDIDO
  // ========================================
  // Avança o pedido para a próxima etapa ou aceita (status 6)
  const handleAdvance = async (order) => {
    const orderId = order.idPedido || order.id;
    // Obter ID do status a partir da descrição ou usar statusId já calculado
    const currentStatusId = order.statusId || getStatusIdFromDescription(order.statusPedido) || 2;
    const nextStatusId = getNextStatus(currentStatusId);

    setActionLoading(orderId);
    setError(null);

    try {
      // Atualizar status do pedido
      const response = await api.patch(
        `/pedidos/alterarStatus/${orderId}/status/${nextStatusId}`
      );

      if (response.status === 200) {
        // Atualizar a lista de pedidos - recarregar para obter status atualizado
        const refreshResponse = await api.get('/pedidos/pendentes');
        if (refreshResponse && refreshResponse.data && Array.isArray(refreshResponse.data)) {
          const ordersData = refreshResponse.data.map(o => {
            const statusId = getStatusIdFromDescription(o.statusPedido) || 2;
            return {
              ...o,
              statusId: statusId,
            };
          });
          setOrders(ordersData);
        }

        // Se foi para status 5 (Produção), o pedido já foi removido da lista ao recarregar
        // pois o endpoint /pedidos/pendentes só retorna status 2, 3 e 4
        if (nextStatusId === 5) {
          alert('Pedido aceito e inserido na agenda com sucesso!');
        } else {
          alert('Etapa avançada com sucesso!');
        }
      }
    } catch (err) {
      console.error('Erro ao avançar etapa:', err);
      setError('Não foi possível avançar a etapa. Tente novamente.');
      alert('Erro ao avançar etapa. Tente novamente.');
    } finally {
      setActionLoading(null);
    }
  };

  // ========================================
  // HANDLER: VER DETALHES DO PEDIDO
  // ========================================
  // Navega para a tela de detalhes do pedido selecionado
  const handleViewDetails = (order) => {
    const orderId = order.idPedido || order.id;
    navigate(`${ROUTES_PATHS.PENDING_ORDER_SELECTED.replace(':id', orderId)}`);
  };

  // ========================================
  // RENDER: VIEW
  // ========================================
  console.log('🎨 [PendingOrder] Renderizando view com:', {
    loading,
    ordersCount: orders.length,
    orders,
    error,
  });

  return (
    <PendingOrderView
      loading={loading}
      orders={orders}
      onViewDetails={handleViewDetails}
      onAdvance={handleAdvance}
      onBack={() => navigate(-1)}
      actionLoading={actionLoading}
      error={error}
    />
  );
}
