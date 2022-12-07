import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { FormBudgetEntity } from './data';

export interface BudgetEntitiesSelectedIdsChanges {
  allEntities: FormBudgetEntity[];
  ids: Set<number>;
}

@Injectable()
export class ParentBudgetEntitiesService {
  private allEntities: FormBudgetEntity[] = [];
  private selectedIds = new Set<number>();
  private allEntities$ = new BehaviorSubject(this.allEntities);
  private selectedIds$ = new BehaviorSubject(this.selectedIds);

  get selectedIdsChanges(): Observable<BudgetEntitiesSelectedIdsChanges> {
    return combineLatest([this.allEntities$, this.selectedIds$]).pipe(
      map(([allEntities, ids]) => ({ allEntities, ids }))
    );
  }

  setAllEntities(list: FormBudgetEntity[]): void {
    this.allEntities = list;
    this.allEntities$.next(list);
  }

  addSelectedId(nextId: number | null, prevId?: number | null): void {
    if (prevId) {
      this.selectedIds.delete(prevId);
    }
    if (nextId) {
      this.selectedIds.add(nextId);
    }

    Promise.resolve().then(() => {
      this.selectedIds$.next(this.selectedIds);
    });
  }

  removeSelectedId(id: number) {
    this.selectedIds.delete(id);
    this.selectedIds$.next(this.selectedIds);
  }

  reset() {
    this.selectedIds = new Set<number>();
    this.selectedIds$.next(this.selectedIds);
  }
}
