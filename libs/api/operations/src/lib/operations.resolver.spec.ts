import { Test, TestingModule } from '@nestjs/testing';
import { OperationsResolver } from './operations.resolver';

describe('OperationsResolver', () => {
  let resolver: OperationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationsResolver],
    }).compile();

    resolver = module.get<OperationsResolver>(OperationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
