import { Args, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { FindManyKeycloakUserArgs } from './args/find-many-keycloak-user.args';
import { KeycloakService } from './keycloak.service';
import { KeycloakUser } from './models/keycloak-user.model';

@Resolver()
export class KeycloakResolver {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Query(() => [KeycloakUser], { name: 'findKeycloakUsers' })
  @Roles('super-admin')
  findKeycloakUsers(@Args() args: FindManyKeycloakUserArgs) {
    return this.keycloakService.findUsers(args.field, args.value);
  }

  @Query(() => [String], { name: 'getRoles' })
  getRoles() {
    return this.keycloakService.getRoles();
  }
}
