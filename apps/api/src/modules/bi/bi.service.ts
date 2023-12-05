import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { Environment } from '../../enums/environment.enum';
import { PrismaService } from '../prisma/prisma.service';

const CLASSIFICATIONS_ENDPOINT = 'Datamart_JOBSTORE_PeopleSoft_POSN_JOBCD_VW2';
const DEPARTMENTS_ENDPOINT = 'Datamart_JOBSTORE_PeopleSoft_DEPT_TBL';
const ORGANIZATIONS_ENDPOINT = 'Datamart_JOBSTORE_PeopleSoft_BUS_UNIT_TBL';

@Injectable()
export class BIService {
  private readonly headers: AxiosHeaders;

  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {
    this.headers = new AxiosHeaders();
    this.headers.set(
      'Authorization',
      `Basic ${Buffer.from(
        `${this.configService.get('BI_USERNAME')}:${this.configService.get('BI_PASSWORD')}`,
      ).toString('base64')}`,
    );

    (async () => {
      // To reduce API requests in non-production mode, only fetch these records if their counts === 0
      // In production, fetch records on server start

      if (this.configService.get('NODE_ENV') !== Environment.Production) {
        const numClassifications = await this.prisma.classification.count();
        if (numClassifications === 0) {
          await this.syncClassifications();
        }

        const numOrganizations = await this.prisma.organization.count();
        if (numOrganizations === 0) {
          await this.syncOrganizations();
        }

        const numDepartments = await this.prisma.department.count();
        if (numDepartments === 0) {
          await this.syncDepartments();
        }
      } else {
        await this.syncClassifications();
        await this.syncOrganizations();
        await this.syncDepartments();
      }
    })();
  }

  async syncClassifications() {
    const response = await firstValueFrom(
      this.httpService
        .get(`${this.configService.get('BI_URL')}/${CLASSIFICATIONS_ENDPOINT}`, { headers: this.headers })
        .pipe(map((r) => r.data))
        .pipe(
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    const classifications = (response.value ?? []).map((v) => ({
      id: v.JOBCODE,
      code: v.DESCR,
      name: v.DESCR,
    }));

    for await (const classification of classifications) {
      await this.prisma.classification.upsert({
        where: { id: classification.id },
        create: {
          id: classification.id,
          code: classification.code,
          name: classification.name,
        },
        update: {
          code: classification.code,
          name: classification.name,
        },
      });
    }
  }

  async syncDepartments() {
    const response = await firstValueFrom(
      this.httpService
        .get(`${this.configService.get('BI_URL')}/${DEPARTMENTS_ENDPOINT}`, { headers: this.headers })
        .pipe(map((r) => r.data))
        .pipe(
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    const departments = (response.value ?? []).map((v) => ({
      id: v.DEPTID,
      organization_id: v.SETID.replace('ST', 'BC'),
      name: v.DESCR,
    }));

    for await (const department of departments) {
      await this.prisma.department.upsert({
        where: { id: department.id },
        create: {
          id: department.id,
          organization_id: department.organization_id,
          name: department.name,
        },
        update: {
          organization_id: department.organization_id,
          name: department.name,
        },
      });
    }
  }

  async syncOrganizations() {
    const response = await firstValueFrom(
      this.httpService
        .get(`${this.configService.get('BI_URL')}/${ORGANIZATIONS_ENDPOINT}`, { headers: this.headers })
        .pipe(map((r) => r.data))
        .pipe(
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    const organizations = (response.value ?? []).map((v) => ({ id: v.BUSINESS_UNIT, name: v.DESCR }));

    for await (const organization of organizations) {
      await this.prisma.organization.upsert({
        where: {
          id: organization.id,
        },
        create: {
          id: organization.id,
          name: organization.name,
        },
        update: {
          name: organization.name,
        },
      });
    }
  }
}
