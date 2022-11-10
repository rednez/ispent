import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';
import { BudgetSummaryWidgetComponent } from './budget-summary-widget.component';

describe('BudgetSummaryWidgetComponent', () => {
  beforeEach(() => MockBuilder(BudgetSummaryWidgetComponent, FrontUiModule));

  it('should create', () => {
    const fixture = MockRender(BudgetSummaryWidgetComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
