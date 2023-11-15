import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Classification,
  Department,
  FindManyPositionArgs,
  Organization,
  Position,
} from '../../@generated/prisma-nestjs-graphql';
import { ClassificationService } from './classification.service';
import { DepartmentService } from './department.service';
import { OrganizationService } from './organization.service';
import { PositionService } from './position.service';

@Resolver(() => Position)
export class PositionResolver {
  constructor(
    private readonly classificationService: ClassificationService,
    private readonly departmentService: DepartmentService,
    private readonly organizationService: OrganizationService,
    private readonly positionService: PositionService,
  ) {}

  @Query(() => [Position], { name: 'positions' })
  getPositions(@Args() args?: FindManyPositionArgs) {
    return this.positionService.getPositions(args);
  }

  @ResolveField(() => Classification)
  classification(@Parent() { classification_id }: Position) {
    return this.classificationService.getClassification({ where: { id: classification_id } });
  }

  @ResolveField(() => Department)
  department(@Parent() { department_id }: Position) {
    return this.departmentService.getDepartment({ where: { id: department_id } });
  }

  @ResolveField(() => Organization)
  organization(@Parent() { organization_id }: Position) {
    return this.organizationService.getOrganization({ where: { id: organization_id } });
  }
}
