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
 * - Buscar dados do pedido via GET /pedidos/carrinho?idUsuario={id}
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
  const [selectedReferenceImage, setSelectedReferenceImage] = useState(null); // Imagem selecionada
  const [refImages, setRefImages] = useState({}); // Images map: { anexoId: blobUrl }

  const fetchReferenceImage = async anexoId => {
    if (!anexoId) return null;

    try {
      console.log(`[DetailOrder] Buscando imagem anexo ${anexoId}...`);

      const response = await api.get(`/anexos/${anexoId}`, {
        responseType: 'arraybuffer', // ← Receber como bytes
      });

      // Converter bytes para blob
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const blobUrl = URL.createObjectURL(blob);

      console.log(
        `[DetailOrder] Imagem anexo ${anexoId} carregada com sucesso`,
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

  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Buscar dados do pedido
        // Usando endpoint: GET /pedidos/carrinho?idUsuario={id}
        console.log(`[DetailOrder] Buscando pedido do carrinho...`);

        const pedidoResponse = await api.get(
          `/pedidos/carrinho?idUsuario=${id}`,
        );
        const pedidoData = pedidoResponse.data;

        console.log('[DetailOrder] RESPOSTA COMPLETA da API:', pedidoResponse);
        console.log('[DetailOrder] pedidoData:', pedidoData);
        console.log('[DetailOrder] Tipo de pedidoData:', typeof pedidoData);
        console.log('[DetailOrder] É array?', Array.isArray(pedidoData));

        // Tentar extrair dados se vier em formato inesperado
        let dadosPedido = pedidoData;
        if (Array.isArray(pedidoData) && pedidoData.length > 0) {
          console.log(
            '[DetailOrder] Dados vieram como array, pegando o primeiro item',
          );
          dadosPedido = pedidoData[0];
        }

        // Validação melhorada: verificar se tem pelo menos um campo não-null
        const temDadosValidos =
          dadosPedido &&
          (dadosPedido.idPedido !== null ||
            dadosPedido.itensPedido !== null ||
            dadosPedido.precoTotal !== null);

        console.log('[DetailOrder] Validação de dados:', {
          temDados: !!dadosPedido,
          temIdPedido: !!dadosPedido?.idPedido,
          temItens: !!dadosPedido?.itensPedido,
          temPreco: !!dadosPedido?.precoTotal,
          temDadosValidos: temDadosValidos,
          chaves: dadosPedido ? Object.keys(dadosPedido) : 'N/A',
        });

        if (!temDadosValidos) {
          console.error(
            '[DetailOrder] Nenhum pedido encontrado para este usuário',
          );
          setError(
            'Nenhum pedido encontrado para este usuário. Verifique o ID.',
          );
          setLoading(false);
          return;
        }

        console.log('[DetailOrder] Pedido carregado:', dadosPedido);

        // Buscar dados do cliente (se houver clienteId)
        let clienteData = null;
        if (dadosPedido.clienteId) {
          try {
            console.log(
              `[DetailOrder] Buscando dados do cliente ${dadosPedido.clienteId}...`,
            );
            const clienteResponse = await api.get(
              `/usuarios/${dadosPedido.clienteId}`,
            );
            clienteData = clienteResponse.data;
            console.log('[DetailOrder] Cliente carregado:', clienteData);
          } catch (clienteErr) {
            console.warn('[DetailOrder] Erro ao buscar cliente:', clienteErr);
            // Continua mesmo com erro - usar dados default
          }
        }

        // 3️⃣ Formatar endereço com CEP mascarado
        const endereco = dadosPedido.endereco;
        let enderecoFormatado = 'Endereço não informado';

        if (endereco) {
          const cepFormatado = endereco.cep ? maskCep(endereco.cep) : '';
          const complementoStr = endereco.complemento
            ? ` - ${endereco.complemento}`
            : '';
          enderecoFormatado = `${endereco.logradouro}, ${endereco.numero}${complementoStr} - ${cepFormatado}`;
        }

        // 4️⃣ Formatar data e hora de entrega
        const dtEntrega = dadosPedido.dtEntregaEsperada
          ? new Date(dadosPedido.dtEntregaEsperada)
          : null;

        const deliveryDate = dtEntrega
          ? dtEntrega.toLocaleDateString('pt-BR')
          : 'Não definida';

        const deliveryTime = dtEntrega
          ? dtEntrega.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : 'Não definida';

        // 5️⃣ Formatar data de membro (primeira compra/último login)
        const memberSince = clienteData?.dataUltimoLogin
          ? new Date(clienteData.dataUltimoLogin).toLocaleDateString('pt-BR')
          : 'Data não disponível';

        // 6️⃣ Processar itens do pedido - TODOS OS BOLOS (não apenas o primeiro!)
        const itensPedidoAtivos = dadosPedido.itensPedido
          ? dadosPedido.itensPedido.filter(item => item.ativo === true)
          : [];

        console.log(
          `[DetailOrder] Total de bolos ativos: ${itensPedidoAtivos.length}`,
        );

        // 7️⃣ Para cada bolo, buscar imagem de referência (se houver)
        const bolosComImagens = await Promise.all(
          itensPedidoAtivos.map(async item => {
            const informacaoBolo = item.informacaoBolo || {};
            let imagemUrl = null;

            // Se houver anexo, buscar imagem
            if (informacaoBolo.anexo) {
              imagemUrl = await fetchReferenceImage(informacaoBolo.anexo);
            }

            return {
              ...item,
              imagemUrl: imagemUrl,
            };
          }),
        );

        console.log(
          '[DetailOrder] Bolos com imagens processados:',
          bolosComImagens,
        );

        // 8️⃣ Extrair detalhes do primeiro bolo para display principal
        const primeiroItem = bolosComImagens[0];
        const informacaoBolo = primeiroItem?.informacaoBolo || {};

        // 9️⃣ Mapear dados para formato da view
        const orderMapped = {
          // Identificadores
          idPedido: dadosPedido.idPedido,
          id: dadosPedido.idPedido,

          // Preços
          precoTotal: dadosPedido.precoTotal || 0,
          total: dadosPedido.precoTotal || 0,
          paidPercent: 50, // Valor padrão (backend não retorna este campo)

          // Datas
          dtEntregaEsperada: pedidoData.dtEntregaEsperada,
          deliveryDate: deliveryDate,
          deliveryTime: deliveryTime,

          // Localização
          address: enderecoFormatado,
          isRetirada: pedidoData.isRetirada,

          // Status
          statusPedidoId: pedidoData.statusPedidoId,
          statusPedido: pedidoData.statusPedido,

          // Forma de pagamento
          formaPagamento: formatFormaPagamento(pedidoData.formaPagamento),

          // Dados do cliente
          customer: {
            name: clienteData?.nome || 'Cliente',
            memberSince: memberSince,
            avatar: clienteData?.fotoPerfil,
          },

          // Itens do pedido
          itensPedido: bolosComImagens,

          // Detalhes do bolo (do primeiro item)
          cakeDetails: {
            theme: informacaoBolo.tema || 'Não especificado',
            cakeType: primeiroItem?.descricao || 'Não especificado',
            filling: 'Não especificado', // Backend não retorna recheio específico
            additions: primeiroItem?.ingredientes?.map(ing => ing.nome) || [],
            weightKg: 0, // Backend não retorna peso
            notes: informacaoBolo.detalhes || 'Sem observações',
          },
        };

        setOrder(orderMapped);
        console.log('[DetailOrder] Pedido formatado com sucesso:', orderMapped);
      } catch (err) {
        console.error('[DetailOrder] Erro ao buscar pedido:', err);

        // Determinar mensagem de erro apropriada
        let errorMessage = 'Não foi possível carregar os dados do pedido.';

        if (err.response?.status === 404) {
          errorMessage = 'Pedido não encontrado.';
        } else if (err.response?.status === 403) {
          errorMessage = 'Você não tem permissão para acessar este pedido.';
        } else if (err.response?.status === 500) {
          errorMessage =
            'Erro no servidor. Tente novamente em alguns instantes.';
        } else if (err.message === 'Network Error') {
          errorMessage = 'Erro de conexão. Verifique sua internet.';
        }

        setError(errorMessage);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    // Executar fetch apenas se houver ID
    if (id) {
      fetchOrderData();
    } else {
      setError('ID do pedido não fornecido');
      setLoading(false);
    }
  }, [id]);

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
  // HANDLER: EDITAR PEDIDO
  // ========================================
  const handleEdit = orderToEdit => {
    console.log('[DetailOrder] Editar pedido:', orderToEdit.id);

    // Navegar para tela de edição (se existir)
    if (ROUTES_PATHS.EDIT_ORDER) {
      navigate(ROUTES_PATHS.EDIT_ORDER, {
        state: { order: orderToEdit },
      });
    } else {
      // Mostrar mensagem (edição não implementada)
      setError('A funcionalidade de editar pedidos está em desenvolvimento.');
    }
  };

  // ========================================
  // HANDLER: ATUALIZAR IMAGEM SELECIONADA
  // ========================================
  const handleSetSelectedReferenceImage = image => {
    console.log('[DetailOrder] Imagem selecionada:', image);
    setSelectedReferenceImage(image);
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
  // RENDER: NORMAL VIEW
  // ========================================
  return (
    <OrderDetailsView
      order={order}
      refImages={{
        loading: false,
        error: null,
        images: refImages, // Mapa de { anexoId: blobUrl }
        refetch: () => {},
        userUploadedImage: null,
        selectedReferenceImage: selectedReferenceImage,
        setSelectedReferenceImage: handleSetSelectedReferenceImage,
      }}
      onCancel={handleCancel}
      onEdit={handleEdit}
    />
  );
}

export default DetailOrderController;
