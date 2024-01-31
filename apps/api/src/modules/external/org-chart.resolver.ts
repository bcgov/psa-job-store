import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindUniqueOrgChartArgs } from './models/find-unique-org-chart.args';
import { OrgChart } from './models/org-chart.model';
import { OrgChartService } from './org-chart.service';

@Resolver(() => OrgChart)
export class OrgChartResolver {
  constructor(private readonly orgChartService: OrgChartService) {}

  @Query(() => OrgChart, { name: 'orgChart' })
  getOrgChart(@Args() args?: FindUniqueOrgChartArgs) {
    return this.orgChartService.getOrgChart(args);
  }
}
