import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { KeycloakResolver } from './keycloak.resolver';
import { KeycloakService } from './keycloak.service';
import { MockKeycloakService } from './keycloak.service.mock';

@Module({
  providers: [
    {
      provide: KeycloakService,
      useFactory: (configService: ConfigService<AppConfigDto, true>) => {
        //
        if (configService.get('USE_MOCKS') === 'true') {
          // return new KeycloakService();
          return new MockKeycloakService();
        } else {
          return new KeycloakService();
        }
      },
      inject: [ConfigService],
    },
    // KeycloakService,
    KeycloakResolver,
  ],
  exports: [KeycloakService],
})
export class KeycloakModule {}
