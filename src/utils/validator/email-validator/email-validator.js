/**
 * Verifica se uma string parece um endereço de e-mail válido.
 * @param {string} email O e-mail a ser validado.
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}