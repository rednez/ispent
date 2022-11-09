import { Test, TestingModule } from '@nestjs/testing';
import { OperationsResolver } from './operations.resolver';
import { OperationsService } from './operations.service';

describe('OperationsResolver', () => {
  let resolver: OperationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationsResolver,
        { provide: OperationsService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<OperationsResolver>(OperationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
