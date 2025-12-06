import { Box, Button, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import { lineGolden } from '../navbar/navbar.style';

export function ProfileHeader({
  title,
  showBackButton = false,
  showRightButton = false, // Renomeado de showEditButton
  rightButtonIcon, // Novo: aceita um ícone
  onBackClick,
  onRightButtonClick, // Renomeado de onEditClick
}) {
  // Define o ícone padrão se nenhum for passado
  const Icon = rightButtonIcon || <EditIcon />;

  return (
    <Box sx={{ bgcolor: 'secondary.main', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          px: 2,
          py: 2,
        }}
      >
        {/* Botão Voltar */}
        {showBackButton && (
          <IconButton
            onClick={onBackClick}
            sx={{
              minWidth: 0,
              color: 'primary.main',
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        {/* Título */}
        <Typography
          sx={theme => ({
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: theme.typography?.fontFamily,
            fontSize: theme.typography?.subTitle?.fontSize,
            fontWeight: theme.typography?.fontWeightMedium,
            color: 'primary.main',
          })}
        >
          {title}
        </Typography>

        {/* Botão da Direita (Dinâmico) */}
        {showRightButton && (
          <IconButton
            onClick={onRightButtonClick}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'primary.main',
            }}
          >
            {Icon}
          </IconButton>
        )}
      </Box>
      <Box sx={lineGolden} />
    </Box>
  );
}