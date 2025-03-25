import { PassportStrategy } from '@nestjs/passport';
import { Client, Strategy, TokenSet, UserinfoResponse } from 'openid-client';

import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigDto } from '../../../dtos/app-config.dto';
import { AuthService } from '../services/auth.service';

export type BCeIDUserinfoResponse = UserinfoResponse<{
  client_roles?: string[];
  bceid_user_guid: string;
  identity_provider?: string;
  email?: string;
  display_name?: string;
  given_name?: string;
  name?: string;
  bceid_username?: string;
  preferred_username?: string;
  bceid_business_guid?: string;
  bceid_business_name?: string;
}>;

export class BCeIDStrategy extends PassportStrategy(Strategy, 'bceid') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly oidcClient: Client,
  ) {
    super({
      client: oidcClient,
      params: {
        redirect_uri: `${configService.get('KEYCLOAK_CALLBACK_URL')}/bceid`,
        kc_idp_hint: 'bceidboth',
      },
    });
  }

  async validate(tokenSet: TokenSet) {
    const userinfo: BCeIDUserinfoResponse = await this.oidcClient.userinfo(tokenSet);

    try {
      const sessionUser = await this.authService.validateUserinfo(userinfo);
      return sessionUser ? {
        ...sessionUser,
        id_token: tokenSet.id_token
      } : false;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
