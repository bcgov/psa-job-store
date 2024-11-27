import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class TestEnvironmentGuard implements CanActivate {
  canActivate() {
    return process.env.E2E_TESTING === 'true';
  }
}
