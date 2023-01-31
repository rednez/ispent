import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureBudgetsModule } from '../front-feature-budgets.module';

import { BudgetsEmptyStateComponent } from './budgets-empty-state.component';

describe('BudgetsEmptyStateComponent', () => {
  beforeEach(() =>
    MockBuilder(BudgetsEmptyStateComponent, FrontFeatureBudgetsModule)
  );

  it('should create', () => {
    const fixture = MockRender(BudgetsEmptyStateComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
