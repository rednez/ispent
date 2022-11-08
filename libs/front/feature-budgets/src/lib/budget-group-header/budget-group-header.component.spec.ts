import { FrontFeatureBudgetsModule } from '../front-feature-budgets.module';
import { MockBuilder, MockRender } from 'ng-mocks';

import { BudgetGroupHeaderComponent } from './budget-group-header.component';

describe('BudgetGroupHeaderComponent', () => {
  beforeEach(() =>
    MockBuilder(BudgetGroupHeaderComponent, FrontFeatureBudgetsModule)
  );

  it('should create', () => {
    const fixture = MockRender(BudgetGroupHeaderComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
