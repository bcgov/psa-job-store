import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export const AllowNoRoles = () => SetMetadata('allowNoRoles', true);

@Injectable()
export class RolesGlobalGuard extends PassportAuthGuard('keycloak') {
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
    const skipVerification = process.env.SKIP_JWT_SIGNATURE_VERIFICATION; // for local development only - allows postman access
    if (allowNoRoles || skipVerification === 'true') {
      return true;
    }

    // Check if user has one of the required roles
    const requiredRoles = ['hiring-manager', 'total-compensation', 'classification'];

    return user && user.roles.some((role) => requiredRoles.includes(role));
  }
}
