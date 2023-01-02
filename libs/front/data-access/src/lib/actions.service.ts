import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  createCurrency$ = new Subject();
  createGroup$ = new Subject();
  createCategory$ = new Subject<{ parentGroupId: number }>();
}
