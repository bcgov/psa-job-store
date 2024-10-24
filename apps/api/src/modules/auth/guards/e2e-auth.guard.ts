// guards/e2e-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class E2EAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['x-e2e-key'];

    // Get the secret from environment variables
    const expectedSecret = this.configService.get<string>('E2E_AUTH_KEY');

    if (!authHeader || authHeader !== expectedSecret) {
      throw new UnauthorizedException('Invalid E2E authentication');
    }

    return true;
  }
}
