import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { AlexandriaError } from '../../utils/alexandria-error';
import {
  FusionAssignSupervisorPositionInput,
  FusionCheckPositionUploadStatusInput,
  FusionUpsertPositionInput,
} from './models/fusion.models';
import { OracleIdpService } from './oracle-idp.service';

enum OicEndpoints {
  AssignSupervisor = '/ic/api/integration/v1/flows/rest/HCM_IN_POSITION_HIER_INT/1.0/position',
  Upsert = '/ic/api/integration/v1/flows/rest/HCM_IN_POSITION_INT/1.0/position',
  CheckPositionUploadStatus = '/ic/api/integration/v1/flows/rest/HCM_IN_GET_POSIT_IMPOR_STATU/1.0/',
}

/**
 * This service is used to create and update positions, and check position status in Oracle Fusion using
 * the custom API built by TES using Oracle Integration Cloud (OIC).
 *
 * Fusion uses a data upload mechanism to create positions.  The OIC API abstracts that process into a REST API, but is
 * unable to return the position number directly.
 *
 * createPosition/updatePosition will return a Process ID which can be used by checkPositionStatus to check the
 * status/get the position number of a position.
 *
 * Once checkPositionStatus returns a successful response (includes position id & number), the position details can
 * be fetched from FusionService
 *
 */
@Injectable()
export class OicService {
  private readonly logger = new Logger(OicService.name);

  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
    private readonly oracleIdpService: OracleIdpService,
  ) {}

  private async getHeaders() {
    const { access_token } = await this.oracleIdpService.getClientCredentials();
    const headers = new AxiosHeaders();

    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`);
    }

    return headers;
  }

  async assignSupervisorPosition(data: FusionAssignSupervisorPositionInput) {
    const response = await firstValueFrom(
      this.httpService
        .post(`${this.configService.get('OIC_URL')}${OicEndpoints.AssignSupervisor}`, data, {
          headers: await this.getHeaders(),
        })
        .pipe(
          map((r) => r.data),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    return response;
  }

  async createPosition(data: FusionUpsertPositionInput) {
    if (data.PositionId.length > 0) throw AlexandriaError('PositionId must be blank to create a new position');

    const response = await firstValueFrom(
      this.httpService
        .post(`${this.configService.get('OIC_URL')}${OicEndpoints.Upsert}`, data, {
          headers: await this.getHeaders(),
        })
        .pipe(
          map((r) => r.data),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    return response;
  }

  async updatePosition(data: FusionUpsertPositionInput) {
    if (data.PositionId.length === 0) throw AlexandriaError('PositionId is required to update a position');

    const response = await firstValueFrom(
      this.httpService
        .post(`${this.configService.get('OIC_URL')}${OicEndpoints.Upsert}`, data, {
          headers: await this.getHeaders(),
        })
        .pipe(
          map((r) => r.data),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    return response;
  }

  async checkPositionStatus(data: FusionCheckPositionUploadStatusInput) {
    const response = await firstValueFrom(
      this.httpService
        .post(`${this.configService.get('OIC_URL')}${OicEndpoints.CheckPositionUploadStatus}`, data, {
          headers: await this.getHeaders(),
        })
        .pipe(
          map((r) => r.data),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    return response;
  }
}
