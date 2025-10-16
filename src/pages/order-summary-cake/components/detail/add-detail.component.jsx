import { Box, Button, TextField, Typography } from '@mui/material';

export function AdditionalDetailsComponent({ nextStep, infoCake }) { // Mudando de detailCake para infoCake
  const { product, setProduct } = infoCake;

  const handleObservationChange = (event) => {
    setProduct(prev => ({
      ...prev,
      observation: event.target.value
    }));
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
        <Typography variant="h6" gutterBottom>
          Detalhes adicionais
        </Typography>
        <Typography 
          variant="subtitle2" 
          color="primary.main"
          sx={{ mb: 2 }}
        >
          Deseja incluir alguma observação? (opcional)
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Digite uma mensagem para a confeiteira (Máx. 200 caracteres)"
          value={product.observation || ''} // Adicionando fallback para evitar undefined
          onChange={handleObservationChange}
          inputProps={{ maxLength: 200 }}
          helperText={`${(product.observation || '').length}/200 caracteres`}
        />
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
          variant="contained"
          fullWidth
          sx={{ borderRadius: '24px', height: '48px', }}
          onClick={nextStep}
        >
          Avançar
        </Button>
      </Box>
    </Box>
  );
}