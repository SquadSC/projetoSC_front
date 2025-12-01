import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';

export function WeeklyOrder({ weeklyData }) {

  const { weeklyData: data, weeklyLoading: loading, weeklyError: error } = weeklyData;
  console.log('WeeklyOrder data:', data);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70%',
        }}
      >
        <CircularProgress color="primary.main" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70%',
        }}
      >
        <Alert severity="error">Erro em buscar os dados da semana.</Alert>
      </Box>
    );
  }

  const sixDays = data.slice(0, 6);

  return (
    <>
      <Stack
        direction={'row'}
        spacing={0}
        sx={{
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
          height: '70%',
        }}
      >
        {sixDays.map((order, index) => (
          <Box
            key={`order-${index}-${order.data}`}
            backgroundColor={order.isToday ? '#601016' : 'tertiary.main'}
            color={order.isToday ? 'white' : 'black'}
            sx={{
              display: 'flex',
              flex: 1,
              maxWidth: '50px',
              minWidth: '50px',
              maxHeight: '88px',
              minHeight: '88px',
              borderRadius: 1,
              border: '2px solid #38090D',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                background: 'transparent',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                }}
              >
                <Typography variant='textLittle'>{order.dayWeekShort}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flex: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant='text'
                  fontWeight={'semiBold'}
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  {order.data.split('-')[2]}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  bgcolor: 'primary.main',
                }}
              >
                <Typography
                  variant='textLittle'
                  color='white'
                  fontWeight={'medium'}
                >
                  {order.count}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </>
  );
}
