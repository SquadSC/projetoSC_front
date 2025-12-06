import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrdersView } from '../view/orders.view.jsx';
import { api } from '../../../services/api';
import { getUserData } from '../../../utils/auth.js';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { OrderStatusHelper } from '../../../utils/enums/order-status.js';

export function OrdersController() {
  const navigate = useNavigate();

  const [pedidosPendentes, setPedidosPendentes] = useState([]);
  const [pedidosEmAndamento, setPedidosEmAndamento] = useState([]);
  const [pedidosConcluidos, setPedidosConcluidos] = useState([]);
  const [pedidosCancelados, setPedidosCancelados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        setLoading(true);
        setError(null);

        const userData = getUserData();
        const idUsuario = userData?.id;

        if (!idUsuario) {
          setError('Usuário não identificado');
          setLoading(false);
          return;
        }

        const response = await api.get('/pedidos/listar', {
          params: { idUsuario },
        });

        const pedidos = Array.isArray(response.data) ? response.data : [];

        // Separar pedidos por categoria usando OrderStatusHelper
        const pendentes = [];
        const emAndamento = [];
        const concluidos = [];
        const cancelados = [];

        pedidos.forEach(pedido => {
          const status = pedido.statusPedido;

          // Cancelados
          if (OrderStatusHelper.isCancelled(status)) {
            cancelados.push(pedido);
          }
          // Concluídos
          else if (OrderStatusHelper.isCompleted(status)) {
            concluidos.push(pedido);
          }
          // Em Produção (incluindo expirados)
          else if (OrderStatusHelper.isProductionStep(status)) {
            emAndamento.push(pedido);
          }
          // Pendentes (Enviado, Validação, Pagamento)
          else if (OrderStatusHelper.isPendingStep(status)) {
            pendentes.push(pedido);
          }
        });

        setPedidosPendentes(pendentes);
        setPedidosEmAndamento(emAndamento);
        setPedidosConcluidos(concluidos);
        setPedidosCancelados(cancelados);
      } catch (err) {
        console.error('[Orders] Erro ao buscar pedidos:', err);
        setError(
          err.response?.data?.message ||
            err.message ||
            'Erro ao buscar pedidos',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPedidos();
  }, []);

  const handleViewDetails = pedido => {
    navigate(`${ROUTES_PATHS.DETAIL_ORDER}/${pedido.idPedido}`);
  };

  return (
    <OrdersView
      pedidosPendentes={pedidosPendentes}
      pedidosEmAndamento={pedidosEmAndamento}
      pedidosConcluidos={pedidosConcluidos}
      pedidosCancelados={pedidosCancelados}
      onViewDetails={handleViewDetails}
      loading={loading}
      error={error}
    />
  );
}
