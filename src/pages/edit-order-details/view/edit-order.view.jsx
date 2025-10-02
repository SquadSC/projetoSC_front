import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {  inputStyle, btnSave } from '../styles/edit-order.styles.js';
import { validateDateTimeNotPast, formatDateForInput } from '../../../utils/helper/edit-order-helper.js';

/*
  Props:
    - loading: boolean
    - saving: boolean
    - error: string|null
    - order: object|null
    - onSave(payload): fn
    - onCancel(): fn
*/

export default function EditOrderView({ loading, saving, error, order, onSave, onCancel }) {
  const [dataEntrega, setDataEntrega] = useState('');
  const [horaEntrega, setHoraEntrega] = useState('');
  const [topoPersonalizado, setTopoPersonalizado] = useState('Não possui topo personalizado');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (order) {
      setDataEntrega(formatDateForInput(order.dataEntrega));
      setHoraEntrega(order.horaEntrega ? order.horaEntrega.slice(0,5) : '');
      setTopoPersonalizado(order.topoPersonalizado || 'Não possui topo personalizado');
    }
  }, [order]);

  const validateAll = () => {
    const errors = {};
    if (!dataEntrega) errors.dataEntrega = 'Data de entrega é obrigatória.';
    if (!horaEntrega) errors.horaEntrega = 'Hora de entrega é obrigatória.';
    if (dataEntrega && horaEntrega) {
      const dtError = validateDateTimeNotPast(dataEntrega, horaEntrega);
      if (dtError) errors.dataTime = dtError;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (!validateAll()) return;

    const payload = {
      ...order,
      dataEntrega,
      horaEntrega,
      topoPersonalizado: topoPersonalizado === 'Não possui topo personalizado' ? null : topoPersonalizado,
    };

    onSave(payload);
  };

  if (loading) {
    return (
      <Container sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ p: 0, maxWidth: 480 }}>
      {/* Cabeçalho */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'secondary.light',
        p: 1.7,
      }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onCancel} 
        sx={{ 
            minWidth: 0,
            color: 'primairy.main',
            position: 'absolute', // fica fixo à esquerda
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)', 
          }} 
            />
        <Typography
          variant="h6"
          sx={{
            color: 'primairy.main',
            textAlign: 'center',
            flex: 1,
            width: '100%',
          }}
        >
          Detalhes do Pedido
        </Typography>
      </Box>

      {/* Formulário sem card */}
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle2" align="center" sx={{ fontWeight: 'bold' }}>
            Editando
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {formErrors.dataTime && <Alert severity="error">{formErrors.dataTime}</Alert>}

          <TextField
            label="Data de Entrega"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
            error={!!formErrors.dataEntrega}
            helperText={formErrors.dataEntrega}
            sx={inputStyle}
          />

          <TextField
            label="Hora da Entrega"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={horaEntrega}
            onChange={(e) => setHoraEntrega(e.target.value)}
            error={!!formErrors.horaEntrega}
            helperText={formErrors.horaEntrega}
            sx={inputStyle}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ mb: 1 }}>
              Topo Personalizado:
            </FormLabel>
            <RadioGroup
              aria-label="topoPersonalizado"
              name="topoPersonalizado"
              value={topoPersonalizado}
              onChange={(e) => setTopoPersonalizado(e.target.value)}
            >
              <FormControlLabel value="Branca de neve" control={<Radio />} label="Branca de neve" />
              <FormControlLabel value="Não possui topo personalizado" control={<Radio />} label="Não possui topo personalizado" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={btnSave}
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
