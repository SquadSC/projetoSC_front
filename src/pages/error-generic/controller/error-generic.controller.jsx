import { ErrorGenericView } from '../view/error-generic.view';

export function ErrorGenericController({ error, urlFallback }) {
  if (error === null || error === undefined) {
    error = 'Algo deu errado. Por favor, tente novamente mais tarde.';
  }

  return <ErrorGenericView error={error} urlFallback={urlFallback} />;
}
