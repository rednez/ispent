import { Pipe, PipeTransform } from '@angular/core';
import { parseISO, isToday, isYesterday, format } from 'date-fns';

@Pipe({
  name: 'shortDate',
})
export class ShortDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = parseISO(value);
    return isToday(date)
      ? 'Today'
      : isYesterday(date)
      ? 'Yesterday'
      : format(date, 'dd.MM.yyyy');
  }
}
