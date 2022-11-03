import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { ChildBudgetEntitiesService } from './child-budget-entities.service';
import { ParentBudgetEntitiesService } from './parent-budget-entities.service';

describe('ChildBudgetEntitiesService', () => {
  let service: ChildBudgetEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChildBudgetEntitiesService,
        MockProvider(ParentBudgetEntitiesService),
      ],
    });
    service = TestBed.inject(ChildBudgetEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('defineAvailableEntities should return filtered array', () => {
    const allEntities = [
      { id: 1, name: 'c1' },
      { id: 2, name: 'c2' },
      { id: 3, name: 'c3' },
      { id: 4, name: 'c4' },
    ];

    (<any>service).currentId = null;
    expect(
      (<any>service).defineAvailableEntities({
        allEntities,
        ids: new Set([1, 3]),
      })
    ).toEqual([
      { id: 2, name: 'c2' },
      { id: 4, name: 'c4' },
    ]);

    (<any>service).currentId = 3;
    expect(
      (<any>service).defineAvailableEntities({
        allEntities,
        ids: new Set([1, 3]),
      })
    ).toEqual([
      { id: 2, name: 'c2' },
      { id: 3, name: 'c3' },
      { id: 4, name: 'c4' },
    ]);
  });
});
