import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AppConfigDto } from '../../../dtos/app-config.dto';

@Injectable()
export class BCeIDLoginGuard extends AuthGuard('bceid') {
  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const result = (await super.canActivate(context)) as boolean;
      await super.logIn(request);

      return result;
    } catch (error) {
      request.res.redirect(`${this.configService.get('KEYCLOAK_LOGOUT_REDIRECT_URL')}?error=unauthorized`);
    }
  }
}
