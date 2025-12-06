import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PendingOrderView } from '../view/pending-order.view';
import { api } from '../../../services/api';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { getStatusIdFromDescription } from '../../../utils/helper/status-pedido-helper';
import Swal from 'sweetalert2';

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
    const fetchPendingOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // Usar o novo endpoint para buscar pedidos pendentes
        const response = await api.get('/pedidos/pendentes');
        
        if (response && response.data && Array.isArray(response.data)) {
          // Mapear os pedidos - converter statusPedido (descrição) para ID
          const ordersData = response.data.map((order) => {
            const statusId = getStatusIdFromDescription(order.statusPedido) || 2;
            
            const mappedOrder = {
              ...order,
              statusId: statusId,
            };
            
            return mappedOrder;
          });
          
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
  // Status 2 (Enviado) -> 3 (Validação) -> 4 (Pagamento) -> 5 (Produção)
  const getNextStatus = currentStatusId => {
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
  const handleAdvance = async order => {
    const orderId = order.idPedido || order.id;
    // Obter ID do status a partir da descrição ou usar statusId já calculado
    const currentStatusId =
      order.statusId || getStatusIdFromDescription(order.statusPedido) || 2;
    const nextStatusId = getNextStatus(currentStatusId);

    setActionLoading(orderId);
    setError(null);

    try {
      // Atualizar status do pedido
      const response = await api.patch(
        `/pedidos/alterarStatus/${orderId}/status/${nextStatusId}`,
      );

      if (response.status === 200) {
        // Atualizar a lista de pedidos - recarregar para obter status atualizado
        const refreshResponse = await api.get('/pedidos/pendentes');
        if (
          refreshResponse &&
          refreshResponse.data &&
          Array.isArray(refreshResponse.data)
        ) {
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
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Pedido aceito e inserido na agenda com sucesso!',
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Etapa avançada com sucesso!',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    } catch (err) {
      console.error('Erro ao avançar etapa:', err);
      setError('Não foi possível avançar a etapa. Tente novamente.');
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Não foi possível avançar a etapa. Tente novamente.',
        confirmButtonText: 'OK'
      });
    } finally {
      setActionLoading(null);
    }
  };

  // ========================================
  // HANDLER: VER DETALHES DO PEDIDO
  // ========================================
  // Navega para a tela de detalhes do pedido selecionado
  const handleViewDetails = order => {
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
