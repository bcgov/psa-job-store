import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ROLES } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard extends PassportAuthGuard('keycloak') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  private userHasRoles(user: Express.User, roles: string[]) {
    return roles.filter((r) => user.roles.includes(r)).length > 0;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // console.log(new Date().toISOString().slice(11, -1) + ' ' + 'RoleGuard.canActivate');
    // for local development only - allows postman access
    if (process.env.TEST_ENV === 'true') return true;

    const roles = this.reflector.get<string[]>(ROLES, context.getHandler());
    if (!roles) {
      // console.log(new Date().toISOString().slice(11, -1) + ' ' + 'RoleGuard.canActivate done2');
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const { user } = request;

    const res = this.userHasRoles(user, roles);
    // console.log(new Date().toISOString().slice(11, -1) + ' ' + 'RoleGuard.canActivate done');
    return res;
  }
}
