// esse utils é pros inputs de: "insira a quantidade de convidados" por exemplo
export function isPositiveNumber(value) {
  if (value === null || value === undefined || value === '') {
    return false;
  }
  const numericValue = Number(value);

  return !isNaN(numericValue) && numericValue > 0; // retorna um boolean se não é um NaN ou < 0
}
