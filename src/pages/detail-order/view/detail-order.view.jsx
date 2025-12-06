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
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CakeCard } from '../../pending-order-selected/components/cake-card.component';
import { OrderStatusHelper } from '../../../utils/enums/order-status.js';
import { maskPhone } from '../../../utils/mask/mask.utils';
import { infoRow } from '../styles/detail-order.style.js';

export default function OrderDetailsView({
  loading,
  error,
  order,
  actionLoading,
  onCancel,
  onCancelOrder,
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

  // Verifica se o pedido pode ser cancelado
  const canCancel = OrderStatusHelper.canBeCancelled(order?.statusPedido);

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
          {/* Seção: Informações da Confeiteira e Entrega */}
          <Stack spacing={2}>
            {/* Nome da confeiteira e telefone */}
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
                {order.customer?.phone && (
                  <Typography
                    variant='caption'
                    color='gray'
                    component='a'
                    href={`tel:${order.customer.phone}`}
                    sx={{ textDecoration: 'none', display: 'block' }}
                  >
                    {maskPhone(order.customer.phone)}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Data de entrega ou retirada */}
            <Box sx={infoRow}>
              <CalendarTodayIcon
                fontSize='small'
                sx={{ mr: 1, color: 'primary.main' }}
              />
              <Typography variant='body2' color='primary.main'>
                {order.isRetirada ? 'Data de retirada:' : 'Data de entrega:'}{' '}
                {getDeliveryDate()}
              </Typography>
            </Box>

            {/* Hora de entrega ou retirada */}
            <Box sx={infoRow}>
              <AccessTimeIcon
                fontSize='small'
                sx={{ mr: 1, color: 'primary.main' }}
              />
              <Typography variant='body2' color='primary.main'>
                {order.isRetirada ? 'Hora de retirada:' : 'Hora de entrega:'}{' '}
                {getDeliveryTime()}
              </Typography>
            </Box>

            {/* Endereço de entrega ou local de retirada */}
            <Box sx={infoRow}>
              {order.isRetirada ? (
                <StorefrontIcon
                  fontSize='small'
                  sx={{ mr: 1, color: 'primary.main' }}
                />
              ) : (
                <LocationOnIcon
                  fontSize='small'
                  sx={{ mr: 1, color: 'primary.main' }}
                />
              )}
              <Typography variant='body2' color='primary.main'>
                {order.address || 'Não definido'}
              </Typography>
            </Box>

            {/* Status do pedido */}
            {order.statusPedido && (
              <Box sx={infoRow}>
                <InfoOutlinedIcon
                  fontSize='small'
                  sx={{ mr: 1, color: 'primary.main' }}
                />
                <Box
                  sx={{
                    ...OrderStatusHelper.getEffectiveStatusColor(
                      order.statusPedido,
                      order.dtEntregaEsperada,
                    ),
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'medium',
                    textTransform: 'uppercase',
                  }}
                >
                  {OrderStatusHelper.getEffectiveStatusText(
                    order.statusPedido,
                    order.dtEntregaEsperada,
                  )}
                </Box>
              </Box>
            )}
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

        {/* Botão de Cancelar Pedido - Apenas se pode cancelar */}
        {canCancel && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              gap: 2,
              padding: '16px',
              backgroundColor: 'background.default',
              boxShadow: '0 -1px 6px rgba(41, 40, 40, 0.1)',
              zIndex: 1000,
              pb: 2,
            }}
          >
            <Button
              variant='outlined'
              color='error'
              sx={{
                flex: 1,
                height: '48px',
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                  backgroundColor: 'error.main',
                  color: 'white',
                },
              }}
              onClick={onCancelOrder}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Cancelar Pedido'
              )}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
