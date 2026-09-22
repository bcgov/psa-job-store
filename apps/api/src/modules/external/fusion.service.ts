import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SearchIndex, SearchService } from '../search/search.service';
import { Employee } from './models/employee.model';

enum PeoplesoftEndpoint {
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

type HRScopeResponse = {
  'A.POSITION_NBR': string;
  'A.EFFDT': string;
  'A.EFF_STATUS': string;
  'A.DESCR': string;
  'A.DESCRSHORT': string;
  'A.BUSINESS_UNIT': string;
  'A.DEPTID': string;
  'B.DESCR': string;
  'A.JOBCODE': string;
  'A.POSN_STATUS': string;
  'A.STATUS_DT': string;
  'A.REPORTS_TO': string;
  'A.SAL_ADMIN_PLAN': string;
  'A.TGB_E_CLASS': string;
  'A.LOCATION': string;
  'A.UPDATE_INCUMBENTS': string;
};

@Injectable()
export class FusionService {
  private readonly logger = new Logger(FusionService.name);
  private readonly fusionHeaders: AxiosHeaders;
  private readonly peoplesoftHeaders: AxiosHeaders;

  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly searchService: SearchService,
  ) {
    this.fusionHeaders = new AxiosHeaders();
    this.fusionHeaders.set(
      'Authorization',
      `Basic ${Buffer.from(
        `${this.configService.get('FUSION_USERNAME')}:${this.configService.get('FUSION_PASSWORD')}`,
      ).toString('base64')}`,
    );
    this.fusionHeaders.set('REST-Framework-Version', 9);

    this.peoplesoftHeaders = new AxiosHeaders();
    this.peoplesoftHeaders.set(
      'Authorization',
      `Basic ${Buffer.from(
        `${this.configService.get('PEOPLESOFT_USERNAME')}:${this.configService.get('PEOPLESOFT_PASSWORD')}`,
      ).toString('base64')}`,
    );
  }

  async getClassifications(limit: number = 50, offset: number = 0) {
    const response = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/jobs?expand=validGrades,JobCustomerFlex&onlyData=true&fields=JobId,JobCode,Name,validGrades,JobCustomerFlex,ActiveStatus,EffectiveStartDate&limit=${limit}&offset=${offset}`,
          { headers: this.fusionHeaders },
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

  async getDepartments(limit: number = 50, offset: number = 0) {
    const response = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/organizations?q=ClassificationCode='DEPARTMENT'&expand=all&onlyData=true&fields=OrganizationId,LocationId,Name,Title,LocationId,Status,EffectiveStartDate,OrganizationDFF&limit=${limit}&offset=${offset}`,
          { headers: this.fusionHeaders },
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

  async getEmployee(employee_id: string) {
    const employee = await this.getEmployeeV2(employee_id);

    return {
      data: {
        query: {
          rows: employee ? [employee] : [],
        },
      },
    };
  }

  async getEmployeeV2(employee_id: string): Promise<
    | {
        POSITION_NBR: string;
        EMPLID: string;
        NAME_DISPLAY: string;
        BUSINESS_UNIT: string;
        SETID_DEPT: string;
        DEPTID: string;
        JOBCODE: string;
        SUPERVISOR_ID: string;
        REPORTS_TO: string;
        LOCATION: string;
        COMPANY: string;
        ACTION_REASON: string;
        SHIFT: string;
        EMPL_STATUS: string;
        HR_STATUS: string;
        REG_TEMP: string;
        FULL_PART_TIME: string;
        EFFDT: string;
        POSITION_ENTRY_DT: string;
        ACTION_DT: string;
      }
    | undefined
  > {
    // Get worker which matches the supplied employee_id
    const worker = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/publicWorkers?limit=500&offset=0&expand=assignments.managers,assignments.allReports&q=PersonNumber='${employee_id}'&onlyData=true`,
          { headers: this.fusionHeaders },
        )
        .pipe(
          map((r) => {
            return r.data.items?.[0];
          }),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );
    const assignment = worker.assignments?.items?.[0];
    const position = assignment ? (await this.getPosition(assignment.PositionCode))?.data?.query?.rows?.[0] : undefined;

    return worker
      ? {
          POSITION_NBR: position['A.POSITION_NBR'],
          EMPLID: worker.PersonNumber,
          NAME_DISPLAY: worker.DisplayName,
          BUSINESS_UNIT: position['A.BUSINESS_UNIT'],
          SETID_DEPT: '',
          DEPTID: position['A.DEPTID'],
          JOBCODE: position['A.JOBCODE'],
          SUPERVISOR_ID: '',
          REPORTS_TO: position['A.REPORTS_TO'],
          LOCATION: position['A.LOCATION'],
          COMPANY: position['A.SAL_ADMIN_PLAN'],
          ACTION_REASON: '',
          SHIFT: '',
          EMPL_STATUS: position['A.POSN_STATUS'],
          HR_STATUS: position['A.EFF_STATUS'],
          REG_TEMP: '', // Not used anywhere, unavailable in PS-compatible HRScopeV2 endpoints
          FULL_PART_TIME: assignment.FullPartTime === 'FULL_TIME' ? 'Full Time' : 'Part Time',
          EFFDT: '',
          POSITION_ENTRY_DT: '',
          ACTION_DT: '',
        }
      : undefined;
  }

  async getEmployeesForPositions(position_ids: string[]) {
    const positionEmployeesMap: Map<string, Employee[]> = new Map();

    const positions = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/positions?onlyData=true&limit=500&offset=0&fields=PositionCode,ActiveStatus&q=PositionCode IN (${position_ids.map((id) => +id).join(',')})`,
          { headers: this.fusionHeaders },
        )
        .pipe(
          map((r) => r.data.items),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    const workers = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/publicWorkers?limit=500&offset=0&onlyData=true&fields=PersonNumber,DisplayName,assignments&q=assignments.PositionCode IN (${position_ids.join(',')})`,
          { headers: this.fusionHeaders },
        )
        .pipe(
          map((r) => r.data.items),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    positions.forEach((position) => {
      const workersForPosition = workers.filter((worker) =>
        worker.assignments.items.some((assignment) => assignment.PositionCode === position.PositionCode),
      );

      positionEmployeesMap.set(
        String(position.PositionCode).padStart(8, '0'),
        workersForPosition.map((worker) => {
          const value = {
            id: worker.PersonNumber,
            name: worker.DisplayName,
            status: position.ActiveStatus === 'A' ? 'Active' : 'Inactive',
          };

          return value;
        }),
      );
    });

    return positionEmployeesMap;
  }

  async getGrades(limit: number = 50, offset: number = 0) {
    const response = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/grades?onlyData=true&fields=GradeId,GradeCode,ActiveStatus,EffectiveStartDate&limit=${limit}&offset=${offset}`,
          { headers: this.fusionHeaders },
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

  async getLocations(limit: number = 50, offset: number = 0) {
    const response = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/locationsV2?onlyData=true&limit=${limit}&offset=${offset}&expand=locationsDFF,addresses&fields=LocationId,LocationCode,ActiveStatusMeaning,EffectiveStartDate,addresses,locationsDFF`,
          { headers: this.fusionHeaders },
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

  async getOrganizations(limit: number = 50, offset: number = 0) {
    const response = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/organizations/?q=ClassificationCode='FUN_BUSINESS_UNIT' AND Name LIKE '%(BC???)'&onlyData=true&fields=OrganizationId,Name,Status,EffectiveStartDate&limit=${limit}&offset=${offset}`,
          { headers: this.fusionHeaders },
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

  async getPosition(position_number: string) {
    return {
      data: {
        query: {
          rows: await this.getHRScopeV2(undefined, position_number, undefined),
        },
      },
    };
  }

  async getPositionsForDepartment(department_id: string) {
    const { fusion_id } = await this.prisma.department.findUnique({
      where: { id: department_id },
      select: { fusion_id: true },
    });

    const positions = await this.getHRScopeV2(fusion_id.toString(), undefined, undefined);

    return {
      data: {
        query: {
          rows: positions,
        },
      },
    };
  }

  async syncClassifications() {
    this.logger.log(`Start syncClassifications @ ${new Date()}`);

    const grades = await this.prisma.grade.findMany({ select: { id: true, employee_group_id: true, grade: true } });
    const gradeMap = new Map();
    grades.forEach((grade) =>
      gradeMap.set(grade.id, { employee_group_id: grade.employee_group_id, grade: grade.grade }),
    );

    let fetchNextPage: boolean = true;
    const limit: number = 500;
    let offset: number = 0;

    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore } = await this.getClassifications(limit, offset);

      for await (const item of items) {
        const regex = /^(.*?)(?:_(.*))?$/;
        const [_, setId, jobCode] = item.JobCode.match(regex);
        const [gradeId, employeeGroupId, grade] = ((): [any, any, any] => {
          const gradeId: BigInt = BigInt(item.validGrades?.items?.[0]?.GradeId);

          const { employee_group_id, grade } = gradeMap.get(gradeId) ?? {
            employee_group_id: undefined,
            group: undefined,
          };

          return [gradeId, employee_group_id, grade];
        })();
        //
        await this.prisma.classification.upsert({
          where: {
            id_employee_group_id_peoplesoft_id: {
              id: jobCode,
              employee_group_id: employeeGroupId,
              peoplesoft_id: setId,
            },
          },
          create: {
            id: jobCode,
            ...(employeeGroupId != null && {
              employee_group: {
                connect: {
                  id: employeeGroupId,
                },
              },
            }),
            peoplesoft_id: setId,
            fusion_id: item.JobId,
            code: item.JobCustomerFlex?.items?.[0]?.shortDescription,
            name: item.Name,
            grade: grade,
            effective_status: item.ActiveStatus === 'A' ? 'Active' : 'Inactive',
            effective_date: new Date(item.EffectiveStartDate),
          },
          update: {
            ...(employeeGroupId != null && {
              employee_group: {
                connect: {
                  id: employeeGroupId,
                },
              },
            }),
            peoplesoft_id: setId,
            fusion_id: item.JobId,
            code: item.JobCustomerFlex?.items?.[0]?.shortDescription,
            name: item.Name,
            grade: grade,
            effective_status: item.ActiveStatus === 'A' ? 'Active' : 'Inactive',
            effective_date: new Date(item.EffectiveStartDate),
          },
        });
      }

      fetchNextPage = hasMore;
      if (fetchNextPage) {
        offset = offset + limit;
      }
    }

    this.logger.log(`End syncClassifications @ ${new Date()}`);
  }

  async syncDepartments() {
    this.logger.log(`Start syncDepartments @ ${new Date()}`);

    // const grades = await this.prisma.grade.findMany({ select: { id: true, employee_group_id: true, grade: true } });
    // const gradeMap = new Map();
    // grades.forEach((grade) =>
    //   gradeMap.set(grade.id, { employee_group_id: grade.employee_group_id, grade: grade.grade }),
    // );
    const ministries = await this.prisma.organization.findMany({ select: { id: true } });
    const ministryMap = new Map();
    ministries.forEach((ministry) => ministryMap.set(ministry.id, ministry.id));

    const locations = await this.prisma.location.findMany({ select: { id: true, fusion_id: true } });
    const locationMap = new Map();
    locations.forEach((location) => locationMap.set(location.fusion_id, location.id));

    await this.searchService.resetIndex();

    let fetchNextPage: boolean = true;
    const limit: number = 500;
    let offset: number = 0;
    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore } = await this.getDepartments(limit, offset);

      for await (const item of items) {
        const [_, numericMinistryId] = item.Name.match(/^([^-]+)/);
        const ministryId = `BC${numericMinistryId}`;
        const location = item.LocationId ? locationMap.get(BigInt(item.LocationId)) : undefined;

        if (location && ministryId && ministryMap.get(ministryId)) {
          await this.prisma.department.upsert({
            where: {
              id: item.Name,
            },
            create: {
              id: item.Name,
              location: {
                connect: {
                  id: location,
                },
              },
              organization: {
                connect: {
                  id: ministryId,
                },
              },
              peoplesoft_id: (ministryId ?? '').replace('BC', 'ST'),
              fusion_id: item.OrganizationId,
              code: item.OrganizationDFF?.items?.[0]?.departmentShortDescription,
              name: item.Title,
              effective_status: item.Status === 'A' ? 'Active' : 'Inactive',
              effective_date: new Date(item.EffectiveStartDate),
            },
            update: {
              id: item.Name,
              location: {
                connect: {
                  id: location,
                },
              },
              organization: {
                connect: {
                  id: ministryId,
                },
              },
              peoplesoft_id: (ministryId ?? '').replace('BC', 'ST'),
              fusion_id: item.OrganizationId,
              code: item.OrganizationDFF?.items?.[0]?.departmentShortDescription,
              name: item.Title,
              effective_status: item.Status === 'A' ? 'Active' : 'Inactive',
              effective_date: new Date(item.EffectiveStartDate),
            },
          });

          await this.searchService.indexDocument(SearchIndex.SettingsDocument, item.Name, {
            id: item.Name,
            name: item.Title,
          });

          await this.prisma.departmentMetadata.upsert({
            where: {
              department_id: item.Name,
            },
            create: {
              department: {
                connect: {
                  id: item.Name,
                },
              },
            },
            update: {},
          });
        }
      }

      fetchNextPage = hasMore;
      if (fetchNextPage) {
        offset = offset + limit;
      }
    }

    this.logger.log(`End syncDepartments @ ${new Date()}`);
  }

  async syncGrades() {
    this.logger.log(`Start syncGrades @ ${new Date()}`);

    let fetchNextPage: boolean = true;
    const limit: number = 500;
    let offset: number = 0;

    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore } = await this.getGrades(limit, offset);

      for await (const item of items) {
        const regex = /^(.*?)(?:_(.*))?$/;
        const match = item.GradeCode.match(regex);

        const employee_group_id = match[1];
        const grade = match[2] ?? employee_group_id;

        await this.prisma.grade.upsert({
          where: {
            id: item.GradeId,
          },
          create: {
            id: item.GradeId,
            employee_group_id,
            grade,
            effective_status: item.ActiveStatus === 'A' ? 'Active' : 'Inactive',
            effective_date: new Date(item.EffectiveStartDate),
          },
          update: {
            employee_group_id,
            grade,
            effective_status: item.ActiveStatus === 'A' ? 'Active' : 'Inactive',
            effective_date: new Date(item.EffectiveStartDate),
          },
        });
      }

      fetchNextPage = hasMore;
      if (fetchNextPage) {
        offset = offset + limit;
      }
    }

    this.logger.log(`End syncGrades @ ${new Date()}`);
  }

  async syncLocations() {
    this.logger.log(`Start syncLocations @ ${new Date()}`);

    let fetchNextPage: boolean = true;
    const limit: number = 500;
    let offset: number = 0;

    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore } = await this.getLocations(limit, offset);

      for await (const item of items) {
        await this.prisma.location.upsert({
          where: {
            id: item.LocationCode,
          },
          create: {
            id: item.LocationCode,
            peoplesoft_id: 'BCSET',
            fusion_id: item.LocationId,
            code: item.locationsDFF?.items?.[0]?.shortDescription ?? '',
            name: item.addresses?.items?.[0]?.AddressLine1,
            effective_status: item.ActiveStatusMeaning,
            effective_date: new Date(item.EffectiveStartDate),
          },
          update: {
            peoplesoft_id: 'BCSET',
            fusion_id: item.LocationId,
            code: item.locationsDFF?.items?.[0]?.shortDescription ?? '',
            name: item.addresses?.items?.[0]?.AddressLine1,
            effective_status: item.ActiveStatusMeaning,
            effective_date: new Date(item.EffectiveStartDate),
          },
        });
      }

      fetchNextPage = hasMore;
      if (fetchNextPage) {
        offset = offset + limit;
      }
    }

    this.logger.log(`End syncLocations @ ${new Date()}`);
  }

  async syncOrganizations() {
    this.logger.log(`Start syncOrganizations @ ${new Date()}`);

    let fetchNextPage: boolean = true;
    const limit: number = 500;
    let offset: number = 0;
    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore } = await this.getOrganizations(limit, offset);

      for await (const item of items) {
        const parts = item.Name.match(/^(.+?)\s*\(([^()]+)\)$/) ?? [];
        const [_, name, id] = parts;

        if (id && name) {
          try {
            await this.prisma.organization.upsert({
              where: {
                id: id,
              },
              create: {
                id,
                peoplesoft_id: id.replace('BC', 'ST'),
                fusion_id: item.OrganizationId,
                code: id.replace('BC', 'ST'),
                name,
                effective_status: item.Status === 'A' ? 'Active' : 'Inactive',
                effective_date: new Date(item.EffectiveStartDate),
              },
              update: {
                peoplesoft_id: id.replace('BC', 'ST'),
                fusion_id: item.OrganizationId,
                code: id.replace('BC', 'ST'),
                name,
                effective_status: item.Status === 'A' ? 'Active' : 'Inactive',
                effective_date: new Date(item.EffectiveStartDate),
              },
            });
          } catch (error) {
            console.log('error!');
          }
        }
      }

      fetchNextPage = hasMore;
      if (fetchNextPage) {
        offset = offset + limit;
      }
    }

    this.logger.log(`End syncOrganizations @ ${new Date()}`);
  }

  async syncOrganizationsAndDepartments() {
    // Use this function instead of calling syncOrganizations, syncDepartments independently
    // Departments rely on organizations which must exist prior to syncing departments
    await this.syncOrganizations();
    await this.syncDepartments();
  }

  private async getHRScopeV2(
    dept_id?: string,
    position_nbr?: string,
    reports_to?: string,
  ): Promise<HRScopeResponse[] | undefined> {
    const positionQ =
      dept_id != null
        ? `DepartmentId=${dept_id}`
        : position_nbr != null
          ? `PositionCode=${+position_nbr}`
          : reports_to != null
            ? `${reports_to}`
            : null;
    if (positionQ === null) throw new Error('Must have one of: dept_id, position_nbr or reports_to');

    const positions = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/positions?onlyData=true&expand=all&limit=500&offset=0&q=${positionQ}`,
          { headers: this.fusionHeaders },
        )
        .pipe(
          map((r) => {
            return r.data.items ?? undefined;
          }),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    const results = [];
    for await (const item of positions) {
      const positionNumber = String(item.PositionCode).padStart(8, '0');

      const department = await this.prisma.department.findUnique({ where: { fusion_id: item.DepartmentId } });
      const classification = await this.prisma.classification.findUnique({ where: { fusion_id: item.JobId } });
      const location = item.LocationId ? await this.prisma.location.findUnique({ where: { fusion_id: item.LocationId } }) : undefined;
      const worker = await this.getPublicWorker(positionNumber);

      results.push({
        'A.POSITION_NBR': positionNumber,
        'A.EFFDT': item.EffectiveStartDate,
        'A.EFF_STATUS': item.ActiveStatus === 'A' ? 'Active' : item.ActiveStatus === 'D' ? 'Deleted' : 'Frozen',
        'A.DESCR': item.Name,
        'A.DESCRSHORT': item.PositionCustomerFlex?.items?.[0]?.shortDescription,
        'A.BUSINESS_UNIT': department?.organization_id,
        'A.DEPTID': department?.id ?? '',
        'B.DESCR': department?.name ?? '',
        'A.JOBCODE': classification?.id ?? '',
        'A.POSN_STATUS': item.HiringStatus === 'APPROVED' ? 'Approved' : item.HiringStatus === 'FROZEN' ? 'Frozen' : '',
        'A.STATUS_DT': '',
        'A.REPORTS_TO': worker?.assignments?.items?.[0]?.managers?.items?.[0]?.PositionCode
          ? String(worker?.assignments?.items?.[0]?.managers?.items?.[0]?.PositionCode ?? '').padStart(8, '0')
          : '',
        'A.SAL_ADMIN_PLAN': classification?.employee_group_id,
        'A.TGB_E_CLASS': item.PositionCustomerFlex?.items?.[0]?.caseProfile ?? '',
        'A.LOCATION': location?.id ?? '',
        'A.UPDATE_INCUMBENTS': '',
      });
    }

    return results;
  }

  async getProfileV2(
    idir?: string,
    emplid?: string,
  ): Promise<
    | {
        OPRID: string;
        OPRDEFNDESC: string;
        EMPLID: string;
        EMAILID: string;
        GUID: string;
      }
    | undefined
  > {
    const response = await firstValueFrom(
      this.httpService
        .get(
          [
            this.configService.get('PEOPLESOFT_URL'),
            [
              [PeoplesoftEndpoint.Profile, 'JSON', 'NONFILE'].join('/'),
              [
                'isconnectedquery=n',
                'maxrows=1',
                'prompt_uniquepromptname=USERID,EMPLID',
                `prompt_fieldvalue=${idir ? idir + ',' : ',' + emplid}`,
                'json_resp=true',
              ].join('&'),
            ].join('?'),
          ].join('/'),
          {
            headers: this.peoplesoftHeaders,
          },
        )
        .pipe(
          map((r) => {
            if (r.data.status === 'success') {
              const { rows } = r.data.data.query;

              if (rows.length > 0) {
                const profile = rows[0];
                delete profile['attr:rownumber'];

                return profile;
              } else {
                return undefined;
              }
            }

            return undefined;
          }),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    return response;
  }

  private async getPublicWorker(position_number: string) {
    return (await this.getPublicWorkers([position_number]))?.[0];
  }

  private async getPublicWorkers(position_numbers: string[]) {
    const result = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/publicWorkers?limit=500&offset=0&expand=assignments.managers,assignments.allReports&q=assignments.PositionCode IN (${position_numbers.map((id) => `'${+id}'`).join(',')})&onlyData=true`,
          { headers: this.fusionHeaders },
        )
        .pipe(
          map((r) => {
            return r.data.items ?? undefined;
          }),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    return result;
  }
}
