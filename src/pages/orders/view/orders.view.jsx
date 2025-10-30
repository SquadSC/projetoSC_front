import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  LinearProgress,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  cardStyle,
  iconAndTextStyle,
  mainContainer,
  sectionTitle,
} from '../styles/orders.styles.js';
import { NavbarComponent } from '../../../components/navbar/navbar.component.jsx'; 
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component.jsx'; 

export function OrdersView({ pedidosPendentes, pedidosEmAndamento }) {
  const renderPedidoCard = (pedido, showProgress = false) => (
    <Card key={pedido.id} sx={{cardStyle, mb: 1, color: 'primary.main'}}>
      <CardContent>
        <Stack spacing={2}>
          {/* Seção Superior do Card */}
          <Box display="flex" justifyContent="space-between">
            <Stack>
              <Typography variant="subtitle1" fontWeight="bold">
                Ordem {pedido.id}
              </Typography>
              <Box sx={iconAndTextStyle}>
                <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption">{pedido.deliveryDate}</Typography>
              </Box>
            </Stack>
            <Stack alignItems="flex-end">
              <Typography variant="subtitle1" fontWeight="bold">
                {pedido.tipo}
              </Typography>
              <Box sx={iconAndTextStyle}>
                <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption">{pedido.deliveryTime}</Typography>
              </Box>
            </Stack>
          </Box>

          {/* Seção de Progresso (apenas para pedidos em andamento) */}
          {showProgress && (
            <Box>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Fase do pedido
              </Typography>
              <Box sx={iconAndTextStyle} mb={1}>
                <AccessTimeIcon sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">{pedido.fase}</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={pedido.progresso}
                sx={{ height: 6, borderRadius: 5 }}
              />
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={mainContainer}>
      <NavbarComponent />
      <Container sx={{ py: 3, mb: 8 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'primary.main' }}>
          Meus Pedidos
        </Typography>

        {/* Seção de Pedidos Pendentes */}
        <Box mb={3}>
          <Typography sx={sectionTitle}>Pendentes:</Typography>
          {pedidosPendentes.map((pedido) => renderPedidoCard(pedido, false))}
        </Box>

        {/* Seção de Pedidos em Andamento */}
        <Box>
          <Typography sx={sectionTitle}>Em Andamento:</Typography>
          {pedidosEmAndamento.map((pedido) => renderPedidoCard(pedido, true))}
        </Box>
      </Container>
      {/* Certifique-se de que seu componente de navegação inferior se chama BottomNavigationComponent ou ajuste o nome */}
      <BottomNavigationComponent/>
    </Box>
  );
}