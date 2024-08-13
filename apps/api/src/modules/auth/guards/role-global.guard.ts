import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export const AllowNoRoles = () => SetMetadata('allowNoRoles', true);

@Injectable()
export class RolesGlobalGuard extends PassportAuthGuard('keycloak') {
  // This guard requires that a user has one of the required roles to access any endpoint
  // If the endpoint allows access with no roles (but still must be authenticated), use the AllowNoRoles decorator
  // If this guard passes, the RoleGuard will check if the user has the required roles for the specific endpoint

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const { user } = request;

    // Allow all requests to the logout endpoint
    // Check if the endpoint allows unauthenticated access
    const allowNoRoles = this.reflector.get<boolean>('allowNoRoles', context.getHandler());
    const skipVerification = process.env.TEST_ENV; // for local development only - allows postman access
    if (allowNoRoles || skipVerification === 'true') {
      return true;
    }

    // Check if user has one of the required roles
    const requiredRoles = ['hiring-manager', 'total-compensation', 'classification'];

    return user && user.roles.some((role) => requiredRoles.includes(role));
  }
}
