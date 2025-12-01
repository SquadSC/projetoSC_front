import { useState, useEffect } from 'react';
import { DashboardOperationalView } from '../view/dashboard-operational.view';
import { DashboardManagerialView } from '../view/dashboard-managerial.view';
import { 
  Box, 
  ToggleButton, 
  ToggleButtonGroup, 
  Container,
  Typography 
} from '@mui/material';
import theme from '../../../theme';

export function DashboardController() {
  const [viewMode, setViewMode] = useState('operational');
  const [operationalData, setOperationalData] = useState(null);
  const [managerialData, setManagerialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Managerial filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Set default dates for managerial view
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (viewMode === 'operational') {
      fetchOperationalData();
      // Auto-refresh for operational view
      const interval = setInterval(fetchOperationalData, 30000);
      return () => clearInterval(interval);
    } else if (startDate && endDate) {
      fetchManagerialData();
    }
  }, [viewMode, startDate, endDate]);

  const fetchOperationalData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const baseUrl = 'http://localhost:8080/dashboard';
      
      // Fetch overview data
      const overviewResponse = await fetch(`${baseUrl}/overview`);
      if (!overviewResponse.ok) throw new Error('Erro ao buscar dados principais');
      const overviewData = await overviewResponse.json();
      
      // Fetch top ingredients
      const ingredientsResponse = await fetch(`${baseUrl}/top-ingredientes`);
      if (!ingredientsResponse.ok) throw new Error('Erro ao buscar ingredientes');
      const ingredientsData = await ingredientsResponse.json();
      
      // Process ingredients data
      if (ingredientsData.massa || ingredientsData.recheio || ingredientsData.adicional) {
        // New structured response
        setOperationalData({
          todayOrders: overviewData.pedidosHoje,
          pendingOrders: overviewData.pendentes,
          completingOrders: overviewData.produzindo,
          completedOrders: overviewData.concluidos,
          topIngredientsByCategory: {
            massa: Array.isArray(ingredientsData.massa) ? ingredientsData.massa : [],
            recheio: Array.isArray(ingredientsData.recheio) ? ingredientsData.recheio : [],
            adicional: Array.isArray(ingredientsData.adicional) ? ingredientsData.adicional : []
          }
        });
      } else {
        // Original array response - separate by category manually
        const ingredientsByCategory = {
          massa: [],
          recheio: [],
          adicional: []
        };
        
        if (Array.isArray(ingredientsData)) {
          ingredientsData.forEach(ingredient => {
            const category = ingredient.categoria?.toLowerCase() || 'adicional';
            if (ingredientsByCategory[category]) {
              ingredientsByCategory[category].push({
                nome: ingredient.nome,
                quantidadePedidos: ingredient.quantidadePedidos,
                percentual: ingredient.percentual
              });
            }
          });
        }
        
        setOperationalData({
          todayOrders: overviewData.pedidosHoje,
          pendingOrders: overviewData.pendentes,
          completingOrders: overviewData.produzindo,
          completedOrders: overviewData.concluidos,
          topIngredientsByCategory: {
            massa: ingredientsByCategory.massa.slice(0, 5),
            recheio: ingredientsByCategory.recheio.slice(0, 5),
            adicional: ingredientsByCategory.adicional.slice(0, 5)
          }
        });
      }
    } catch (err) {
      console.error('Erro ao carregar dashboard operacional:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchManagerialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const baseUrl = 'http://localhost:8080/dashboard';
      
      // Fetch managerial statistics with date parameters
      const statsParams = new URLSearchParams({
        dataInicio: startDate,
        dataFim: endDate
      });
      const statsResponse = await fetch(`${baseUrl}/estatisticas?${statsParams}`);
      if (!statsResponse.ok) throw new Error('Erro ao buscar estatísticas');
      const statsData = await statsResponse.json();
      
      // Fetch top clients with date parameters
      const clientsParams = new URLSearchParams({
        dataInicio: startDate,
        dataFim: endDate
      });
      const clientsResponse = await fetch(`${baseUrl}/top-clientes?${clientsParams}`);
      if (!clientsResponse.ok) throw new Error('Erro ao buscar top clientes');
      const clientsData = await clientsResponse.json();
      
      setManagerialData({
        totalRevenue: statsData.receitaTotalPeriodo,
        averageOrderValue: statsData.ticketMedio,
        totalOrders: statsData.totalPedidosPeriodo,
        completionRate: statsData.taxaConclusao,
        topClients: clientsData.map(client => ({
          name: client.nome,
          orders: client.quantidadePedidos,
          email: client.email,
          total: client.valorTotal,
          position: client.posicao
        }))
      });
    } catch (err) {
      console.error('Erro ao carregar dashboard gerencial:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const handleDateFilter = () => {
    if (!startDate || !endDate) {
      alert('Por favor, selecione as datas de início e fim.');
      return;
    }
    fetchManagerialData();
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 4, pb: 2 }}>
        {/* Título da página */}
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
        
        {/* Filtro de visualização */}
        <Box mb={2}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            size="medium"
            sx={{ 
              '& .MuiToggleButton-root': {
                px: 3,
                py: 1,
                border: `1px solid ${theme.palette.primary.main}30`,
                borderRadius: '8px',
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                },
                '&:not(.Mui-selected)': {
                  color: theme.palette.primary.main,
                },
              }
            }}
          >
            <ToggleButton value="operational">
              Visão Operacional
            </ToggleButton>
            <ToggleButton value="managerial">
              Visão Gerencial
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Container>

      {/* Render selected view with data */}
      {viewMode === 'operational' ? (
        <DashboardOperationalView 
          dashboardData={operationalData}
          loading={loading}
          error={error}
          onRefresh={fetchOperationalData}
        />
      ) : (
        <DashboardManagerialView 
          dashboardData={managerialData}
          loading={loading}
          error={error}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onDateFilter={handleDateFilter}
        />
      )}
    </>
  );
}
