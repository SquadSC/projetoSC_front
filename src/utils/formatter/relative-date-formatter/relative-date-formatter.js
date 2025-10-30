import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

/**
 * Formata uma data para um formato relativo (ex: "há 2 dias").
 * @param {Date | string} date A data a ser formatada.
 * @returns {string} A data em formato relativo.
 */
export function formatRelativeDate(date) {
  try {
    return dayjs(date).fromNow();
  } catch (error) {
    return '';
  }
}