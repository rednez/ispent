import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureBudgetsModule } from '../front-feature-budgets.module';

import { BudgetCategoryPreviousDataComponent } from './budget-category-previous-data.component';

describe('BudgetCategoryPreviousDataComponent', () => {
  beforeEach(() =>
    MockBuilder(BudgetCategoryPreviousDataComponent, FrontFeatureBudgetsModule)
  );

  it('should create', () => {
    const fixture = MockRender();
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
