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
