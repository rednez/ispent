import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureOperationEditorModule } from '../front-feature-operation-editor.module';
import { RateComponent } from './rate.component';

describe('RateComponent', () => {
  beforeEach(() =>
    MockBuilder(RateComponent, FrontFeatureOperationEditorModule)
  );

  it('should create', () => {
    const fixture = MockRender(RateComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
