import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CakeCard } from '../components/cake-card.component';
import {
  headerStyle,
  infoRow,
  btnAccept,
  btnDecline,
  bottomActions,
  imageCarousel,
} from '../styles/pending-order-selected.style.js';

export function PendingOrderSelectedView({
  loading,
  actionLoading,
  error,
  order,
  onAccept,
  onDecline,
  onBack,
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
  if (!order) {
    return (
      <Container sx={{ p: 3 }}>
        <Alert severity='error'>{error || 'Pedido não encontrado.'}</Alert>
        <Button onClick={onBack} sx={{ mt: 2 }}>
          Voltar
        </Button>
      </Container>
    );
  }

  // Calcula o valor de 50% do pedido
  const totalValue = order.total || order.precoTotal || 0;
  const paidPercent = order.paidPercent || 50;
  const halfValue = (totalValue * (paidPercent / 100)).toFixed(2);

  const DetailItem = ({ label, value }) => (
    // Usamos um Box para agrupar o label e o valor
    <Box>
      <Typography
        variant='body1' // Podemos dar um pouco mais de destaque ao label
        fontWeight='bold'
        color='primary.main' // Cor alterada conforme solicitado
      >
        {label}:
      </Typography>
      <Typography
        variant='body2'
        color='text.secondary' // Mantemos uma cor mais suave para o valor
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', pb: 10 }}>
      {/* Header - Título do pedido e botão voltar */}
      <Box sx={{ p: 3, pb: 0 }}>
        <PageHeader
          titulo={`Pedido #${order.idPedido || order.id}`} 
          showBackButton={true}
        ></PageHeader>
      </Box>

      {/* Container principal - Detalhes do pedido */}
      <Container sx={{ p: 4, pb: 2, color: 'primary.main' }}>
        <Stack spacing={3} margin-left={3}>
          {/* Seção: Informações do Cliente e Entrega */}
          <Stack spacing={2}>
            {/* Nome do cliente e data de cadastro */}
            <Box sx={infoRow}>
              <PersonOutlineIcon fontSize='small' />
              <Box>
                <Typography variant='body1' fontWeight='medium'>
                  {order.customer?.name}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Desde {order.customer?.memberSince}
                </Typography>
              </Box>
            </Box>
            {/* Data de entrega */}
            <Box sx={infoRow}>
              <CalendarTodayIcon fontSize='small' />
              <Typography variant='body2'>
                Data de entrega: {order.deliveryDate || (order.dtEntregaEsperada ? new Date(order.dtEntregaEsperada).toLocaleDateString('pt-BR') : 'N/A')}
              </Typography>
            </Box>
            {/* Hora de entrega */}
            <Box sx={infoRow}>
              <AccessTimeIcon fontSize='small' />
              <Typography variant='body2'>
                Hora de entrega: {order.deliveryTime || (order.dtEntregaEsperada ? new Date(order.dtEntregaEsperada).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'N/A')}
              </Typography>
            </Box>
            {/* Endereço de entrega */}
            <Box sx={infoRow}>
              <LocationOnIcon fontSize='small' />
              <Typography variant='body2'>{order.address}</Typography>
            </Box>
          </Stack>

          {/* Seção: Total do pedido e valor parcial */}
          <Box textAlign='center'>
            <Typography variant='h6' fontWeight='bold'>
              Total: R${order.total?.toFixed(2) || order.precoTotal?.toFixed(2) || '0,00'}
            </Typography>
            <Typography variant='body2' color='primary.main'>
              {order.paidPercent || 50}% do valor: R${halfValue}
            </Typography>
          </Box>
        </Stack>

        {/* Seção: Cards dos bolos do pedido */}
        {order.itensPedido && order.itensPedido.length > 0 && (
          <Stack spacing={2} sx={{ mt: 3 }}>
            {order.itensPedido.map((item) => (
              <CakeCard
                key={item.idItemPedido}
                item={item}
                onViewDetails={onViewCakeDetails || (() => console.log('Ver detalhes do bolo:', item))}
              />
            ))}
          </Stack>
        )}
        
      </Container>

      {/* Seção: Botões de ação fixos (Recusar e Aceitar) */}
      <Box sx={{ ...bottomActions, pb: 2 }}>
        <Button
          variant='outlined'
          sx={btnDecline}
          onClick={onDecline}
          disabled={actionLoading}
        >
          Recusar
        </Button>
        <Button
          variant='contained'
          sx={btnAccept}
          onClick={onAccept}
          disabled={actionLoading}
        >
          {actionLoading ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            'Aceitar'
          )}
        </Button>
      </Box>
    </Box>
  );
}
