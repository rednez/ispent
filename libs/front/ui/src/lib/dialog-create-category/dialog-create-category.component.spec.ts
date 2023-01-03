import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontUiModule } from '../front-ui.module';
import { DialogCreateCategoryComponent } from './dialog-create-category.component';

describe('DialogCreateCategoryComponent', () => {
  beforeEach(() =>
    MockBuilder(DialogCreateCategoryComponent, FrontUiModule)
      .mock(MatDialogRef, { close: () => null }, { export: true })
      .mock(
        MAT_DIALOG_DATA,
        {
          data: { parentGroupId: 1, parentGroupName: 'name' },
        },
        { export: true }
      )
  );

  it('should create', () => {
    const fixture = MockRender(DialogCreateCategoryComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
