import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard extends PassportAuthGuard('keycloak') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log(new Date().toISOString().slice(11, -1) + ' ' + 'AuthGuard.canActivate');
    // const isPublicRoute = this.reflector.get<boolean>(PUBLIC_ROUTE, context.getHandler());
    // if (isPublicRoute) return true;
    const request = this.getRequest(context);
    // Bypass auth for the health check endpoint
    if (request.url === '/health/check') {
      return true;
    }
    const res = super.canActivate(context);
    console.log(new Date().toISOString().slice(11, -1) + ' ' + 'AuthGuard.canActivate done');
    return res;
  }

  getRequest(context: ExecutionContext) {
    console.log(new Date().toISOString().slice(11, -1) + ' ' + 'AuthGuard.getRequest');
    const gqlContext = GqlExecutionContext.create(context);
    const res = gqlContext.getContext().req;
    console.log(new Date().toISOString().slice(11, -1) + ' ' + 'AuthGuard.getRequest done');
    return res;
  }
}
