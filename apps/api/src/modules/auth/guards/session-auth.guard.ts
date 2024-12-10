import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AppConfigDto } from '../../../dtos/app-config.dto';
import { ROLES } from '../decorators/roles.decorator';

@Injectable()
export class SessionAuthGuard extends AuthGuard('oidc') {
  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  private isAuthenticated = (request: Request) => {
    return request.isAuthenticated();
  };

  private userHasRoles = (request: Request, requiredRoles: string[]) => {
    if (this.configService.get('TEST_ENV') === true || !requiredRoles) {
      return true;
    }

    return requiredRoles.filter((role) => request.user.roles.includes(role)).length > 0;
  };

  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const request: Request = gqlContext.getContext().req;
    const requiredRoles: string[] | undefined = this.reflector.get<string[]>(ROLES, context.getHandler());

    return this.isAuthenticated(request) && this.userHasRoles(request, requiredRoles);
  }
}
