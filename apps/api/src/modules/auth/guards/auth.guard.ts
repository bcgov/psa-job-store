import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PUBLIC_ROUTE } from '../decorators/public-route.decorator';

@Injectable()
export class AuthGuard extends PassportAuthGuard('keycloak') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRoute = this.reflector.get<boolean>(PUBLIC_ROUTE, context.getHandler());
    if (isPublicRoute) return true;

    return super.canActivate(context);
  }
}
