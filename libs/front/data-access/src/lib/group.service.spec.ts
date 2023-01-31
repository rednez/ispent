import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { GroupService } from './group.service';
import { CreateGroupGQL, UpdateGroupGQL } from './graphql/generated';

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(CreateGroupGQL), MockProvider(UpdateGroupGQL)],
    });
    service = TestBed.inject(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
