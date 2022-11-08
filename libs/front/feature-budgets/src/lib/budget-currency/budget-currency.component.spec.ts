import { FormBuilder } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';
import { ChildBudgetEntitiesService } from '../child-budget-entities.service';
import { FrontFeatureBudgetsModule } from '../front-feature-budgets.module';
import { ParentBudgetEntitiesService } from '../parent-budget-entities.service';

import { BudgetCurrencyComponent } from './budget-currency.component';

describe('BudgetCurrencyComponent', () => {
  beforeEach(() =>
    MockBuilder(BudgetCurrencyComponent, FrontFeatureBudgetsModule)
      .keep(FormBuilder, { export: true })
      .mock(ParentBudgetEntitiesService)
      .mock(ChildBudgetEntitiesService)
  );

  it('should create', () => {
    const fixture = MockRender(BudgetCurrencyComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
