import { Injectable } from '@nestjs/common';
import { Classification, Department } from '@prisma/client';
import { AlexandriaError } from '../../utils/alexandria-error';
import { DepartmentService } from '../organization/department/department.service';
import { OrganizationService } from '../organization/organization/organization.service';
import { ClassificationService } from './classification.service';
import { Employee } from './models/employee.model';
import { FindUniquePositionArgs } from './models/find-unique-position.args';
import { PeoplesoftPosition } from './models/peoplesoft-position.model';
import { PositionProfile } from './models/position-profile.model';
import { Position } from './models/position.model';
import { PeoplesoftV2Service } from './peoplesoft-v2.service';
import { PeoplesoftService } from './peoplesoft.service';

@Injectable()
export class PositionService {
  private classifications: Classification[];
  private departments: Department[];

  constructor(
    private readonly classificationService: ClassificationService,
    private readonly departmentService: DepartmentService,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly peoplesoftV2Service: PeoplesoftV2Service,
    private readonly organizationService: OrganizationService,
  ) {
    // (async () => {
    //   console.log('Loading classifications and departments');
    //   this.classifications = await this.classificationService.getClassifications({});
    //   this.departments = await this.departmentService.getDepartments();
    // })();
  }

  async onModuleInit() {
    this.classifications = await this.classificationService.getClassifications({});
    this.departments = await this.departmentService.getDepartments();
  }

  async getPosition(args?: FindUniquePositionArgs) {
    const result = await this.peoplesoftService.getPosition(args.where.id);
    const rows = result?.data?.query?.rows;

    let position: Position | null = null;

    if (rows?.length > 0) {
      const raw = rows[0] as PeoplesoftPosition;

      const classification = await this.classificationService.getClassificationForPeoplesoftPosition(raw);

      const department =
        raw['A.DEPTID'] != null ? await this.departmentService.getDepartment({ where: { id: raw['A.DEPTID'] } }) : null;

      const organization =
        raw['A.BUSINESS_UNIT'] != null
          ? await this.organizationService.getOrganization({ where: { id: raw['A.BUSINESS_UNIT'] } })
          : null;

      position = {
        id: raw['A.POSITION_NBR'],
        classification_id: raw['A.JOBCODE'],
        classification_employee_group_id: classification.employee_group_id,
        classification_peoplesoft_id: classification.peoplesoft_id,
        classification: classification,
        department_id: raw['A.DEPTID'],
        department: department,
        organization_id: raw['A.BUSINESS_UNIT'],
        organization: organization,
        supervisor_id: raw['A.REPORTS_TO'],
        title: raw['A.DESCR'],
        job_profile_number: raw['A.TGB_E_CLASS'],
        effective_status: raw['A.EFF_STATUS'],
        effective_date: raw['A.EFFDT'],
      };
    }

    return position;
  }

  /* This end point is used to get the position profile for a given position number. 
     It returns the position details along with the employee details if the position has an employee. 
  */
  async getPositionProfile(positionNumber: string, extraInfo = false): Promise<PositionProfile[]> {
    if (!positionNumber) throw AlexandriaError('Position number is required');
    const positionDetails = await this.getPosition({ where: { id: positionNumber } });
    if (!positionDetails) throw AlexandriaError(`Position ${positionNumber} not found`);

    let employeesForPositions = new Map<string, Employee[]>();

    employeesForPositions = await this.peoplesoftService.getEmployeesForPositions([positionNumber]);
    // console.log('employeesForPositions: ', employeesForPositions);

    const employeesInPosition = employeesForPositions.get(positionNumber) ?? [];
    if (employeesInPosition.length === 0) {
      return [
        {
          positionNumber: positionNumber,
          positionDescription: positionDetails.title,
          departmentName: positionDetails.department.name,
          classification: positionDetails.classification.name,
          ministry: positionDetails.organization.name,
          employeeName: '', // No employee
          employeeEmail: '',
          status: '', // No employee status
          employeeId: '',
          departmentId: extraInfo ? positionDetails.department_id : '',
          organizationId: extraInfo ? positionDetails.organization_id : '',
          classificationId: extraInfo ? positionDetails.classification_id : '',
          classificationPeoplesoftId: extraInfo ? positionDetails.classification_peoplesoft_id : '',
          classificationEmployeeGroupId: extraInfo ? positionDetails.classification_employee_group_id : '',
          effectiveDate: positionDetails.effective_date,
        },
      ];
    }
    const positionProfiles = await Promise.all(
      employeesInPosition.map(async (employee) => {
        const employeeResponse = await this.peoplesoftService.getEmployee(employee.id);
        // console.log('employeeResponse: ', JSON.stringify(employeeResponse, null, 2));
        const employeeDetail = employeeResponse?.data?.query?.rows?.[0];
        // console.log('employeeDetail: ', employeeDetail);
        const profile = await this.peoplesoftV2Service.getProfileV2(null, employeeDetail?.EMPLID ?? '');
        // console.log('profile: ', JSON.stringify(profile, null, 2));
        return {
          positionNumber: positionNumber,
          positionDescription: positionDetails.title,
          departmentName: positionDetails.department.name,
          employeeName: employeeDetail?.NAME_DISPLAY,
          employeeEmail: profile?.EMAILID,
          classification: positionDetails.classification.name,
          ministry: positionDetails.organization.name,
          status: employee.status,

          employeeId: extraInfo ? (employeeDetail?.EMPLID ?? '') : '',
          departmentId: extraInfo ? positionDetails.department_id : '',
          organizationId: extraInfo ? positionDetails.organization_id : '',
          classificationId: extraInfo ? positionDetails.classification_id : '',
          classificationPeoplesoftId: extraInfo ? positionDetails.classification_peoplesoft_id : '',
          classificationEmployeeGroupId: extraInfo ? positionDetails.classification_employee_group_id : '',
          effectiveDate: positionDetails.effective_date,
        };
      }),
    );

    return positionProfiles;
  }
}
