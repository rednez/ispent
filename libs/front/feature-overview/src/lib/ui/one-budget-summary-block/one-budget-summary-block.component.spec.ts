import { OneBudgetSummaryBlockComponent } from './one-budget-summary-block.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureOverviewModule } from '../../front-feature-overview.module';

describe('OneBudgetSummaryBlockComponent', () => {
  beforeEach(() =>
    MockBuilder(OneBudgetSummaryBlockComponent, FrontFeatureOverviewModule)
  );

  it('should create', () => {
    const fixture = MockRender(OneBudgetSummaryBlockComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
