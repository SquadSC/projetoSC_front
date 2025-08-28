import { StepperComponent } from '../../../components/stepper/stepper-component';

export function CustomOrderView() {
  const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'];

  return (
    <StepperComponent steps={steps} initialStep={2} />
  );
}
