import { TestBed } from '@angular/core/testing';
import { CreateCategoryGQL } from './graphql/generated';
import { MockProvider } from 'ng-mocks';
import { CreateCategoryService } from './create-category.service';

describe('CreateCategoryService', () => {
  let service: CreateCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(CreateCategoryGQL)],
    });
    service = TestBed.inject(CreateCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
