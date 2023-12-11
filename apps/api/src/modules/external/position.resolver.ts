import { Resolver } from '@nestjs/graphql';
import { Position } from './models/position.model';

@Resolver(() => Position)
export class PositionResolver {
  // constructor(
  //   private readonly classificationService: ClassificationService,
  //   private readonly departmentService: DepartmentService,
  //   private readonly organizationService: OrganizationService,
  //   private readonly biService: BIService,
  // ) {}
  // @Query(() => [Position], { name: 'positions' })
  // getPositions(/* @Args() args?: FindManyPositionArgs */) {
  //   return this.biService.getPositionsForDepartment('105-0975');
  //   // return this.positionService.getPositions(args);
  // }
  // @ResolveField(() => Classification)
  // classification(@Parent() { classification_id }: Position) {
  //   return this.classificationService.getClassification({ where: { id: classification_id } });
  // }
  // @ResolveField(() => Department)
  // department(@Parent() { department_id }: Position) {
  //   return this.departmentService.getDepartment({ where: { id: department_id } });
  // }
  // @ResolveField(() => Organization)
  // organization(@Parent() { organization_id }: Position) {
  //   return this.organizationService.getOrganization({ where: { id: organization_id } });
  // }
}
