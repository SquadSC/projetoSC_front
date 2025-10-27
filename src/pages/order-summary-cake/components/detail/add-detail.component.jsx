import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Paper,
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
        p: 3,
      }}
    >
      <Box>
        <Typography variant='h6' gutterBottom>
          Detalhes adicionais
        </Typography>
        <Typography variant='subtitle2' color='primary.main' sx={{ mb: 2 }}>
          Deseja incluir alguma observação? (opcional)
        </Typography>
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
        />
        {error && (
          <Typography
            variant='caption'
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
