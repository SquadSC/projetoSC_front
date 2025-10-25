import { useState, useCallback } from 'react';

/**
 * Hook para gerenciar observações adicionais do pedido
 */
export function useObservation(maxLength = 200) {
  const [observation, setObservation] = useState('');
  const [error, setError] = useState('');

  // Atualiza observação com validação
  const updateObservation = useCallback(
    value => {
      if (value.length > maxLength) {
        setError(`A observação deve ter no máximo ${maxLength} caracteres.`);
        return;
      }

      setObservation(value);
      setError('');
    },
    [maxLength],
  );

  // Limpa observação
  const clearObservation = useCallback(() => {
    setObservation('');
    setError('');
  }, []);

  // Informações para exibição
  const characterCount = observation.length;
  const remainingCharacters = maxLength - characterCount;
  const isValid = observation.length <= maxLength;

  return {
    observation,
    error,
    characterCount,
    remainingCharacters,
    isValid,
    updateObservation,
    clearObservation,
  };
}
