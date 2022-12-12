import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';

import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  beforeEach(() => MockBuilder(LanguageSwitcherComponent, FrontUiModule));

  it('should create', () => {
    const fixture = MockRender(LanguageSwitcherComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
