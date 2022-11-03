import { Pipe, PipeTransform } from '@angular/core';
import * as numeral from 'numeral';

numeral.register('locale', 'ua', {
  delimiters: {
    thousands: ' ',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'тис.',
    million: 'млн',
    billion: 'млрд',
    trillion: 'трлн',
  },
  ordinal: () => '.',
  currency: {
    symbol: '\u20B4', // Символ гривны
  },
});

@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === undefined) {
      return '–';
    } else {
      numeral.locale('ua');
      return numeral(value).format('0,0.00');
    }
  }
}
