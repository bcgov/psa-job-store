import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { Classification } from '../../@generated/prisma-nestjs-graphql';
import { BIService } from './bi.service';
import { ClassificationService } from './classification.service';
import { FindUniqueOrgChartArgs } from './models/find-unique-org-chart.args';
import { OrgChart, OrgChartEdge, OrgChartNode } from './models/org-chart.model';

@Injectable()
export class OrgChartService {
  private classifications: Classification[];

  constructor(
    private readonly biService: BIService,
    private readonly classificationService: ClassificationService,
  ) {
    (async () => {
      this.classifications = await this.classificationService.getClassifications({});
    })();
  }

  private populateOrgChart(
    result: Record<string, any>,
    edgeMap: Map<string, OrgChartEdge>,
    nodeMap: Map<string, OrgChartNode>,
  ) {
    // Loop through response and generate the tree for everyone in the _current department_
    (result.value ?? []).forEach((position) => {
      const existingEdge = edgeMap.get(`${position.pos_reports_to}-${position.pos_nbr}`);
      if (existingEdge == null) {
        edgeMap.set(`${position.pos_reports_to}-${position.pos_nbr}`, {
          // id: `${position.pos_reports_to}-${position.pos_nbr}`,
          id: `${position.pos_reports_to}-${position.pos_nbr}`,
          source: `${position.pos_reports_to}`,
          target: `${position.pos_nbr}`,
          type: 'smoothstep',
        });
      }

      const existingNode = nodeMap.get(position.pos_nbr);
      if (existingNode == null) {
        const classification = !isEmpty(position.pos_jobcode)
          ? this.classifications.find((classification) => classification.id === position.pos_jobcode)
          : null;

        // If the node doesn't exist, create it.
        nodeMap.set(position.pos_nbr, {
          id: `${position.pos_nbr}`,
          type: 'org-chart-card',
          data: {
            id: `${position.pos_nbr}`,
            title: position.pos_descr,
            classification: classification,
            employees:
              position.employees > 0
                ? [
                    {
                      id: position.emplid,
                      name: position.name,
                      status: position.empl_status,
                    },
                  ]
                : [],
          },
          position: {
            x: 0,
            y: 0,
          },
        });
      } else {
        // If the node exits, add an employee to the position if they aren't already present
        if (existingNode.data.employees.map((employee) => employee.id).includes(position.emplid) === false) {
          existingNode.data.employees.push({
            id: position.emplid,
            name: position.name,
            status: position.empl_status,
          });
          nodeMap.set(position.pos_nbr, existingNode);
        }
      }
    });
  }

  async getOrgChart(args?: FindUniqueOrgChartArgs) {
    const result = await this.biService.getPositionsForDepartment(args.where.department_id);

    const edgeMap: Map<string, OrgChartEdge> = new Map();
    const nodeMap: Map<string, OrgChartNode> = new Map();

    this.populateOrgChart(result, edgeMap, nodeMap);

    // Identify supervisor positions _not_ in the current department (1 level up)
    const edgeParentIds = Array.from(edgeMap.keys()).map((k) => k.split('-')[0]);
    const parentIdsOutsideDepartment = new Set<string>(
      edgeParentIds.filter((id) => !Array.from(nodeMap.keys()).includes(id)),
    );

    for await (const id of parentIdsOutsideDepartment) {
      const result = await this.biService.getPosition(id);
      this.populateOrgChart(result, edgeMap, nodeMap);
    }

    const orgChart: OrgChart = {
      edges: Array.from(edgeMap.values()),
      nodes: Array.from(nodeMap.values()),
    };

    return orgChart;
  }
}
