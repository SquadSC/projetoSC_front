import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import theme from '../../../../theme';

export function HourlyOrdersChart({ data = [] }) {
  const maxOrders = Math.max(...data.map(item => item.orders));

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box mb={3}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            Top 5 Horários Mais Pedidos
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            ✔ Ranking histórico dos horários de pico<br />
            ✔ Ideal para planejamento de produção e equipe
          </Typography>
        </Box>

        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {data.map((item) => {
            const percentage = (item.orders / maxOrders) * 100;
            const isHighest = item.orders === maxOrders;

            return (
              <Box key={item.hour} mb={2}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={0.5}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isHighest ? 'bold' : 'medium',
                      color: isHighest
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    }}
                  >
                    {item.hour}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: isHighest
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    }}
                  >
                    {item.orders} pedidos
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      backgroundColor: isHighest
                        ? theme.palette.primary.main
                        : theme.palette.primary.light,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
