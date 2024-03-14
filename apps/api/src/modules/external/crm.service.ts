import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { convertIncidentStatusToPositionRequestStatus } from '../position-request/utils/convert-incident-status-to-position-request-status.util';
import { PrismaService } from '../prisma/prisma.service';
import { IncidentCreateUpdateInput } from './models/incident-create.input';

enum Endpoint {
  Accounts = 'accounts',
  Contacts = 'contacts',
  Incidents = 'incidents',
  Query = 'queryResults',
}

@Injectable()
export class CrmService {
  private readonly logger = new Logger(CrmService.name);
  private readonly headers: AxiosHeaders;
  private request = (endpoint: Endpoint, extra?: string) =>
    this.httpService.get(`${this.configService.get('CRM_URL')}/${endpoint}${extra != null ? `?${extra}` : ''}`, {
      headers: this.headers,
    });

  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {
    this.headers = new AxiosHeaders();
    this.headers.set(
      'Authorization',
      `Basic ${Buffer.from(
        `${this.configService.get('CRM_USERNAME')}:${this.configService.get('CRM_PASSWORD')}`,
      ).toString('base64')}`,
    );
    this.headers.set('OSvC-CREST-Application-Context', this.configService.get('CRM_APPLICATION_CONTEXT'));
  }

  async syncIncidentStatus() {
    // Get position requests which have been submitted, but have not been marked as COMPLETED
    const positionRequests = await this.prisma.positionRequest.findMany({
      where: {
        AND: [
          {
            crm_id: { not: null },
          },
          {
            status: { not: { equals: 'COMPLETED' } },
          },
        ],
      },
      select: { crm_id: true },
    });

    if (positionRequests.length === 0) return;

    this.logger.log(`Start syncIncidentStatus @ ${new Date()}`);

    // The following API call returns an object with the structure:
    //
    // {
    //   "items": [
    //     {
    //       "tableName": "incidents",
    //       "count": 1,
    //       "columnNames": ["id","status"],
    //       "rows": [string, string]
    //     }
    //   ],
    //   "links": [
    //     ...
    //   ]
    // }
    //
    const response = await firstValueFrom(
      this.request(
        Endpoint.Query,
        `query=USE REPORT;SELECT id,statusWithType.status FROM incidents WHERE id IN (${positionRequests
          .map((pr) => pr.crm_id)
          .join(',')})`,
      ).pipe(
        map((r) => {
          return r.data;
        }),
        retry(3),
        catchError((err) => {
          throw new Error(err);
        }),
      ),
    );

    const { rows } = response.items[0];

    for await (const row of rows) {
      const [crm_id, status] = row as [string, string];
      const positionRequest = await this.prisma.positionRequest.findUnique({ where: { crm_id: +crm_id } });
      const incomingPositionRequestStatus = convertIncidentStatusToPositionRequestStatus(+status);

      // Conditionally update the positionRequest.status
      if (positionRequest.status !== incomingPositionRequestStatus) {
        // TODO: Send email regarding updated status

        await this.prisma.positionRequest.update({
          where: { crm_id: +crm_id },
          data: {
            status: incomingPositionRequestStatus,
          },
        });
      }
    }
    this.logger.log(`End syncIncidentStatus @ ${new Date()}`);
  }

  async getAccountId(idir: string): Promise<number | null> {
    const response = await firstValueFrom(
      this.request(Endpoint.Accounts, `q=login='${idir.toLowerCase()}'`).pipe(
        map((r) => r.data),
        retry(3),
        catchError((err) => {
          throw new Error(err);
        }),
      ),
    );

    const accountId = response?.items.length > 0 ? (response.items[0].id as number) : null;
    return accountId;
  }

  async getContactId(idir: string): Promise<number | null> {
    const response = await firstValueFrom(
      this.request(Endpoint.Contacts, `q=login='${idir.toLowerCase()}'`).pipe(
        map((r) => r.data),
        retry(3),
        catchError((err) => {
          throw new Error(err);
        }),
      ),
    );

    const contactId = response?.items.length > 0 ? (response.items[0].id as number) : null;
    return contactId;
  }

  async createIncident(data: IncidentCreateUpdateInput) {
    const response = await firstValueFrom(
      this.httpService
        .post(`${this.configService.get('CRM_URL')}/${Endpoint.Incidents}`, data, {
          headers: this.headers,
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

  async updateIncident(id: number, data: IncidentCreateUpdateInput) {
    const updateHeaders = this.headers;
    updateHeaders.set('X-HTTP-Method-Override', 'PATCH');

    const response = await firstValueFrom(
      this.httpService
        .post(`${this.configService.get('CRM_URL')}/${Endpoint.Incidents}/${id}`, data, {
          headers: updateHeaders,
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

  async getIncident(id: number) {
    const response = await firstValueFrom(
      this.httpService
        .get(`${this.configService.get('CRM_URL')}/${Endpoint.Incidents}/${id}`, { headers: this.headers })
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
