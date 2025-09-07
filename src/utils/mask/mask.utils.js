export function maskPhone(value) {
  if (!value) return '';
  const cleanValue = value.replace(/\D/g, ''); 
  if (cleanValue.length <= 10) {
    return cleanValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  return cleanValue.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

export function maskCep(value) {
  if (!value) return '';
  const cleanValue = value.replace(/\D/g, ''); 
  return cleanValue.replace(/(\d{5})(\d{0,3})/, '$1-$2');
}