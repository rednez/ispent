import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';
import { OperationItemComponent } from './operation-item.component';

describe('OperationItemComponent', () => {
  beforeEach(() => MockBuilder(OperationItemComponent, FrontUiModule));

  it('should create', () => {
    const fixture = MockRender(OperationItemComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
