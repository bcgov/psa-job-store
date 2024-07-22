import { Module } from '@nestjs/common';
import { KeycloakResolver } from './keycloak.resolver';
import { KeycloakService } from './keycloak.service';

@Module({
  providers: [KeycloakService, KeycloakResolver],
})
export class KeycloakModule {}
