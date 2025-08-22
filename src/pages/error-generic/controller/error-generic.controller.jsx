import { ErrorGenericView } from "../view/error-generic.view";

export function ErrorGenericController() {
  const error = 'Algo deu errado. Por favor, tente novamente mais tarde.';
  return <ErrorGenericView error={error} />;
}
