import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PendingOrderSelectedView } from '../view/pending-order-selected.view';
import { api } from '../../../services/api';
import { maskCep } from '../../../utils/mask/mask.utils';
import { getStatusIdFromDescription } from '../../../utils/helper/status-pedido-helper';
import Swal from 'sweetalert2';

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
            const clienteResponse = await api.get(
              `/usuarios/${pedidoData.clienteId}`,
            );
            clienteData = clienteResponse.data;
          } catch (clienteErr) {
            console.warn('Erro ao buscar dados do cliente:', clienteErr);
            // Continua mesmo se não conseguir buscar o cliente
          }
        }

        // Buscar dados do endereço se houver enderecoId
        let enderecoCompleto = null;
        if (pedidoData.enderecoId) {
          try {
            const enderecoResponse = await api.get(
              `/enderecos/${pedidoData.enderecoId}`,
            );
            enderecoCompleto = enderecoResponse.data;
          } catch (enderecoErr) {
            console.warn('Erro ao buscar dados do endereço:', enderecoErr);
            // Continua mesmo se não conseguir buscar o endereço
          }
        }

        // Mapear os dados do backend para o formato esperado pela view
        // Usa endereço completo buscado ou endereço direto do pedido
        const endereco = enderecoCompleto || pedidoData.endereco;

        // Função para formatar endereço de forma mais robusta
        const formatAddress = (endereco, isRetirada) => {
          // Se é retirada, mostrar informação do ateliê
          if (isRetirada) {
            return 'Retirada no ateliê - Trav. La Paloma, 23 - Jardim da Conquista - 08343-190';
          }

          if (!endereco) return 'Endereço não informado';

          // Verificar se campos essenciais existem
          if (!endereco.logradouro && !endereco.numero) {
            return 'Endereço não informado';
          }

          const logradouro = endereco.logradouro || '';
          const numero = endereco.numero || '';
          const complemento = endereco.complemento || '';
          const bairro = endereco.bairro || '';
          const cidade = endereco.cidade || '';
          const cep = endereco.cep || '';

          // Monta endereço linha por linha
          let enderecoCompleto = '';

          // Linha 1: Logradouro, número e complemento
          if (logradouro || numero) {
            enderecoCompleto += `${logradouro}${
              logradouro && numero ? ', ' : ''
            }${numero}`;
            if (complemento) {
              enderecoCompleto += ` - ${complemento}`;
            }
          }

          // Linha 2: Bairro e cidade
          if (bairro || cidade) {
            if (enderecoCompleto) enderecoCompleto += ' - ';
            enderecoCompleto += `${bairro}${
              bairro && cidade ? ', ' : ''
            }${cidade}`;
          }

          // Linha 3: CEP
          if (cep) {
            if (enderecoCompleto) enderecoCompleto += ' - ';
            enderecoCompleto += maskCep(cep);
          }

          return enderecoCompleto.trim() || 'Endereço não informado';
        };

        const enderecoFormatado = formatAddress(
          endereco,
          pedidoData.isRetirada,
        );

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
          isRetirada: pedidoData.isRetirada || false, // Indica se é retirada no ateliê
          statusPedido: pedidoData.statusPedido, // Manter a descrição do status
          statusId: getStatusIdFromDescription(pedidoData.statusPedido) || 2, // Calcular ID do status
          // Dados do cliente vindos do backend
          customer: {
            name: clienteData?.nome || 'Cliente',
            memberSince: memberSince,
            phone: clienteData?.telefone || null,
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
   * Avança o pedido para a próxima etapa ou aceita (status 5 = Produção)
   * Status 2 -> 3 -> 4 -> 5
   * Quando status for 5, agenda o pedido no Google Calendar também
   */
  const handleAccept = async () => {
    setActionLoading(true);
    setError(null);
    try {
      // Avançar para o próximo status ou aceitar (status 5 = Produção)
      // Obter ID do status a partir da descrição ou usar statusId já calculado
      const currentStatus =
        order?.statusId || getStatusIdFromDescription(order?.statusPedido) || 2;
      let nextStatus = 3;

      if (currentStatus === 2) nextStatus = 3; // Enviado -> Validação
      else if (currentStatus === 3) nextStatus = 4; // Validação -> Pagamento
      else if (currentStatus === 4)
        nextStatus = 5; // Pagamento -> Produção (aceitar)
      else if (currentStatus === 5) nextStatus = 7; // Outros casos, mantém o mesmo status

      // Atualizar status do pedido
      await api.patch(`/pedidos/alterarStatus/${id}/status/${nextStatus}`);

      // Se foi para status 5 (Produção), agendar no Google Calendar
      if (nextStatus === 5) {
        try {
          await api.post(`/calendario/${id}`);
        } catch (calendarErr) {
          console.error('Erro ao agendar no Google Calendar:', calendarErr);
          // Continua mesmo se falhar o agendamento, mas mostra aviso
          Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Pedido aceito, mas houve um problema ao agendar no calendário. Verifique manualmente.',
            confirmButtonText: 'OK',
          });
          return;
        }

        // Popup de sucesso quando aceita e agenda
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Pedido aceito e inserido na agenda com sucesso!',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        // Popup de sucesso quando apenas avança etapa
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Etapa avançada com sucesso!',
          showConfirmButton: false,
          timer: 2000,
        });
      }

      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/pending-orders');
      }, 2000);
    } catch (err) {
      console.error('Erro ao aceitar pedido:', err);
      setError('Não foi possível aceitar o pedido. Tente novamente.');
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Não foi possível aceitar o pedido. Tente novamente.',
        confirmButtonText: 'OK',
      });
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Recusa o pedido alterando o status para Cancelado (status 8)
   * Mostra popup de confirmação antes de recusar
   */
  const handleDecline = async () => {
    // Popup de confirmação antes de recusar (seguindo padrão da tela de produtos)
    const result = await Swal.fire({
      title: 'Deseja recusar o pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#38090D',
      cancelButtonColor: '#38090D',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, recusar',
      customClass: {
        cancelButton: 'swal-cancel-button',
      },
    });

    // Se o usuário cancelou, não faz nada
    if (!result.isConfirmed) {
      return;
    }

    setActionLoading(true);
    setError(null);
    try {
      // Cancelar pedido (status 8 = Cancelado)
      await api.patch(`/pedidos/alterarStatus/${id}/status/8`);

      // Popup de sucesso após recusar
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Pedido recusado com sucesso!',
        showConfirmButton: false,
        timer: 2000,
      });

      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/pending-orders');
      }, 2000);
    } catch (err) {
      console.error('Erro ao recusar pedido:', err);
      setError('Não foi possível recusar o pedido. Tente novamente.');
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Não foi possível recusar o pedido. Tente novamente.',
        confirmButtonText: 'OK',
      });
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Navega para a tela de detalhes do bolo selecionado
   */
  const handleViewCakeDetails = item => {
    const orderId = order?.idPedido || order?.id;
    const itemId = item.idItemPedido;

    if (!orderId || !itemId) {
      console.error('IDs do pedido ou item não disponíveis');
      return;
    }

    // Navegar para a tela de detalhes do bolo, passando o item via state
    navigate(`/pending-order-selected/${orderId}/cake/${itemId}`, {
      state: {
        item: item,
        orderId: orderId,
      },
    });
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
