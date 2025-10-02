import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { iconStyle, lineGoldenNavigation } from './bottom-navigation.styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../utils/enums/routes-url';
import { getUserRole } from '../../utils/auth';

export function BottomNavigationComponent() {
  const navigate = useNavigate();
  const userRole = getUserRole();

  const clienteTabs = [
    { label: "Início", icon: <HomeFilledIcon sx={iconStyle} />, path: ROUTES_PATHS.HOME },
    { label: "Pedidos", icon: <AssignmentIcon sx={iconStyle} />, path: ROUTES_PATHS.CART },
    { label: "Loja", icon: <ShoppingBagIcon sx={iconStyle} />, path: ROUTES_PATHS.SEARCH },
    { label: "Perfil", icon: <PersonIcon sx={iconStyle} />, path: ROUTES_PATHS.PROFILE },
  ];

  const confeiteiraTabs = [
    { label: "Início", icon: <HomeFilledIcon sx={iconStyle} />, path: ROUTES_PATHS.HOME },
    { label: "Pendentes", icon: <QueryBuilderIcon sx={iconStyle} />, path: ROUTES_PATHS.PENDING },
    { label: "Catálogo", icon: <AssignmentIcon sx={iconStyle} />, path: ROUTES_PATHS.CATALOG },
    { label: "Dashboard", icon: <DashboardIcon sx={iconStyle} />, path: ROUTES_PATHS.DASHBOARD },
    { label: "Perfil", icon: <PersonIcon sx={iconStyle} />, path: ROUTES_PATHS.PROFILE },
  ];

  const tabs = userRole === "cliente" ? clienteTabs : confeiteiraTabs;
  console.log('User Role:', userRole);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
    >
      <Box sx={lineGoldenNavigation}></Box>
      <BottomNavigation
        sx={{
          width: "100%",
          bgcolor: "secondary.main",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {tabs.map((tab, index) => (
          <BottomNavigationAction
            key={index}
            onClick={() => navigate(tab.path)}
            label={tab.label}
            icon={tab.icon}
            sx={{
              height: "70px",
              minWidth: 'auto',
              padding: '8px 0',
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.75rem',
                opacity: 1,
                transition: 'none',
              },
              '& .MuiBottomNavigationAction-wrapper': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px'
              },
              '&.Mui-selected': {
                color: '#B4916C',
              },
              color: '#666666',
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
