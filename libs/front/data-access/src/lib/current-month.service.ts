import { Injectable } from '@angular/core';
import { getFirstDay } from '@ispent/shared/utils';
import { format, subMonths, lastDayOfMonth, addDays } from 'date-fns';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentMonthService {
  private readonly formatShort = 'MM.yyyy';
  private _date$ = new BehaviorSubject(getFirstDay(new Date()));

  get date$(): BehaviorSubject<Date> {
    return this._date$;
  }

  get dateISO$(): Observable<string> {
    return this._date$.pipe(map((date) => date.toISOString()));
  }

  get dateISO(): string {
    return this._date$.value.toISOString();
  }

  get dateShort(): string {
    return format(this._date$.value, this.formatShort);
  }

  get previousDateISO(): string {
    return subMonths(this._date$.value, 1).toISOString();
  }

  get lastDay(): string {
    return addDays(lastDayOfMonth(this._date$.value), 1).toISOString();
  }

  get dateISOWithoutLocalOffset(): string {
    return new Date(format(this._date$.value, 'yyyy-MM-dd')).toISOString();
  }

  setDate(date: Date) {
    this._date$.next(date);
  }
}
