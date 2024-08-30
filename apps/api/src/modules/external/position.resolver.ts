import { Args, Query, Resolver } from '@nestjs/graphql';
import { PositionProfile } from './models/position-profile.model';
import { Position } from './models/position.model';
import { PositionService } from './position.service';

@Resolver(() => Position)
export class PositionResolver {
  // private classifications: Classification[];
  // private departments: Department[];

  constructor(
    // private readonly classificationService: ClassificationService,
    // private readonly departmentService: DepartmentService,
    // private readonly peoplesoftService: PeoplesoftService,
    // private readonly organizationService: OrganizationService,
    private readonly positionService: PositionService,
  ) {
    // (async () => {
    //   this.classifications = await this.classificationService.getClassifications({});
    //   this.departments = await this.departmentService.getDepartments();
    // })();
  }
  // @Query(() => Position, { name: 'position' })
  // async getPosition(@Args() args?: FindUniquePositionArgs) {
  //   return await this.positionService.getPosition(args);
  // }

  @Query(() => [PositionProfile], { name: 'positionProfile' })
  async getPositionProfile(
    @Args('positionNumber') positionNumber: string,
    @Args({ name: 'extraInfo', nullable: true }) extraInfo?: boolean,
  ) {
    return await this.positionService.getPositionProfile(positionNumber, extraInfo);
  }
}
