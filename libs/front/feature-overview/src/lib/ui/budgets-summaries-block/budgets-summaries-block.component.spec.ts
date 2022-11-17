import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsSummariesBlockComponent } from './budgets-summaries-block.component';

describe('BudgetsSummariesBlockComponent', () => {
  let component: BudgetsSummariesBlockComponent;
  let fixture: ComponentFixture<BudgetsSummariesBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetsSummariesBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetsSummariesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
