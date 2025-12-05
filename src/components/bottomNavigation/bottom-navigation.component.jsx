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

// import das imagens dos ícones
import homeIcon from '../../assets/icons/home.svg';
import graphUpIcon from '../../assets/icons/graph-up-linear.svg';
import listCatalogo from '../../assets/icons/list-catalogo.svg';
import relogio from '../../assets/icons/relogio.svg';
import solarUser from '../../assets/icons/solar-user.svg';

export function BottomNavigationComponent() {
  const navigate = useNavigate();
  const userRole = getUserRole();

  const clienteTabs = [
    { label: "Início", icon: <img src={homeIcon} alt="Início" style={iconStyle} />, path: ROUTES_PATHS.HOME },
    { label: "Pedidos", icon: <img src={listCatalogo} alt="Catálogo" style={iconStyle} />, path: ROUTES_PATHS.ORDERS },
    // { label: "Loja", icon: <ShoppingBagIcon sx={iconStyle} />, path: ROUTES_PATHS.HOME },
    { label: "Perfil", icon: <img src={solarUser} alt="Perfil" style={iconStyle} />, path: ROUTES_PATHS.PROFILE },
  ];

  const confeiteiraTabs = [
    { label: "Início", icon: <img src={homeIcon} alt="Início" style={iconStyle} />, path: ROUTES_PATHS.HOME },
    { label: "Pendentes", icon: <img src={relogio} alt="Pendentes" style={iconStyle} />, path: ROUTES_PATHS.PENDING_ORDERS },
    { label: "Catálogo", icon: <img src={listCatalogo} alt="Catálogo" style={iconStyle} />, path: ROUTES_PATHS.PRODUCTS },
    { label: "Dashboard", icon: <img src={graphUpIcon} alt="Dashboard" style={iconStyle} />, path: ROUTES_PATHS.DASHBOARD },
    { label: "Perfil", icon: <img src={solarUser} alt="Perfil" style={iconStyle} />, path: ROUTES_PATHS.PROFILE },
  ];

  const tabs = userRole === "cliente" ? clienteTabs : confeiteiraTabs;

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
              height: "80px",
              minWidth: 'auto',
              padding: '8px 0',
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.65rem',
                opacity: 1,
                transition: 'none',
                paddingTop: '6px'
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
              color: 'primary.main',
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
