import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { PrismaService } from '../prisma/prisma.service';

enum Endpoint {
  Employee = 'PJS_TGB_REST_EMPLOYEE',
  HRScope = 'PJS_TGB_REST_HRSCOPE',
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
export class PeoplesoftV2Service {
  private readonly headers: AxiosHeaders = new AxiosHeaders();
  private readonly logger = new Logger(PeoplesoftV2Service.name);

  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {
    this.headers.set(
      'Authorization',
      `Basic ${Buffer.from(
        `${this.configService.get('PEOPLESOFT_USERNAME')}:${this.configService.get('PEOPLESOFT_PASSWORD')}`,
      ).toString('base64')}`,
    );
  }

  async getEmployee(employee_id: string): Promise<
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
    const response = await firstValueFrom(
      this.httpService
        .get(
          [
            this.configService.get('PEOPLESOFT_URL'),
            [
              [Endpoint.Employee, 'JSON', 'NONFILE'].join('/'),
              [
                'isconnectedquery=n',
                'maxrows=1',
                'prompt_uniquepromptname=POSITION_NBR,EMPLID',
                `prompt_fieldvalue=,${employee_id}`,
                'json_resp=true',
              ].join('&'),
            ].join('?'),
          ].join('/'),
          {
            headers: this.headers,
          },
        )
        .pipe(
          map((r) => {
            if (r.data.status === 'success') {
              const { rows } = r.data.data.query;

              if (rows.length > 0) {
                const employee = rows[0];
                delete employee['attr:rownumber'];

                return employee;
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
              [Endpoint.Profile, 'JSON', 'NONFILE'].join('/'),
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
            headers: this.headers,
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
            console.error('COULD NOT GET PEOPLESOFT PROFILE');
            throw new Error(err);
          }),
        ),
    );

    return response;
  }

  async getSubordinates(reporting_to: string) {
    return await this.getHRScope(undefined, undefined, reporting_to);
  }

  private async getHRScope(
    dept_id?: string,
    position_nbr?: string,
    reports_to?: string,
  ): Promise<HRScopeResponse[] | undefined> {
    const value =
      dept_id != null
        ? `${dept_id},,`
        : position_nbr != null
          ? `,${position_nbr},`
          : reports_to != null
            ? `,,${reports_to}`
            : null;
    if (value === null) throw new Error('Must have one of: dept_id, position_nbr or reports_to');

    const response = await firstValueFrom(
      this.httpService
        .get(
          [
            this.configService.get('PEOPLESOFT_URL'),
            [
              [Endpoint.HRScope, 'JSON', 'NONFILE'].join('/'),
              [
                'isconnectedquery=n',
                'maxrows=1',
                'prompt_uniquepromptname=DEPTID,POSITION_NBR,REPORTS_TO',
                `prompt_fieldvalue=${value}`,
                'json_resp=true',
              ].join('&'),
            ].join('?'),
          ].join('/'),
          {
            headers: this.headers,
          },
        )
        .pipe(
          map((r) => {
            if (r.data.status === 'success') {
              const { rows } = r.data.data.query;

              return rows.map((row) => {
                delete row['attr:rownumber'];
                return row;
              });
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
}
