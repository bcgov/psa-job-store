import { PassportStrategy } from '@nestjs/passport';
import { Client, Strategy, TokenSet, UserinfoResponse } from 'openid-client';

import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigDto } from '../../../dtos/app-config.dto';
import { AuthService } from '../services/auth.service';

export type IDIRUserinfoResponse = UserinfoResponse<{
  client_roles?: string[];
  display_name?: string;
  family_name?: string;
  given_name?: string;
  identity_provider?: string;
  idir_user_guid: string;
  idir_username?: string;
}>;

export class IDIRStrategy extends PassportStrategy(Strategy, 'idir') {
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
    const userinfo: IDIRUserinfoResponse = await this.oidcClient.userinfo(tokenSet);
    const sessionUser = await this.authService.validateUserinfo(userinfo);

    try {
      return sessionUser;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
