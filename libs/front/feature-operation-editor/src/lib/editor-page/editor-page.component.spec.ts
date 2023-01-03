import { ActivatedRoute } from '@angular/router';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { FrontFeatureOperationEditorModule } from '../front-feature-operation-editor.module';
import { EditorPageComponent } from './editor-page.component';
import { EditorPageService } from './editor-page.service';

describe('EditorPageComponent', () => {
  beforeEach(() =>
    MockBuilder(EditorPageComponent, FrontFeatureOperationEditorModule)
      .mock(
        ActivatedRoute,
        { snapshot: { paramMap: { get: () => null } } as any },
        { export: true }
      )
      .mock(EditorPageService, {
        fetchCurrenciesGroupsWithCategories: () => EMPTY,
        fetchOperation: () => EMPTY,
        onCreateCurrency$: () => EMPTY,
        onCreateGroup$: () => EMPTY,
        onCreateCategory$: () => EMPTY,
      })
  );

  it('should create', () => {
    const fixture = MockRender(EditorPageComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
