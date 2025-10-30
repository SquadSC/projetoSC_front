export function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function parseCurrencyToNumber(value) {
  return Number(
    value.replace(/[^\d,-]/g, "").replace(",", ".")
  );
}
export function formatNumber(value) {
  String(value).replace(".", ",")

  return value
  ;
}

export function calculatePricePerKg(weightKg, price) {
  if (weightKg <= 0) return 0;
  return price / weightKg;
}
