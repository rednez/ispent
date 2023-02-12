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

  it('computeTotalAmount should return total amount for a currency', () => {
    const fixture = MockRender(BudgetCurrencyComponent);
    const params = {
      groups: [
        {
          id: 1,
          categories: [
            {
              id: 1,
              amount: 2,
            },
            {
              id: 2,
              amount: 10,
            },
          ],
        },
        {
          id: 2,
          categories: [
            {
              id: 3,
              amount: 10,
            },
            {
              id: 4,
              amount: 15,
            },
          ],
        },
      ],
    };
    expect((<any>fixture.componentInstance).computeTotalAmount(params)).toBe(
      37
    );
  });
});
