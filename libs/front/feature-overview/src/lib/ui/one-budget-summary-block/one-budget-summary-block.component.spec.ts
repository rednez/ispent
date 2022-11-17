import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneBudgetSummaryBlockComponent } from './one-budget-summary-block.component';

describe('OneBudgetSummaryBlockComponent', () => {
  let component: OneBudgetSummaryBlockComponent;
  let fixture: ComponentFixture<OneBudgetSummaryBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneBudgetSummaryBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OneBudgetSummaryBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
