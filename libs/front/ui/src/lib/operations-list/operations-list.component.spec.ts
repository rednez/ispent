import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';

import { OperationsListComponent } from './operations-list.component';

describe('OperationsListComponent', () => {
  beforeEach(() => MockBuilder(OperationsListComponent, FrontUiModule));

  it('should create', () => {
    const fixture = MockRender(OperationsListComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
