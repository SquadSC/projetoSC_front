import { Box, Container, Typography, Stack, CircularProgress } from '@mui/material';
import { PendingOrderCard } from '../components/pending-order-card.component';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';


export function PendingOrderView({
  loading,
  orders,
  onViewDetails,
  onAdvance,
  onBack,
  actionLoading,
}) {
  // Exibe loading enquanto busca os pedidos
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  // ========================================
  // CONTAINER PRINCIPAL
  // ========================================
  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh'}}>
      {/* ========================================
          HEADER
          ========================================
          Header com título e botão de voltar (com bordas na seta)
      */}
     
     <Box
      sx={{
        p: 3,
      }}
    >
        <PageHeader
          titulo='Pedidos Pendentes'
          showBackButton={true}
        ></PageHeader>
</Box>
      {/* ========================================
          SEÇÃO DOS CARDS
          ========================================
          Container com a lista de cards de pedidos pendentes
      */}
      <Container sx={{ p:4 }}>
        <Stack spacing={2}>
          {orders && orders.length > 0 ? (
            // Renderiza um card para cada pedido pendente
            orders.map((order) => (
              <PendingOrderCard
                key={order.idPedido || order.id}
                order={order}
                onViewDetails={() => onViewDetails(order)}
                onAdvance={() => onAdvance(order)}
                loading={actionLoading === order.idPedido || actionLoading === order.id}
              />
            ))
          ) : (
            // Mensagem quando não há pedidos pendentes
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Nenhum pedido pendente no momento.
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>

      {/* ========================================
          NAVBAR INFERIOR
          ========================================
          Navegação inferior fixa na parte de baixo da tela
      */}
      <BottomNavigationComponent/>
    </Box>
  );
}
