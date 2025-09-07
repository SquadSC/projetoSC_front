import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//seta "Anterior"
export function PrevArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
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
        color: theme => theme.palette.primary.main,
        border: theme => `2px solid ${theme.palette.primary.main}`
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}
