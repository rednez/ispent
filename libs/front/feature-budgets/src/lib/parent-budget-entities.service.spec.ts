import { TestBed } from '@angular/core/testing';
import { ParentBudgetEntitiesService } from './parent-budget-entities.service';

const allEntitiesMocks = [
  { id: 1, name: 'c1' },
  { id: 2, name: 'c2' },
  { id: 3, name: 'c3' },
  { id: 4, name: 'c4' },
];

describe('ParentBudgetEntitiesService', () => {
  let service: ParentBudgetEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentBudgetEntitiesService],
    });
    service = TestBed.inject(ParentBudgetEntitiesService);
    service.setAllEntities(allEntitiesMocks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setAllEntities should set a value to allEntities', () => {
    const list = [
      { id: 3, name: 'c3' },
      { id: 4, name: 'c4' },
    ];
    service.setAllEntities(list);
    expect((service as any).allEntities).toEqual(list);
  });

  it('addSelectedId should set value to selectedIds', () => {
    const serviceAny = service as any;
    expect(serviceAny.selectedIds.size).toBe(0);

    service.addSelectedId(1);
    expect(serviceAny.selectedIds.size).toBe(1);
    expect(serviceAny.selectedIds.has(1)).toBe(true);

    service.addSelectedId(2);
    expect(serviceAny.selectedIds.size).toBe(2);
    expect(serviceAny.selectedIds.has(2)).toBe(true);

    service.addSelectedId(3, 2);
    expect(serviceAny.selectedIds.size).toBe(2);
    expect(serviceAny.selectedIds.has(3)).toBe(true);
  });

  it('removeSelectedId should remove value from selectedIds', () => {
    service.addSelectedId(2);
    service.addSelectedId(3);
    service.addSelectedId(8);
    expect((service as any).selectedIds.has(3)).toBe(true);
    service.removeSelectedId(3);
    expect((service as any).selectedIds.has(3)).toBe(false);
  });
});
