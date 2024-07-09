import { Args, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { FindManyKeycloakUserArgs } from './args/find-many-keycloak-user.args';
import { KeycloakService } from './keycloak.service';
import { KeycloakUser } from './models/keycloak-user.model';

@Resolver()
export class KeycloakResolver {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Query(() => [KeycloakUser], { name: 'findIdpUsers' })
  @Roles('super-admin')
  findIdpUsers(@Args() args: FindManyKeycloakUserArgs) {
    return this.keycloakService.findUsers(args);
  }

  @Query(() => [String], { name: 'getRoles' })
  @Roles('super-admin')
  getRoles() {
    return this.keycloakService.getRoles();
  }
}
