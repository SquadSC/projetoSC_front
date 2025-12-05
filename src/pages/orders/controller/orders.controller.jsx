import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrdersView } from '../view/orders.view.jsx';
import { api } from '../../../services/api';
import { getUserData } from "../../../utils/auth.js";
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

// 🔄 Função ajustada para normalizar status
function normalizarStatus(status = '') {
  const map = {
    'Enviado': 'Pendente',
    'Aceito pela confeiteira': 'Em Andamento',
    'Validado pelo fornecedor': 'Em Andamento',
    'Agendamento confirmado': 'Em Andamento',
    'Em produção': 'Em Andamento',
    'Concluído': 'Concluído',
    'Cancelado': 'Cancelado',
  };

  return map[status] || 'Pendente'; // fallback seguro
}

export function OrdersController() {
  const navigate = useNavigate();

  const [pedidosPendentes, setPedidosPendentes] = useState([]);
  const [pedidosEmAndamento, setPedidosEmAndamento] = useState([]);
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

        const pedidosNormalizados = pedidos.map(p => ({
          ...p,
          statusNormalizado: normalizarStatus(p.statusPedido),
        }));

        setPedidosPendentes(
          pedidosNormalizados.filter(p => p.statusNormalizado === 'Pendente')
        );

        setPedidosEmAndamento(
          pedidosNormalizados.filter(p => p.statusNormalizado === 'Em Andamento')
        );

      } catch (err) {
        console.error('[Orders] Erro ao buscar pedidos:', err);
        setError(
          err.response?.data?.message ||
          err.message ||
          'Erro ao buscar pedidos'
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
      onViewDetails={handleViewDetails}
      loading={loading}
      error={error}
    />
  );
}
