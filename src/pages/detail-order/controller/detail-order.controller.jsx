import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import OrderDetailsView from '../view/detail-order.view';
import { api } from '../../../services/api';
import { maskCep } from '../../../utils/mask/mask.utils';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import {
  ORDER_STATUS_ID,
  OrderStatusHelper,
} from '../../../utils/enums/order-status';
import Swal from 'sweetalert2';

/**
 * DetailOrderController
 *
 * Responsabilidades:
 * - Buscar dados do pedido via GET /pedidos/{idPedido}
 * - Buscar dados do cliente via GET /usuarios/{clienteId}
 * - Buscar anexos de imagens de referência
 * - Formatar dados para exibição na view
 * - Gerenciar estados de loading e erro
 * - Prover callbacks para ações (editar, cancelar)
 */
export function DetailOrderController() {
  const { id } = useParams(); // ID do pedido/usuário via URL
  const navigate = useNavigate(); // Para navegação
  const theme = useTheme(); // Para acessar cores do tema

  const [order, setOrder] = useState(null); // Dados do pedido formatados
  const [loading, setLoading] = useState(true); // Loading inicial
  const [actionLoading, setActionLoading] = useState(false); // Loading de ações (cancelar)
  const [error, setError] = useState(null); // Mensagem de erro
  const [refImages, setRefImages] = useState({}); // Images map: { anexoId: blobUrl }

  const fetchReferenceImage = async anexoData => {
    // Validar se anexoData é válido e tem ID
    if (!anexoData || typeof anexoData !== 'object') {
      return null;
    }

    const anexoId = anexoData.idAnexo;
    if (!anexoId || typeof anexoId !== 'number') {
      return null;
    }

    // Verificar se já temos esta imagem em cache
    if (refImages[anexoId]) {
      return refImages[anexoId];
    }

    try {
      // Se já temos a imagem em base64, usar ela diretamente
      if (anexoData.imagemAnexo && typeof anexoData.imagemAnexo === 'string') {
        // Verificar se já tem o prefixo data:image
        let base64Image = anexoData.imagemAnexo;
        if (!base64Image.startsWith('data:')) {
          base64Image = `data:image/jpeg;base64,${anexoData.imagemAnexo}`;
        }

        // Armazenar no mapa de imagens
        setRefImages(prev => ({
          ...prev,
          [anexoId]: base64Image,
        }));

        return base64Image;
      }

      // Caso contrário, buscar via API
      const response = await api.get(`/anexos/${anexoId}`, {
        responseType: 'arraybuffer', // ← Receber como bytes
      });

      // Converter bytes para blob
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const blobUrl = URL.createObjectURL(blob);

      // Armazenar no mapa de imagens
      setRefImages(prev => ({
        ...prev,
        [anexoId]: blobUrl,
      }));

      return blobUrl;
    } catch (err) {
      return null;
    }
  };

  // Cleanup: Revogar blob URLs ao desmontar componente
  useEffect(() => {
    return () => {
      Object.values(refImages).forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [refImages]);

  // ========================================
  // HELPER FUNCTIONS
  // ========================================

  const validateOrderData = data => {
    if (!data) return false;

    // Extrair dados se vier como array
    const orderData = Array.isArray(data) ? data[0] : data;

    // Verificar se tem pelo menos um campo essencial
    return (
      orderData &&
      (orderData.idPedido !== null ||
        orderData.itensPedido !== null ||
        orderData.precoTotal !== null)
    );
  };

  const formatAddress = endereco => {
    if (!endereco) return 'Não definido';

    // Verificar se campos essenciais existem
    if (!endereco.logradouro && !endereco.numero) {
      return 'Não definido';
    }

    const cepFormatado = endereco.cep ? maskCep(endereco.cep) : '';
    const complementoStr = endereco.complemento
      ? ` - ${endereco.complemento}`
      : '';

    const logradouro = endereco.logradouro || '';
    const numero = endereco.numero || '';
    const enderecoFormatado = `${logradouro}${
      logradouro && numero ? ', ' : ''
    }${numero}${complementoStr}${cepFormatado ? ` - ${cepFormatado}` : ''}`;

    return enderecoFormatado.trim() || 'Não definido';
  };

  const formatDateTime = dateTimeString => {
    if (!dateTimeString) return { date: 'Não definida', time: 'Não definida' };

    const dtEntrega = new Date(dateTimeString);

    // Validar se a data é válida
    if (isNaN(dtEntrega.getTime())) {
      return { date: 'Não definida', time: 'Não definida' };
    }

    return {
      date: dtEntrega.toLocaleDateString('pt-BR'),
      time: dtEntrega.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const processOrderItems = async (items = []) => {
    return Promise.all(
      items.map(async item => {
        const informacaoBolo = item.informacaoBolo || {};
        let imagemUrl = null;

        // Processar imagem de referência se houver anexo válido
        if (informacaoBolo.anexo?.idAnexo) {
          imagemUrl = await fetchReferenceImage(informacaoBolo.anexo);
        }

        return {
          ...item,
          imagemUrl: imagemUrl,
        };
      }),
    );
  };

  const extractCakeDetails = firstItem => {
    if (!firstItem) {
      return {
        theme: 'Não especificado',
        cakeType: 'Não especificado',
        batter: [],
        filling: [],
        additions: [],
        weightKg: 0,
        notes: 'Sem observações',
      };
    }

    const informacaoBolo = firstItem.informacaoBolo || {};
    const ingredientes = firstItem.ingredientes || [];

    return {
      theme: informacaoBolo.tema || 'Não especificado',
      cakeType: firstItem.descricao || 'Não especificado',
      batter: ingredientes
        .filter(ing => ing.descricao === 'massa')
        .map(ing => ing.nome),
      filling: ingredientes
        .filter(ing => ing.descricao === 'cobertura')
        .map(ing => ing.nome),
      additions: ingredientes
        .filter(ing => ing.descricao === 'adicionais')
        .map(ing => ing.nome),
      weightKg: firstItem.quantidade || 0,
      notes: informacaoBolo.detalhes || 'Sem observações',
    };
  };

  const fetchCustomerData = async clienteId => {
    if (!clienteId) return null;

    try {
      const response = await api.get(`/usuarios/${clienteId}`);
      return response.data;
    } catch (err) {
      return null;
    }
  };

  const mapOrderForView = (orderData, customerData, processedItems) => {
    const { date: deliveryDate, time: deliveryTime } = formatDateTime(
      orderData.dtEntregaEsperada,
    );
    const memberSince = customerData?.dataUltimoLogin
      ? new Date(customerData.dataUltimoLogin).toLocaleDateString('pt-BR')
      : 'Data não disponível';

    // Função para formatar endereço considerando retirada
    const formatAddressWithRetirada = (endereco, isRetirada) => {
      // Se é retirada, mostrar informação do ateliê
      if (isRetirada) {
        return 'Retirada no ateliê - Trav. La Paloma, 23 - Jardim da Conquista - 08343-190';
      }
      // Caso contrário, formata endereço normalmente
      return formatAddress(endereco);
    };

    return {
      // Identificadores
      idPedido: orderData.idPedido,
      id: orderData.idPedido,

      // Preços
      precoTotal: orderData.precoTotal || 0,
      total: orderData.precoTotal || 0,
      paidPercent: 50, // Valor padrão (backend não retorna este campo)

      // Datas
      dtEntregaEsperada: orderData.dtEntregaEsperada,
      deliveryDate,
      deliveryTime,

      // Localização
      address: formatAddressWithRetirada(
        orderData.endereco,
        orderData.isRetirada,
      ),
      isRetirada: orderData.isRetirada || false,

      // Status
      statusPedidoId: orderData.statusPedidoId,
      statusPedido: orderData.statusPedido,

      // Forma de pagamento
      formaPagamento: formatFormaPagamento(orderData.formaPagamento),

      // Dados do cliente (na verdade é a confeiteira para o cliente)
      customer: {
        name: customerData?.nome || 'Confeiteira',
        memberSince: memberSince,
        avatar: customerData?.fotoPerfil,
        phone: customerData?.telefone || null,
      },

      // Itens do pedido
      itensPedido: processedItems,

      // Detalhes do bolo (do primeiro item)
      cakeDetails: extractCakeDetails(processedItems[0]),
    };
  };

  // ========================================
  // MAIN FETCH FUNCTION
  // ========================================

  const fetchOrderData = async () => {
    if (!id) {
      setError('ID do pedido não fornecido');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Buscar dados do pedido
      const pedidoResponse = await api.get(`/pedidos/${id}`);
      const rawData = pedidoResponse.data;

      // 2️⃣ Validar e extrair dados do pedido
      if (!validateOrderData(rawData)) {
        setError(
          'Nenhum pedido encontrado para este ID. Verifique se o ID está correto.',
        );
        return;
      }

      const orderData = Array.isArray(rawData) ? rawData[0] : rawData;

      // 3️⃣ Buscar dados do cliente (paralelo com processamento de itens)
      const [customerData, processedItems] = await Promise.all([
        fetchCustomerData(orderData.clienteId),
        processOrderItems(orderData.itensPedido),
      ]);

      // 4️⃣ Mapear dados para formato da view
      const mappedOrder = mapOrderForView(
        orderData,
        customerData,
        processedItems,
      );

      setOrder(mappedOrder);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ========================================
  // ERROR HANDLER
  // ========================================

  const getErrorMessage = error => {
    if (error.response?.status === 404) {
      return 'Pedido não encontrado.';
    } else if (error.response?.status === 403) {
      return 'Você não tem permissão para acessar este pedido.';
    } else if (error.response?.status === 500) {
      return 'Erro no servidor. Tente novamente em alguns instantes.';
    } else if (error.message === 'Network Error') {
      return 'Erro de conexão. Verifique sua internet.';
    }

    return 'Não foi possível carregar os dados do pedido.';
  };

  // ========================================
  // HELPER: Formatar Forma de Pagamento
  // ========================================
  const formatFormaPagamento = forma => {
    const mapa = {
      credito: 'Cartão de Crédito',
      debito: 'Cartão de Débito',
      pix: 'PIX',
    };
    return mapa[forma?.toLowerCase()] || forma || 'Não definida';
  };

  // ========================================
  // HANDLER: CANCELAR (VOLTAR)
  // ========================================
  const handleCancel = () => {
    navigate(-1);
  };

  // ========================================
  // RENDER: LOADING STATE
  // ========================================
  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // ========================================
  // RENDER: ERROR STATE
  // ========================================
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', minHeight: '100vh' }}>
        <Typography
          variant='h6'
          sx={{ color: theme.palette.primary.main }}
          gutterBottom
        >
          {error}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          {error.includes('nenhum pedido')
            ? 'Não há pedidos cadastrados para este usuário. Crie um novo pedido para continuar.'
            : 'Verifique sua conexão e tente novamente'}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography
            component='button'
            onClick={handleCancel}
            sx={{
              cursor: 'pointer',
              color: 'primary.main',
              textDecoration: 'underline',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '1rem',
            }}
          >
            ← Voltar
          </Typography>
        </Box>
      </Box>
    );
  }

  // ========================================
  // RENDER: DATA NOT AVAILABLE
  // ========================================
  if (!order) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant='h6'>Nenhum pedido disponível</Typography>
      </Box>
    );
  }

  // ========================================
  // HANDLER: VER DETALHES DO BOLO
  // ========================================
  const handleViewCakeDetails = cakeItem => {
    if (order?.idPedido && cakeItem?.idItemPedido) {
      // Navegar para tela de detalhes do bolo (rota específica para clientes)
      navigate(
        `/detail-order/${order.idPedido}/cake/${cakeItem.idItemPedido}`,
        {
          state: {
            item: cakeItem,
            order: order,
          },
        },
      );
    }
  };

  // ========================================
  // HANDLER: CANCELAR PEDIDO
  // ========================================
  const handleCancelOrder = async () => {
    // Verificar se o pedido pode ser cancelado
    if (!OrderStatusHelper.canBeCancelled(order?.statusPedido)) {
      Swal.fire({
        icon: 'warning',
        title: 'Não é possível cancelar',
        text: 'Este pedido não pode mais ser cancelado.',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Popup de confirmação antes de cancelar
    const result = await Swal.fire({
      title: 'Deseja cancelar o pedido?',
      text: 'Esta ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#757575',
      cancelButtonText: 'Não, voltar',
      confirmButtonText: 'Sim, cancelar pedido',
    });

    // Se o usuário cancelou a ação, não faz nada
    if (!result.isConfirmed) {
      return;
    }

    setActionLoading(true);
    setError(null);

    try {
      // Cancelar pedido (status 8 = Cancelado)
      await api.patch(
        `/pedidos/alterarStatus/${id}/status/${ORDER_STATUS_ID.CANCELADO}`,
      );

      // Popup de sucesso após cancelar
      Swal.fire({
        icon: 'success',
        title: 'Pedido cancelado!',
        text: 'Seu pedido foi cancelado com sucesso.',
        showConfirmButton: false,
        timer: 2000,
      });

      // Recarregar dados do pedido para refletir novo status
      setActionLoading(false);
      fetchOrderData();
    } catch (err) {
      setError('Não foi possível cancelar o pedido. Tente novamente.');
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cancelar',
        text: 'Não foi possível cancelar o pedido. Tente novamente ou entre em contato conosco.',
        confirmButtonText: 'OK',
      });
      setActionLoading(false);
    }
  };

  // ========================================
  // RENDER: NORMAL VIEW
  // ========================================
  return (
    <OrderDetailsView
      loading={false}
      error={null}
      order={order}
      actionLoading={actionLoading}
      onCancel={handleCancel}
      onCancelOrder={handleCancelOrder}
      onViewCakeDetails={handleViewCakeDetails}
    />
  );
}

export default DetailOrderController;
