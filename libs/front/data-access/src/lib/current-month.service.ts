import { Injectable } from '@angular/core';
import { format, subMonths } from 'date-fns';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentMonthService {
  private readonly formatISO = 'yyyy-MM-dd';
  private readonly formatShort = 'yyyy-MM-dd';
  private _date$ = new BehaviorSubject(new Date());

  get date$(): BehaviorSubject<Date> {
    return this._date$;
  }

  get dateISO$(): Observable<string> {
    return this._date$.pipe(map((date) => format(date, this.formatISO)));
  }

  get dateShort(): string {
    return format(this._date$.value, this.formatShort);
  }

  get previousDateIso(): string {
    return format(subMonths(this._date$.value, 1), this.formatISO);
  }

  setDate(date: Date) {
    this._date$.next(date);
  }
}
