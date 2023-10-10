import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { Environment } from '../enums/environment.enum';

export class AppConfigDto {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  DATABASE_URL: string;

  @IsNotEmpty()
  @IsUrl()
  KEYCLOAK_REALM_URL: string;

  @IsNotEmpty()
  KEYCLOAK_CLIENT_ID_PRIVATE: string;

  @IsNotEmpty()
  KEYCLOAK_CLIENT_ID_PUBLIC: string;
}
