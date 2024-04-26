import { Injectable } from '@nestjs/common';
import { Classification, Department } from '@prisma/client';
import { AlexandriaError } from '../../utils/alexandria-error';
import { ClassificationService } from './classification.service';
import { DepartmentService } from './department.service';
import { Employee } from './models/employee.model';
import { FindUniquePositionArgs } from './models/find-unique-position.args';
import { PositionProfile } from './models/position-profile.model';
import { Position } from './models/position.model';
import { OrganizationService } from './organization.service';
import { PeoplesoftService } from './peoplesoft.service';

@Injectable()
export class PositionService {
  private classifications: Classification[];
  private departments: Department[];

  constructor(
    private readonly classificationService: ClassificationService,
    private readonly departmentService: DepartmentService,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly organizationService: OrganizationService,
  ) {
    (async () => {
      this.classifications = await this.classificationService.getClassifications({});
      this.departments = await this.departmentService.getDepartments();
    })();
  }

  async getPosition(args?: FindUniquePositionArgs) {
    const result = await this.peoplesoftService.getPosition(args.where.id);
    const rows = result?.data?.query?.rows;

    let position: Position | null = null;

    if (rows?.length > 0) {
      const raw = rows[0];

      const classification =
        raw['A.JOBCODE'] != null
          ? await this.classificationService.getClassification({ where: { id: raw['A.JOBCODE'] } })
          : null;

      const department =
        raw['A.DEPTID'] != null ? await this.departmentService.getDepartment({ where: { id: raw['A.DEPTID'] } }) : null;

      const organization =
        raw['A.BUSINESS_UNIT'] != null
          ? await this.organizationService.getOrganization({ where: { id: raw['A.BUSINESS_UNIT'] } })
          : null;

      position = {
        id: raw['A.POSITION_NBR'],
        classification_id: raw['A.JOBCODE'],
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
        A_UPDATE_INCUMBENTS: raw['A.UPDATE_INCUMBENTS'],
      };
    }

    return position;
  }

  async getPositionProfile(positionNumber: string, extraInfo = false): Promise<PositionProfile[]> {
    if (!positionNumber) throw AlexandriaError('Position number is required');
    const positionDetails = await this.getPosition({ where: { id: positionNumber } });
    if (!positionDetails) throw AlexandriaError(`Position ${positionNumber} not found`);

    let employeesForPositions = new Map<string, Employee[]>();

    // check if position has encumbent by checking UPDATE_INCUMBENTS:Y flag

    employeesForPositions = await this.peoplesoftService.getEmployeesForPositions([positionNumber]);

    const employeesInPosition = employeesForPositions.get(positionNumber) ?? [];

    const positionProfiles = await Promise.all(
      employeesInPosition.map(async (employee) => {
        const employeeResponse = await this.peoplesoftService.getEmployee(employee.id);
        const employeeDetail = employeeResponse?.data?.query?.rows?.[0];

        return {
          positionNumber: positionNumber,
          positionDescription: positionDetails.title,
          departmentName: positionDetails.department.name,
          employeeName: positionDetails.A_UPDATE_INCUMBENTS == 'Y' ? employeeDetail?.NAME_DISPLAY ?? '' : null,
          classification: positionDetails.classification.name,
          ministry: positionDetails.organization.name,
          status: employee.status,

          employeeId:
            positionDetails.A_UPDATE_INCUMBENTS == 'Y' ? (extraInfo ? employeeDetail?.EMPLID ?? '' : '') : null,
          departmentId: extraInfo ? positionDetails.department_id : '',
          organizationId: extraInfo ? positionDetails.organization_id : '',
          classificationId: extraInfo ? positionDetails.classification_id : '',
          classificationCode: extraInfo ? positionDetails.classification.code : '',
        };
      }),
    );

    return positionProfiles;
  }
}
