import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';
import { AppBarComponent } from './app-bar.component';

describe('AppBarComponent', () => {
  beforeEach(() => MockBuilder(AppBarComponent, FrontUiModule));

  it('should create', () => {
    const fixture = MockRender(AppBarComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
