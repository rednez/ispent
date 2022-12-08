import { BudgetsSummariesBlockComponent } from './budgets-summaries-block.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureOverviewModule } from '../../front-feature-overview.module';

describe('BudgetsSummariesBlockComponent', () => {
  beforeEach(() =>
    MockBuilder(BudgetsSummariesBlockComponent, FrontFeatureOverviewModule)
  );

  it('should create', () => {
    const fixture = MockRender(BudgetsSummariesBlockComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
