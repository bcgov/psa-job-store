import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Issuer } from 'openid-client';
import { AppConfigDto } from '../../../dtos/app-config.dto';
import { AuthService } from '../services/auth.service';
import { IDIRStrategy } from '../strategies/idir.strategy';

const buildOIDCClient = async (configService: ConfigService<AppConfigDto, true>) => {
  const TrustIssuer = await Issuer.discover(
    `${configService.get('KEYCLOAK_REALM_URL')}/.well-known/openid-configuration`,
  );
  return new TrustIssuer.Client({
    client_id: configService.get('KEYCLOAK_CLIENT_ID'),
    client_secret: configService.get('KEYCLOAK_CLIENT_SECRET'),
  });
};

export const IDIRStrategyFactory: FactoryProvider = {
  provide: IDIRStrategy.name,
  useFactory: async (authService: AuthService, configService: ConfigService<AppConfigDto, true>) => {
    const oidcClient = await buildOIDCClient(configService);
    return new IDIRStrategy(authService, configService, oidcClient);
  },
  inject: [AuthService, ConfigService],
};
//
