import { CurrencyPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyPipe();
    expect(pipe).toBeTruthy();
  });

  it(`should return '1234 UAH'`, () => {
    const pipe = new CurrencyPipe();
    expect(pipe.transform('1234', 'UAH')).toBe('1234 UAH');
  });
});
