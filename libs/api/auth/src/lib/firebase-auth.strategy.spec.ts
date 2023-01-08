import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';

describe('FirebaseAuthStrategy', () => {
  let service: FirebaseAuthStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseAuthStrategy],
    }).compile();

    service = module.get<FirebaseAuthStrategy>(FirebaseAuthStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
