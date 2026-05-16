import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { clientCredentials } from 'axios-oauth-client';
import { AppConfigDto } from '../../dtos/app-config.dto';

@Injectable()
export class OracleIdpService {
  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
  ) {}

  async getClientCredentials(): Promise<{ access_token: string; token_type: string; expires_in: number }> {
    const credentials = clientCredentials(
      this.httpService.axiosRef,
      this.configService.get('ORACLE_IDP_TOKEN_URL'),
      this.configService.get('ORACLE_IDP_ID'),
      this.configService.get('ORACLE_IDP_SECRET'),
    );

    const auth = await credentials(this.configService.get('ORACLE_IDP_SCOPE'));

    return auth;
  }
}
