import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { FindUniqueOrgChartArgs } from './models/find-unique-org-chart.args';
import { OrgChartDepartmentFilterItem } from './models/org-chart-department-filter-item.model';
import { OrgChart } from './models/org-chart.model';
import { OrgChartService } from './org-chart.service';

@Resolver(() => OrgChart)
export class OrgChartResolver {
  constructor(private readonly orgChartService: OrgChartService) {}

  @Query(() => OrgChart, { name: 'orgChart' })
  getOrgChart(@Args() args?: FindUniqueOrgChartArgs) {
    return this.orgChartService.getOrgChart(args);
  }

  @Query(() => [OrgChartDepartmentFilterItem], { name: 'getOrgChartDepartmentFilter' })
  async getOrgChartDepartmentFilter(@CurrentUser() user: Express.User) {
    const items = await this.orgChartService.getOrgChartDepartmentFilter(
      user.metadata?.org_chart?.department_ids ?? [],
    );

    return items;
  }
}
