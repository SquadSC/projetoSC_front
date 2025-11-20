import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import calendarioGray from '../../../../assets/calendario-gray.svg';
import relogioGray from '../../../../assets/relogio-gray.svg';

export function ListNewOrdersComponent({ newOrders }) {
  const { newOrders: orders, isLoading, error } = newOrders;
  console.log('New Orders Data:', orders);
  return (
    <>
      <Stack spacing={2}>
        {orders.map((order, index) => (
          <Box
            key={`order-${index}-${order.id}`}
            sx={{
              border: '2px solid #38090D',
              borderRadius: 2,
              padding: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              justifyContent: 'center',
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
                Pedido #{order.id_pedido}
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
                    Data: {order.data_pedido}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src={relogioGray} alt='' />
                  <Typography
                    variant='textLittle'
                    color='gray'
                    fontWeight={'medium'}
                  >
                    Hora: {order.hora_pedido}
                  </Typography>
                </Box>
              </Stack>
              <Divider />
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Stack spacing={0.5}>
                  <Typography
                    variant='textLittle'
                    fontWeight={'semiBold'}
                    color='gray'
                  >
                    Valor Total:
                  </Typography>
                  <Typography variant='subTitleLittle' fontWeight={'medium'}>
                    {order.itens[0].preco}
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
                    {order.itens[0].preco}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Button variant='outlined' sx={{ px: 4 }}>
              Detalhes
            </Button>
          </Box>
        ))}
      </Stack>
    </>
  );
}
