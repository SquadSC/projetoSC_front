import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';

export function WeeklyOrder({ weeklyData }) {
  const {
    weeklyData: data,
    weeklyLoading: loading,
    weeklyError: error,
    selectedDate,
    setSelectedDate,
  } = weeklyData;

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
        <CircularProgress color='primary.main' />
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
        <Alert severity='error'>Erro em buscar os dados da semana.</Alert>
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
        {sixDays.map((order, index) => {
          const isSelected = selectedDate && order.data === selectedDate;
          const isToday = order.isToday;

          let backgroundColor, textColor, borderColor;

          if (isSelected && isToday) {
            backgroundColor = '#601016';
            textColor = 'white';
            borderColor = '#38090D';
          } else if (isSelected) {
            backgroundColor = '#601016';
            textColor = 'white';
            borderColor = '#38090D';
          } else if (isToday) {
            backgroundColor = '#F4E1D7';
            textColor = '#38090D';
            borderColor = '#38090D';
          } else {
            backgroundColor = 'tertiary.main';
            textColor = 'black';
            borderColor = '#38090D';
          }

          return (
            <Box
              key={`order-${index}-${order.data}`}
              backgroundColor={backgroundColor}
              color={textColor}
              sx={{
                display: 'flex',
                flex: 1,
                maxWidth: '50px',
                minWidth: '50px',
                maxHeight: '88px',
                minHeight: '88px',
                borderRadius: 1,
                border: `2px solid ${borderColor}`,
                boxShadow:
                  isSelected && !isToday ? '0 2px 8px #38090D' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
              onClick={() => {
                if (setSelectedDate && selectedDate !== order.data) {
                  setSelectedDate(order.data);
                }
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
                  <Typography variant='textLittle'>
                    {order.dayWeekShort}
                  </Typography>
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
          );
        })}
      </Stack>
    </>
  );
}
