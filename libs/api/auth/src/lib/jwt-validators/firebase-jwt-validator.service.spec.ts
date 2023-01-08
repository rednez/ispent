import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseJwtValidatorService } from './firebase-jwt-validator.service';

describe('FirebaseJwtValidatorService', () => {
  let service: FirebaseJwtValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseJwtValidatorService],
    }).compile();

    service = module.get<FirebaseJwtValidatorService>(
      FirebaseJwtValidatorService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
