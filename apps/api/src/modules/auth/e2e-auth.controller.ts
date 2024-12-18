import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { PublicRoute } from './decorators/public-route.decorator';
import { E2EAuthGuard } from './guards/e2e-auth.guard';
import { TestEnvironmentGuard } from './guards/test-environment.guard';

@Controller('e2e-auth')
export class E2EAuthController {
  constructor(private readonly configService: ConfigService<AppConfigDto, true>) {}

  /**
   * Generates a session cookie for E2E testing purposes.
   *
   * This endpoint creates a signed session cookie that mimics the format used by
   * Express.js session middleware. It's specifically designed for end-to-end testing
   * to simulate authenticated sessions without going through the normal authentication flow.
   *
   * The function:
   * 1. Takes a sessionId as a query parameter
   * 2. Signs it using HMAC-SHA256 with the SESSION_SECRET
   * 3. Returns both raw and formatted versions of the cookie
   *
   * Security measures:
   * - Protected by TestEnvironmentGuard to ensure it's only available when E2E_TESTING is set
   * - Protected by E2EAuthGuard to verify E2E test authentication using x-e2e-key secret header
   * - Requires a valid SESSION_SECRET from configuration
   *
   * @param sessionId - The session identifier to be signed
   * @returns {Object} An object containing:
   *   - status: 'ok' or 'error'
   *   - sessionId: The provided session ID
   *   - cookie: {
   *       raw: The signed cookie value (s%3A[sessionId].[signature])
   *       formatted: Complete cookie string (connect.sid=[raw])
   *     }
   *
   * Example Response:
   * {
   *   status: "ok",
   *   sessionId: "abc123",
   *   cookie: {
   *     raw: "s%3Aabc123.signature",
   *     formatted: "connect.sid=s%3Aabc123.signature"
   *   }
   * }
   */
  @PublicRoute()
  @Get('generateSessionCookie')
  @UseGuards(TestEnvironmentGuard, E2EAuthGuard)
  generateSessionCookie(@Query('sessionId') sessionId: string) {
    const secret = this.configService.get('SESSION_SECRET');
    if (!sessionId || !secret) {
      return {
        status: 'error',
        message: 'Both sessionId and secret are required',
      };
    }

    // Generate HMAC-SHA256 signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(sessionId);
    const signature = hmac.digest('base64url');

    // Generate cookie string
    const cookieValue = `s%3A${sessionId}.${signature}`;

    return {
      status: 'ok',
      sessionId,
      cookie: {
        raw: cookieValue,
        formatted: `connect.sid=${cookieValue}`,
      },
    };
  }
}
