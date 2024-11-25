import { PassportStrategy } from '@nestjs/passport';
import { Client, Strategy, TokenSet, UserinfoResponse } from 'openid-client';

import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigDto } from '../../../dtos/app-config.dto';
import { AuthService } from '../services/auth.service';

export class OIDCStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly oidcClient: Client,
  ) {
    super({
      client: oidcClient,
      params: {
        redirect_uri: configService.get('KEYCLOAK_CALLBACK_URL'),
      },
    });
  }

  async validate(tokenSet: TokenSet) {
    const userinfo: UserinfoResponse = await this.oidcClient.userinfo(tokenSet);

    try {
      return userinfo;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
