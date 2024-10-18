import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { Employee } from './models/employee.model';
import { PositionCreateInput } from './models/position-create.input';

@Injectable()
export class MockPeoplesoftService {
  private mockData: any;

  constructor(private readonly configService: ConfigService<AppConfigDto, true>) {
    const mockDataPath = join(__dirname, '../../../test/mock-peoplesoft-data.json');
    this.mockData = JSON.parse(readFileSync(mockDataPath, 'utf8'));
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
      const mockEmployee = this.mockData.employees.find((emp) => {
        emp.id == position;
      });
      employeeMap.set(position, [mockEmployee]);
    });
    return employeeMap;
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
            },
          ],
        },
      },
    };
  }

  async getProfile(idir: string) {
    console.log('Mock getProfile called with idir:', idir);
    const profile = this.mockData.profiles.find((prof) => prof.idir === idir) || {
      idir,
      name: 'Unknown User',
      role: 'Guest',
    };
    return {
      data: {
        query: {
          rows: [
            {
              USERID: profile.idir,
              NAME: profile.name,
            },
          ],
        },
      },
    };
  }

  async getPositionsForDepartment(department_id: string) {
    console.log('Mock getPositionsForDepartment called with department_id:', department_id);
    const positions = this.mockData.positions.filter(() => '112-0074' === department_id);
    return {
      data: {
        query: {
          rows: positions ? positions : [],
        },
      },
    };
  }

  async getPosition(position_id: string) {
    console.log('Mock getPosition called with position_id:', position_id);
    const position = this.mockData.positions.find((pos) => pos['A.POSITION_NBR'] === position_id) || {
      position_id,
      status: 'Inactive',
      reports_to: 'N/A',
      descr: 'Unknown Position',
    };
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
    return {
      positionNbr: '00000001',
      errMessage: '',
    };
  }
}
