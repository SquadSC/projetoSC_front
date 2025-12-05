import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Button,
  TextField,
} from '@mui/material';
import theme from '../../../theme';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';
import { MetricCard } from '../components/metric-card/metric-card.component';
import { TopIngredientsChart } from '../components/top-ingredients-chart/top-ingredients-chart.component';
import { TopClientsTable } from '../components/top-clients-table/top-clients-table.component';

export function DashboardView({ 
  operationalData,
  managerialData,
  loading, 
  error,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onDateFilter,
  onRefresh 
}) {
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 2, pb: 10 }}>
        <Box mb={4}>
          <Typography variant="h4">Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">Carregando dados...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 2, pb: 10 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="error" sx={{ mb: 2 }}>
            Erro ao carregar dados: {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={onRefresh}
            sx={{ backgroundColor: theme.palette.primary.main }}
          >
            Tentar Novamente
          </Button>
        </Box>
        <BottomNavigationComponent />
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 4, pb: 10 }}>
        {/* Header */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 3
          }}
        >
          Dashboard
        </Typography>

        {/* Filtros de Data */}
        <Box mb={3} sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
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
          {/* Métricas Gerenciais */}
          <Grid item xs={4} sm={4}>
            <MetricCard
              title="Ticket Médio"
              value={`R$ ${managerialData?.averageOrderValue?.toFixed(2) || '0.00'}`}
              subtitle="por pedido"
              color={theme.palette.info.main}
              compact={true}
            />
          </Grid>

          <Grid item xs={4} sm={4}>
            <MetricCard
              title="Pedidos Concluídos"
              value={managerialData?.totalOrders || 0}
              subtitle="no período"
              color={theme.palette.success.light}
              compact={true}
            />
          </Grid>

          <Grid item xs={4} sm={4}>
            <MetricCard
              title="Taxa Conclusão"
              value={`${managerialData?.completionRate?.toFixed(1) || '0'}%`}
              subtitle="dos pedidos"
              color={theme.palette.success.main}
              compact={true}
            />
          </Grid>

          {/* Top Ingredientes */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: theme.palette.primary.main }}>
              Top Ingredientes Mais Utilizados (Pedidos Concluídos)
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TopIngredientsChart 
              data={operationalData?.topIngredientsByCategory?.massa || []}
              category="massa"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TopIngredientsChart 
              data={operationalData?.topIngredientsByCategory?.recheio || []}
              category="recheio"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TopIngredientsChart 
              data={operationalData?.topIngredientsByCategory?.adicional || []}
              category="adicional"
            />
          </Grid>

          {/* Top Clientes */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: theme.palette.primary.main }}>
              Top Clientes - Pedidos Concluídos no Período
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TopClientsTable
              data={managerialData?.topClients || []}
              title="Ranking de Clientes"
              showTotal={true}
            />
          </Grid>
        </Grid>
      </Container>
      <BottomNavigationComponent />
    </>
  );
}
