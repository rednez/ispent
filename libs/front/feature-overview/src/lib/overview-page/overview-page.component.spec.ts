import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureOverviewModule } from '../front-feature-overview.module';
import { OverviewPageComponent } from './overview-page.component';

describe('OverviewPageComponent', () => {
  beforeEach(() =>
    MockBuilder(OverviewPageComponent, FrontFeatureOverviewModule)
  );

  it('should create', () => {
    const fixture = MockRender(OverviewPageComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
