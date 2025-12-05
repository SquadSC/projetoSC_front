import { useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Button
} from '@mui/material';
import theme from '../../../theme';

// Components
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';
import { MetricCard } from '../components/metric-card/metric-card.component';
import { TopClientsTable } from '../components/top-clients-table/top-clients-table.component';
import { RevenueChart } from '../components/revenue-chart/revenue-chart.component';

export function DashboardManagerialView({
  dashboardData,
  loading,
  error,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onDateFilter
}) {
  useEffect(() => {
    // Set default dates to last 30 days
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 2, pb: 10 }}>
        <Box mb={4}>
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="text" width={200} height={24} />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 2, pb: 10 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="error">
            Erro ao carregar dados: {error}
          </Typography>
          <button onClick={fetchDashboardData}>Tentar Novamente</button>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 0, pb: 10 }}>
        {/* Filtros Gerenciais */}
        <Box mb={3} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            type="date"
            size="small"
            label="Data Início"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 150 }}
          />

          <TextField
            type="date"
            size="small"
            label="Data Fim"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 150 }}
          />

          <Button
            variant="contained"
            size="small"
            onClick={onDateFilter}
            sx={{ backgroundColor: theme.palette.primary.main }}
          >
            Filtrar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Métrica gerencial - mesmo padrão de largura */}
          <Grid item xs={12} sm={6} md={4}>
            <MetricCard
              title="Faturamento"
              value={`R$ ${dashboardData?.totalRevenue?.toFixed(2) || '0.00'}`}
              subtitle={`${startDate} a ${endDate}`}
              icon="💰"
              color={theme.palette.success.main}
              compact={true}
            />
          </Grid>

          {/* Top clientes - mesmo padrão das tabelas de ingredientes */}
          <Grid item xs={12} sm={6} md={4}>
            <TopClientsTable
              data={dashboardData?.topClients || []}
              title="Top Clientes"
              showTotal={true}
            />
          </Grid>
        </Grid>
      </Container>
      <BottomNavigationComponent />

    </>
  );
}
