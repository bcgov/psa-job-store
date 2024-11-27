import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
type DurationUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

export function formatDuration(seconds: number): string {
  const d = dayjs.duration(seconds, 'seconds');
  const units: DurationUnit[] = ['year', 'month', 'day', 'hour', 'minute', 'second'];
  const result: string[] = [];

  for (const unit of units) {
    const value = d.get(unit);
    if (value > 0) {
      result.push(`${value} ${unit}${value !== 1 ? 's' : ''}`);
      if (unit === 'day') {
        // If we've just added days, continue to the next iteration to potentially add hours
        continue;
      }
      // console.log('result: ', result);
      if (result.length === 2 || (result.length === 1 && (unit === 'hour' || unit === 'minute'))) {
        // console.log('break');
        break;
      }
    }
  }

  return result.length > 0 ? result.slice(0, 2).join(' ') : '0 seconds';
}

export const formatDateTime = (dateString: string | undefined, notime = false) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  if (notime) return `${year}-${month}-${day}`;
  else return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
