import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Configura o dayjs para usar português brasileiro
dayjs.locale('pt-br');

export function formatDate(date, format = 'DD/MM/YYYY') {
  return dayjs(date).format(format);
}

export function formatTime(time, format = 'HH:mm') {
  return dayjs(time, 'HH:mm').format(format);
}

export function isPastDate(date) {
  return dayjs(date).isBefore(dayjs(), 'day');
}

export function formatDateLong(date) {
  return dayjs(date).format('D [de] MMMM, YYYY');
}

// ✅ Nova função: '2025-11-16' → '16 de novembro, 2025'
export function formatDateBrazilian(dateString) {
  if (!dateString) return '';
  return dayjs(dateString).format('D [de] MMMM, YYYY');
}

// ✅ Nova função: '2025-11-16' → '16/11/2025'
export function formatDateShort(dateString) {
  if (!dateString) return '';
  return dayjs(dateString).format('DD/MM/YYYY');
}

// ✅ Nova função: '23:54:00' → '23:54'
export function formatTimeShort(timeString) {
  if (!timeString) return '';

  // Se vier com segundos, remove eles
  if (timeString.includes(':') && timeString.split(':').length === 3) {
    return timeString.substring(0, 5); // Pega apenas HH:MM
  }

  // Se não tem segundos, retorna como está
  return timeString;
}

// ✅ Versão alternativa usando dayjs: '23:54:00' → '23:54'
export function formatTimeWithDayjs(timeString) {
  if (!timeString) return '';

  try {
    // Parse do tempo e formatação
    return dayjs(timeString, 'HH:mm:ss').format('HH:mm');
  } catch {
    // Fallback para método simples
    return formatTimeShort(timeString);
  }
}

// ✅ Nova função: '2025-01-12' → 'Janeiro'
export function getMonthName(dateString) {
  if (!dateString) return '';

  try {
    return dayjs(dateString).format('MMMM');
  } catch {
    return '';
  }
}
