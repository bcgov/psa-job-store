import { PassportStrategy } from '@nestjs/passport';
import { Client, Strategy, TokenSet, UserinfoResponse } from 'openid-client';

import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigDto } from '../../../dtos/app-config.dto';
import { UserService } from '../../user/user.service';
import { AuthService } from '../services/auth.service';

export type KeycloakUserinfoResponse = UserinfoResponse<{
  client_roles?: string[];
  display_name?: string;
  family_name?: string;
  given_name?: string;
  identity_provider?: string;
  idir_user_guid: string;
  idir_username?: string;
}>;

export class OIDCStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly oidcClient: Client,
    private readonly userService: UserService,
  ) {
    super({
      client: oidcClient,
      params: {
        redirect_uri: configService.get('KEYCLOAK_CALLBACK_URL'),
      },
    });
  }

  async validate(tokenSet: TokenSet) {
    const userinfo: KeycloakUserinfoResponse = await this.oidcClient.userinfo(tokenSet);
    const sessionUser = await this.authService.validateUserinfo(userinfo);

    console.log('sessionUser: ', sessionUser);

    try {
      return sessionUser;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
