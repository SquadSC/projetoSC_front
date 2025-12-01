import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import OrderDetailsView from '../view/detail-order.view';
import { api } from '../../../services/api';
import { maskCep } from '../../../utils/mask/mask.utils';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

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
  const [error, setError] = useState(null); // Mensagem de erro
  const [refImages, setRefImages] = useState({}); // Images map: { anexoId: blobUrl }

  const fetchReferenceImage = async anexoData => {
    // Validar se anexoData é válido e tem ID
    if (!anexoData || typeof anexoData !== 'object') {
      console.warn(`[DetailOrder] anexoData inválido:`, anexoData);
      return null;
    }

    const anexoId = anexoData.idAnexo;
    if (!anexoId || typeof anexoId !== 'number') {
      console.warn(`[DetailOrder] ID do anexo inválido:`, anexoId);
      return null;
    }

    // Verificar se já temos esta imagem em cache
    if (refImages[anexoId]) {
      console.log(`[DetailOrder] Imagem ${anexoId} já está em cache`);
      return refImages[anexoId];
    }

    try {
      console.log(`[DetailOrder] Buscando imagem anexo ${anexoId}...`);

      // Se já temos a imagem em base64, usar ela diretamente
      if (anexoData.imagemAnexo && typeof anexoData.imagemAnexo === 'string') {
        console.log(`[DetailOrder] Usando imagem base64 do anexo ${anexoId}`);

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

      console.log(
        `[DetailOrder] Imagem anexo ${anexoId} carregada com sucesso via API`,
      );

      // Armazenar no mapa de imagens
      setRefImages(prev => ({
        ...prev,
        [anexoId]: blobUrl,
      }));

      return blobUrl;
    } catch (err) {
      console.warn(
        `[DetailOrder] Erro ao buscar imagem anexo ${anexoId}:`,
        err,
      );
      return null;
    }
  };

  // Cleanup: Revogar blob URLs ao desmontar componente
  useEffect(() => {
    return () => {
      console.log('[DetailOrder] Limpando blob URLs ao desmontar...');
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
    if (!endereco) return 'Endereço não informado';

    const cepFormatado = endereco.cep ? maskCep(endereco.cep) : '';
    const complementoStr = endereco.complemento
      ? ` - ${endereco.complemento}`
      : '';

    return `${endereco.logradouro}, ${endereco.numero}${complementoStr} - ${cepFormatado}`;
  };

  const formatDateTime = dateTimeString => {
    if (!dateTimeString) return { date: 'Não definida', time: 'Não definida' };

    const dtEntrega = new Date(dateTimeString);

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
          console.log(`[DetailOrder] Processando anexo:`, informacaoBolo.anexo);
          imagemUrl = await fetchReferenceImage(informacaoBolo.anexo);
        } else {
          console.log(
            `[DetailOrder] Item sem anexo válido:`,
            item.idItemPedido,
          );
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
      console.log(`[DetailOrder] Buscando dados do cliente ${clienteId}...`);
      const response = await api.get(`/usuarios/${clienteId}`);
      console.log('[DetailOrder] Cliente carregado:', response.data);
      return response.data;
    } catch (err) {
      console.warn('[DetailOrder] Erro ao buscar cliente:', err);
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
      address: formatAddress(orderData.endereco),
      isRetirada: orderData.isRetirada,

      // Status
      statusPedidoId: orderData.statusPedidoId,
      statusPedido: orderData.statusPedido,

      // Forma de pagamento
      formaPagamento: formatFormaPagamento(orderData.formaPagamento),

      // Dados do cliente
      customer: {
        name: customerData?.nome || 'Cliente',
        memberSince: memberSince,
        avatar: customerData?.fotoPerfil,
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

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!id) {
        setError('ID do pedido não fornecido');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log(`[DetailOrder] Buscando pedido ${id}...`);

        // 1️⃣ Buscar dados do pedido
        const pedidoResponse = await api.get(`/pedidos/${id}`);
        const rawData = pedidoResponse.data;

        console.log('[DetailOrder] Dados brutos recebidos:', rawData);

        // 2️⃣ Validar e extrair dados do pedido
        if (!validateOrderData(rawData)) {
          console.error('[DetailOrder] Dados do pedido inválidos:', rawData);
          setError(
            'Nenhum pedido encontrado para este ID. Verifique se o ID está correto.',
          );
          return;
        }

        const orderData = Array.isArray(rawData) ? rawData[0] : rawData;
        console.log('[DetailOrder] Dados do pedido validados:', orderData);

        // 3️⃣ Buscar dados do cliente (paralelo com processamento de itens)
        const [customerData, processedItems] = await Promise.all([
          fetchCustomerData(orderData.clienteId),
          processOrderItems(orderData.itensPedido),
        ]);

        console.log('[DetailOrder] Itens processados:', processedItems);

        // 4️⃣ Mapear dados para formato da view
        const mappedOrder = mapOrderForView(
          orderData,
          customerData,
          processedItems,
        );

        setOrder(mappedOrder);
        console.log('[DetailOrder] Pedido formatado com sucesso:', mappedOrder);
        console.log('[DetailOrder] RefImages state:', refImages);
      } catch (err) {
        console.error('[DetailOrder] Erro ao buscar pedido:', err);

        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

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
    console.log('[DetailOrder] Voltar para página anterior');
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

  console.log('refImage ----------------------------', refImages);

  // ========================================
  // HANDLER: VER DETALHES DO BOLO
  // ========================================
  const handleViewCakeDetails = cakeItem => {
    console.log('[DetailOrder] Ver detalhes do bolo:', cakeItem);

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
    } else {
      console.warn(
        '[DetailOrder] Dados insuficientes para navegar para detalhes do bolo',
      );
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
      onCancel={handleCancel}
      onViewCakeDetails={handleViewCakeDetails}
    />
  );
}

export default DetailOrderController;
