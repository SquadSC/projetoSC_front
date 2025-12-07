import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ProgressBar } from './progress-bar.component';
import { OrderStatusHelper } from '../../utils/enums/order-status.js';
import {
  orderCard,
  orderCardHeader,
  orderCardStatus,
  orderCardDetail,
  btnViewDetails,
} from './order-card.styles';

export function OrderCard({ order, onViewDetails, loading }) {
  const status = order.statusPedido;
  const dtEntregaEsperada = order.dtEntregaEsperada;

  // Usar OrderStatusHelper para verificar o tipo de status
  const isPending = OrderStatusHelper.isPendingStep(status);
  const isProduction = OrderStatusHelper.isProductionStep(status);
  const isCompleted = OrderStatusHelper.isCompleted(status);
  const isCancelled = OrderStatusHelper.isCancelled(status);
  const isExpired = OrderStatusHelper.isExpired(status, dtEntregaEsperada);

  // Determina a etapa atual baseado no status (apenas para pedidos pendentes)
  const getCurrentStep = () => {
    if (status === 'Enviado') return 1;
    if (status === 'Validação') return 2;
    if (status === 'Pagamento') return 3;
    return 1; // Default
  };

  const getStatusLabel = () => {
    if (isPending) {
      const step = getCurrentStep();
      if (step === 1) return 'Verificar agenda';
      if (step === 2) return 'Verificar fornecedor';
      if (step === 3) return 'Verificar pagamento';
    }
    // Para outros status, usar o helper
    return OrderStatusHelper.getEffectiveStatusText(status, dtEntregaEsperada);
  };

  // ========================================
  // GERAR MENSAGEM DINÂMICA BASEADA NOS DADOS
  // ========================================
  const getDetailText = () => {
    // Pedidos concluídos
    if (isCompleted) {
      if (dtEntregaEsperada) {
        const dtEntrega = new Date(dtEntregaEsperada);
        if (!isNaN(dtEntrega.getTime())) {
          const dataFormatada = dtEntrega.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          return `Pedido entregue em ${dataFormatada}`;
        }
      }
      return 'Pedido concluído';
    }

    // Pedidos cancelados
    if (isCancelled) {
      return 'Este pedido foi cancelado';
    }

    // Pedidos em produção
    if (isProduction) {
      if (isExpired) {
        return 'Pedido em atraso - Entre em contato com a confeiteira';
      }
      if (dtEntregaEsperada) {
        const dtEntrega = new Date(dtEntregaEsperada);
        if (!isNaN(dtEntrega.getTime())) {
          const dataFormatada = dtEntrega.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          return `Entrega prevista para ${dataFormatada}`;
        }
      }
      return 'Pedido em produção';
    }

    // Pedidos pendentes - lógica antiga mantida
    if (isPending) {
      const step = getCurrentStep();

      if (step === 1) {
        // Etapa 1: Verificar agenda - Mostrar data de entrega esperada
        if (dtEntregaEsperada) {
          const dtEntrega = new Date(dtEntregaEsperada);
          if (!isNaN(dtEntrega.getTime())) {
            const dataFormatada = dtEntrega.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });
            if (dataFormatada && !dataFormatada.includes('Invalid')) {
              return `Entrega agendada para ${dataFormatada}`;
            }
          }
        }
        return 'Verificar disponibilidade na agenda';
      }

      if (step === 2) {
        // Etapa 2: Verificar fornecedor - Contar temas/ingredientes diferentes
        const itensPedido = order.itensPedido || [];
        const temas = new Set();
        const ingredientes = new Set();

        itensPedido.forEach(item => {
          if (item.informacaoBolo?.tema) {
            temas.add(item.informacaoBolo.tema);
          }
          if (item.ingredientes && Array.isArray(item.ingredientes)) {
            item.ingredientes.forEach(ing => {
              if (ing && ing.nome) {
                ingredientes.add(ing.nome);
              }
            });
          }
        });

        const qtdTemas = temas.size;
        const qtdIngredientes = ingredientes.size;

        if (qtdTemas > 1) {
          return `Cliente escolheu ${qtdTemas} tema${
            qtdTemas > 1 ? 's' : ''
          } diferente${qtdTemas > 1 ? 's' : ''}`;
        } else if (qtdTemas === 1) {
          const temaUnico = Array.from(temas)[0];
          return `Tema: ${temaUnico}`;
        } else if (qtdIngredientes > 0) {
          return `Pedido com ${qtdIngredientes} ingrediente${
            qtdIngredientes > 1 ? 's' : ''
          } personalizado${qtdIngredientes > 1 ? 's' : ''}`;
        }
        return 'Verificar disponibilidade de ingredientes';
      }

      if (step === 3) {
        // Etapa 3: Verificar pagamento
        const precoTotal = order.precoTotal || 0;
        const valorParcial = (precoTotal * 0.5).toFixed(2);
        return `Aguardando pagamento de 50% do pedido (R$ ${valorParcial.replace(
          '.',
          ',',
        )})`;
      }
    }

    return '';
  };

  const currentStep = isPending ? getCurrentStep() : null;

  return (
    <Card sx={orderCard}>
      <CardContent>
        <Box sx={orderCardHeader}>
          <Typography variant='h6' fontWeight='bold' color='primary.main'>
            Ordem #{order.idPedido || order.id}
          </Typography>

          {/* Chip de status para pedidos não pendentes */}
          {!isPending && (
            <Chip
              label={OrderStatusHelper.getEffectiveStatusText(
                status,
                dtEntregaEsperada,
              )}
              sx={{
                ...OrderStatusHelper.getEffectiveStatusColor(
                  status,
                  dtEntregaEsperada,
                ),
                fontSize: '0.75rem',
                height: '24px',
              }}
            />
          )}
        </Box>

        {/* status do pedido - titulo (apenas para pendentes) */}
        {isPending && (
          <Typography variant='body2' color='primary.main' sx={orderCardStatus}>
            {getStatusLabel()}
          </Typography>
        )}

        {/* icone relogio e mensagem do status do pedido */}
        <Box sx={orderCardDetail}>
          <AccessTimeIcon fontSize='small' sx={{ color: 'primary.main' }} />
          <Typography variant='body2' color='primary.main'>
            {getDetailText()}
          </Typography>
        </Box>

        {/* Barra de progresso apenas para pedidos pendentes */}
        {isPending && currentStep && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <ProgressBar currentStep={currentStep} />
          </Box>
        )}

        <Button
          variant='outlined'
          sx={btnViewDetails}
          onClick={onViewDetails}
          disabled={loading}
        >
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
