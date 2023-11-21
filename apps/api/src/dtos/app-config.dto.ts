import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Environment } from '../enums/environment.enum';

export class AppConfigDto {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;

  @IsString({ each: true })
  ELASTIC_NODES: string[];

  @IsNotEmpty()
  @IsString()
  ELASTIC_USERNAME: string;

  @IsNotEmpty() //
  @IsString()
  ELASTIC_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  KEYCLOAK_REALM_URL: string;

  @IsNotEmpty()
  @IsString()
  KEYCLOAK_CLIENT_ID_PRIVATE: string;

  @IsNotEmpty()
  @IsString()
  KEYCLOAK_CLIENT_ID_PUBLIC: string;
}
