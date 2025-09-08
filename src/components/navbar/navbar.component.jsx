import { Box, IconButton, Stack } from '@mui/material';
import { LogoComponent } from '../logo/logo.component';
import { lineGolden } from './navbar.style';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export function NavbarComponent() {
  return (
    <Box sx={{ bgcolor: 'secondary.main', width: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <LogoComponent></LogoComponent>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 4 }} >
            <IconButton>
                <ShoppingCartOutlinedIcon sx={{ color: 'primary.main', fontSize: 26 }} />
            </IconButton>
            <IconButton>
                <NotificationsNoneOutlinedIcon sx={{ color: 'primary.main', fontSize: 26 }} />
            </IconButton>
        </Stack >
      </Box>
      <Box sx={lineGolden}></Box>
    </Box>

  );
}
