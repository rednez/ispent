import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import {
  FirebaseJwtValidatorService,
  JwtValidatorService,
} from './jwt-validators';

@Module({
  imports: [PassportModule],
  controllers: [],
  providers: [
    FirebaseAuthStrategy,
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
    {
      provide: JwtValidatorService,
      useClass: FirebaseJwtValidatorService,
    },
  ],
  exports: [],
})
export class ApiAuthModule {}
