import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureOverviewModule } from '../front-feature-overview.module';
import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  beforeEach(() => MockBuilder(OverviewComponent, FrontFeatureOverviewModule));

  it('should create', () => {
    const fixture = MockRender(OverviewComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
