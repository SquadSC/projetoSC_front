/**
 * Pega as iniciais de um nome completo (primeiro e último nome).
 * @param {string} name O nome completo.
 * @returns {string} As iniciais em maiúsculo (ex: "MS").
 */
export function getInitials(name = '') {
  const words = name.split(' ').filter(Boolean);
  if (words.length === 0) return '';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return `${first}${last}`.toUpperCase();
}

export function getInitialsToUpper(name = ''){
   if (name.length === 0) return '';
   const firstLetter = name[0].toUpperCase()
   const endWord = name.slice(1)
  return firstLetter + endWord
}