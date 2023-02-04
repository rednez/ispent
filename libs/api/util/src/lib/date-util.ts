import { addMonths, format, parseISO, subMonths } from 'date-fns';

export function getFirstDay(date: Date): Date {
  return parseISO(format(date, 'yyyy-MM-01'));
}

function getLastDay(date: Date): Date {
  return addMonths(getFirstDay(date), 1);
}

export function getMonthPeriod(date?: Date): { lt?: Date; gte?: Date } {
  return {
    lt: date ? getLastDay(date) : undefined,
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
