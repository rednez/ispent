import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';

import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  beforeEach(() => MockBuilder(AvatarComponent, FrontUiModule));

  it('should create', () => {
    const fixture = MockRender(AvatarComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
