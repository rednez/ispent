import { EditBudgetPageComponent } from './edit-budget-page.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureBudgetsModule } from '../front-feature-budgets.module';
import { EMPTY } from 'rxjs';
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
        onCreateCurrency$: () => EMPTY,
        onCreateGroup$: () => EMPTY,
        onCreateCategory$: () => EMPTY,
      },
    })
  );

  it('should create', () => {
    const fixture = MockRender(EditBudgetPageComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
