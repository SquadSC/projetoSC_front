import { useState } from 'react';
import { OrderSummaryCakeView } from '../view/order-summary-cake.view';

export function OrderSummaryCakeController() {
  const [activeStep, setActiveStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  const [product, setProduct] = useState({
    idProduct: '',
    price: '',
    quantity: '',
    theme: '',
    observation: '',
    attachment: '',
    ingredientList: [
      {
        name: '',
        type: '',
        isPremium: false,
      },
    ],
  });
  const [errors, setErrors] = useState({
    idProduct: '',
    price: '',
    quantity: '',
    theme: '',
    observation: '',
    attachment: '',
    ingredientList: [
      {
        name: '',
        type: '',
        isPremium: false,
      },
    ],
  });

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    if (nextStep > maxStepReached) {
      setMaxStepReached(nextStep);
    }
  };

  const stepConfig = {
    nextStep: handleNext,
    activeStep,
    maxStepReached,
    setActiveStep,
  };

  const infoCake = { 
    product, 
    setProduct,
    errors, 
    setErrors 
  };

  return <OrderSummaryCakeView stepConfig={stepConfig} infoCake={infoCake} />;
}
