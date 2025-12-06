import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { OrderCard } from '../../../components/order-card';
import { mainContainer, sectionTitle } from '../styles/orders.styles.js';
import { NavbarComponent } from '../../../components/navbar/navbar.component.jsx';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component.jsx';

export function OrdersView({
  pedidosPendentes,
  pedidosEmAndamento,
  pedidosConcluidos,
  pedidosCancelados,
  onViewDetails,
  loading,
  error,
}) {
  if (loading) {
    return (
      <Box sx={mainContainer}>
        <NavbarComponent />
        <Container
          sx={{
            py: 3,
            mb: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress />
        </Container>
        <BottomNavigationComponent />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={mainContainer}>
        <NavbarComponent />
        <Container sx={{ py: 3, mb: 8 }}>
          <Typography
            variant='h5'
            fontWeight='bold'
            gutterBottom
            sx={{ color: 'primary.main' }}
          >
            Meus Pedidos
          </Typography>
          <Typography variant='body1' color='error' sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Container>
        <BottomNavigationComponent />
      </Box>
    );
  }

  const temPedidos =
    pedidosPendentes.length > 0 ||
    pedidosEmAndamento.length > 0 ||
    pedidosConcluidos.length > 0 ||
    pedidosCancelados.length > 0;

  return (
    <Box sx={mainContainer}>
      <NavbarComponent />
      <Container sx={{ py: 3, mb: 8 }}>
        <Typography
          variant='h5'
          fontWeight='bold'
          gutterBottom
          sx={{ color: 'primary.main' }}
        >
          Meus Pedidos
        </Typography>

        {!temPedidos ? (
          <Typography variant='body1' color='text.secondary' sx={{ mt: 2 }}>
            Você não tem pedidos no momento.
          </Typography>
        ) : (
          <>
            {/* Seção de Pedidos Pendentes */}
            {pedidosPendentes.length > 0 && (
              <Box mb={3}>
                <Typography sx={sectionTitle}>Pendentes:</Typography>
                {pedidosPendentes.map(pedido => (
                  <OrderCard
                    key={pedido.idPedido}
                    order={pedido}
                    onViewDetails={() => onViewDetails(pedido)}
                    loading={loading}
                  />
                ))}
              </Box>
            )}

            {/* Seção de Pedidos em Andamento */}
            {pedidosEmAndamento.length > 0 && (
              <Box mb={3}>
                <Typography sx={sectionTitle}>Em Andamento:</Typography>
                {pedidosEmAndamento.map(pedido => (
                  <OrderCard
                    key={pedido.idPedido}
                    order={pedido}
                    onViewDetails={() => onViewDetails(pedido)}
                    loading={loading}
                  />
                ))}
              </Box>
            )}

            {/* Seção de Pedidos Concluídos */}
            {pedidosConcluidos.length > 0 && (
              <Box mb={3}>
                <Typography sx={sectionTitle}>Concluídos:</Typography>
                {pedidosConcluidos.map(pedido => (
                  <OrderCard
                    key={pedido.idPedido}
                    order={pedido}
                    onViewDetails={() => onViewDetails(pedido)}
                    loading={loading}
                  />
                ))}
              </Box>
            )}

            {/* Seção de Pedidos Cancelados */}
            {pedidosCancelados.length > 0 && (
              <Box mb={3}>
                <Typography sx={sectionTitle}>Cancelados:</Typography>
                {pedidosCancelados.map(pedido => (
                  <OrderCard
                    key={pedido.idPedido}
                    order={pedido}
                    onViewDetails={() => onViewDetails(pedido)}
                    loading={loading}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Container>
      <BottomNavigationComponent />
    </Box>
  );
}
