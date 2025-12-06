import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CakeCard } from '../../pending-order-selected/components/cake-card.component';
import { infoRow } from '../styles/detail-order.style.js';

export default function OrderDetailsView({
  loading,
  error,
  order,
  onCancel,
  onViewCakeDetails,
}) {
  // Tela de carregamento
  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='80vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  // Tela de erro (pedido não encontrado)
  if (error || !order) {
    return (
      <Container sx={{ p: 3 }}>
        <Alert severity='error'>{error || 'Pedido não encontrado.'}</Alert>
        <Button onClick={onCancel} sx={{ mt: 2 }}>
          Voltar
        </Button>
      </Container>
    );
  }

  // Calcula o valor de 50% do pedido
  const totalValue = order.total || order.precoTotal || 0;
  const paidPercent = order.paidPercent || 50;
  const halfValue = (totalValue * (paidPercent / 100)).toFixed(2);

  // Formata data de entrega
  const getDeliveryDate = () => {
    if (order.deliveryDate && order.deliveryDate !== 'Não definida') {
      return order.deliveryDate;
    }
    if (order.dtEntregaEsperada) {
      const dtEntrega = new Date(order.dtEntregaEsperada);
      // Validar se a data é válida
      if (!isNaN(dtEntrega.getTime())) {
        return dtEntrega.toLocaleDateString('pt-BR');
      }
    }
    return 'Não definido';
  };

  // Formata hora de entrega
  const getDeliveryTime = () => {
    if (order.deliveryTime && order.deliveryTime !== 'Não definida') {
      return order.deliveryTime;
    }
    if (order.dtEntregaEsperada) {
      const dtEntrega = new Date(order.dtEntregaEsperada);
      // Validar se a data é válida
      if (!isNaN(dtEntrega.getTime())) {
        return dtEntrega.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    }
    return 'Não definido';
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 10 }}>
      {/* Header - Título do pedido e botão voltar */}
      <Box sx={{ p: 3, pb: 0 }}>
        <PageHeader
          titulo={`Pedido #${order.idPedido || order.id}`}
          showBackButton={true}
        />
      </Box>

      {/* Container principal - Detalhes do pedido */}
      <Container sx={{ p: 4, pb: 2 }}>
        <Stack spacing={3}>
          {/* Seção: Informações do Cliente e Entrega */}
          <Stack spacing={2}>
            {/* Nome do cliente e data de cadastro */}
            <Box sx={infoRow}>
              <PersonOutlineIcon
                fontSize='small'
                sx={{ mr: 1, color: 'primary.main' }}
              />
              <Box>
                <Typography
                  variant='body1'
                  fontWeight='medium'
                  color='primary.main'
                >
                  {order.customer?.name || 'N/A'}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Desde {order.customer?.memberSince || 'N/A'}
                </Typography>
              </Box>
            </Box>

            {/* Data de entrega */}
            <Box sx={infoRow}>
              <CalendarTodayIcon
                fontSize='small'
                sx={{ mr: 1, color: 'primary.main' }}
              />
              <Typography variant='body2' color='primary.main'>
                Data de entrega: {getDeliveryDate()}
              </Typography>
            </Box>

            {/* Hora de entrega */}
            <Box sx={infoRow}>
              <AccessTimeIcon
                fontSize='small'
                sx={{ mr: 1, color: 'primary.main' }}
              />
              <Typography variant='body2' color='primary.main'>
                Hora de entrega: {getDeliveryTime()}
              </Typography>
            </Box>

            {/* Endereço de entrega */}
            <Box sx={infoRow}>
              <LocationOnIcon
                fontSize='small'
                sx={{ mr: 1, color: 'primary.main' }}
              />
              <Typography variant='body2' color='primary.main'>
                {order.address || 'Não definido'}
              </Typography>
            </Box>
          </Stack>

          {/* Seção: Total do pedido e valor parcial */}
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <Typography variant='h6' fontWeight='bold' color='primary.main'>
              Total: R${totalValue.toFixed(2)}
            </Typography>
            <Typography variant='body2' color='primary.main'>
              {paidPercent}% do valor: R${halfValue}
            </Typography>
          </Box>

          {/* Seção: Cards dos bolos do pedido */}
          {order.itensPedido && order.itensPedido.length > 0 ? (
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Typography
                variant='subtitle2'
                fontWeight='bold'
                color='primary.main'
              >
                Itens do Pedido
              </Typography>
              {order.itensPedido.map(item => (
                <CakeCard
                  key={item.idItemPedido || item.id}
                  item={item}
                  onViewDetails={() => onViewCakeDetails?.(item)}
                />
              ))}
            </Stack>
          ) : (
            <Typography variant='body2' color='text.secondary' sx={{ mt: 3 }}>
              Nenhum item neste pedido.
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
