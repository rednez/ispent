import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureOverviewModule } from '../../front-feature-overview.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(() => MockBuilder(HeaderComponent, FrontFeatureOverviewModule));

  it('should create', () => {
    const fixture = MockRender(HeaderComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
