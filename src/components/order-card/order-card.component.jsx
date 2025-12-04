import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ProgressBar } from './progress-bar.component';
import { getStatusIdFromDescription } from '../../utils/helper/status-pedido-helper';
import {
  orderCard,
  orderCardHeader,
  orderCardStatus,
  orderCardDetail,
  btnViewDetails,
} from './order-card.styles';

export function OrderCard({ order, onViewDetails, loading }) {
  // Determina a etapa atual baseado no status
  const getCurrentStep = () => {
    // Status 3 = Aceito pela confeiteira (Etapa 1)
    // Status 4 = Validado pelo fornecedor (Etapa 2)
    // Status 5 = Agendamento confirmado (Etapa 3)
    // Usar statusId se já estiver calculado, senão converter da descrição
    const statusId =
      order.statusId || getStatusIdFromDescription(order.statusPedido) || 3;
    if (statusId === 3) return 1;
    if (statusId === 4) return 2;
    if (statusId === 5) return 3;
    return 1; // Default
  };

  const getStatusLabel = step => {
    if (step === 1) return 'Verificar agenda';
    if (step === 2) return 'Verificar fornecedor';
    if (step === 3) return 'Verificar pagamento';
    return '';
  };

  // ========================================
  // GERAR MENSAGEM DINÂMICA BASEADA NOS DADOS
  // ========================================
  const getDetailText = step => {
    if (step === 1) {
      // Etapa 1: Verificar agenda - Mostrar data de entrega esperada
      const dataEntrega = order.dtEntregaEsperada;
      if (dataEntrega) {
        try {
          const dataObj = new Date(dataEntrega);
          // Validar se a data é válida
          if (!isNaN(dataObj.getTime())) {
            const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });
            return `Entrega agendada para ${dataFormatada}`;
          }
        } catch {
          // Se houver erro, retornar mensagem padrão
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
        // Contar temas diferentes
        if (item.informacaoBolo?.tema) {
          temas.add(item.informacaoBolo.tema);
        }
        // Contar ingredientes diferentes
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

      // Priorizar mostrar temas se houver mais de um
      if (qtdTemas > 1) {
        return `Cliente escolheu ${qtdTemas} tema${
          qtdTemas > 1 ? 's' : ''
        } diferente${qtdTemas > 1 ? 's' : ''}`;
      } else if (qtdTemas === 1) {
        // Se houver apenas um tema, mostrar o nome do tema
        const temaUnico = Array.from(temas)[0];
        return `Tema: ${temaUnico}`;
      } else if (qtdIngredientes > 0) {
        // Se não houver temas, mostrar quantidade de ingredientes
        return `Pedido com ${qtdIngredientes} ingrediente${
          qtdIngredientes > 1 ? 's' : ''
        } personalizado${qtdIngredientes > 1 ? 's' : ''}`;
      }
      return 'Verificar disponibilidade de ingredientes';
    }

    if (step === 3) {
      // Etapa 3: Verificar pagamento - Mostrar informação sobre pagamento
      const precoTotal = order.precoTotal || 0;
      const valorParcial = (precoTotal * 0.5).toFixed(2);
      return `Aguardando pagamento de 50% do pedido (R$ ${valorParcial.replace(
        '.',
        ',',
      )})`;
    }

    return '';
  };

  const currentStep = getCurrentStep();

  return (
    <Card sx={orderCard}>
      <CardContent>
        <Box sx={orderCardHeader}>
          <Typography variant='h6' fontWeight='bold' color='primary.main'>
            Ordem #{order.idPedido || order.id}
          </Typography>
        </Box>

        {/* status do pedido - titulo */}
        <Typography variant='body2' color='primary.main' sx={orderCardStatus}>
          {getStatusLabel(currentStep)}
        </Typography>

        {/* icone relogio e mensagem do status do pedido */}
        <Box sx={orderCardDetail}>
          <AccessTimeIcon fontSize='small' sx={{ color: 'primary.main' }} />
          <Typography variant='body2' color='primary.main'>
            {getDetailText(currentStep)}
          </Typography>
        </Box>

        <Box sx={{ mt: 2, mb: 2 }}>
          <ProgressBar currentStep={currentStep} />
        </Box>

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
