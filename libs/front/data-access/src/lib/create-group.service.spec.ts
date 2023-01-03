import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { CreateGroupService } from './create-group.service';
import { CreateGroupGQL } from './graphql/generated';

describe('CreateGroupService', () => {
  let service: CreateGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(CreateGroupGQL)],
    });
    service = TestBed.inject(CreateGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
