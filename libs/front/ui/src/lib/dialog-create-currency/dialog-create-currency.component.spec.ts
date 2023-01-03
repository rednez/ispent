import { MatDialogRef } from '@angular/material/dialog';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';
import { DialogCreateCurrencyComponent } from './dialog-create-currency.component';

describe('DialogCreateCurrencyComponent', () => {
  beforeEach(() =>
    MockBuilder(DialogCreateCurrencyComponent, FrontUiModule).mock(
      MatDialogRef,
      { close: () => null },
      {
        export: true,
      }
    )
  );

  it('should create', () => {
    const fixture = MockRender(DialogCreateCurrencyComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
