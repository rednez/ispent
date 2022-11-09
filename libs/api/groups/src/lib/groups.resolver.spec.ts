import { Test, TestingModule } from '@nestjs/testing';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';

describe('GroupsResolver', () => {
  let resolver: GroupsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsResolver, { provide: GroupsService, useValue: {} }],
    }).compile();

    resolver = module.get<GroupsResolver>(GroupsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
