import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Header } from '../components/header/header.component';
import { WeeklyOrder } from '../components/weekly-order/weekly-order.component';
import { ListNewOrdersComponent } from '../components/list-new-orders/list-new-orders.component';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';

import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
export function HomeConfectionerView({ user, weeklyData, newOrders, monthName }) {
  const lineGolden = {
    width: '100%',
    height: '5px',
    background:
      'linear-gradient(90deg, #CDA243 0%, #F3E4AA 50.48%, #C59736 100%)',
  };
  const navigate = useNavigate();
  return (
    <Container sx={{ padding: 0, width: '100%' }} maxWidth={false}>
      <Box bgcolor={'secondary.main'} height={'auto'} p={2} pb={4}>
        <Stack spacing={3}>
          <Header user={user}></Header>
          <Stack
            spacing={2}
            sx={{
              width: '100%',
            }}
          >
            <Stack spacing={0}>
              <Typography
                variant='h5'
                fontWeight={'semiBold'}
                color='primary.main'
              >
                Pedidos da Semana
              </Typography>
              <Typography
                variant='text'
                fontWeight={'semiBold'}
                color='primary.main'
              >
                {monthName}:
              </Typography>
            </Stack>
            <WeeklyOrder weeklyData={weeklyData} />
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box sx={lineGolden} />
        <Button
          variant='contained'
          sx={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            minWidth: '150px',
          }}
          onClick={() => navigate(ROUTES_PATHS.AGENDA)}
        >
          Ver Calendario
        </Button>
      </Box>
      <Stack spacing={2} mt={4} px={2} mb={11}>
        <Typography variant='subTitle' fontWeight={'semiBold'}>
          Novos Pedidos
        </Typography>
        <ListNewOrdersComponent newOrders={newOrders} />
      </Stack>
      <BottomNavigationComponent />
    </Container>
  );
}
