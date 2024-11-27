import { PassportStrategy } from '@nestjs/passport';
import { Client, Strategy, TokenSet, UserinfoResponse } from 'openid-client';

import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigDto } from '../../../dtos/app-config.dto';
import { guidToUuid } from '../../../utils/guid-to-uuid.util';
import { UserService } from '../../user/user.service';

export class OIDCStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(
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
    const userinfo: UserinfoResponse = await this.oidcClient.userinfo(tokenSet);

    await this.userService.syncUser(guidToUuid(userinfo.idir_user_guid as string));

    try {
      return {
        id: guidToUuid((userinfo.idir_user_guid as string) ?? ''),
        name: userinfo.display_name,
        given_name: userinfo.given_name,
        family_name: userinfo.family_name,
        email: userinfo.email,
        username: userinfo.idir_username,
        roles: userinfo.client_roles ?? [],
        metadata: {},
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
