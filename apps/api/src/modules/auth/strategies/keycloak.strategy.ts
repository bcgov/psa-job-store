import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload, TokenExpiredError, verify as verifyJwt } from 'jsonwebtoken';
import Strategy from 'passport-http-bearer';
import { AuthService } from '../auth.service';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(payload: string, done: (err, user) => void) {
    // Check if JWT verification should be skipped - this is for e2e tests
    // todo: make this work with validation
    // if (process.env.TEST_ENV === 'true') {
    //   // Assuming payload is a valid JWT, decode it without verification
    //   const decoded = decodeJwt(payload) as JwtPayload;
    //   // console.log('decoded: ', decoded);

    //   const user = await this.authService.getUserFromPayload(decoded);
    //   return done(null, user);
    // }

    const publicKey = await this.authService.getKeycloakPublicKey();
    const expectedAudiences = this.authService.getExpectedKeyCloakClientIds();
    const expectedIssuer = this.authService.getExpectedKeyCloakIssuer();

    try {
      const data = verifyJwt(payload, publicKey, {
        complete: false,
        ignoreExpiration: false,
        audience: expectedAudiences,
        issuer: expectedIssuer,
        algorithms: ['RS256'],
      }) as JwtPayload;
      const user = await this.authService.getUserFromPayload(data);
      done(null, user);
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException('Your session has expired. Please log in again.');
      throw error;
    }
  }
}
