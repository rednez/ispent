import { MockBuilder, MockRender } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { FrontFeatureBudgetsModule } from '../front-feature-budgets.module';
import { EditBudgetPageComponent } from './edit-budget-page.component';
import { EditBudgetPageService } from './edit-budget-page.service';

describe('EditBudgetPageComponent', () => {
  beforeEach(async () =>
    MockBuilder(EditBudgetPageComponent, FrontFeatureBudgetsModule).provide({
      provide: EditBudgetPageService,
      useValue: {
        currentDate$: EMPTY,
        isDataLoading$: EMPTY,
        isDataError$: EMPTY,
        isDataSaving$: EMPTY,
        data$: EMPTY,
        currencies$: EMPTY,
        groups$: EMPTY,
        onCreateCurrency$: () => EMPTY,
        onCreateGroup$: () => EMPTY,
        onCreateCategory$: () => EMPTY,
        initData$: EMPTY,
      },
    })
  );

  it('should create', () => {
    const fixture = MockRender(EditBudgetPageComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
