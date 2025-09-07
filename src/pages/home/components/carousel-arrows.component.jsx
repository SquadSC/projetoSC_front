import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//seta "Anterior"
export function PrevArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '55%', // Alinha verticalmente ao meio
        left: '30%', // Posiciona à esquerda, fora da área dos cards
        zIndex: 2,
        transform: 'translateY(-50%)',
        color: theme => theme.palette.primary.main,
        border: theme => `2px solid ${theme.palette.primary.main}`,
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
}

// Componente para a seta "Próximo"
export function NextArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '55%', // Alinha verticalmente ao meio
        right: '30%', // Posiciona à direita, fora da área dos cards
        zIndex: 2,
        transform: 'translateY(-50%)',
        color: theme => theme.palette.primary.main,
        border: theme => `2px solid ${theme.palette.primary.main}`
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}
