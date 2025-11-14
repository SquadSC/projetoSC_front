import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PendingOrderSelectedView } from '../view/pending-order-selected.view';
import { api } from '../../../services/api';
import { maskCep } from '../../../utils/mask/mask.utils';

export function PendingOrderSelectedController() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Busca os dados do pedido e do cliente do backend
   * Formata os dados para exibição na view
   */
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        // Buscar dados do pedido
        const response = await api.get(`/pedidos/${id}`);
        const pedidoData = response.data;

        // Buscar dados do cliente se houver clienteId
        let clienteData = null;
        if (pedidoData.clienteId) {
          try {
            const clienteResponse = await api.get(`/usuarios/${pedidoData.clienteId}`);
            clienteData = clienteResponse.data;
          } catch (clienteErr) {
            console.warn('Erro ao buscar dados do cliente:', clienteErr);
            // Continua mesmo se não conseguir buscar o cliente
          }
        }

        // Mapear os dados do backend para o formato esperado pela view
        const endereco = pedidoData.endereco;
        const cepFormatado = endereco?.cep ? maskCep(endereco.cep) : '';
        const enderecoFormatado = endereco
          ? `${endereco.logradouro}, ${endereco.numero} - ${cepFormatado}`
          : 'Endereço não informado';

        // Formatar data e hora de entrega
        const dtEntrega = pedidoData.dtEntregaEsperada
          ? new Date(pedidoData.dtEntregaEsperada)
          : null;
        const deliveryDate = dtEntrega
          ? dtEntrega.toLocaleDateString('pt-BR')
          : null;
        const deliveryTime = dtEntrega
          ? dtEntrega.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : null;

        // Formatar data de cadastro do cliente (usar dataUltimoLogin como referência se não houver data de cadastro)
        const memberSince = clienteData?.dataUltimoLogin
          ? new Date(clienteData.dataUltimoLogin).toLocaleDateString('pt-BR')
          : pedidoData.dtPedido
          ? new Date(pedidoData.dtPedido).toLocaleDateString('pt-BR')
          : '';

        // Mapear para o formato esperado pela view
        const orderMapped = {
          idPedido: pedidoData.idPedido,
          id: pedidoData.idPedido,
          precoTotal: pedidoData.precoTotal || 0,
          total: pedidoData.precoTotal || 0,
          paidPercent: 50, // Valor padrão, pode ser ajustado se houver no backend
          dtEntregaEsperada: pedidoData.dtEntregaEsperada,
          deliveryDate: deliveryDate,
          deliveryTime: deliveryTime,
          address: enderecoFormatado,
          statusPedidoId: pedidoData.statusPedidoId,
          // Dados do cliente vindos do backend
          customer: {
            name: clienteData?.nome || 'Cliente',
            memberSince: memberSince,
          },
          itensPedido: pedidoData.itensPedido || [],
        };

        setOrder(orderMapped);
      } catch (err) {
        console.error('Erro ao buscar pedido:', err);
        if (err.response?.status === 404) {
          setError('Pedido não encontrado.');
        } else {
          setError('Não foi possível carregar os dados do pedido.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  /**
   * Avança o pedido para a próxima etapa ou aceita ( se o status 6 = Em produção)
   * Status 3 -> 4 -> 5 -> 6
   */
  const handleAccept = async () => {
    setActionLoading(true);
    setError(null);
    try {
      // Avançar para o próximo status ou aceitar (status 6 = Em produção)
      const currentStatus = order?.statusPedidoId || 3;
      let nextStatus = 4;
      
      if (currentStatus === 3) nextStatus = 4; // Aceito pela confeiteira -> Validado pelo fornecedor
      else if (currentStatus === 4) nextStatus = 5; // Validado pelo fornecedor -> Agendamento confirmado
      else if (currentStatus === 5) nextStatus = 6; // Agendamento confirmado -> Em produção (aceitar)

      await api.patch(`/pedidos/alterarStatus/${id}/status/${nextStatus}`);
      
      if (nextStatus === 6) {
        alert('Pedido aceito e inserido na agenda com sucesso!');
      } else {
        alert('Etapa avançada com sucesso!');
      }
      
      navigate('/pending-orders'); // Voltar para a lista de pedidos pendentes
    } catch (err) {
      console.error('Erro ao aceitar pedido:', err);
      setError('Não foi possível aceitar o pedido. Tente novamente.');
      alert('Erro ao aceitar pedido. Tente novamente.');
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Recusa o pedido alterando o status para Cancelado (status 8)
   */
  const handleDecline = async () => {
    setActionLoading(true);
    setError(null);
    try {
      // Cancelar pedido (status 8 = Cancelado)
      await api.patch(`/pedidos/alterarStatus/${id}/status/8`);
      alert('Pedido recusado com sucesso!');
      navigate('/pending-orders'); // Voltar para a lista de pedidos pendentes
    } catch (err) {
      console.error('Erro ao recusar pedido:', err);
      setError('Não foi possível recusar o pedido. Tente novamente.');
      alert('Erro ao recusar pedido. Tente novamente.');
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Exibe detalhes do bolo selecionado
   * Pode ser expandido para navegar para uma tela de detalhes
   */
  const handleViewCakeDetails = (item) => {
    // Aqui você pode implementar a navegação para uma tela de detalhes do bolo
    // Por enquanto, apenas mostra um alerta
    console.log('Detalhes do bolo:', item);
    alert(`Detalhes do Bolo #${item.idItemPedido}\nTema: ${item.informacaoBolo?.tema || 'N/A'}`);
  };

  return (
    <PendingOrderSelectedView
      loading={loading}
      actionLoading={actionLoading}
      error={error}
      order={order}
      onAccept={handleAccept}
      onDecline={handleDecline}
      onBack={() => navigate(-1)}
      onViewCakeDetails={handleViewCakeDetails}
    />
  );
}

