/**
 * Formata uma data para o padrão brasileiro (dd/MM/yyyy).
 * @param {Date | string} date A data a ser formatada.
 * @returns {string} A data formatada ou uma string vazia se a data for inválida.
 */
export function formatDate(date) {
  try {
    const dateObj = new Date(date);
    // Intl.DateTimeFormat é a forma moderna e correta de formatar datas
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dateObj);
  } catch (error) {
    return '';
  }
}

/* exemplo de uso
const hoje = new Date(); // Ex: 2025-08-28...
const dataFormatada = formatDate(hoje); // "28/08/2025"
*/