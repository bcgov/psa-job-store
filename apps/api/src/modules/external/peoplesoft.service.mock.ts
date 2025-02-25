import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { Employee } from './models/employee.model';
import { PositionCreateInput } from './models/position-create.input';
import { UpdateMockPositionInput } from './peoplesoft.mock.resolver';

@Injectable()
export class MockPeoplesoftService {
  private mockData: any;
  private initialMockData: any;

  constructor(private readonly configService: ConfigService<AppConfigDto, true>) {
    const mockDataPath = join(process.cwd(), 'test/mock-peoplesoft-data.json');
    this.mockData = JSON.parse(readFileSync(mockDataPath, 'utf8'));

    this.initialMockData = JSON.parse(JSON.stringify(this.mockData));
  }

  async resetMockData(): Promise<boolean> {
    try {
      console.log('resetting peoplesoft mock data');
      this.mockData = JSON.parse(JSON.stringify(this.initialMockData));
      return true;
    } catch (error) {
      console.error('Error resetting mock data:', error);
      return false;
    }
  }

  async syncClassifications() {
    console.log('Mock syncClassifications called');
  }

  async syncLocations() {
    console.log('Mock syncLocations called');
  }

  async syncOrganizationsAndDepartments() {
    console.log('Mock syncOrganizationsAndDepartments called');
  }

  async syncOrganizations() {
    console.log('Mock syncOrganizations called');
  }

  async syncDepartments() {
    console.log('Mock syncDepartments called');
  }

  async getEmployeesForPositions(positions: string[]): Promise<Map<string, Employee[]>> {
    console.log('Mock getEmployeesForPositions called with positions:', positions);
    const employeeMap: Map<string, Employee[]> = new Map();

    positions.forEach((position) => {
      const matchingEmployees = this.mockData.employees.filter((emp) => {
        if (emp.positionId) return emp.positionId === position;
        else return emp.id === position;
      });
      employeeMap.set(position, matchingEmployees);
    });

    return employeeMap;
  }

  async updateMockPosition(positionNbr: string, data: UpdateMockPositionInput) {
    const positionIndex = this.mockData.positions.findIndex((pos) => pos['A.POSITION_NBR'] === positionNbr);

    if (positionIndex === -1) {
      throw new Error(`Position with number ${positionNbr} not found`);
    }

    const updatedPosition = {
      ...this.mockData.positions[positionIndex],
      'A.DESCR': data.DESCR || this.mockData.positions[positionIndex]['A.DESCR'],
      'A.BUSINESS_UNIT': data.BUSINESS_UNIT || this.mockData.positions[positionIndex]['A.BUSINESS_UNIT'],
      'A.DEPTID': data.DEPTID || this.mockData.positions[positionIndex]['A.DEPTID'],
      'A.JOBCODE': data.JOBCODE || this.mockData.positions[positionIndex]['A.JOBCODE'],
      'A.POSN_STATUS': data.POSN_STATUS || this.mockData.positions[positionIndex]['A.POSN_STATUS'],
      'A.REPORTS_TO': data.REPORTS_TO || this.mockData.positions[positionIndex]['A.REPORTS_TO'],
      'A.TGB_E_CLASS': data.TGB_E_CLASS || this.mockData.positions[positionIndex]['A.TGB_E_CLASS'],
      'A.LOCATION': data.LOCATION || this.mockData.positions[positionIndex]['A.LOCATION'],
      'A.STATUS_DT': new Date().toISOString().slice(0, 10),
    };

    console.log('updatedPosition: ', updatedPosition);
    this.mockData.positions[positionIndex] = updatedPosition;

    // Transform the data to match MockPosition type
    return {
      positionNbr: updatedPosition['A.POSITION_NBR'],
      effdt: updatedPosition['A.EFFDT'],
      effStatus: updatedPosition['A.EFF_STATUS'],
      descr: updatedPosition['A.DESCR'],
      descrshort: updatedPosition['A.DESCRSHORT'],
      businessUnit: updatedPosition['A.BUSINESS_UNIT'],
      deptid: updatedPosition['A.DEPTID'],
      deptDescr: updatedPosition['B.DESCR'],
      jobcode: updatedPosition['A.JOBCODE'],
      posnStatus: updatedPosition['A.POSN_STATUS'],
      statusDt: updatedPosition['A.STATUS_DT'],
      reportsTo: updatedPosition['A.REPORTS_TO'],
      salAdminPlan: updatedPosition['A.SAL_ADMIN_PLAN'],
      tgbEClass: updatedPosition['A.TGB_E_CLASS'],
      location: updatedPosition['A.LOCATION'],
    };
  }

  async getEmployee(id: string) {
    console.log('Mock getEmployee called with id:', id);
    const employee = this.mockData.employees.find((emp) => emp.id === id) || {
      id,
      name: 'Unknown Employee',
      status: 'Inactive',
    };
    return {
      data: {
        query: {
          rows: [
            {
              EMPLID: employee.id,
              NAME_DISPLAY: employee.name,
              EMPL_STATUS: employee.status,
              // if employee has a positionId, use it, otherwise use employee.id as position number
              POSITION_NBR: employee.positionId ?? employee.id,
            },
          ],
        },
      },
    };
  }

  async getProfile(idir: string) {
    console.log('Mock getProfile called with idir:', idir);
    const profile = this.mockData.profiles.find((prof) => prof.idir === idir) || undefined;

    if (!profile)
      return {
        data: {
          query: {
            rows: [undefined],
          },
        },
      };
    return {
      data: {
        query: {
          rows: [
            {
              OPRID: profile.idir,
              OPRDEFNDESC: profile.name,
              EMPLID: profile.employee_id,
              EMAILID: profile.email,
              GUID: '123456',
            },
          ],
        },
      },
    };
  }

  async getProfileV2(idir?: string, emplid?: string) {
    console.log('Mock getProfile called with idir:', idir);
    const profile = this.mockData.profiles.find((prof) => prof.idir === idir) || undefined;

    if (!profile) return undefined;
    return {
      OPRID: profile.idir,
      OPRDEFNDESC: profile.name,
      EMPLID: profile.employee_id,
      EMAILID: profile.email,
      GUID: '123456',
    };
  }

  async getPositionsForDepartment(department_id: string) {
    console.log('Mock getPositionsForDepartment called with department_id:', department_id);
    const positions = this.mockData.positions.filter((d) => d['A.DEPTID'] === department_id);
    const retObj = {
      data: {
        query: {
          rows: positions ? positions : [],
        },
      },
    };
    console.log('Mock getPositionsForDepartment returning:', retObj);
    return retObj;
  }

  async getPosition(position_id: string) {
    console.log('Mock getPosition called with position_id:', position_id);
    const position = this.mockData.positions.find((pos) => pos['A.POSITION_NBR'] === position_id) || {
      position_id,
      status: 'Inactive',
      reports_to: 'N/A',
      descr: 'Unknown Position',
    };

    console.log('Mock getPosition returning:', position);

    return {
      data: {
        query: {
          rows: [position],
        },
      },
    };
  }

  async createPosition(data: PositionCreateInput) {
    console.log('Mock createPosition called with data:', data);
    // e.g.:
    // {
    //   BUSINESS_UNIT: 'BC000',
    //   DEPTID: '112-0074',
    //   JOBCODE: '508010',
    //   REPORTS_TO: '00987654',
    //   POSN_STATUS: 'P',
    //   DESCR: 'Verification test',
    //   REG_TEMP: 'R',
    //   FULL_PART_TIME: 'F',
    //   TGB_E_CLASS: 'P194',
    //   TGB_APPRV_MGR: '00987654'
    // }

    // generate random position number in the format of '00000001'
    const positionNbr = Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0');

    // check that it's not in this.mockData.positions
    if (this.mockData.positions.find((pos) => pos['A.POSITION_NBR'] === positionNbr)) {
      return {
        positionNbr: '',
        errMessage: 'Position number already exists',
      };
    }

    // add the new position to this.mockData.positions in this format:
    // {
    //   "attr:rownumber": 25,
    //   "A.POSITION_NBR": "00132136",
    //   "A.EFFDT": "2024-07-20",
    //   "A.EFF_STATUS": "Active",
    //   "A.DESCR": "Testing User Position",
    //   "A.DESCRSHORT": "Band 5",
    //   "A.BUSINESS_UNIT": "BC112",
    //   "A.DEPTID": "112-0074",
    //   "B.DESCR": "Informational Resource Management",
    //   "A.JOBCODE": "185005",
    //   "A.POSN_STATUS": "Approved",
    //   "A.STATUS_DT": "2023-02-14",
    //   "A.REPORTS_TO": "00210987",
    //   "A.SAL_ADMIN_PLAN": "MGT",
    //   "A.TGB_E_CLASS": "E26271",
    //   "A.LOCATION": "V8X4S800",
    //   "A.UPDATE_INCUMBENTS": "N"
    // }

    const retObj = {
      'attr:rownumber': this.mockData.positions.length + 1,
      'A.POSITION_NBR': positionNbr,
      'A.EFFDT': new Date().toISOString().slice(0, 10),
      'A.EFF_STATUS': 'Active',
      'A.DESCR': data.DESCR,
      'A.DESCRSHORT': 'Band 5',
      'A.BUSINESS_UNIT': data.BUSINESS_UNIT,
      'A.DEPTID': data.DEPTID,
      'B.DESCR': 'Informational Resource Management',
      'A.JOBCODE': data.JOBCODE,
      'A.POSN_STATUS': data.POSN_STATUS == 'P' ? 'Proposed' : 'Approved',
      'A.STATUS_DT': new Date().toISOString().slice(0, 10),
      'A.REPORTS_TO': data.REPORTS_TO,
      'A.SAL_ADMIN_PLAN': 'MGT',
      'A.TGB_E_CLASS': data.TGB_E_CLASS,
      'A.LOCATION': 'V8X4S800',
      'A.UPDATE_INCUMBENTS': 'N',
    };

    console.log('pushing new position:', JSON.stringify(retObj, null, 2));

    this.mockData.positions.push(retObj);
    return { positionNbr: positionNbr, errMessage: '' };
  }
}
