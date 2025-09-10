export function formatCurrencyBRL(value) {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) { // se o valor não for numérico
    return 'R$ 0,00';
  }

  const formatter = new Intl.NumberFormat('pt-BR', { // formatador BRL
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2, // sempre duas casas decimais
  });

  return formatter.format(numericValue);
}