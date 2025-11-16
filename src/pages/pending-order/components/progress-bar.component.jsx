import { Box } from '@mui/material';
import { progressBarContainer, progressStep } from '../styles/pending-order.style';

export function ProgressBar({ currentStep }) {
  const steps = [
    { id: 1, label: 'Verificar agenda' },
    { id: 2, label: 'Verificar fornecedor' },
    { id: 3, label: 'Verificar pagamento' },
  ];

  return (
    <Box sx={progressBarContainer}>
      {steps.map((step, index) => (
        <Box
          key={step.id}
          sx={progressStep(currentStep >= step.id, index < steps.length - 1)}
        />
      ))}
    </Box>
  );
}

