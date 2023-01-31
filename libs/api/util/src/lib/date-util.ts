import {
  format,
  lastDayOfMonth,
  parseISO,
  setHours,
  subMonths,
} from 'date-fns';

export function getFirstDay(date: Date): Date {
  return parseISO(format(date, 'yyyy-MM-01'));
}

export function getMonthPeriod(date?: Date): { lte?: Date; gte?: Date } {
  return {
    lte: date ? setHours(lastDayOfMonth(date), 24) : undefined,
    gte: date ? getFirstDay(date) : undefined,
  };
}

export function getCurrentAndPreviousMonths(dateISO: string): {
  currentMonth: Date;
  previousMonth: Date;
} {
  const currentMonth = parseISO(dateISO);
  return {
    currentMonth,
    previousMonth: subMonths(currentMonth, 1),
  };
}
