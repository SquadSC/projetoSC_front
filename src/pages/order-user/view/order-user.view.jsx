import { Container, Typography } from '@mui/material';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import theme from '../../../theme';
import { OrderComponent } from '../../../components/order/order-component';
export function OrderUserView({ idPedido, tipoPedido, dataPedido, horarioPedido }) {
  return (
    <>
      <NavbarComponent></NavbarComponent>

      <Container sx={{ mt: 4, p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
          Meus Pedidos
        </Typography>

        <Container sx={{ p: 0, display: 'flex', flexDirection: 'column'}}>
           <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: theme.palette.primary.main }}>
          Pendentes:
        </Typography>
          <OrderComponent idPedido={idPedido} tipoPedido={tipoPedido} dataPedido={dataPedido} horarioPedido={horarioPedido} />
        </Container>
        


      </Container>
    </>
  );
}
