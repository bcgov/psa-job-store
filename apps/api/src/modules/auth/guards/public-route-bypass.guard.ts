import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PUBLIC_ROUTE } from '../decorators/public-route.decorator';

@Injectable()
export class PublicRouteBypassGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRoute = this.reflector.get<boolean>(PUBLIC_ROUTE, context.getHandler());
    return isPublicRoute;
  }
}
