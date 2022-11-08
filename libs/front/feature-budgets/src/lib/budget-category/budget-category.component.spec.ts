import { FormBuilder } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';
import { ChildBudgetEntitiesService } from '../child-budget-entities.service';
import { FrontFeatureBudgetsModule } from '../front-feature-budgets.module';
import { BudgetCategoryComponent } from './budget-category.component';

describe('BudgetCategoryComponent', () => {
  beforeEach(() =>
    MockBuilder(BudgetCategoryComponent, FrontFeatureBudgetsModule)
      .keep(FormBuilder, { export: true })
      .mock(ChildBudgetEntitiesService)
  );

  it('should create', () => {
    const fixture = MockRender(BudgetCategoryComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
