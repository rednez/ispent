import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGroupHeaderComponent } from './budget-group-header.component';

describe('BudgetGroupHeaderComponent', () => {
  let component: BudgetGroupHeaderComponent;
  let fixture: ComponentFixture<BudgetGroupHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetGroupHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetGroupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
