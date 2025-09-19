import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import { iconStyle, lineGoldenNavigation } from './bottom-navigation.styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../utils/enums/routes-url';

export function BottomNavigationComponent() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 1000,
        bgcolor: 'red'
      }}
    >
      <Box sx={lineGoldenNavigation}></Box>
      <BottomNavigation
        sx={{
          width: '100%',
          bgcolor: 'secondary.main',
          p: 1
        }}
      >
        <BottomNavigationAction
          onClick={() => navigate(ROUTES_PATHS.HOME)}
          label='Home'
          icon={<HomeFilledIcon sx={iconStyle} />}
        />
        <BottomNavigationAction
          onClick={() => navigate(ROUTES_PATHS.HOME)}
          label='Search'
          icon={<AssignmentIcon sx={iconStyle} />}
        />
        <BottomNavigationAction
          onClick={() => navigate(ROUTES_PATHS.HOME)}
          label='Cart'
          icon={<ShoppingBagIcon sx={iconStyle} />}
        />
        <BottomNavigationAction
          onClick={() => navigate(ROUTES_PATHS.HOME)}
          label='Profile'
          icon={<PersonIcon sx={iconStyle} />}
        />
      </BottomNavigation>
    </Box>
  );
}
