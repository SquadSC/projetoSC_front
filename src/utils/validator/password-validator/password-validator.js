/**
 * Verifica se a senha atende a critérios mínimos de segurança.
 * Ex: Mínimo 8 caracteres, 1 número, 1 letra maiúscula.
 * @param {string} password A senha a ser validada.
 * @returns {boolean}
 */
export function isStrongPassword(password) {
  if (!password) return false;
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return strongPasswordRegex.test(password);
}