/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Issuer } from 'openid-client';
import { AppConfigDto } from '../../../dtos/app-config.dto';
import { PublicRoute } from '../decorators/public-route.decorator';
import { LoginGuard } from '../guards/login.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService<AppConfigDto, true>) {}

  @PublicRoute()
  @Get()
  getHello(@Req() req: Request): string {
    if (req.user) {
      return 'Hello, ' + (req.user ?? ({} as any)).userinfo.display_name + '! <a href="/auth/logout">Logout</a>';
    } else {
      return ' <a href="/auth/login">Login</a>';
    }
  }

  @PublicRoute()
  @UseGuards(LoginGuard)
  @Get('login')
  login() {
    // Logic implemented in LoginGuard
  }

  @Get('user')
  user(@Req() req: Request) {
    return req.user;
  }

  @PublicRoute()
  @UseGuards(LoginGuard)
  @Get('callback')
  callback(@Res() res: Response) {
    res.redirect(this.configService.get('KEYCLOAK_LOGOUT_REDIRECT_URL'));
  }

  @PublicRoute()
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const { id_token } = (req.user as any) ?? { id_token: undefined };

    await req.logout({ keepSessionInfo: false }, (error: any) => {});
    await req.session.destroy(async (error: any) => {
      const TrustIssuer = await Issuer.discover(
        `${this.configService.get('KEYCLOAK_REALM_URL')}/.well-known/openid-configuration`,
      );
      const end_session_endpoint = TrustIssuer.metadata.end_session_endpoint;
      if (end_session_endpoint) {
        res.redirect(
          end_session_endpoint +
            '?post_logout_redirect_uri=' +
            this.configService.get('KEYCLOAK_LOGOUT_REDIRECT_URL') +
            (id_token ? '&id_token_hint=' + id_token : ''),
        );
      } else {
        res.redirect('/');
      }
    });
  }
}
