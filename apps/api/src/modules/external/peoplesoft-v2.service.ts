import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { catchError, firstValueFrom, map, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { PrismaService } from '../prisma/prisma.service';

enum Endpoint {
  Employee = 'PJS_TGB_REST_EMPLOYEE',
  Profile = 'PJS_TGB_REST_USER_PROFILE',
}

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

  async getProfile(idir: string): Promise<
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
                'prompt_uniquepromptname=USERID',
                `prompt_fieldvalue=${idir}`,
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
            throw new Error(err);
          }),
        ),
    );

    return response;
  }
}
