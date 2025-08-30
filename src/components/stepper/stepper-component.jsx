import { Box, Step, StepButton, Stepper } from '@mui/material';

export function StepperComponent({
  steps,
  activeStep,
  maxStepReached,
  onStepChange,
}) {
  const handleStepClick = index => {
    if (index <= maxStepReached) {
      onStepChange(index);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              color='inherit'
              onClick={() => handleStepClick(index)}
              disabled={index > maxStepReached}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
