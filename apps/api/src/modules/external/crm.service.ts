import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
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
            status: { not: { in: ['COMPLETED', 'CANCELLED'] } },
          },
        ],
      },
      select: { crm_id: true, crm_lookup_name: true },
    });

    if (positionRequests.length === 0) return [];

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
        `query=USE REPORT;SELECT id,lookupName,statusWithType.status.lookupName, category.lookupName FROM incidents WHERE id IN (${positionRequests
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
    return rows;
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
    // console.log('createIncident: ', `${this.configService.get('CRM_URL')}/${Endpoint.Incidents}`, data, this.headers);
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
    const updateHeaders = new AxiosHeaders(this.headers);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateMockIncident(id: number, data: IncidentCreateUpdateInput) {}

  async resetMockData() {}

  async getIncident(id: number) {
    const response = await firstValueFrom(
      this.request(
        Endpoint.Query,
        `query=USE REPORT;SELECT id,lookupName,statusWithType.status.lookupName, category.lookupName FROM incidents WHERE id = (${id})`,
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
    const [crm_id, crm_lookup_name, crm_status, crm_category] = response.items[0].rows[0];
    return { crm_id, crm_lookup_name, crm_status, crm_category };
  }

  async updateIncidentStatus(incidentId: number, newStatus: number) {
    const updateHeaders = new AxiosHeaders(this.headers);
    updateHeaders.set('X-HTTP-Method-Override', 'PATCH');

    const data = {
      statusWithType: {
        status: {
          id: newStatus,
        },
      },
    };

    const response = await firstValueFrom(
      this.httpService
        .post(`${this.configService.get('CRM_URL')}/${Endpoint.Incidents}/${incidentId}`, data, {
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
}
