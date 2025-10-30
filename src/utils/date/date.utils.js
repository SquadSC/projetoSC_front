import dayjs from 'dayjs';

export function formatDate(date, format = 'DD/MM/YYYY') {
  return dayjs(date).format(format);
}

export function formatTime(time, format = 'HH:mm') {
  return dayjs(time, 'HH:mm').format(format);
}

export function isPastDate(date) {
  return dayjs(date).isBefore(dayjs(), 'day');
}