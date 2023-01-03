import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureOperationEditorModule } from '../front-feature-operation-editor.module';
import { EditorFormComponent } from './editor-form.component';

describe('EditorFormComponent', () => {
  beforeEach(() =>
    MockBuilder(EditorFormComponent, FrontFeatureOperationEditorModule)
  );

  it('should create', () => {
    const fixture = MockRender(EditorFormComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
