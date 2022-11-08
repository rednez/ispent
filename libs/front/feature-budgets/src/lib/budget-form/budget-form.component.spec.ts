import { FormBuilder } from '@angular/forms';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureBudgetsModule } from '../front-feature-budgets.module';
import { ParentBudgetEntitiesService } from '../parent-budget-entities.service';

import { BudgetFormComponent } from './budget-form.component';

describe('BudgetFormComponent', () => {
  beforeEach(() =>
    MockBuilder(BudgetFormComponent, FrontFeatureBudgetsModule)
      .keep(FormBuilder, { export: true })
      .mock(ParentBudgetEntitiesService)
  );

  it('should create', () => {
    const fixture = MockRender(BudgetFormComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
