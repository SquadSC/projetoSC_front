import { Box, Container, Stack, Typography } from '@mui/material';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
export function OrderUserView({idPedido, tipoPedido, dataPedido, horarioPedido}) {
  return (
    <>
      <NavbarComponent></NavbarComponent>

      <Container>
        <Stack direction="column">
          <Box>
            <Typography variant="h6">Ordem#{idPedido}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">{tipoPedido}</Typography>
          </Box>
        </Stack>
        <Stack>
          {dataPedido}
        </Stack>
        <Stack>
          {horarioPedido}
        </Stack>
      </Container>
    </>
  );
}
