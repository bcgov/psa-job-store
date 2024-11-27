import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isEmpty } from 'class-validator';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { DepartmentService } from '../organization/department/department.service';
import { PrismaService } from '../prisma/prisma.service';
import { ClassificationService } from './classification.service';
import { Employee } from './models/employee.model';
import { FindUniqueOrgChartArgs } from './models/find-unique-org-chart.args';
import { OrgChart, OrgChartEdge, OrgChartNode } from './models/org-chart.model';
import { PeoplesoftService } from './peoplesoft.service';

@Injectable()
export class OrgChartService {
  constructor(
    private readonly classificationService: ClassificationService,
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly departmentService: DepartmentService,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly prisma: PrismaService,
  ) {}

  private async populateOrgChart(
    result: Record<string, any>,
    edgeMap: Map<string, OrgChartEdge>,
    nodeMap: Map<string, OrgChartNode>,
  ) {
    // Filter out any deleted or frozen positions
    const filteredPositions = (result?.data?.query?.rows ?? []).filter(
      (row) => row['A.EFF_STATUS'] === 'Active' && row['A.POSN_STATUS'] !== 'Frozen',
    );

    // const positionRequestsForFilteredPositions = await this.prisma.positionRequest.findMany({
    //   where: {
    //     AND: [
    //       {
    //         position_number: {
    //           in: filteredPositions
    //             .filter((row) => row['A.POSITION_NBR'])
    //             .map((row) => (row['A.POSITION_NBR'] != null ? +row['A.POSITION_NBR'] : row['A.POSITION_NBR'])),
    //         },
    //       },
    //     ],
    //   },
    // });

    const classifications = await this.classificationService.getClassifications({});
    const classificationSetIds = await this.classificationService.getClassificationSetIds();
    const departments = await this.departmentService.getDepartments();

    const positionsWithIncumbentsIds = filteredPositions.map((row) => row['A.POSITION_NBR']);

    const employees: Map<string, Employee[]> = await this.peoplesoftService.getEmployeesForPositions(
      this.configService.get('TEST_ENV') === 'true'
        ? ['00054971', '00100306', '00033584', '00109865', '00078742', '00022287']
        : positionsWithIncumbentsIds,
    );

    // Loop through response and generate the tree for everyone in the _current department_
    filteredPositions.forEach((position) => {
      // In rare cases, positions do _not_ include a value for A.REPORTS_TO, which causes the org chart to crash.
      // This workaround prevents a crash and allows positions to float in space with no reporting relationship
      const reportsTo = position['A.REPORTS_TO'].length > 0 ? position['A.REPORTS_TO'] : '-1';

      const existingEdge = edgeMap.get(`${reportsTo}-${position['A.POSITION_NBR']}`);
      if (existingEdge == null) {
        edgeMap.set(`${reportsTo}-${position['A.POSITION_NBR']}`, {
          // id: `${reportsTo}-${position['A.POSITION_NBR']}`,
          id: `${reportsTo}-${position['A.POSITION_NBR']}`,
          source: `${reportsTo}`,
          target: `${position['A.POSITION_NBR']}`,
          type: 'smoothstep',
        });
      }

      const department = !isEmpty(position['A.DEPTID'])
        ? departments.find((department) => department.id === position['A.DEPTID'])
        : null;

      const classification = !isEmpty(position['A.JOBCODE'])
        ? classifications.find(
            (classification) =>
              classification.id === position['A.JOBCODE'] &&
              classification.employee_group_id === position['A.SAL_ADMIN_PLAN'] &&
              // Use the department SETID if it exists in SETIDs, otherwise revert to BCSET
              classification.peoplesoft_id ===
                (classificationSetIds.includes(department.peoplesoft_id) ? department.peoplesoft_id : 'BCSET'),
          )
        : null;

      // const matchingPositionRequest = positionRequestsForFilteredPositions.find(
      //   (pr) => pr.position_number === +position['A.POSITION_NBR'],
      // );

      // if (position['A.POSITION_NBR'] === '00142557') {
      //   console.log('matchingPositionREquest: ', matchingPositionRequest);
      // }

      // If the node doesn't exist, create it.
      nodeMap.set(position['A.POSITION_NBR'], {
        id: `${position['A.POSITION_NBR']}`,
        type: 'org-chart-card',
        data: {
          id: `${position['A.POSITION_NBR']}`,
          title: position['A.DESCR'],
          position_status: position['A.POSN_STATUS'],
          classification: classification,
          department: department,
          employees: employees.get(position['A.POSITION_NBR']) ?? [],
        },
        position: {
          x: 0,
          y: 0,
        },
      });
    });
  }

  async getOrgChart(args?: FindUniqueOrgChartArgs) {
    const result = await this.peoplesoftService.getPositionsForDepartment(args.where.department_id);

    // console.log('getOrgChart result: ', JSON.stringify(result, null, 2));
    const edgeMap: Map<string, OrgChartEdge> = new Map();
    const nodeMap: Map<string, OrgChartNode> = new Map();

    await this.populateOrgChart(result, edgeMap, nodeMap);

    const orgChart: OrgChart = {
      edges: Array.from(edgeMap.values()),
      nodes: Array.from(nodeMap.values()),
    };

    // console.log('orgChart: ', JSON.stringify(orgChart, null, 2));
    return orgChart;
  }

  async getOrgChartDepartmentFilter(department_ids: string[]) {
    const departments = await this.prisma.department.findMany({
      where: { id: { in: department_ids } },
      orderBy: [{ name: 'asc' }],
      include: {
        location: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const ministryIds = new Set(departments.map((department) => department.organization_id));
    const ministries = await this.prisma.organization.findMany({
      where: { id: { in: Array.from(ministryIds) } },
      select: { id: true, name: true },
    });

    return ministries.map((ministry) => {
      return {
        label: ministry.name,
        value: `ministry-${ministry.id}`,
        selectable: false,
        children: departments
          .filter((department) => department.organization_id === ministry.id)
          .map((department) => ({
            label: department.name,
            value: department.id,
            filterString: `${department.id} ${department.name}`,
            location_id: department.location.id,
            location_name: department.location.name,
          })),
      };
    });
  }
}
