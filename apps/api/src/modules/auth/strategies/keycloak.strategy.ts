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
    // console.log(new Date().toISOString().slice(11, -1) + ' ' + 'KeycloakStrategy.validate');
    // Check if JWT verification should be skipped - this is for e2e tests
    // todo: make this work with validation
    // if (process.env.TEST_ENV === 'true' && process.env.NODE_ENV === 'development') {
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
      let data;
      if (process.env.E2E_TESTING === 'true') {
        // during e2e testing, we use a different secret to sign the token
        // as well as a different audience, issuer and algorithm

        // console.log('validating payload: ', payload);
        try {
          data = verifyJwt(payload, process.env.E2E_JWT_SECRET, {
            complete: false,
            ignoreExpiration: false,
            algorithms: ['HS256'],
            audience: 'e2e-testing',
            issuer: 'e2e-testing',
          }) as JwtPayload;
        } catch (error) {
          // support both e2e token and a regular keycloak token
          // so user can still login with keycloak token

          // this falls back to trying to verify regular keycloak token
          data = verifyJwt(payload, publicKey, {
            complete: false,
            ignoreExpiration: false,
            audience: expectedAudiences,
            issuer: expectedIssuer,
            algorithms: ['RS256'],
          }) as JwtPayload;
        }
      } else {
        // not e2e testing, so we use the regular keycloak token
        data = verifyJwt(payload, publicKey, {
          complete: false,
          ignoreExpiration: false,
          audience: expectedAudiences,
          issuer: expectedIssuer,
          algorithms: ['RS256'],
        }) as JwtPayload;
      }
      const user = await this.authService.getUserFromPayload(data);
      done(null, user);
      // console.log(new Date().toISOString().slice(11, -1) + ' ' + 'KeycloakStrategy.validate done');
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException('Your session has expired. Please log in again.');
      throw error;
    }
  }
}
