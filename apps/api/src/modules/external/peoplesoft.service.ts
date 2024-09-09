import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SearchIndex, SearchService } from '../search/search.service';
import { Employee } from './models/employee.model';
import { PositionCreateInput } from './models/position-create.input';

enum Endpoint {
  Classifications = 'PJS_TGB_REST_JOB_CODE',
  CreatePosition = 'TGB_PJS_POSITION.v1',
  Departments = 'PJS_TGB_REST_DEPT',
  DepartmentClassifications = 'PJS_TGB_REST_JOBCODE_DEPT',
  Employees = 'PJS_TGB_REST_EMPLOYEE',
  HrScope = 'PJS_TGB_REST_HRSCOPE',
  Locations = 'PJS_TGB_REST_LOCATION',
  Organizations = 'PJS_TGB_REST_BUS_UNIT',
  Profile = 'PJS_TGB_REST_USER_PROFILE',
}

enum RequestMethod {
  GET = 'get',
  POST = 'post',
}

type GetRequestParams = { method: RequestMethod.GET; endpoint: Endpoint; pageSize: number; extra?: string };
type PostRequestParams = { method: RequestMethod.POST; endpoint: Endpoint.CreatePosition; data: Record<string, any> };

type RequestParams = GetRequestParams | PostRequestParams;

@Injectable()
export class PeoplesoftService {
  private readonly logger = new Logger(PeoplesoftService.name);

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
    private readonly searchService: SearchService,
  ) {
    this.headers = new AxiosHeaders();
    this.headers.set(
      'Authorization',
      `Basic ${Buffer.from(
        `${this.configService.get('PEOPLESOFT_USERNAME')}:${this.configService.get('PEOPLESOFT_PASSWORD')}`,
      ).toString('base64')}`,
    );
  }

  async syncClassifications() {
    this.logger.log(`Start syncClassifications @ ${new Date()}`);

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
    const sortedRows = (response?.data?.query?.rows ?? []).sort((a, b) => {
      if (a.EFFDT > b.EFFDT) {
        return -1;
      } else if (b.EFFDT > a.EFFDT) {
        return 1;
      } else {
        return 0;
      }
    });

    const employeeGroups: string[] = sortedRows.flatMap((row) => row.SAL_ADMIN_PLAN as string);
    for await (const id of new Set(employeeGroups)) {
      await this.prisma.employeeGroup.upsert({
        where: { id },
        create: {
          id,
          name: id,
        },
        update: {},
      });
    }

    for await (const row of sortedRows) {
      await this.prisma.classification.upsert({
        where: {
          id_employee_group_id_peoplesoft_id: {
            id: row.JOBCODE,
            employee_group_id: row.SAL_ADMIN_PLAN,
            peoplesoft_id: row.SETID,
          },
        },
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

    this.logger.log(`End syncClassifications @ ${new Date()}`);
  }

  async syncLocations() {
    this.logger.log(`Start syncLocations @ ${new Date()}`);

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

    this.logger.log(`End syncLocations @ ${new Date()}`);
  }

  async syncOrganizationsAndDepartments() {
    // Use this function instead of calling syncOrganizations, syncDepartments independently
    // Departments rely on organizations which must exist prior to syncing departments
    await this.syncOrganizations();
    await this.syncDepartments();
  }

  async syncOrganizations() {
    this.logger.log(`Start syncOrganizations @ ${new Date()}`);

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

    this.logger.log(`End syncOrganizations @ ${new Date()}`);
  }

  async syncDepartments() {
    this.logger.log(`Start syncDepartments @ ${new Date()}`);

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

    await this.searchService.resetIndex();

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

        await this.searchService.indexDocument(SearchIndex.SettingsDocument, row.DEPTID, {
          id: row.DEPTID,
          name: row.DESCR,
        });
      } catch (error) {}

      // Try to create a metadata entry if it doesn't already exist.  Ignore the FK error
      try {
        await this.prisma.departmentMetadata.create({
          data: {
            department_id: row.DEPTID,
          },
        });
      } catch (error) {}
    }

    this.logger.log(`End syncDepartments @ ${new Date()}`);
  }

  async getEmployeesForPositions(positions: string[]) {
    const requests: any[] = [];

    const positionEmployeesMap: Map<string, Employee[]> = new Map();

    // if testing, skip fetching employees as it takes too long

    positions.map((position) => {
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
      );
    });

    const results = await Promise.allSettled(requests);

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
        extra: `prompt_uniquepromptname=DEPTID,POSITION_NBR,REPORTS_TO&prompt_fieldvalue=${department_id},,`,
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
        extra: `prompt_uniquepromptname=DEPTID,POSITION_NBR,REPORTS_TO&prompt_fieldvalue=,${position_id},`,
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

  async createPosition(data: PositionCreateInput) {
    const response = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('PEOPLESOFT_URL').replace('/ExecuteQuery.v1/PUBLIC', '')}/${
            Endpoint.CreatePosition
          }`,
          data,
          { headers: this.headers },
        )
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
