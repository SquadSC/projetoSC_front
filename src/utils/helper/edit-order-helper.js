export function validateDateTimeNotPast(dateStr, timeStr) {
  // dateStr: 'YYYY-MM-DD', timeStr: 'HH:mm'
  if (!dateStr || !timeStr) return 'Data e hora são obrigatórias';
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh, mm] = timeStr.split(':').map(Number);
  if ([y, m, d, hh, mm].some((v) => Number.isNaN(v))) return 'Formato de data/hora inválido';

  // Note: JS months são 0-index
  const selected = new Date(y, m - 1, d, hh, mm, 0, 0);
  const now = new Date();

  if (selected.getTime() < now.getTime()) return 'Data e hora não podem ser no passado.';

  // exemplo de validação adicional: hora entre 08:00 e 22:00
  const openingHour = 8;
  const closingHour = 22;
  if (hh < openingHour || hh >= closingHour) {
    return `Horário deve ser entre ${String(openingHour).padStart(2, '0')}:00 e ${String(closingHour - 1).padStart(2, '0')}:59`;
  }

  return null;
}

// formata uma data qualquer (ISO ou Date) para YYYY-MM-DD para uso em input[type="date"]
export function formatDateForInput(value) {
  if (!value) return '';
  // se já estiver em formato 'YYYY-MM-DD' retorna tal qual
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}