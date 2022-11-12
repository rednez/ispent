import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureOverviewModule } from '../front-feature-overview.module';

import { OperationsPageComponent } from './operations-page.component';

describe('OperationsPageComponent', () => {
  beforeEach(() =>
    MockBuilder(OperationsPageComponent, FrontFeatureOverviewModule)
  );

  it('should create', () => {
    const fixture = MockRender(OperationsPageComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
