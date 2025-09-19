import { useState } from 'react';
import { OrderSummaryCakeView } from '../view/order-summary-cake.view';

export function OrderSummaryCakeController() {
  const [activeStep, setActiveStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    if (nextStep > maxStepReached) {
      setMaxStepReached(nextStep);
    }
  };

  return <OrderSummaryCakeView stepConfig={{ nextStep: handleNext, activeStep, maxStepReached, setActiveStep }} />;
}
