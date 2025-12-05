import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import theme from '../../../../theme';

export function RevenueChart({ dailyRevenue = 0, weeklyRevenue = 0 }) {
  const dailyPercentage = weeklyRevenue > 0 ? (dailyRevenue / weeklyRevenue) * 100 : 0;
  const remainingWeek = weeklyRevenue - dailyRevenue;

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
            Análise de Faturamento
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Comparativo entre faturamento diário e semanal
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 3,
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${theme.palette.success.main}15 0%, ${theme.palette.success.main}05 100%)`,
                border: `1px solid ${theme.palette.success.main}30`,
                mb: 3,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.success.main,
                  textAlign: 'center',
                  mb: 1,
                }}
              >
                R$ {dailyRevenue.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  textAlign: 'center',
                }}
              >
                Faturamento de Hoje
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  height: 8,
                  backgroundColor: theme.palette.grey[200],
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${dailyPercentage}%`,
                    backgroundColor: theme.palette.success.main,
                    borderRadius: 4,
                    transition: 'width 1s ease',
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  display: 'block',
                  textAlign: 'center',
                  mt: 1,
                }}
              >
                {dailyPercentage.toFixed(1)}% da meta semanal
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                }}
              >
                R$ {weeklyRevenue.toFixed(2)}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                Total da Semana
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.info.main,
                }}
              >
                R$ {remainingWeek.toFixed(2)}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                Restante da Semana
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
