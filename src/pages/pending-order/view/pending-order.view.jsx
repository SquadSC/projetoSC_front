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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  headerStyle,
  infoRow,
  btnAccept,
  btnDecline,
  bottomActions,
  imageCarousel,
} from '../styles/pending-order.style.js';

export function PendingOrderView({
  loading,
  actionLoading,
  error,
  order,
  onAccept,
  onDecline,
  onBack,
}) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Container sx={{ p: 3 }}>
        <Alert severity="error">{error || 'Pedido não encontrado.'}</Alert>
        <Button onClick={onBack} sx={{ mt: 2 }}>Voltar</Button>
      </Container>
    );
  }
  
  // Calcula o valor de 50%
  const halfValue = (order.total * (order.paidPercent / 100)).toFixed(2);

  const DetailItem = ({ label, value }) => (
    // Usamos um Box para agrupar o label e o valor
    <Box> 
      <Typography 
        variant="body1" // Podemos dar um pouco mais de destaque ao label
        fontWeight="bold" 
        color="primary.main" // Cor alterada conforme solicitado
      >
        {label}:
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" // Mantemos uma cor mais suave para o valor
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: '', minHeight: '100vh', pb: 12 }}>
      {/* Cabeçalho */}
      <Box sx={headerStyle}>
        <IconButton onClick={onBack} sx={{ position: 'absolute', left: 8 , color: 'primary.main'}}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" sx={{color: 'primary.main'}}>
          Pedidos Pendentes
        </Typography>
      </Box>

      <Container sx={{ pt: 3, color: 'primary.main'}}> 
        <Stack spacing={3} margin-left={3}>
          {/* Informações do Cliente e Entrega */}
          <Stack spacing={1.5}>
            <Box sx={infoRow}>
              <PersonOutlineIcon fontSize="small" />
              <Box>
                <Typography variant="body1" fontWeight="medium">{order.customer?.name}</Typography>
                <Typography variant="caption" color="text.secondary">Desde {order.customer?.memberSince}</Typography>
              </Box>
            </Box>
            <Box sx={infoRow}>
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2">Data de Entrega: {order.deliveryDate}</Typography>
            </Box>
            <Box sx={infoRow}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">Hora de entrega: {order.deliveryTime}</Typography>
            </Box>
            <Box sx={infoRow}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">{order.address}</Typography>
            </Box>
          </Stack>

          {/* Total */}
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold">Total: R${order.total?.toFixed(2)}</Typography>
            <Typography variant="body1" color="primary.main">{order.paidPercent}% do valor: R${halfValue}</Typography>
          </Box>

          {/* Anexos de Referência */}
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="bold">Anexos de Referência:</Typography>
            <Box sx={imageCarousel}>
              {order.referenceImages?.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  alt={`Referência ${index + 1}`}
                  sx={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }}
                />
              ))}
            </Box>
          </Stack>

          {/* Detalhes do Bolo */}
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="bold">Detalhes do Bolo:</Typography>
            <DetailItem label="Tema Personalizado" value={order.cakeDetails?.theme} />
            <DetailItem label="Tipo de Massa" value={order.cakeDetails?.cakeType} />
            <DetailItem label="Recheio do Bolo" value={order.cakeDetails?.filling} />
            <DetailItem label="Adicionais" value={order.cakeDetails?.additions.join(', ')} />
            <DetailItem label="Peso (KG)" value={order.cakeDetails?.weightKg} />
          </Stack>

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </Container>
      
      {/* Botões de Ação Fixos */}
      <Box sx={bottomActions}>
        <Button
          variant="outlined"
          sx={btnDecline}
          onClick={onDecline}
          disabled={actionLoading}
        >
          Recusar
        </Button>
        <Button
          variant="contained"
          sx={btnAccept}
          onClick={onAccept}
          disabled={actionLoading}
        >
          {actionLoading ? <CircularProgress size={24} color="inherit" /> : 'Aceitar'}
        </Button>
      </Box>
    </Box>
  );
}