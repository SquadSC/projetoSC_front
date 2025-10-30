import { useState, useCallback } from 'react';

/**
 * Hook para controlar as etapas do pedido personalizado
 */
export function useStepController(totalSteps = 4) {
  const [activeStep, setActiveStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);

  const nextStep = useCallback(() => {
    const next = Math.min(activeStep + 1, totalSteps - 1);
    setActiveStep(next);
    if (next > maxStepReached) {
      setMaxStepReached(next);
    }
  }, [activeStep, maxStepReached, totalSteps]);

  const previousStep = useCallback(() => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback(
    step => {
      if (step <= maxStepReached && step >= 0 && step < totalSteps) {
        setActiveStep(step);
      }
    },
    [maxStepReached, totalSteps],
  );

  return {
    activeStep,
    maxStepReached,
    nextStep,
    previousStep,
    goToStep,
    setActiveStep,
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === totalSteps - 1,
  };
}
