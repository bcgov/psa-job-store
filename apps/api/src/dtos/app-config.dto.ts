import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Environment } from '../enums/environment.enum';
import { SSOEnvironment } from '../enums/sso-environment.enum';

export class AppConfigDto {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  @IsString()
  REACT_APP_URL: string;

  @IsNotEmpty()
  @IsString()
  CRM_APPLICATION_CONTEXT: string;

  @IsNotEmpty()
  @IsString()
  CRM_URL: string;

  @IsNotEmpty()
  @IsString()
  CRM_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  CRM_PASSWORD: string;

  @IsString()
  DATABASE_URL: string; // can be empty when doing e2e testing

  @IsString()
  DATABASE_READ_URL: string;

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
  CSS_API_CLIENT_ID: string;

  @IsNotEmpty()
  @IsString()
  CSS_API_CLIENT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  SSO_INTEGRATION_ID: string;

  @IsEnum(SSOEnvironment)
  SSO_ENVIRONMENT: SSOEnvironment;

  // NestJS
  // @IsNumber()
  // @IsNotEmpty()
  // SERVER_PORT: number;

  // Express Session
  @IsString()
  @IsNotEmpty()
  SESSION_SECRET: string;

  Keycloak;
  @IsString()
  @IsNotEmpty()
  KEYCLOAK_REALM_URL: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_CALLBACK_URL: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_LOGOUT_REDIRECT_URL: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_CLIENT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  PEOPLESOFT_URL: string;

  @IsNotEmpty()
  @IsString()
  PEOPLESOFT_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  PEOPLESOFT_PASSWORD: string;

  @IsOptional()
  @IsString()
  USE_FUSION?: string;

  @IsOptional()
  @IsString()
  FUSION_URL?: string;

  @IsOptional()
  @IsString()
  FUSION_USERNAME?: string;

  @IsOptional()
  @IsString()
  FUSION_PASSWORD?: string;

  @IsOptional()
  @IsString()
  ORACLE_IDP_TOKEN_URL?: string;

  @IsOptional()
  @IsString()
  ORACLE_IDP_ID?: string;

  @IsOptional()
  @IsString()
  ORACLE_IDP_SECRET?: string;

  @IsOptional()
  @IsString()
  OIC_URL?: string;

  @IsString()
  USE_MOCKS: string;

  @IsString()
  @IsOptional()
  TEST_ENV?: string;

  @IsString()
  E2E_TESTING: string;
}
