import { ActivatedRoute } from '@angular/router';
import { MockBuilder, MockRender } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { FrontFeatureOverviewModule } from '../front-feature-overview.module';

import { OperationsPageComponent } from './operations-page.component';

describe('OperationsPageComponent', () => {
  beforeEach(() =>
    MockBuilder(OperationsPageComponent, FrontFeatureOverviewModule).mock(
      ActivatedRoute,
      { params: EMPTY, data: EMPTY, snapshot: { data: {}, params: {} } as any },
      { export: true }
    )
  );

  it('should create', () => {
    const fixture = MockRender(OperationsPageComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
