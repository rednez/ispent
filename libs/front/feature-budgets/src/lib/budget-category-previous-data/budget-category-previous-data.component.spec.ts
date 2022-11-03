import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCategoryPreviousDataComponent } from './budget-category-previous-data.component';

describe('BudgetCategoryPreviousDataComponent', () => {
  let component: BudgetCategoryPreviousDataComponent;
  let fixture: ComponentFixture<BudgetCategoryPreviousDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetCategoryPreviousDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetCategoryPreviousDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
