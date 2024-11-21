// guards/e2e-auth.guard.ts

// Required NestJS imports for guard implementation and dependency injection
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Authentication guard for E2E testing endpoints that generates JWT tokens
 * Works with E2EAuthModule to protect the token generation endpoint
 * Validates requests by checking for a specific E2E_AUTH_KEY in headers
 * Only allows access when both this guard and TestEnvironmentGuard pass
 */
@Injectable()
export class E2EAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  /**
   * Validates the incoming request for E2E testing authentication
   *
   * @param context - Execution context containing the request details
   * @returns boolean - true if authentication is successful
   * @throws UnauthorizedException if authentication fails
   */
  canActivate(context: ExecutionContext): boolean {
    // Extract the HTTP request from the execution context
    const request = context.switchToHttp().getRequest();

    // Get the E2E authentication key from request headers
    // Expected to be passed as 'x-e2e-key' header
    const authHeader = request.headers['x-e2e-key'];

    // Retrieve the expected secret key from environment variables
    // This should be set in the .env file or environment configuration
    const expectedSecret = this.configService.get<string>('E2E_AUTH_KEY');

    if (expectedSecret == '') throw new UnauthorizedException('E2E_AUTH_KEY not set in environment variables');

    // Validate the authentication header
    // Both the header must exist and match the expected secret
    if (!authHeader || authHeader !== expectedSecret) {
      throw new UnauthorizedException('Invalid E2E authentication');
    }

    // Authentication successful
    return true;
  }
}
