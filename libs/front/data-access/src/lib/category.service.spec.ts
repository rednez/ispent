import { TestBed } from '@angular/core/testing';
import { CreateCategoryGQL, UpdateCategoryGQL } from './graphql/generated';
import { MockProvider } from 'ng-mocks';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(CreateCategoryGQL),
        MockProvider(UpdateCategoryGQL),
      ],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
