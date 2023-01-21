import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';
import { RequestResultNotificationComponent } from './request-result-notification.component';

describe('RequestResultNotificationComponent', () => {
  beforeEach(() =>
    MockBuilder(RequestResultNotificationComponent, FrontUiModule)
  );

  it('should create', () => {
    const fixture = MockRender(RequestResultNotificationComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
