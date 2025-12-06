// Utilitários para formatação de dados do perfil simplificados

/**
 * Preparar dados do formulário para envio à API
 */
export const formatFormDataForAPI = formData => {
  return {
    ...formData,
    // Remove formatação do telefone para envio se houver
    telefone: formData.telefone?.replace(/\D/g, ''),
  };
};

/**
 * Formatar telefone para exibição com máscara
 * Entrada: "11999998888" -> Saída: "(11) 99999-8888"
 */
export const formatPhoneForDisplay = phone => {
  if (!phone) return 'Não informado';

  // Remove todos os caracteres não numéricos
  const numbersOnly = phone.replace(/\D/g, '');

  // Verifica se tem 10 ou 11 dígitos
  if (numbersOnly.length === 10) {
    // Formato: (XX) XXXX-XXXX
    return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(
      2,
      6,
    )}-${numbersOnly.slice(6)}`;
  } else if (numbersOnly.length === 11) {
    // Formato: (XX) XXXXX-XXXX
    return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(
      2,
      7,
    )}-${numbersOnly.slice(7)}`;
  }

  // Se não tiver o tamanho esperado, retorna como está
  return phone;
};
