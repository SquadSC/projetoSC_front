import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import calendarioGray from '../../../../assets/icons/calendario-gray.svg';
import relogioGray from '../../../../assets/icons/relogio-gray.svg';
import { formatDateBrazilian } from '../../../../utils/date/date.utils';
import { formatCurrencyBRL } from '../../../../utils/formatter/currency-formatter/currency-formatter';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../../utils/enums/routes-url';

export function CardOrderDayComponent({ selectDayOrderData }) {
  const { selectedDayData, selectedDayLoading, selectedDayError } =
    selectDayOrderData;

    const navigate = useNavigate();

  // Garantir que selectedDayData seja um array
  const orders = Array.isArray(selectedDayData) ? selectedDayData : [];

  // Só mostrar loading se não há dados anteriores para evitar "piscada"
  if (selectedDayLoading && orders.length === 0) {
    return (
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
          Carregando pedidos...
        </Typography>
      </Box>
    );
  }

  if (selectedDayError) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
          textAlign: 'center',
        }}
      >
        <Typography variant='text' fontWeight={'semiBold'} color='error.main'>
          {selectedDayError}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack
      spacing={2}
      sx={{
        transition: 'all 0.3s ease-in-out',
        opacity: selectedDayLoading ? 0.7 : 1,
      }}
    >
      {orders.length === 0 ? (
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
        orders
          .map((order, index) => {
            if (!order || typeof order !== 'object') {
              return null;
            }

            const totalPrice =
              order.precoTotal ||
              order.valorTotal ||
              order.total ||
              order.itensPedido?.reduce((sum, item) => {
                return sum + (item.preco || item.valor || 0);
              }, 0) ||
              0;

            const halfPrice = totalPrice / 2;

            const dtEntrega =
              order.dtEntregaEsperada ||
              order.dtEntrega ||
              order.dataEntrega ||
              order.dtPedido ||
              order.dataPedido ||
              new Date().toISOString();

            const dataEntrega = dtEntrega
              ? formatDateBrazilian(dtEntrega)
              : 'Data não informada';

            const horaEntrega = dtEntrega
              ? dayjs(dtEntrega).format('HH:mm')
              : 'Hora não informada';

            const orderId =
              order.idPedido || order.id || order.pedidoId || `pedido-${index}`;

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
                      <Typography
                        variant='subTitleLittle'
                        fontWeight={'medium'}
                      >
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
                      <Typography
                        variant='subTitleLittle'
                        fontWeight={'medium'}
                      >
                        {formatCurrencyBRL(halfPrice)}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
                <Button variant='outlined' sx={{ px: 4 }} onClick={() => navigate(`${ROUTES_PATHS.PENDING_ORDER_SELECTED.replace(':id', orderId)}`)}>
                  Detalhes
                </Button>
              </Box>
            );
          })
          .filter(Boolean)
      )}
    </Stack>
  );
}
