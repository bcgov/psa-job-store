import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { E2EAuthGuard } from './guards/e2e-auth.guard';
import { TestEnvironmentGuard } from './guards/test-environment.guard';

@Controller('e2e-auth')
export class E2EAuthController {
  constructor(private jwtService: JwtService) {}

  @Post('token')
  @UseGuards(TestEnvironmentGuard, E2EAuthGuard) // Add both guards
  async generateE2EToken() {
    const payload = {
      jti: 'xxxx', // Unique identifier for the token
      sub: 'xxxx', // Subject
      typ: 'Bearer', // Type of token
      azp: 'xxx', // Authorized party
      session_state: 'xxx', // Session state
      scope: 'xxx', // Scopes
      sid: 'xxxx', // Session ID
      idir_user_guid: '88bd8bb6c4494c138204d91539f548d4', // User GUID
      client_roles: ['hiring-manager'],
      identity_provider: 'xxx', // Identity provider
      idir_username: 'test', // Username
      email_verified: false, // Email verification flag
      name: 'xxxx', // Name
      preferred_username: 'xxxx', // Preferred username
      display_name: 'Test, User CITZ:EX', // Display name
      given_name: 'Test', // Given name
      family_name: 'User', // Family name
      email: 'test.user@gov.bc.ca', // Email
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
