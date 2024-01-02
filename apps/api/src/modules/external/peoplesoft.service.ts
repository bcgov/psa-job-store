import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { Environment } from '../../enums/environment.enum';
import { PrismaService } from '../prisma/prisma.service';

enum Endpoint {
  Classifications = 'PJS_TGB_REST_JOB_CODE',
  Departments = 'PJS_TGB_REST_DEPT',
  Locations = 'PJS_TGB_REST_LOCATION',
  Organizations = 'PJS_TGB_REST_BUS_UNIT',
}

@Injectable()
export class PeoplesoftService {
  private readonly headers: AxiosHeaders;
  private request = (endpoint: Endpoint, pageSize: number = 10) =>
    this.httpService.get(
      `${this.configService.get(
        'PEOPLESOFT_URL',
      )}/${endpoint}/JSON/NONFILE?isconnectedquery=n&maxrows=${pageSize}&json_resp=true`,
      { headers: this.headers },
    );

  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {
    this.headers = new AxiosHeaders();
    this.headers.set(
      'Authorization',
      `Basic ${Buffer.from(
        `${this.configService.get('PEOPLESOFT_USERNAME')}:${this.configService.get('PEOPLESOFT_PASSWORD')}`,
      ).toString('base64')}`,
    );

    (async () => {
      // To reduce API requests in non-production mode, only fetch these records if their counts === 0
      // In production, fetch records on server start
      if (this.configService.get('NODE_ENV') !== Environment.Production) {
        const classificationCount = await this.prisma.classification.count();
        if (classificationCount < 100) {
          await this.syncClassifications();
        }

        const locationCount = await this.prisma.location.count();
        if (locationCount < 100) {
          await this.syncLocations();
        }

        const organizationCount = await this.prisma.organization.count();
        if (organizationCount < 100) {
          await this.syncOrganizations();
        }

        const departmentCount = await this.prisma.department.count();
        if (departmentCount < 100) {
          await this.syncDepartments();
        }
      } else {
        await this.syncClassifications();
        await this.syncLocations();
        await this.syncOrganizations();
        await this.syncDepartments();
      }
    })();
  }

  async syncClassifications() {
    const response = await firstValueFrom(
      this.request(Endpoint.Classifications, 4000)
        .pipe(map((r) => r.data))
        .pipe(
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    for await (const row of response?.data?.query?.rows ?? []) {
      await this.prisma.classification.upsert({
        where: { id: row.JOBCODE },
        create: {
          id: row.JOBeCODE,
          peoplesoft_id: row.SETID,
          name: row.DESCR,
          code: row.DESCRSHORT,
          effective_status: row.EFF_STATUS,
          effective_date: new Date(row.EFFDT),
        },
        update: {
          peoplesoft_id: row.SETID,
          name: row.DESCR,
          code: row.DESCRSHORT,
          effective_status: row.EFF_STATUS,
          effective_date: new Date(row.EFFDT),
        },
      });
    }
  }

  async syncDepartments() {
    const organizations = await this.prisma.organization.findMany({
      select: { id: true, peoplesoft_id: true },
    });

    const response = await firstValueFrom(
      this.request(Endpoint.Departments, 25000)
        .pipe(map((r) => r.data))
        .pipe(
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    for await (const row of response?.data?.query?.rows ?? []) {
      try {
        await this.prisma.department.upsert({
          where: { id: row.DEPTID },
          create: {
            id: row.DEPTID,
            peoplesoft_id: row.SETID,
            code: row.DESCRSHORT,
            name: row.DESCR,
            effective_status: row.EFF_STATUS,
            effective_date: new Date(row.EFFDT),
            location: {
              connectOrCreate: {
                where: { id: row.LOCATION },
                create: {
                  id: row.LOCATION,
                  peoplesoft_id: row.SETID,
                  code: '',
                  name: '',
                  effective_status: '',
                  effective_date: new Date('1900-01-01'),
                },
              },
            },
            organization: {
              connect: {
                id: organizations.find((org) => org.peoplesoft_id === row.SETID).id,
              },
            },
          },
          update: {
            peoplesoft_id: row.SETID,
            code: row.DESCRSHORT,
            name: row.DESCR,
            effective_status: row.EFF_STATUS,
            effective_date: new Date(row.EFFDT),
            location: {
              connectOrCreate: {
                where: { id: row.LOCATION },
                create: {
                  id: row.LOCATION,
                  peoplesoft_id: row.SETID,
                  code: '',
                  name: '',
                  effective_status: '',
                  effective_date: new Date('1900-01-01'),
                },
              },
            },
            organization: {
              connect: {
                id: organizations.find((org) => org.peoplesoft_id === row.SETID).id,
              },
            },
          },
        });
      } catch (error) {
        console.error('ERROR: ', error);
        console.log('row: ', row);
      }
    }
  } //

  async syncLocations() {
    const response = await firstValueFrom(
      this.request(Endpoint.Locations, 5000)
        .pipe(map((r) => r.data))
        .pipe(
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    for await (const row of response?.data?.query?.rows ?? []) {
      await this.prisma.location.upsert({
        where: { id: row.LOCATION },
        create: {
          id: row.LOCATION,
          peoplesoft_id: row.SETID,
          code: row.DESCRSHORT,
          name: row.DESCR,
          effective_status: row.EFF_STATUS,
          effective_date: new Date(row.EFFDT),
        },
        update: {
          peoplesoft_id: row.SETID,
          code: row.DESCRSHORT,
          name: row.DESCR,
          effective_status: row.EFF_STATUS,
          effective_date: new Date(row.EFFDT),
        },
      });
    }
  }

  async syncOrganizations() {
    const response = await firstValueFrom(
      this.request(Endpoint.Organizations, 500)
        .pipe(map((r) => r.data))
        .pipe(
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    for await (const row of response?.data?.query?.rows ?? []) {
      await this.prisma.organization.upsert({
        where: { id: row.BUSINESS_UNIT },
        create: {
          id: row.BUSINESS_UNIT,
          peoplesoft_id: row.SETID,
          code: row.DESCRSHORT,
          name: row.DESCR,
          effective_status: row.EFF_STATUS,
          effective_date: new Date(row.EFFDT),
        },
        update: {
          peoplesoft_id: row.SETID,
          code: row.DESCRSHORT,
          name: row.DESCR,
          effective_status: row.EFF_STATUS,
          effective_date: new Date(row.EFFDT),
        },
      });
    }
  }
}
