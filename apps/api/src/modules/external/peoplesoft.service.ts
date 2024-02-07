import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { Environment } from '../../enums/environment.enum';
import { PrismaService } from '../prisma/prisma.service';
import { Employee } from './models/employee.model';

enum Endpoint {
  Classifications = 'PJS_TGB_REST_JOB_CODE',
  Departments = 'PJS_TGB_REST_DEPT',
  DepartmentClassifications = 'PJS_TGB_REST_JOBCODE_DEPT',
  Employees = 'PJS_TGB_REST_EMPLOYEE',
  HrScope = 'PJS_TGB_REST_HRSCOPE',
  Locations = 'PJS_TGB_REST_LOCATION',
  Organizations = 'PJS_TGB_REST_BUS_UNIT',
  PositionCreate = 'TGB_PJS_POSITION.v1',
  Profile = 'PJS_TGB_REST_USER_PROFILE',
}

enum RequestMethod {
  GET = 'get',
  POST = 'post',
}

type GetRequestParams = { method: RequestMethod.GET; endpoint: Endpoint; pageSize: number; extra?: string };
type PostRequestParams = { method: RequestMethod.POST; endpoint: Endpoint.PositionCreate; data: Record<string, any> };

type RequestParams = GetRequestParams | PostRequestParams;

@Injectable()
export class PeoplesoftService {
  private readonly headers: AxiosHeaders;
  private request = (params: RequestParams) => {
    if (params.method === RequestMethod.GET) {
      const { endpoint, pageSize, extra } = params;

      return this.httpService.get(
        `${this.configService.get('PEOPLESOFT_URL')}/${endpoint}/JSON/NONFILE?isconnectedquery=n&maxrows=${pageSize}${
          extra != null ? `&${extra}` : ''
        }&json_resp=true`,
        { headers: this.headers },
      );
    } else if (params.method === RequestMethod.POST) {
      const { endpoint, data } = params;

      return this.httpService.post(`${this.configService.get('PEOPLESOFT_URL')}/${endpoint}`, data, {
        headers: this.headers,
      });
    }
  };

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
      console.log("this.configService.get('NODE_ENV'): ", this.configService.get('NODE_ENV'));

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
        const departmentCount = await this.prisma.department.count();
        const classificationDepartmentsCount = await this.prisma.classificationDepartment.count();
        if (organizationCount < 100 || departmentCount < 100 || classificationDepartmentsCount < 100) {
          await this.syncOrganizationsAndDepartments();
        }
      } else {
        await this.syncClassifications();
        await this.syncLocations();
        await this.syncOrganizationsAndDepartments();
      }
    })();
  }

  @Cron('0 0 * * * *')
  async syncClassifications() {
    const response = await firstValueFrom(
      this.request({ method: RequestMethod.GET, endpoint: Endpoint.Classifications, pageSize: 4000 }).pipe(
        map((r) => r.data),
        retry(3),
        catchError((err) => {
          throw new Error(err);
        }),
      ),
    );

    // Filter by applicable employee groups
    // Sort rows by effective date ASC
    const sortedRows = (response?.data?.query?.rows ?? [])
      .filter(
        (row) => ['BCSET'].includes(row.SETID) && ['GEU', 'MGT', 'OEX', 'PEA', 'NUR'].includes(row.SAL_ADMIN_PLAN),
      )
      .sort((a, b) => {
        if (a.EFFDT > b.EFFDT) {
          return -1;
        } else if (b.EFFDT > a.EFFDT) {
          return 1;
        } else {
          return 0;
        }
      });

    for await (const row of sortedRows) {
      await this.prisma.classification.upsert({
        where: { id: row.JOBCODE },
        create: {
          id: row.JOBCODE,
          peoplesoft_id: row.SETID,
          name: row.DESCR,
          code: row.DESCRSHORT,
          employee_group_id: row.SAL_ADMIN_PLAN,
          grade: row.GRADE,
          effective_status: row.EFF_STATUS,
          effective_date: new Date(row.EFFDT),
        },
        update: {
          peoplesoft_id: row.SETID,
          name: row.DESCR,
          code: row.DESCRSHORT,
          employee_group_id: row.SAL_ADMIN_PLAN,
          grade: row.GRADE,
          effective_status: row.EFF_STATUS,
          effective_date: new Date(row.EFFDT),
        },
      });
    }
  }

  @Cron('0 0 * * * *')
  async syncLocations() {
    const response = await firstValueFrom(
      this.request({ method: RequestMethod.GET, endpoint: Endpoint.Locations, pageSize: 5000 }).pipe(
        map((r) => r.data),
        retry(3),
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

  @Cron('0 0 * * * *')
  async syncOrganizationsAndDepartments() {
    // Use this function instead of calling syncOrganizations, syncDepartments independently
    // Departments rely on organizations which must exist prior to syncing departments
    await this.syncOrganizations();
    await this.syncDepartments();
    await this.syncDepartmentsForClassifications();
  }

  async syncOrganizations() {
    const response = await firstValueFrom(
      this.request({ method: RequestMethod.GET, endpoint: Endpoint.Organizations, pageSize: 500 }).pipe(
        map((r) => r.data),
        retry(3),
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

  async syncDepartments() {
    const organizations = await this.prisma.organization.findMany({
      select: { id: true, peoplesoft_id: true },
    });

    const response = await firstValueFrom(
      this.request({ method: RequestMethod.GET, endpoint: Endpoint.Departments, pageSize: 25000 }).pipe(
        map((r) => r.data),
        retry(3),
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
      } catch (error) {}
    }
  }

  async syncDepartmentsForClassifications() {
    const classifications = await this.prisma.classification.findMany({
      where: {
        effective_status: 'Active',
      },
    });

    for await (const classification of classifications) {
      // Upsert classifications for department
      const classificationResponse = await firstValueFrom(
        this.request({
          method: RequestMethod.GET,
          endpoint: Endpoint.DepartmentClassifications,
          pageSize: 25000,
          extra: `prompt_uniquepromptname=JOBCODE,DEPTID&prompt_fieldvalue=${classification.id},&filterfields=A.JOBCODE,B.DEPTID`,
        }).pipe(
          map((r) => r.data),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
      );

      const classificationDepartmentsCount = await this.prisma.classificationDepartment.count({
        where: { classification_id: classification.id },
      });
      if (classificationDepartmentsCount > 0) {
        await this.prisma.classificationDepartment.deleteMany({
          where: {
            AND: {
              classification_id: classification.id,
            },
          },
        });
      }

      for (const row of classificationResponse?.data?.query?.rows ?? []) {
        try {
          await this.prisma.classificationDepartment.upsert({
            where: {
              classification_id_department_id: { classification_id: row['A.JOBCODE'], department_id: row['B.DEPTID'] },
            },
            create: {
              classification_id: row['A.JOBCODE'],
              department_id: row['B.DEPTID'],
            },
            update: {},
          });
        } catch (error) {}
      }
    }
  }

  async getEmployeesForPositions(positions: string[]) {
    const requests: any[] = [];

    positions.map((position) =>
      requests.push(
        firstValueFrom(
          this.request({
            method: RequestMethod.GET,
            endpoint: Endpoint.Employees,
            pageSize: 0,
            extra: `prompt_uniquepromptname=POSITION_NBR,EMPLID&prompt_fieldvalue=${position},`,
          }).pipe(
            map((r) => r.data),
            retry(3),
            catchError((err) => {
              throw new Error(err);
            }),
          ),
        ),
      ),
    );

    const results = await Promise.allSettled(requests);
    const positionEmployeesMap: Map<string, Employee[]> = new Map();

    // Remove all unfulfilled results
    const processed = results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => (r as Record<string, any>).value.data.query.rows);

    processed.forEach((row) => {
      if (row.length > 0) {
        positionEmployeesMap.set(
          row[0]['POSITION_NBR'],
          row.map((r) => ({
            id: r.EMPLID,
            name: r.NAME_DISPLAY,
            status: r.EMPL_STATUS,
          })),
        );
      }
    });

    return positionEmployeesMap;
  }

  async getEmployee(id: string) {
    const response = await firstValueFrom(
      this.request({
        method: RequestMethod.GET,
        endpoint: Endpoint.Employees,
        pageSize: 1,
        extra: `prompt_uniquepromptname=POSITION_NBR,EMPLID&prompt_fieldvalue=,${id}`,
      }).pipe(
        map((r) => r.data),
        retry(3),
        catchError((err) => {
          throw new Error(err);
        }),
      ),
    );

    return response;
  }

  async getProfile(idir: string) {
    const response = await firstValueFrom(
      this.request({
        method: RequestMethod.GET,
        endpoint: Endpoint.Profile,
        pageSize: 1,
        extra: `prompt_uniquepromptname=USERID&prompt_fieldvalue=${idir}`,
      }).pipe(
        map((r) => {
          return r.data;
        }),
        retry(3),
        catchError((err) => {
          throw new Error(err);
        }),
      ),
    );

    return response;
  }

  async getPositionsForDepartment(department_id: string) {
    const response = await firstValueFrom(
      this.request({
        method: RequestMethod.GET,
        endpoint: Endpoint.HrScope,
        pageSize: 0,
        extra: `prompt_uniquepromptname=DEPTID,POSITION_NBR&prompt_fieldvalue=${department_id},`,
      }).pipe(
        map((r) => r.data),
        retry(3),
        catchError((err) => {
          throw new Error(err);
        }),
      ),
    );

    return response;
  }

  async getPosition(position_id: string) {
    const response = await firstValueFrom(
      this.request({
        method: RequestMethod.GET,
        endpoint: Endpoint.HrScope,
        pageSize: 0,
        extra: `prompt_uniquepromptname=DEPTID,POSITION_NBR&prompt_fieldvalue=,${position_id}`,
      }).pipe(
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
