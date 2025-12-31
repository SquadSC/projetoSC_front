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
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
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
      <Container maxWidth="xl" sx={{ pb: 10 }}>
        {/* Header */}
        <Box sx={{ p: 3, pb: 0 }}>
          <PageHeader
            titulo="Dashboard"
            showBackButton={true}
          />
        </Box>

        {/* Filtros de Data */}
        <Box mb={3} sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>


          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              type="date"
              size="small"
              label="Data Início"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: endDate || undefined, // Não permite data de início maior que data de fim
              }}
              sx={{ 
                width: 160,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />

            <TextField
              type="date"
              size="small"
              label="Data Fim"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: startDate || undefined, // Não permite data de fim menor que data de início
              }}
              sx={{ 
                width: 160,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>

          <Button
            variant="contained"
            size="small"
            onClick={onDateFilter}
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              borderRadius: '8px',
            }}
          >
            Filtrar
          </Button>
        </Box>



        <Grid container spacing={2} sx={{ width: '100%', boxSizing: 'border-box' }}>
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
          <Grid item xs={12} mt={4}>
            <Typography variant="subTitle" fontWeight="semiBold" sx={{ mt: 4, mb: 1, color: theme.palette.primary.main }}>
              Ranking de Ingredientes
            </Typography>
            <Typography variant="subTitleLittle" fontWeight="medium" sx={{ mt: 1, color: theme.palette.text.secondary, mb: 2, display: 'block' }}>
              Os mais utilizados em pedidos concluídos
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4} sx={{ width: '100%', minWidth: 0, display: 'flex' }}>
            <Box sx={{ width: '100%', minWidth: 0 }}>
              <TopIngredientsChart 
                data={operationalData?.topIngredientsByCategory?.massa || []}
                category="massa"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4} sx={{ width: '100%', minWidth: 0, display: 'flex' }}>
            <Box sx={{ width: '100%', minWidth: 0 }}>
              <TopIngredientsChart 
                data={operationalData?.topIngredientsByCategory?.recheio || []}
                category="recheio"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4} sx={{ width: '100%', minWidth: 0, display: 'flex' }}>
            <Box sx={{ width: '100%', minWidth: 0 }}>
              <TopIngredientsChart 
                data={operationalData?.topIngredientsByCategory?.adicional || []}
                category="adicional"
              />
            </Box>
          </Grid>

          {/* Top Clientes */}
          <Grid item xs={12} mt={4}>
            <Typography variant="subTitle" fontWeight="semiBold" sx={{ mt: 3, mb: 1, color: theme.palette.primary.main }}>
              Ranking de Clientes
            </Typography>
            <Typography variant="subTitleLittle" fontWeight="medium" sx={{ mt: 1, color: theme.palette.text.secondary, mb: 2, display: 'block' }}>
              Quem mais comprou em pedidos já concluídos
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} sx={{ width: '100%', minWidth: 0, display: 'flex' }}>
            <Box sx={{ width: '100%', minWidth: 0 }}>
              <TopClientsTable
                data={managerialData?.topClients || []}
                title="Clientes"
                showTotal={true}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <BottomNavigationComponent />
    </>
  );
}
