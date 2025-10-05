import { useState } from 'react';
import {
  Box, // Container flexível para layout
  Container, // Container responsivo com largura máxima
  Typography, // Componente de texto com estilos
  Card, // Card para agrupar conteúdo
  CardContent, // Conteúdo interno do card
  Stack, // Stack para layout vertical/horizontal simples
  Tabs, // Componente de abas/tabs
  Tab, // Item individual de uma tab
} from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { MetricCard } from '../components/metric-card.component';
import { CategorySection } from '../components/category-section.component';

export function DashboardView({ data }) {
  // Estado para controlar qual tab está ativa (0 = Bolos, 1 = Complementares)
  const [activeTab, setActiveTab] = useState(0);

  // Função para lidar com mudança de tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue); // Atualiza o estado com a nova tab selecionada
  };

  // Retorna o JSX que será renderizado na tela
  return (
    // Container principal da página com fundo padrão e altura total da viewport
    <Box
      sx={{
        backgroundColor: 'background.default', // Cor de fundo padrão do tema
        minHeight: '100vh', // Altura mínima = 100% da viewport
        p: 3, // Padding interno de 24px
      }}
    >
      {/* Header */}
      <PageHeader
        titulo='Dashboard'
        showBackButton={true}
        width='100%'
      ></PageHeader>

      {/* SEÇÃO DE KPIs - Cards com métricas principais */}
      <Box
        sx={{
          mb: 4,
          width: '100%',
          py: 2, 
          display: 'flex',
          gap: 2,
        }}
      >
          {/* Card de Pedidos */}
          <Box sx={{ flex: 1 }}>
            <MetricCard
              title='Pedidos' // Título do card
              value={data.metrics.orders.value} // Valor numérico (38)
              trend={data.metrics.orders.trend} // Tendência (+7%)
              isPositive={data.metrics.orders.isPositive} // Se a tendência é positiva
            />
          </Box>

          {/* Card de Clientes Fidelizados */}
          <Box sx={{ flex: 1 }}>
            <MetricCard
              title='Clientes fidelizados' // Título do card
              value={data.metrics.loyalCustomers.value} // Valor numérico (24)
              trend={data.metrics.loyalCustomers.trend} // Tendência (-2%)
              isPositive={data.metrics.loyalCustomers.isPositive} // Se a tendência é positiva
            />
          </Box>
        </Box>

        {/* Container responsivo com largura máxima para mobile */}
        <Container maxWidth='sm' sx={{ mt: 0, p: 0 }}>
        {/* SEÇÃO "MAIS VENDIDOS" - Card principal com produtos mais vendidos */}
        <Card
          sx={{
            backgroundColor: 'white', // Fundo branco
            borderRadius: 3, // Bordas arredondadas
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Sombra sutil
            mb: 2, // Margem inferior
            border: '1px solid #38090D', // Borda marrom da marca
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {/* Título da seção */}
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold', // Texto em negrito
                color: '#38090D', // Cor marrom da marca
                p: 2, // Padding interno
                pb: 1, // Padding inferior menor
              }}
            >
              Mais vendidos
            </Typography>

            {/* Sistema de Tabs para alternar entre Bolos e Complementares */}
            <Box sx={{ px: 2 }}>
              <Tabs
                value={activeTab} // Tab atualmente selecionada
                onChange={handleTabChange} // Função chamada ao clicar em uma tab
                sx={{
                  // Estilo das tabs não selecionadas
                  '& .MuiTab-root': {
                    color: '#38090D', // Cor marrom da marca
                    fontWeight: 'medium', // Peso da fonte médio
                    textTransform: 'none', // Sem transformação de texto
                    minHeight: 40, // Altura mínima
                    borderRadius: 2, // Bordas arredondadas
                    mx: 0.5, // Margem horizontal
                  },
                  // Estilo da tab selecionada
                  '& .Mui-selected': {
                    background:
                      'linear-gradient(90deg, #CDA243 0%, #F3E4AA 50.48%, #C59736 100%)', // Gradiente dourado da marca
                    color: '#38090D', // Cor marrom da marca
                    fontWeight: 'bold', // Texto em negrito
                  },
                }}
              >
                <Tab label='Bolos' /> {/* Tab para produtos de bolos */}
                <Tab label='Complementares' />{' '}
                {/* Tab para produtos complementares */}
              </Tabs>
            </Box>

            {/* Conteúdo dinâmico baseado na tab selecionada */}
            <Box sx={{ p: 2 }}>
              {/* Se a tab "Bolos" estiver ativa (activeTab === 0) */}
              {activeTab === 0 && (
                <>
                  {/* Seção de Decorações com dados dos produtos */}
                  <CategorySection
                    title='Decorações'
                    items={data.bestSellers.cakes.decorations}
                  />
                  {/* Seção de Recheios com dados dos produtos */}
                  <CategorySection
                    title='Recheios'
                    items={data.bestSellers.cakes.fillings}
                  />
                  {/* Seção de Adicionais com dados dos produtos */}
                  <CategorySection
                    title='Adicionais'
                    items={data.bestSellers.cakes.addons}
                  />
                </>
              )}

              {/* Se a tab "Complementares" estiver ativa (activeTab === 1) */}
              {activeTab === 1 && (
                <Typography variant='body2' color='text.secondary'>
                  Dados de complementares em breve...
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
