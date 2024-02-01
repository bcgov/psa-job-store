import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { IncidentCreateInput } from './models/incident-create.input';
import { IncidentUpdateInput } from './models/incident-update.input';

enum Endpoint {
  Accounts = 'accounts',
  Contacts = 'contacts',
  Incidents = 'incidents',
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

  async createIncident(data: IncidentCreateInput) {
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

  async updateIncident(id: number, data: IncidentUpdateInput) {
    console.log(id);
    console.log(data);
  }
}
