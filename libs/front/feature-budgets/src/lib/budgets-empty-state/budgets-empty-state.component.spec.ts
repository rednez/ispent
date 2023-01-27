import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsEmptyStateComponent } from './budgets-empty-state.component';

describe('BudgetsEmptyStateComponent', () => {
  let component: BudgetsEmptyStateComponent;
  let fixture: ComponentFixture<BudgetsEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetsEmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetsEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
