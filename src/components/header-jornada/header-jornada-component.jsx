import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function PageHeader({ titulo, showBackButton = false }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Toolbar>
        {/* Mostra a seta se showBackButton for true */}
        {showBackButton && (
          <IconButton edge="start" color="inherit" onClick={handleBack}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        {/* Alinha o título */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          {titulo}
        </Typography>
        
        {/* Elemento invisível para manter o título perfeitamente centralizado */}
        {showBackButton && <Box sx={{ width: 48 }} />} 
      </Toolbar>
    </AppBar>
  );
}

PageHeader.propTypes = {
  titulo: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool,
};