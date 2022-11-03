import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCurrencyHeaderComponent } from './budget-currency-header.component';

describe('BudgetCurrencyHeaderComponent', () => {
  let component: BudgetCurrencyHeaderComponent;
  let fixture: ComponentFixture<BudgetCurrencyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetCurrencyHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetCurrencyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
