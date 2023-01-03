import { MatDialogRef } from '@angular/material/dialog';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';
import { DialogCreateGroupComponent } from './dialog-create-group.component';

describe('DialogCreateGroupComponent', () => {
  beforeEach(() =>
    MockBuilder(DialogCreateGroupComponent, FrontUiModule).mock(
      MatDialogRef,
      { close: () => null },
      {
        export: true,
      }
    )
  );

  it('should create', () => {
    const fixture = MockRender(DialogCreateGroupComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
