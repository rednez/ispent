import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { JwtValidatorService } from './jwt-validator.service';

@Injectable()
export class FirebaseJwtValidatorService implements JwtValidatorService {
  async validate(token: string): Promise<{ uid: string }> {
    const user = firebaseAdmin
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new UnauthorizedException(err.message);
      });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
