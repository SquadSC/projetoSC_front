/**
 * Aplica a máscara de CPF (000.000.000-00) a uma string de números.
 * @param {string} cpf A string de CPF (apenas números).
 * @returns {string} O CPF formatado.
 */
export function formatCPF(cpf) {
  if (!cpf || typeof cpf !== 'string') return '';
  const cleanedCpf = cpf.replace(/\D/g, ''); // Remove tudo que não for dígito
  return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/* exemplo de uso
const cpfDoBanco = "12345678900";
const cpfFormatado = formatCPF(cpfDoBanco); // "123.456.789-00"
*/