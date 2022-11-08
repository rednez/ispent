import { FrontFeatureBudgetsModule } from '../front-feature-budgets.module';
import { MockBuilder, MockRender } from 'ng-mocks';

import { BudgetCurrencyHeaderComponent } from './budget-currency-header.component';

describe('BudgetCurrencyHeaderComponent', () => {
  beforeEach(() =>
    MockBuilder(BudgetCurrencyHeaderComponent, FrontFeatureBudgetsModule)
  );

  it('should create', () => {
    const fixture = MockRender(BudgetCurrencyHeaderComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
