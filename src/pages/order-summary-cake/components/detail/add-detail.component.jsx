import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Paper,
  Stack,
} from '@mui/material';

export function AdditionalDetailsComponent({ nextStep, cakeData, canAdvance }) {
  const {
    observation,
    error,
    characterCount,
    remainingCharacters,
    isValid,
    updateObservation,
  } = cakeData.observation;

  const handleObservationChange = event => {
    updateObservation(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={3} mb={2}>
          <Typography
            variant='subTitleLittle'
            color='primary.main'
            fontWeight='semiBold'
          >
            Detalhes adicionais
          </Typography>
          <Typography variant='text'>
            Deseja incluir alguma observação? (opcional)
          </Typography>
        </Stack>

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder='Digite uma mensagem para a confeiteira (Máx. 200 caracteres)'
          value={observation}
          onChange={handleObservationChange}
          inputProps={{ maxLength: 200 }}
          helperText={`${characterCount}/200 caracteres`}
          error={!!error}
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '15px', // Tamanho do texto digitado
              lineHeight: 1.5,
              fontFamily: 'inherit', // Usa a fonte padrão do tema
            },
            '& .MuiInputBase-input::placeholder': {
              fontSize: '14px', // Tamanho do placeholder (opcional)
              opacity: 0.6,
            },
          }}
        />
        {error && (
          <Typography
            variant='text'
            color='error'
            sx={{ mt: 1, display: 'block' }}
          >
            {error}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Button
          variant='contained'
          fullWidth
          sx={{ borderRadius: '24px', height: '48px' }}
          onClick={nextStep}
        >
          Avançar
        </Button>
      </Box>
    </Box>
  );
}
