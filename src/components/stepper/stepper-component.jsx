import { Box, Step, StepButton, Stepper } from "@mui/material";
import { useState } from "react";

export function StepperComponent({ steps, initialStep = 0 }) {
  const [activeStep, setActiveStep] = useState(initialStep);

  const handleStepClick = (index) => {
    if (index <= activeStep) {
      setActiveStep(index);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              color="inherit"
              onClick={() => handleStepClick(index)}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
