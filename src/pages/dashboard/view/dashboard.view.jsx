import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Skeleton,
} from '@mui/material';
import theme from '../../../theme';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';

// Components
import { MetricCard } from '../components/metric-card/metric-card.component';
import { HourlyOrdersChart } from '../components/hourly-orders-chart/hourly-orders-chart.component';
import { TopIngredientsChart } from '../components/top-ingredients-chart/top-ingredients-chart.component';
import { TopClientsTable } from '../components/top-clients-table/top-clients-table.component';

export function DashboardView() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Simula delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock data para desenvolvimento
      setDashboardData({
        // Top 5 horários com mais pedidos (histórico geral, não apenas hoje)
        hourlyOrders: [
          { hour: '16h', orders: 285 }, // Horário de pico - lanche da tarde
          { hour: '15h', orders: 267 }, // Segunda opção mais popular
          { hour: '17h', orders: 245 }, // Final da tarde
          { hour: '14h', orders: 198 }, // Início da tarde
          { hour: '18h', orders: 175 }, // Início da noite
        ],
        topIngredients: [
          { name: 'Chocolate', count: 248, percentage: 28 },
          { name: 'Morango', count: 195, percentage: 22 },
          { name: 'Brigadeiro', count: 167, percentage: 19 },
          { name: 'Doce de Leite', count: 142, percentage: 16 },
          { name: 'Coco', count: 98, percentage: 11 },
        ],
        topClients: [
          { name: 'Maria Silva Santos', orders: 18, total: 2450.75 },
          { name: 'João Pedro Oliveira', orders: 15, total: 1980.50 },
          { name: 'Ana Carolina Costa', orders: 12, total: 1675.25 },
          { name: 'Pedro Henrique Lima', orders: 10, total: 1420.80 },
          { name: 'Lucia Fernanda Souza', orders: 8, total: 1150.40 },
          { name: 'Carlos Eduardo Rocha', orders: 7, total: 985.60 },
          { name: 'Beatriz Almeida Cruz', orders: 6, total: 820.30 },
        ],
        newClientsToday: 12,
        totalOrders: 156,
        averageRating: 4.8,
      });
    } catch (err) {
      console.error('Erro ao carregar dashboard (mock):', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Container maxWidth="xl" sx={{ py: 4, pb: 10 }}>
          <Box mb={4}>
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={300} height={24} />
          </Box>
          <Grid container spacing={3}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="rectangular" height={60} sx={{ mt: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <BottomNavigationComponent />
      </>
    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 4, pb: 10 }}>
        <Box mb={3}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              mb: 1
            }}
          >
            Dashboard
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Métricas principais em linha - cards menores */}
          <Grid item xs={12} sm={4}>
            <MetricCard
              title="Novos Clientes"
              value={dashboardData.newClientsToday}
              subtitle="hoje"
              icon="👥"
              color={theme.palette.primary.main}
              trend={{ value: 25.0, isPositive: true }}
              compact={true}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MetricCard
              title="Total de Pedidos"
              value={dashboardData.totalOrders}
              subtitle="hoje"
              icon="📦"
              color={theme.palette.secondary.main}
              trend={{ value: 8.5, isPositive: true }}
              compact={true}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MetricCard
              title="Hora de Pico"
              value="16h"
              subtitle="42 pedidos"
              icon="🔥"
              color={theme.palette.error.main}
              compact={true}
            />
          </Grid>

          {/* Gráfico de horários com mais pedidos */}
          <Grid item xs={12} lg={6}>
            <HourlyOrdersChart data={dashboardData.hourlyOrders} />
          </Grid>

          {/* Top ingredientes */}
          <Grid item xs={12} lg={6}>
            <TopIngredientsChart data={dashboardData.topIngredients} />
          </Grid>

          {/* Top clientes - ocupa a largura total */}
          <Grid item xs={12}>
            <TopClientsTable data={dashboardData.topClients} />
          </Grid>
        </Grid>
      </Container>
      <BottomNavigationComponent />
    </>
  );
}
