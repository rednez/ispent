import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtValidatorService {
  async validate(token: string): Promise<{ uid: string }> {
    return { uid: '1' };
  }
}
