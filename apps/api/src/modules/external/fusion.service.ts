import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SearchIndex, SearchService } from '../search/search.service';
import { Employee } from './models/employee.model';
import { PositionCreateInput } from './models/position-create.input';

import dayjs from 'dayjs';
import { AlexandriaError } from 'src/utils/alexandria-error';

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

const environment = 'TEST';

enum Endpoints {
  GetWorker = `/ic/api/integration/v1/flows/rest/HCM_IN_GET_WORKERS_${environment}/1.0/`,
  Worker = `/ic/api/integration/v1/flows/rest/HCM_IN_PUBLIC_WORKERS_DEV1/1.0/`,
  Position = `/ic/api/integration/v1/flows/rest/HCM_IN_GET_POSITIONS_${environment}/1.0/`,
  CreatePosition = `/ic/api/integration/v1/flows/rest/HCM_IN_POSITION_${environment}/1.0/position`,
  Organization = `/ic/api/integration/v1/flows/rest/HCM_IN_PULL_ORGANIZATIONS_DEV1/1.0/`,
  Location = `/ic/api/integration/v1/flows/rest/HCM_IN_PULL_LOCATIONS_DEV1/1.0/`,
  Job = `/ic/api/integration/v1/flows/rest/HCM_IN_PULL_JOBS_DEV1/1.0/`,
  Grade = `/ic/api/integration/v1/flows/rest/HCM_IN_PULL_GRADES_DEV1/1.0/`,
  GetGrade = `/ic/api/integration/v1/flows/rest/HCM_IN_GET_GRADES_${environment}/1.0/`,
  PositionStatus = `/ic/api/integration/v1/flows/rest/HCM_IN_POSITION_STATUS_${environment}/1.0/`,
  PositionsLov = `/ic/api/integration/v1/flows/rest/HCM_IN_GET_POSITIONSLOV_${environment}/1.0/`,
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

class OAuth2 {
  private readonly logger = new Logger(FusionService.name);
  private readonly oauthHeaders: AxiosHeaders;
  private readonly tokenUrl: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly clientScope: string;
  private readonly payload: Map<string, string> = new Map();
  private accessToken: string;

  private readonly RENEW_TIMEOUT: number = 3000 * 1000;

  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
  ) {
    this.tokenUrl = this.configService.get('FUSION_TOKEN_URL');
    this.clientId = this.configService.get('FUSION_CLIENT_ID');
    this.clientSecret = this.configService.get('FUSION_CLIENT_SECRET');
    this.clientScope = this.configService.get('FUSION_CLIENT_SCOPE');

    this.payload.set('grant_type', 'client_credentials');
    this.payload.set('scope', this.clientScope);

    this.oauthHeaders = new AxiosHeaders();

    this.oauthHeaders.set(
      'Authorization',
      `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
    );

    this.oauthHeaders.set('Content-Type', 'application/x-www-form-urlencoded');

    this.renewAuthToken();
  }

  renewAuthToken(): void {
    setTimeout(async () => {
      this.logger.log('Renewing authentication token.');
      await this.getAccessToken();
      this.renewAuthToken();
    }, this.RENEW_TIMEOUT);
  }

  async getAccessToken(): Promise<void> {
    const response = await firstValueFrom(
      this.httpService
        .post(
          this.tokenUrl,
          {
            grant_type: this.payload.get('grant_type'),
            scope: this.payload.get('scope'),
          },
          { headers: this.oauthHeaders },
        )
        .pipe(
          map((r) => r.data),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    if (response && response.hasOwnProperty('access_token')) {
      this.accessToken = response['access_token'];
      return Promise.resolve();
    } else {
      this.logger.error('OAuth2 Failed to obtain Fusion access token');
      return Promise.reject();
    }
  }

  getAuthHeader() {
    return `Bearer ${this.accessToken}`;
  }
}

let syncSemaphore: boolean = false;

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

    const oauth = new OAuth2(this.configService, this.httpService);
    oauth
      .getAccessToken()
      .then(() => {
        this.fusionHeaders.set('Authorization', oauth.getAuthHeader());

        this.fusionHeaders.set('REST-Framework-Version', 9);

        this.syncManually();
        this.logger.log('Obtained OAuth access token.');
      })
      .catch(() => {
        this.logger.error('Failed to get access token.');
      });

    this.peoplesoftHeaders = new AxiosHeaders();
    this.peoplesoftHeaders.set(
      'Authorization',
      `Basic ${Buffer.from(
        `${this.configService.get('PEOPLESOFT_USERNAME')}:${this.configService.get('PEOPLESOFT_PASSWORD')}`,
      ).toString('base64')}`,
    );
  }

  async syncManually() {
    if (syncSemaphore) {
      return this.logger.log('Already syncing.');
    }

    syncSemaphore = true;

    await this.syncWorkers();
    return;

    await this.syncGrades(); //
    await this.syncLocations(); //
    await this.syncClassifications();

    await this.syncPositions();
    //await this.syncPositionsLov(); // Removed, because LOV can not return all the results, see BGCO-4457

    await this.syncOrganizationsAndDepartments();

    syncSemaphore = false;
  }

  async getClassifications(limit: number = 50, offset: number = 0) {
    const response = await firstValueFrom(
      this.httpService
        .post(
          //`${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/jobs?expand=validGrades,JobCustomerFlex&onlyData=true&fields=JobId,JobCode,Name,validGrades,JobCustomerFlex,ActiveStatus,EffectiveStartDate&limit=${limit}&offset=${offset}`,
          `${this.configService.get('FUSION_URL')}${Endpoints.Job}`,
          {
            jobId: '',
            jobsUniqId: '',
            childType: '',
            childUniqId: '',
            offset,
            limit,
          },
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
        .post(
          //`${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/organizations?q=ClassificationCode='DEPARTMENT'&expand=all&onlyData=true&fields=OrganizationId,LocationId,Name,Title,LocationId,Status,EffectiveStartDate,OrganizationDFF&limit=${limit}&offset=${offset}`,
          `${this.configService.get('FUSION_URL')}${Endpoints.Organization}`,
          {
            organizationsUniqId: '',
            childType: '',
            childUniqId: '',
            offset,
            limit,
          },
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

  async getPositions(limit: number = 50, offset: number = 0) {
    // TES - Need to include reportsToPositionId
    const response = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('FUSION_URL')}${Endpoints.Position}`,
          {
            positionsUniqId: '',
            childType: '',
            childUniqId: '',
            limit,
            offset,
          },
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

  async getWorkers(limit: number = 50, offset: number = 0) {
    const response = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('FUSION_URL')}${Endpoints.Worker}`,
          {
            personId: '',
            childType: '',
            childUniqId: '',
            childType2: '',
            childUniqId2: '',
            limit,
            offset,
          },
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

    this.logger.log('Employee is now ', employee);

    return {
      data: {
        query: {
          rows: employee ? [employee] : [],
        },
      },
    };
  }

  async getPersonIdFromEmployeeId(employee_id: string): Promise<string> {
    try {
      const result = await this.prisma.employee.findFirstOrThrow({
        select: { id: true, fusion_id: true },
        where: { id: employee_id },
      });
      this.logger.log(result);
      return new String(result.fusion_id).toString();
    } catch (e) {
      this.logger.error('PersonId lookup error', e);
      return null;
    }
  }

  async getSubordinatesV2(reporting_to: string) {
    return await this.getHRScopeV2(undefined, undefined, reporting_to);
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

    this.logger.log(`Get worker info for ${employee_id}`);

    const personId = await this.getPersonIdFromEmployeeId(employee_id);

    if (personId == null) {
      return null;
    }

    const workerDetails = await firstValueFrom(
      this.httpService
        .post(
          //`${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/publicWorkers?limit=500&offset=0&expand=assignments.managers,assignments.allReports&q=PersonNumber='${employee_id}'&onlyData=true`,
          `${this.configService.get('FUSION_URL')}${Endpoints.GetWorker}`,
          {
            personId: personId,
            childType: '',
            childUniqId: '',
            childType2: '',
            childUniqId2: '',
          },
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

    const workerAssignment = await firstValueFrom(
      this.httpService
        .post(
          //`${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/publicWorkers?limit=500&offset=0&expand=assignments.managers,assignments.allReports&q=PersonNumber='${employee_id}'&onlyData=true`,
          `${this.configService.get('FUSION_URL')}${Endpoints.GetWorker}`,
          {
            personId: personId,
            childType: 'assignments',
            childUniqId: '',
            childType2: '',
            childUniqId2: '',
          },
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

    const worker = Object.assign({}, workerDetails, workerAssignment);

    console.log('Worker ', worker);
    //const assignment = worker.assignments[0] || {};
    //const assignmentId = worker.AssignmentId;

    const positionResult = await this.getPosition(worker.PositionCode);
    this.logger.log('PositionResult ', positionResult);
    const position = (positionResult ? positionResult?.data?.query?.rows?.[0] : null) ?? {};
    this.logger.log('Position ', position);

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
          FULL_PART_TIME: worker.FullPartTime === 'FULL_TIME' ? 'Full Time' : 'Part Time',
          EFFDT: '',
          POSITION_ENTRY_DT: '',
          ACTION_DT: '',
        }
      : undefined;
  }

  async getEmployeesForPositions(position_ids: string[]) {
    const positionEmployeesMap: Map<string, Employee[]> = new Map();

    // This can be changed to make use of the local database
    /*
    const positions = await firstValueFrom(
      this.httpService
        .post(
          //`${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/positions?onlyData=true&limit=500&offset=0&fields=PositionCode,ActiveStatus&q=PositionCode IN (${position_ids.map((id) => +id).join(',')})`,
          `${this.configService.get('FUSION_URL')}${Endpoints.Position}`,
          { headers: this.fusionHeaders },
          {

          }
        )
        .pipe(
          map((r) => r.data.items),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );
    */

    this.logger.log('position_ids ', position_ids);

    const positions = await this.prisma.position.findMany({ where: { positionCode: { in: position_ids } } });
    this.logger.log('Positions are now ', positions);

    // Iterate over the IDs and do individual queries I guess
    const workers = [];

    for (const position of position_ids) {
      // This does not work, so do a local lookup instead
      const worker = await this.prisma.employee.findMany({ where: { position_code: position } });

      workers.push(worker);
    }

    this.logger.log('workers ', workers);

    positions.forEach((position) => {
      const workersForPosition = workers.filter((worker) =>
        worker.assignments?.some((assignment) => assignment.PositionCode === position.positionCode),
      );

      positionEmployeesMap.set(
        String(position.positionCode).padStart(6, '0'),
        workersForPosition.map((worker) => {
          const value = {
            id: worker.PersonNumber,
            name: worker.DisplayName,
            status: position.activeStatus === 'A' ? 'Active' : 'Inactive',
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
        .post(
          //`${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/grades?onlyData=true&fields=GradeId,GradeCode,ActiveStatus,EffectiveStartDate&limit=${limit}&offset=${offset}`,
          `${this.configService.get('FUSION_URL')}${Endpoints.GetGrade}`,
          {
            gradesUniqId: '',
            childType: '',
            childUniqId: '',
            offset,
            limit,
          },
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

  async getGradeSteps(gradesUniqId: string) {
    const response = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('FUSION_URL')}${Endpoints.GetGrade}`,
          {
            gradesUniqId: gradesUniqId,
            childType: 'steps',
            childUniqId: '',
            offset: 0,
            limit: 100,
          },
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

  async getPositionsLov(limit: number = 50, offset: number = 0) {
    // TES - Have it return ALL positions so that we can map to parent positions
    // Update:: This is not possible BGCO-4457

    const response = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('FUSION_URL')}${Endpoints.PositionsLov}`,
          {
            positionsLovV2UniqId: '',
            offset,
            limit,
          },
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
        .post(
          //`${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/locationsV2?onlyData=true&limit=${limit}&offset=${offset}&expand=locationsDFF,addresses&fields=LocationId,LocationCode,ActiveStatusMeaning,EffectiveStartDate,addresses,locationsDFF`,
          `${this.configService.get('FUSION_URL')}${Endpoints.Location}`,
          {
            locationsUniqId: '',
            childType: '',
            childUniqId: '',
            offset,
            limit,
          },
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
    console.log('Sync ', limit, offset);
    const response = await firstValueFrom(
      this.httpService
        .post(
          //`${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/organizations/?q=ClassificationCode='FUN_BUSINESS_UNIT';Name LIKE '%(BC???)'&onlyData=true&fields=OrganizationId,Name,Status,EffectiveStartDate&limit=${limit}&offset=${offset}`,
          `${this.configService.get('FUSION_URL')}${Endpoints.Organization}`,
          {
            organizationsUniqId: '',
            childType: '',
            childUniqId: '',
            offset,
            limit,
          },
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
    let totalNumberOfResults: number = limit;

    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore, totalResults } = await this.getClassifications(
        this.getAvailableBatchSize(limit, offset, totalNumberOfResults),
        offset,
      );
      totalNumberOfResults = totalResults;

      for await (const item of items) {
        const regex = /^(.*?)(?:_(.*))?$/;
        const [_, setId, jobCode] = item.JobCode.match(regex);
        if (item.validGrades == null || item.validGrades[0]?.GradeId == null) continue;

        const [gradeId, employeeGroupId, grade] = ((): [any, any, any] => {
          const gradeId: BigInt = BigInt(item.validGrades[0]?.GradeId);

          const { employee_group_id, grade } = gradeMap.get(gradeId) ?? {
            employee_group_id: undefined,
            group: undefined,
          };

          return [gradeId, employee_group_id, grade];
        })();

        try {
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
              employee_group: {
                connect: {
                  id: employeeGroupId,
                },
              },
              peoplesoft_id: setId,
              fusion_id: item.JobId,
              code: item.JobCustomerFlex[0]?.shortDescription,
              name: item.Name,
              grade: grade,
              effective_status: item.ActiveStatus === 'A' ? 'Active' : 'Inactive',
              effective_date: new Date(item.EffectiveStartDate),
            },
            update: {
              employee_group: {
                connect: {
                  id: employeeGroupId,
                },
              },
              peoplesoft_id: setId,
              fusion_id: item.JobId,
              code: item.JobCustomerFlex[0]?.shortDescription,
              name: item.Name,
              grade: grade,
              effective_status: item.ActiveStatus === 'A' ? 'Active' : 'Inactive',
              effective_date: new Date(item.EffectiveStartDate),
            },
          });
        } catch (e) {
          this.logger.log(gradeId, employeeGroupId, grade);
          this.logger.log(e);
        }
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
    const ministries = await this.prisma.department.findMany({ select: { id: true, fusion_id: true } });
    const ministryMap = new Map();
    ministries.forEach((ministry) => ministryMap.set(ministry.id, ministry.fusion_id));

    const locations = await this.prisma.location.findMany({ select: { id: true, fusion_id: true } });
    const locationMap = new Map();
    locations.forEach((location) => locationMap.set(location.fusion_id, location.id));

    try {
      await this.searchService.resetIndex();
    } catch (e) {
      this.logger.error('Reset index failed ', e);
    }

    let fetchNextPage: boolean = true;
    const limit: number = 500;
    let offset: number = 0;
    let totalNumberOfResults: number = limit;

    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore, totalResults } = await this.getDepartments(
        this.getAvailableBatchSize(limit, offset, totalNumberOfResults),
        offset,
      );
      totalNumberOfResults = totalResults;

      for await (const item of items) {
        const ministryId = item.OrganizationDFF[0]?.parentDepartmentName;

        if (ministryId && ministryMap.get(ministryId)) {
          if (!/^\d{3}\-/.test(`${item.Name}`)) continue;
          //console.log("Min ", ministryId);
          //console.log("Loc ", item.LocationId );
          // TES, this is still "039-9999" vs "BC100"

          try {
            await this.prisma.department.upsert({
              where: {
                id: item.Name,
              },
              create: {
                id: item.Name,
                location: {
                  connect: {
                    id: item.LocationId ? locationMap.get(BigInt(item.LocationId)) : '',
                  },
                },
                organization: {
                  connect: {
                    id: 'BC100', //ministryId,
                  },
                },
                peoplesoft_id: (ministryId ?? '').replace('BC', 'ST'),
                fusion_id: item.OrganizationId,
                code: item.OrganizationDFF[0]?.departmentShortDescription ?? 'N/A',
                name: item.Title,
                effective_status: item.Status === 'A' ? 'Active' : 'Inactive', // Change to activeStatus?
                effective_date: new Date(item.EffectiveStartDate),
              },
              update: {
                id: item.Name,
                location: {
                  connect: {
                    id: item.LocationId ? locationMap.get(BigInt(item.LocationId)) : '',
                  },
                },
                organization: {
                  connect: {
                    id: 'BC100', //ministryId,
                  },
                },
                peoplesoft_id: (ministryId ?? '').replace('BC', 'ST'),
                fusion_id: item.OrganizationId,
                code: item.OrganizationDFF[0]?.departmentShortDescription ?? 'N/A',
                name: item.Title,
                effective_status: item.Status === 'A' ? 'Active' : 'Inactive',
                effective_date: new Date(item.EffectiveStartDate),
              },
            });
          } catch (e) {
            //this.logger.error(e);
          }

          try {
            await this.searchService.indexDocument(SearchIndex.SettingsDocument, item.Name, {
              id: item.Name,
              name: item.Title,
            });
          } catch (e) {
            this.logger.error(e);
          }

          //console.log("Meta connect to ", item.Name);
          try {
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
          } catch (e) {
            //this.logger.error(e);
          }
        } else {
          //this.logger.log('Min id not found ', ministryId);
          //this.logger.log(item);
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
    let totalNumberOfResults: number = limit;

    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore, totalResults } = await this.getGrades(
        this.getAvailableBatchSize(limit, offset, totalNumberOfResults),
        offset,
      );
      totalNumberOfResults = totalResults;

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
            grade_uniq_id: item.GradeUniqId,
          },
          update: {
            employee_group_id,
            grade,
            effective_status: item.ActiveStatus === 'A' ? 'Active' : 'Inactive',
            effective_date: new Date(item.EffectiveStartDate),
            grade_uniq_id: item.GradeUniqId,
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

  async syncPositionsLov() {
    this.logger.log(`Start syncPositionsLov @ ${new Date()}`);

    let fetchNextPage: boolean = true;
    let limit: number = 500;
    let offset: number = 0;
    let totalNumberOfResults: number = limit;

    while (true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore, totalResults } = await this.getPositionsLov(
        this.getAvailableBatchSize(limit, offset, totalNumberOfResults),
        offset,
      );
      totalNumberOfResults = totalResults;

      for await (const item of items) {
        await this.prisma.positionLOV.upsert({
          where: {
            positionId: item.PositionId,
          },
          create: {
            positionId: item.PositionId,
            positionsLovV2UniqId: item.PositionsLovV2UniqId,
            positionCode: item.PositionCode,
            parentPositionCode: item.ParentPositionCode,
          },
          update: {
            positionId: item.PositionId,
            positionsLovV2UniqId: item.PositionsLovV2UniqId,
            positionCode: item.PositionCode,
            parentPositionCode: item.ParentPositionCode,
          },
        });
      }

      fetchNextPage = hasMore;
      if (fetchNextPage) {
        offset = offset + limit;
      } else {
        break;
      }
    }

    this.logger.log(`End syncPositionsLov @ ${new Date()}`);
  }

  async syncLocations() {
    this.logger.log(`Start syncLocations @ ${new Date()}`);

    let fetchNextPage: boolean = true;
    const limit: number = 500;
    let offset: number = 0;
    let totalNumberOfResults: number = limit;

    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore, totalResults } = await this.getLocations(
        this.getAvailableBatchSize(limit, offset, totalNumberOfResults),
        offset,
      );
      totalNumberOfResults = totalResults;

      for await (const item of items) {
        await this.prisma.location.upsert({
          where: {
            id: item.LocationCode,
          },
          create: {
            id: item.LocationCode,
            peoplesoft_id: 'BCSET',
            fusion_id: item.LocationId,
            code: item.locationCode ?? '',
            name: item.locationsDFF[0]?.shortDescription ?? '',
            effective_status: item.ActiveStatusMeaning,
            effective_date: new Date(item.EffectiveStartDate),
          },
          update: {
            peoplesoft_id: 'BCSET',
            fusion_id: item.LocationId,
            name: item.locationsDFF[0]?.shortDescription ?? '',
            code: item.locationCode,
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
    let totalNumberOfResults: number = limit;

    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      // chicken or egg
      const { items, hasMore, totalResults } = await this.getOrganizations(
        this.getAvailableBatchSize(limit, offset, totalNumberOfResults),
        offset,
      );
      totalNumberOfResults = totalResults;

      items.forEach(async (item) => {
        const parts = item.Name.match(/^(.+?)\s*\(([^()]+)\)$/) ?? [];
        const [_, name, id] = parts;

        if (id && name) {
          this.logger.log('ClassificationCode ', item.ClassificationCode, name, id);
          this.logger.log(item);
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
        }
      });

      fetchNextPage = hasMore;
      if (fetchNextPage) {
        offset = offset + limit;
      }
    }

    this.logger.log(`End syncOrganizations @ ${new Date()}`);
  }

  async syncWorkers() {
    this.logger.log(`Start syncWorkers @ ${new Date()}`);

    let fetchNextPage: boolean = true;
    const limit: number = 500;
    let offset: number = 0;
    let totalNumberOfResults: number = limit;

    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore, totalResults } = await this.getWorkers(
        this.getAvailableBatchSize(limit, offset, totalNumberOfResults),
        offset,
      );
      totalNumberOfResults = totalResults;

      items.forEach(async (item) => {
        const { PersonId, PersonNumber } = item;
        const { PositionCode } = item.assignments[0] ?? {};

        await this.prisma.employee.upsert({
          where: {
            id: PersonNumber,
          },
          create: {
            id: PersonNumber,
            fusion_id: PersonId,
            reports_to: '0',
            position_code: PositionCode,
          },
          update: {
            id: PersonNumber,
            fusion_id: PersonId,
            reports_to: '0',
            position_code: PositionCode,
          },
        });
      });

      fetchNextPage = hasMore;
      if (fetchNextPage) {
        offset = offset + limit;
      }
    }

    this.logger.log(`End syncWorkers @ ${new Date()}`);
  }

  async syncPositions() {
    this.logger.log(`Start syncPositions @ ${new Date()}`);

    let fetchNextPage: boolean = true;
    const limit: number = 500;
    let offset: number = 0;
    let totalNumberOfResults: number = limit;

    while (fetchNextPage === true) {
      this.logger.log(`Fetching page ${offset / limit + 1}`);

      const { items, hasMore, totalResults } = await this.getPositions(
        this.getAvailableBatchSize(limit, offset, totalNumberOfResults),
        offset,
      );
      totalNumberOfResults = totalResults;

      if (items == null) break;

      items.forEach(async (item) => {
        const {
          PositionCode,
          PositionsUniqId,
          EffectiveStartDate,
          EffectiveEndDate,
          Name,
          DepartmentId,
          JobId,
          LocationId,
          ActiveStatus,
          ShortDescription,
          HiringStatus,
          ReportsToPositionId,
          CaseProfile,
          PositionId,
        } = item;

        await this.prisma.position.upsert({
          where: {
            positionCode: PositionCode,
          },
          create: {
            positionCode: PositionCode,
            uniqId: PositionsUniqId,
            effectiveStartDate: new Date(EffectiveStartDate),
            effectiveEndDate: new Date(EffectiveEndDate),
            name: Name,
            departmentId: DepartmentId,
            jobId: JobId,
            locationId: LocationId,
            activeStatus: ActiveStatus,
            shortDescription: ShortDescription ?? 'N/A',
            hiringStatus: HiringStatus,
            reportsTo: ReportsToPositionId ?? 'N/A',
            caseProfile: CaseProfile ?? 'N/A',
            fusion_id: PositionId,
          },
          update: {
            positionCode: PositionCode,
            uniqId: PositionsUniqId,
            effectiveStartDate: new Date(EffectiveStartDate),
            effectiveEndDate: new Date(EffectiveEndDate),
            name: Name,
            departmentId: DepartmentId,
            jobId: JobId,
            locationId: LocationId,
            activeStatus: ActiveStatus,
            shortDescription: ShortDescription ?? 'N/A',
            hiringStatus: HiringStatus,
            reportsTo: ReportsToPositionId ?? 'N/A',
            caseProfile: CaseProfile ?? 'N/A',
            fusion_id: PositionId,
          },
        });
      });

      fetchNextPage = hasMore;
      if (fetchNextPage) {
        offset = offset + limit;
      }
    }

    this.logger.log(`End syncPositions @ ${new Date()}`);
  }

  async syncOrganizationsAndDepartments() {
    // Use this function instead of calling syncOrganizations, syncDepartments independently
    // Departments rely on organizations which must exist prior to syncing departments
    //await this.syncOrganizations();
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

    this.logger.log('positionQ ', positionQ);
    if (positionQ === null) throw new Error('Must have one of: dept_id, position_nbr or reports_to');

    /*
    const positions = await firstValueFrom(
      this.httpService
        .post(
          //`${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/positions?onlyData=true&expand=all&limit=25&offset=0&q=${positionQ}`,
          `${this.configService.get('FUSION_URL')}${Endpoints.Position}`,
          {
            "positionsUniqId" : position_nbr,
            "childType" : "",
            "childUniqId" : ""
          },
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
    */

    this.logger.log('getPosition ', +position_nbr);

    let where = {};

    if (position_nbr != null) {
      where = { positionCode: new String(+position_nbr).valueOf() };
    } else if (dept_id != null) {
      where = { departmentId: dept_id };
    } else if (reports_to != null) {
      where = { reportsTo: new String(+reports_to).valueOf() };
    }

    const positions = await this.prisma.position.findMany({ where });

    this.logger.log('Positions ', positions);

    const results = [];
    for await (const item of positions) {
      if (item === null) continue;

      const positionNumber = String(item.positionCode).padStart(6, '0');

      const department = await this.prisma.department.findFirst({ where: { fusion_id: BigInt(item.departmentId) } });
      this.logger.log('Department ', item.departmentId, department);
      const classification = await this.prisma.classification.findFirst({ where: { fusion_id: BigInt(item.jobId) } });
      this.logger.log('Class ', item.jobId, classification);
      const location = await this.prisma.location.findFirst({ where: { fusion_id: BigInt(item.locationId) } });
      this.logger.log('Loc ', item.locationId, location);
      /*
        Using local DB for worker assignments now
      */
      const worker = await this.prisma.employee.findFirst({ where: { id: positionNumber } });
      this.logger.log('Worker ', positionNumber, worker);

      const lov = await this.prisma.positionLOV.findFirst({ where: { positionCode: positionNumber } });
      this.logger.log('LOV ', lov);

      results.push({
        'A.POSITION_NBR': positionNumber,
        'A.EFFDT': item.effectiveStartDate,
        'A.EFF_STATUS': item.activeStatus === 'A' ? 'Active' : item.activeStatus === 'D' ? 'Deleted' : 'Frozen',
        'A.DESCR': item.name,
        'A.DESCRSHORT': item.shortDescription,
        'A.BUSINESS_UNIT': department?.organization_id,
        'A.DEPTID': department?.id ?? '',
        'B.DESCR': department?.name ?? '',
        'A.JOBCODE': classification?.id ?? '',
        'A.POSN_STATUS': item.hiringStatus === 'APPROVED' ? 'Approved' : item.hiringStatus === 'FROZEN' ? 'Frozen' : '',
        'A.STATUS_DT': '',
        'A.REPORTS_TO': lov?.parentPositionCode ?? '',
        'A.SAL_ADMIN_PLAN': classification.employee_group_id,
        'A.TGB_E_CLASS': item.caseProfile ?? '',
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
    const url = [
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
    ].join('/');

    this.logger.log('getProfileV2 ', url);
    const response = await firstValueFrom(
      this.httpService
        .get(url, {
          headers: this.peoplesoftHeaders,
        })
        .pipe(
          map((r) => {
            if (r.data.status === 'success') {
              const { rows } = r.data.data.query;

              if (rows.length > 0) {
                const profile = rows[0];
                delete profile['attr:rownumber'];
                profile['DEPTID'] = '100-3528'; // TODO
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
    this.logger.log('Lookup workers for ', position_numbers);
    const result = await firstValueFrom(
      this.httpService
        .post(
          //`${this.configService.get('FUSION_URL')}/hcmRestApi/resources/11.13.18.05/publicWorkers?limit=500&offset=0&expand=assignments.managers,assignments.allReports&q=assignments.PositionCode IN (${position_numbers.map((id) => `'${+id}'`).join(',')})&onlyData=true`,
          `${this.configService.get('FUSION_URL')}${Endpoints.Worker}`,
          {
            personId: position_numbers[0],
            childType: 'assignments',
            childUniqId: '',
            childType2: '',
            childUniqId2: '',
          },
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

  async createPosition(data: PositionCreateInput, positionRequest: Map<string, any>) {
    this.logger.log('createPosition ', data);
    this.logger.log('positionRequest ', positionRequest);

    const classificationId = positionRequest['classification_id'],
      classificationEmployeeGroupId = positionRequest['classification_employee_group_id'],
      classificationPeoplesoftId = positionRequest['classification_peoplesoft_id'];

    const additionalInfo = positionRequest['additional_info'] ?? {};

    const classification = await this.prisma.classification.findFirst({
      where: {
        id: classificationId,
        employee_group_id: classificationEmployeeGroupId,
        peoplesoft_id: classificationPeoplesoftId,
      },
    });

    //this.logger.log("Classification ", classification);

    if (classification != null) {
      const grade = await this.prisma.grade.findFirst({
        where: { grade: classification.grade, employee_group_id: classification.employee_group_id },
      });
      if (grade != null) {
        //this.logger.log("Grade ", grade);
        data['entry_grade_id'] = new String(grade.id).valueOf();

        const rawSteps = ((await this.getGradeSteps(grade['grade_uniq_id'])) ?? {}).items;
        //this.logger.log(rawSteps);

        const steps = Array.isArray(rawSteps)
          ? rawSteps.sort((a, b) => {
              return +a['GradeStepSequence'] > +b['GradeStepSequence'] ? 1 : -1;
            })
          : [];

        const step = steps[0]; // TODO Or possibly the index of positionRequest["step"]

        //this.logger.log("Step ", steps);

        if (step != null && step['GradeStepId']) {
          data['grade_ladder_id'] = step['GradeStepId'];
        }
      }
    }

    const fusionData = {
      PositionId: '',
      ReportsToPositionCode: data['REPORTS_TO'],
      BusinessUnitId: data['BUSINESS_UNIT'],
      RegularTemporary: 'R',
      ActiveStatus: 'A',
      Name: data['DESCR'],
      FullPartTime: data['FULL_PART_TIME'] === 'F' ? 'FULL_TIME' : 'PART_TIME',
      JobId: data['JOBCODE'],
      CaseProfile: data['TGB_E_CLASS'], // TES still need to confirm 100%
      AuthorizingId: additionalInfo['excluded_mgr_position_number'],
      DepartmentId: data['DEPTID'],
      HiringStatus: 'PROPOSED',
      EffectiveStartDate: dayjs().format('YYYY-MM-DD'),
      ActionReasonCode: 'NEW',
      LocationId: data['LOCATION_ID'],
      EntryGradeId: data['entry_grade_id'],
      GradeLadderId: data['grade_ladder_id'],
      UnionName: "BC General Employees' Union",
      StandardWorkingHours: '35',
      StandardWorkingFrequency: 'W',
    };

    this.logger.log('FusionData ', fusionData);

    throw AlexandriaError('Just because');

    const result = await firstValueFrom(
      this.httpService
        .post(`${this.configService.get('FUSION_URL')}${Endpoints.CreatePosition}`, fusionData, {
          headers: this.fusionHeaders,
        })
        .pipe(
          map((r) => r),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    this.logger.log('Fusion result', result.data);

    return result.data;
  }

  async getPositionCaseProfile(uniqId: string) {
    const response = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('FUSION_URL')}${Endpoints.Position}`,
          {
            positionsUniqId: uniqId,
            childType: 'PositionCustomerFlex',
          },
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

  async getPositionRequestStatusAndNumber(requestId: number, sourceSystemId: string) {
    const result = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('FUSION_URL')}${Endpoints.PositionStatus}`,
          {
            RequestId: requestId,
            SourceSystemId: sourceSystemId,
          },
          { headers: this.fusionHeaders },
        )
        .pipe(
          map((r) => r),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    this.logger.log('Fusion result', result.data);

    const data = {};
    Object.keys(result.data).forEach((k) => {
      const key = k.replace(/^(\w)/, (_, firstChar) => {
        return firstChar.toLocaleLowerCase();
      });
      data[key] = result.data[k];
    });

    return data;
  }

  private getAvailableBatchSize(limit: number, offset: number, totalResults: number) {
    const batchSize = limit + offset <= totalResults ? limit : totalResults - offset;
    console.log('getAvailableBatchSize ', limit, offset, totalResults, batchSize);
    return batchSize;
  }
}
