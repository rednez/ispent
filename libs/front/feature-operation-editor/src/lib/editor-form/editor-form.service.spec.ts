import { TestBed } from '@angular/core/testing';

import { EditorFormService } from './editor-form.service';

describe('EditorFormService', () => {
  let service: EditorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
