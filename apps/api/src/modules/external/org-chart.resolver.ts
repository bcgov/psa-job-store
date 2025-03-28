import { Args, Query, Resolver } from '@nestjs/graphql';
import { AlexandriaError } from '../../utils/alexandria-error';
import { GqlCurrentUser } from '../auth/decorators/gql-current-user.decorator';
import { FindUniqueOrgChartArgs } from './models/find-unique-org-chart.args';
import { OrgChartDepartmentFilterItem } from './models/org-chart-department-filter-item.model';
import { OrgChart } from './models/org-chart.model';
import { OrgChartService } from './org-chart.service';

@Resolver(() => OrgChart)
export class OrgChartResolver {
  constructor(private readonly orgChartService: OrgChartService) {}

  @Query(() => OrgChart, { name: 'orgChart' })
  async getOrgChart(@GqlCurrentUser() user: Express.User, @Args() args?: FindUniqueOrgChartArgs) {
    if (!(user.metadata.org_chart.department_ids ?? []).includes(args?.where?.department_id))
      throw AlexandriaError("You don't have access to this department");

    return this.orgChartService.getOrgChart(args);
  }

  @Query(() => [OrgChartDepartmentFilterItem], { name: 'getOrgChartDepartmentFilter' })
  async getOrgChartDepartmentFilter(@GqlCurrentUser() user: Express.User) {
    const items = await this.orgChartService.getOrgChartDepartmentFilter(
      user.metadata?.org_chart?.department_ids ?? [],
    );

    return items;
  }
}
