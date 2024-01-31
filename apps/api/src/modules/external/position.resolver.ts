import { Args, Query, Resolver } from '@nestjs/graphql';
import { Classification } from '@prisma/client';
import { Department } from '../../@generated/prisma-nestjs-graphql';
import { ClassificationService } from './classification.service';
import { DepartmentService } from './department.service';
import { FindUniquePositionArgs } from './models/find-unique-position.args';
import { Position } from './models/position.model';
import { OrganizationService } from './organization.service';
import { PeoplesoftService } from './peoplesoft.service';

@Resolver(() => Position)
export class PositionResolver {
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
  @Query(() => Position, { name: 'position' })
  async getPosition(@Args() args?: FindUniquePositionArgs) {
    const result = await this.peoplesoftService.getPosition(args.where.id);
    const rows = result?.data?.query?.rows;
    let position: Position | null = null;

    if (rows.length > 0) {
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
      };
    }

    return position;
  }
}
