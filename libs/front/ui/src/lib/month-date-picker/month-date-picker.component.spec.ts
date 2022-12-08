import { MonthDatePickerComponent } from './month-date-picker.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';

describe('MonthDatePickerComponent', () => {
  beforeEach(() => MockBuilder(MonthDatePickerComponent, FrontUiModule));

  it('should create', () => {
    const fixture = MockRender(MonthDatePickerComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
