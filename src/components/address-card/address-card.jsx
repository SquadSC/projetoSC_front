import { Box, Stack, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Ícone de localização
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Ícone de seta
import { maskCep } from '../../utils/mask/mask.utils';

export function AddressCard({ address, onSelect, isSelected }) {
  const addressText = `${address.logradouro}, ${address.numero} - ${address.bairro}`;
  const cityAndCep = `${address.cidade}, ${maskCep(address.cep)}`;

  return (
    <Box
      onClick={() => onSelect(address.idEndereco)}
      sx={{
        border: theme => `1px solid ${theme.palette.primary.main}`,
        borderRadius: '10px',
        p: 2,
        cursor: 'pointer',
        transition: 'background-color 0.3s', // Adiciona uma transição suave

        backgroundColor: isSelected
          ? theme => theme.palette.action.selected // Cor para item selecionado (cinza escuro)
          : 'transparent',
      }}
    >
      <Stack direction='row' alignItems='center' spacing={2}>
        {/* Ícone de Localização */}
        <LocationOnIcon
          sx={{
            color: theme => theme.palette.primary.main,
          }}
        />

        {/* Textos do Endereço */}
        <Stack direction='column' spacing={0.5} sx={{ flexGrow: 1 }}>
          <Typography variant='text' fontWeight='bold' sx={{ display: 'block' }}>
            {`Endereço: ${address.nomeEndereco}`}
          </Typography>
          <Typography variant='textLittle' sx={{ display: 'block' }}>
            {addressText}
          </Typography>
          <Typography variant='textLittle' sx={{ display: 'block' }}>
            {cityAndCep}
          </Typography>
        </Stack>

        {/* Ícone de Seta */}
        {/* Opcional: usar uma cor do tema para a seta também */}
        <ArrowForwardIosIcon
          fontSize='small'
          sx={{ color: theme => theme.palette.text.secondary }}
        />
      </Stack>
    </Box>
  );
}
