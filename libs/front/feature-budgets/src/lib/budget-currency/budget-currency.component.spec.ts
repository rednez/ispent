import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCurrencyComponent } from './budget-currency.component';

describe('BudgetCurrencyComponent', () => {
  let component: BudgetCurrencyComponent;
  let fixture: ComponentFixture<BudgetCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetCurrencyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
