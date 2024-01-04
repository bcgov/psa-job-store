import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Environment } from '../enums/environment.enum';

export class AppConfigDto {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  @IsString()
  BI_URL: string;

  @IsNotEmpty()
  @IsString()
  BI_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  BI_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  CRM_URL: string;

  @IsNotEmpty()
  @IsString()
  CRM_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  CRM_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;

  @IsNotEmpty()
  @IsString()
  ELASTIC_NODE: string;

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

  @IsNotEmpty()
  @IsString()
  PEOPLESOFT_URL: string;

  @IsNotEmpty()
  @IsString()
  PEOPLESOFT_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  PEOPLESOFT_PASSWORD: string;
}
