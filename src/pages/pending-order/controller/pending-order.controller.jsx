import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PendingOrderView } from '../view/pending-order.view'; // Importar a nova view
import mockData from '../../../../bdMock.json'; // Usando o mock para garantir dados

export function PendingOrderController() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false); // Loading para os botões
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Simulação: Buscando o primeiro pedido do mock, já que o ID não corresponde
    const fetchedOrder = mockData.pedidos[0];
    if (fetchedOrder) {
      setOrder(fetchedOrder);
    } else {
      setError('Pedido não encontrado.');
    }
    setLoading(false);

    /*
    // Lógica com API real:
    request.get(`/pedidos/${id}`)
      .then((res) => setOrder(res.data))
      .catch((err) => {
        console.error('Erro ao buscar pedido:', err);
        setError('Não foi possível carregar os dados do pedido.');
      })
      .finally(() => setLoading(false));
    */
  }, [id]);

  const handleAccept = async () => {
    setActionLoading(true);
    setError(null);
    try {
      // Exemplo de chamada de API:
      // await request.post(`/pedidos/${id}/aceitar`);
      console.log('Pedido aceito:', id);
      alert('Pedido aceito com sucesso!');
      navigate('/pedidos'); // Voltar para a lista de pedidos
    } catch (err) {
      console.error('Erro ao aceitar pedido:', err);
      setError('Não foi possível aceitar o pedido. Tente novamente.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDecline = async () => {
    setActionLoading(true);
    setError(null);
    try {
      // Exemplo de chamada de API:
      // await request.post(`/pedidos/${id}/recusar`);
      console.log('Pedido recusado:', id);
      alert('Pedido recusado com sucesso!');
      navigate('/pedidos'); // Voltar para a lista de pedidos
    } catch (err) {
      console.error('Erro ao recusar pedido:', err);
      setError('Não foi possível recusar o pedido. Tente novamente.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <PendingOrderView
      loading={loading}
      actionLoading={actionLoading}
      error={error}
      order={order}
      onAccept={handleAccept}
      onDecline={handleDecline}
      onBack={() => navigate(-1)}
    />
  );
}