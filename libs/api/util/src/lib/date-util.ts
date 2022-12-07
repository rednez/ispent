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
  const currentMonthFirstDay = parseISO(
    format(parseISO(dateISO), 'yyyy-MM-01')
  );
  return {
    currentMonth: currentMonthFirstDay,
    previousMonth: subMonths(currentMonthFirstDay, 1),
  };
}
