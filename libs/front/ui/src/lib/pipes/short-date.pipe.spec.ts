import { ShortDatePipe } from './short-date.pipe';
import { subDays } from 'date-fns';

describe('ShortDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ShortDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return Today', () => {
    const pipe = new ShortDatePipe();
    const today = new Date();
    expect(pipe.transform(today.toISOString())).toBe('Today');
  });

  it('should return Yesterday', () => {
    const pipe = new ShortDatePipe();
    const yesterday = subDays(new Date(), 1);
    expect(pipe.transform(yesterday.toISOString())).toBe('Yesterday');
  });

  it('should return dd.MM.yyyy', () => {
    const pipe = new ShortDatePipe();
    expect(pipe.transform('2023-01-20T18:36:12.832Z')).toBe('20.01.2023');
  });
});
