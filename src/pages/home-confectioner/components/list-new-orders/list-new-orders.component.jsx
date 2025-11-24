import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import calendarioGray from '../../../../assets/calendario-gray.svg';
import relogioGray from '../../../../assets/relogio-gray.svg';
import {
  formatDateBrazilian,
  formatTimeShort,
} from '../../../../utils/date/date.utils';
import { formatCurrencyBRL } from '../../../../utils/formatter/currency-formatter/currency-formatter';
import dayjs from 'dayjs';

export function ListNewOrdersComponent({ newOrders }) {
  const { newOrders: orders, newOrdersLoading, newOrdersError } = newOrders;
  console.log(orders);

  if (newOrdersLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (newOrdersError) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
        }}
      >
        <Alert severity='error'>Erro em buscar novos pedidos.</Alert>
      </Box>
    );
  }

  const ordersList = Array.isArray(orders) ? orders : [];

  return (
    <Stack spacing={2}>
      {ordersList.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='text'
            fontWeight={'semiBold'}
            color='text.secondary'
          >
            Nenhum novo pedido no momento.
          </Typography>
        </Box>
      ) : (
        ordersList.map((order, index) => {
          // Usar precoTotal do pedido ou calcular a partir dos itens
          const totalPrice = order.precoTotal || 
            (order.itensPedido?.reduce((sum, item) => {
              return sum + (item.preco || 0);
            }, 0) || 0);

          const halfPrice = totalPrice / 2;

          // Formatar data e hora de entrega
          const dtEntrega = order.dtEntregaEsperada || order.dtPedido;
          
          const dataEntrega = dtEntrega 
            ? formatDateBrazilian(dtEntrega)
            : 'Data não informada';
          
          const horaEntrega = dtEntrega 
            ? dayjs(dtEntrega).format('HH:mm')
            : 'Hora não informada';

          // Usar idPedido ou id como fallback
          const orderId = order.idPedido || order.id || `pedido-${index}`;

          return (
            <Box
              key={`order-${index}-${orderId}`}
              sx={{
                border: '2px solid #38090D',
                borderRadius: 2,
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Stack
                spacing={1}
                sx={{
                  width: '100%',
                }}
              >
                <Typography
                  variant='text'
                  fontWeight={'semiBold'}
                  color='primary.main'
                >
                  Pedido #{orderId}
                </Typography>
                <Typography variant='textLittle' fontWeight={'semiBold'}>
                  Informações da entrega:
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src={calendarioGray} alt='' />
                    <Typography
                      variant='textLittle'
                      color='gray'
                      fontWeight={'medium'}
                    >
                      Data: {dataEntrega}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src={relogioGray} alt='' />
                    <Typography
                      variant='textLittle'
                      color='gray'
                      fontWeight={'medium'}
                    >
                      Hora: {horaEntrega}
                    </Typography>
                  </Box>
                </Stack>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack spacing={0.5}>
                    <Typography
                      variant='textLittle'
                      fontWeight={'semiBold'}
                      color='gray'
                    >
                      Valor Total:
                    </Typography>
                    <Typography variant='subTitleLittle' fontWeight={'medium'}>
                      {formatCurrencyBRL(totalPrice)}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography
                      variant='textLittle'
                      fontWeight={'semiBold'}
                      color='gray'
                    >
                      50% do Valor:
                    </Typography>
                    <Typography variant='subTitleLittle' fontWeight={'medium'}>
                      {formatCurrencyBRL(halfPrice)}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Button variant='outlined' sx={{ px: 4 }}>
                Detalhes
              </Button>
            </Box>
          );
        })
      )}
    </Stack>
  );
}
