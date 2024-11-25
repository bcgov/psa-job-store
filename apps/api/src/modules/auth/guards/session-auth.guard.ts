import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class SessionAuthGuard extends AuthGuard('oidc') {
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }

  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}
