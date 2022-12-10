import { format, lastDayOfMonth, parseISO, subMonths } from 'date-fns';

export function getMonthPeriod(date?: Date): { lte?: Date; gte?: Date } {
  return {
    lte: date ? lastDayOfMonth(date) : undefined,
    gte: date ? parseISO(format(date, 'yyyy-MM-01')) : undefined,
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
