import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';
import { BudgetChipComponent } from './budget-chip.component';

describe('BudgetChipComponent', () => {
  beforeEach(() => MockBuilder(BudgetChipComponent, FrontUiModule));

  it('should create', () => {
    const fixture = MockRender(BudgetChipComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
