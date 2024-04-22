import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { ClassificationService } from './classification.service';
import { DepartmentService } from './department.service';
import { Employee } from './models/employee.model';
import { FindUniqueOrgChartArgs } from './models/find-unique-org-chart.args';
import { OrgChart, OrgChartEdge, OrgChartNode } from './models/org-chart.model';
import { PeoplesoftService } from './peoplesoft.service';

@Injectable()
export class OrgChartService {
  constructor(
    private readonly classificationService: ClassificationService,
    private readonly departmentService: DepartmentService,
    private readonly peoplesoftService: PeoplesoftService,
  ) {}

  private async populateOrgChart(
    result: Record<string, any>,
    edgeMap: Map<string, OrgChartEdge>,
    nodeMap: Map<string, OrgChartNode>,
  ) {
    const classifications = await this.classificationService.getClassifications({});
    const departments = await this.departmentService.getDepartments();

    const positionsWithIncumbentsIds = (result?.data?.query?.rows ?? [])
      .filter((row) => row['A.UPDATE_INCUMBENTS'] === 'Y')
      .map((row) => row['A.POSITION_NBR']);
    const employees: Map<string, Employee[]> =
      await this.peoplesoftService.getEmployeesForPositions(positionsWithIncumbentsIds);

    // Loop through response and generate the tree for everyone in the _current department_
    (result?.data?.query?.rows ?? []).forEach((position) => {
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

      const classification = !isEmpty(position['A.JOBCODE'])
        ? classifications.find((classification) => classification.id === position['A.JOBCODE'])
        : null;

      const department = !isEmpty(position['A.DEPTID'])
        ? departments.find((department) => department.id === position['A.DEPTID'])
        : null;

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

    const edgeMap: Map<string, OrgChartEdge> = new Map();
    const nodeMap: Map<string, OrgChartNode> = new Map();

    await this.populateOrgChart(result, edgeMap, nodeMap);

    const orgChart: OrgChart = {
      edges: Array.from(edgeMap.values()),
      nodes: Array.from(nodeMap.values()),
    };

    return orgChart;
  }
}
