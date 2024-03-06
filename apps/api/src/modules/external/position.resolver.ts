import { Args, Query, Resolver } from '@nestjs/graphql';
import { AllowNoRoles } from '../auth/guards/role-global.guard';
import { FindUniquePositionArgs } from './models/find-unique-position.args';
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
  @Query(() => Position, { name: 'position' })
  async getPosition(@Args() args?: FindUniquePositionArgs) {
    return await this.positionService.getPosition(args);
  }

  @Query(() => [PositionProfile], { name: 'positionProfile' })
  @AllowNoRoles() // so that share position request feature can fetch relevant data
  async getPositionProfile(@Args('positionNumber') positionNumber: string) {
    return await this.positionService.getPositionProfile(positionNumber);
  }
}
