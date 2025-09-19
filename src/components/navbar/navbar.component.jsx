import { Box, IconButton, Stack } from '@mui/material';
import { LogoComponent } from '../logo/logo.component';
import { lineGolden } from './navbar.style';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../utils/enums/routes-url';

export function NavbarComponent() {
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: 'secondary.main', width: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box onClick={() => navigate(ROUTES_PATHS.CUSTOM_ORDER)}>
          <LogoComponent></LogoComponent>
          </Box>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 4 }} >
            <IconButton onClick={() => navigate(ROUTES_PATHS.CUSTOM_ORDER)}>
                <ShoppingCartOutlinedIcon sx={{ color: 'primary.main', fontSize: 26 }} />
            </IconButton>
            {/* TODO: atualizar rota quando tivermos a página */}
            <IconButton onClick={() => navigate(ROUTES_PATHS.CUSTOM_ORDER)}>
                <NotificationsNoneOutlinedIcon sx={{ color: 'primary.main', fontSize: 26 }} />
            </IconButton>
        </Stack >
      </Box>
      <Box sx={lineGolden}></Box>
    </Box>

  );
}
