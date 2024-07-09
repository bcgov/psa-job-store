import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';
import { KeycloakResolver } from './keycloak.resolver';

@Module({
  imports: [HttpModule],
  providers: [KeycloakService, KeycloakResolver],
})
export class KeycloakModule {}
