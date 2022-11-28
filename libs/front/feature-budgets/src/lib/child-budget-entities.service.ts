import { Injectable, Optional, SkipSelf } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BudgetEntity } from './data';
import {
  BudgetEntitiesSelectedIdsChanges,
  ParentBudgetEntitiesService,
} from './parent-budget-entities.service';

@Injectable()
export class ChildBudgetEntitiesService {
  private currentId?: number | null;

  constructor(
    @SkipSelf()
    @Optional()
    private parentBudgetEntities: ParentBudgetEntitiesService
  ) {}

  get availableEntities(): Observable<BudgetEntity[]> {
    return this.parentBudgetEntities.selectedIdsChanges.pipe(
      map(this.defineAvailableEntities)
    );
  }

  addSelectedEntityId = (nextId: number | null) => {
    const prevId = this.currentId;
    this.currentId = nextId;
    this.parentBudgetEntities.addSelectedId(nextId, prevId);
  };

  private defineAvailableEntities = (
    payload: BudgetEntitiesSelectedIdsChanges
  ): BudgetEntity[] => {
    const { allEntities, ids } = payload;
    return allEntities?.filter(
      (i) => !ids.has(i.id) || i.id === this.currentId
    );
  };
}
