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
});
