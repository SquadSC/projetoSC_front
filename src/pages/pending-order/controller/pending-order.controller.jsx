import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PendingOrderView } from '../view/pending-order.view';
import { api } from '../../../services/api';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

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
  // Busca pedidos com status 3, 4 ou 5 (pendentes para confeiteira)
  useEffect(() => {
    const fetchPendingOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // Usar o novo endpoint para buscar pedidos pendentes
        const response = await api.get('/pedidos/pendentes');
        if (response && response.data && Array.isArray(response.data)) {
          // Mapear os pedidos - o statusPedidoId já vem do backend
          const ordersData = response.data.map(order => ({
            ...order,
            statusId: order.statusPedidoId || order.statusId || 3, // Fallback para 3 se não houver
            statusPedidoId: order.statusPedidoId || order.statusId || 3,
          }));
          setOrders(ordersData);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error('Erro ao buscar pedidos pendentes:', err);
        setError('Não foi possível carregar os pedidos pendentes.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  // ========================================
  // LÓGICA DE AVANÇO DE ETAPAS
  // ========================================
  // Determina o próximo status baseado no status atual
  // Status 3 -> 4 -> 5 -> 6 (aceitar = colocar em produção)
  const getNextStatus = (currentStatusId) => {
    // Status 3 (Aceito pela confeiteira) -> Status 4 (Validado pelo fornecedor)
    // Status 4 (Validado pelo fornecedor) -> Status 5 (Agendamento confirmado)
    // Status 5 (Agendamento confirmado) -> Status 6 (Em producao) - Aceitar pedido
    if (currentStatusId === 3) return 4;
    if (currentStatusId === 4) return 5;
    if (currentStatusId === 5) return 6; // Aceitar = colocar em produção
    return currentStatusId;
  };

  // ========================================
  // HANDLER: AVANÇAR ETAPA / ACEITAR PEDIDO
  // ========================================
  // Avança o pedido para a próxima etapa ou aceita (status 6)
  const handleAdvance = async (order) => {
    const orderId = order.idPedido || order.id;
    const currentStatusId = order.statusPedidoId || order.statusId;
    const nextStatusId = getNextStatus(currentStatusId);

    setActionLoading(orderId);
    setError(null);

    try {
      // Atualizar status do pedido
      const response = await api.patch(
        `/pedidos/alterarStatus/${orderId}/status/${nextStatusId}`
      );

      if (response.status === 200) {
        // Atualizar a lista de pedidos
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            (o.idPedido || o.id) === orderId
              ? { ...o, statusPedidoId: nextStatusId, statusId: nextStatusId }
              : o
          )
        );

        // Se foi para status 6 (Em produção), remover da lista de pendentes
        if (nextStatusId === 6) {
          setOrders((prevOrders) =>
            prevOrders.filter((o) => (o.idPedido || o.id) !== orderId)
          );
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
