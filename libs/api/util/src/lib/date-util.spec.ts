import { getCurrentAndPreviousMonths, getMonthPeriod } from './date-util';
import { isSameDay } from 'date-fns';

describe('date-util', () => {
  describe('getMonthPeriod', () => {
    const result = {
      lt: new Date('2022-12-31'),
      gte: new Date('2022-12-01'),
    };

    it('should return undefined fields', () => {
      expect(getMonthPeriod()).toEqual({ lt: undefined, gte: undefined });
    });

    it('should return start and end Dates', () => {
      const { lt, gte } = getMonthPeriod(new Date('2022-12-01'));
      expect(isSameDay(lt, new Date('2022-12-31T24:00'))).toBeTruthy();
      expect(isSameDay(gte, result.gte)).toBeTruthy();
    });

    it('should always return first day in dates', () => {
      const { gte } = getMonthPeriod(new Date('2022-12-07'));
      expect(isSameDay(gte, result.gte)).toBeTruthy();
    });
  });

  describe('getCurrentAndPreviousMonths', () => {
    const results = {
      currentMonth: new Date('2022-12-01'),
      previousMonth: new Date('2022-11-01'),
    };

    it('should return dates', () => {
      const { currentMonth, previousMonth } =
        getCurrentAndPreviousMonths('2022-12-01');
      expect(isSameDay(currentMonth, results.currentMonth)).toBeTruthy();
      expect(isSameDay(previousMonth, results.previousMonth)).toBeTruthy();
    });
  });
});
