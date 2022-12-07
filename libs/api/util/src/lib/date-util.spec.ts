import { getCurrentAndPreviousMonths, getMonthPeriod } from './date-util';
import { isSameDay } from 'date-fns';

describe('date-util', () => {
  describe('getMonthPeriod', () => {
    const result = {
      lte: new Date('2022-12-31'),
      gte: new Date('2022-12-01'),
    };

    it('should return undefined fields', () => {
      expect(getMonthPeriod()).toEqual({ lte: undefined, gte: undefined });
    });

    it('should return start and end Dates', () => {
      const { lte, gte } = getMonthPeriod(new Date('2022-12-01'));
      expect(isSameDay(lte, result.lte)).toBeTruthy();
      expect(isSameDay(gte, result.gte)).toBeTruthy();
    });

    it('should always return first day in dates', () => {
      const { lte, gte } = getMonthPeriod(new Date('2022-12-07'));
      expect(isSameDay(lte, result.lte)).toBeTruthy();
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

    it('should always return first day in dates', () => {
      const { currentMonth, previousMonth } =
        getCurrentAndPreviousMonths('2022-12-08');
      expect(isSameDay(currentMonth, results.currentMonth)).toBeTruthy();
      expect(isSameDay(previousMonth, results.previousMonth)).toBeTruthy();
    });
  });
});
