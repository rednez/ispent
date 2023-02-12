import { FormBuilder } from '@angular/forms';
import { FrontFeatureBudgetsModule } from '../front-feature-budgets.module';
import { MockBuilder, MockRender } from 'ng-mocks';
import { ChildBudgetEntitiesService } from '../child-budget-entities.service';
import { ParentBudgetEntitiesService } from '../parent-budget-entities.service';
import { BudgetGroupComponent } from './budget-group.component';

describe('BudgetGroupComponent', () => {
  beforeEach(() =>
    MockBuilder(BudgetGroupComponent, FrontFeatureBudgetsModule)
      .keep(FormBuilder, { export: true })
      .mock(ParentBudgetEntitiesService)
      .mock(ChildBudgetEntitiesService)
  );

  it('should create', () => {
    const fixture = MockRender(BudgetGroupComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });

  it('computeTotalAmount should return total amount for a group', () => {
    const fixture = MockRender(BudgetGroupComponent);
    const params = {
      categories: [
        { id: 1, amount: 10 },
        { id: 2, amount: 2 },
      ],
    };
    expect((<any>fixture.componentInstance).computeTotalAmount(params)).toBe(
      12
    );
  });
});
