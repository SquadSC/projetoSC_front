import { Box, Stack, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Ícone de localização
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Ícone de seta

export function AddressCard({ address, onSelect, isSelected }) {
  const addressText = `${address.logradouro}, ${address.numero} - ${address.bairro}`;
  const cityAndCep = `${address.cidade}, ${address.cep}`;

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
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='textBold' fontWeight='bold'>
            {`Endereço: ${address.nomeEndereco}`}
          </Typography>
          <Typography variant='textLittleBold'>{addressText}</Typography>
          <Typography variant='textLittleBold'>{cityAndCep}</Typography>
        </Box>

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
