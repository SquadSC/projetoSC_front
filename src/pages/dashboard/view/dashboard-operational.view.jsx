import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Skeleton, 
  Button 
} from '@mui/material';
import theme from '../../../theme';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';

// Components
import { MetricCard } from '../components/metric-card/metric-card.component';
import { TopIngredientsChart } from '../components/top-ingredients-chart/top-ingredients-chart.component';

export function DashboardOperationalView({ 
  dashboardData, 
  loading, 
  error, 
  onRefresh 
}) {
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 2, pb: 10 }}>
        <Box mb={4}>
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="text" width={200} height={24} />
        </Box>
        <Grid container spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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
      <Container maxWidth="xl" sx={{ py: 0, pb: 10 }}>
        <Grid container spacing={2}>
          {/* Métricas operacionais atuais - 4 cards */}
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Pedidos Hoje"
              value={dashboardData?.todayOrders || 0}
              subtitle="atual"
              icon="📋"
              color={theme.palette.primary.main}
              compact={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Pendentes"
              value={dashboardData?.pendingOrders || 0}
              subtitle="agora"
              icon="⏳"
              color={theme.palette.warning.main}
              compact={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Produzindo"
              value={dashboardData?.completingOrders || 0}
              subtitle="agora"
              icon="👨‍🍳"
              color={theme.palette.info.main}
              compact={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Concluídos"
              value={dashboardData?.completedOrders || 0}
              subtitle="hoje"
              icon="✅"
              color={theme.palette.success.main}
              compact={true}
            />
          </Grid>

          {/* Top ingredientes por categoria - same width as cards */}
          <Grid item xs={12} sm={6} md={4}>
            <TopIngredientsChart 
              data={dashboardData?.topIngredientsByCategory?.massa || []}
              category="massa"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TopIngredientsChart 
              data={dashboardData?.topIngredientsByCategory?.recheio || []}
              category="recheio"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TopIngredientsChart 
              data={dashboardData?.topIngredientsByCategory?.adicional || []}
              category="adicional"
            />
          </Grid>
        </Grid>
      </Container>
      <BottomNavigationComponent />
    </>
  );
}
