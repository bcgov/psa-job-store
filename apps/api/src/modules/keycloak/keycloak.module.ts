import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';

@Module({
  imports: [HttpModule],
  providers: [KeycloakService],
})
export class KeycloakModule {}
