import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentMonthService {
  private _date$ = new BehaviorSubject(new Date());

  get date$(): Observable<string> {
    return this._date$.pipe(map((date) => format(date, 'yyyy-MM-dd')));
  }

  get dateString(): string {
    return format(this._date$.value, 'MM.yyyy');
  }

  setDate(date: Date) {
    this._date$.next(date);
  }
}
