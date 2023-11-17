import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Department, FindManyOrganizationArgs, Organization } from '../../@generated/prisma-nestjs-graphql';
import { DepartmentService } from './department.service';
import { OrganizationService } from './organization.service';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(
    private readonly departmentService: DepartmentService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Query(() => [Organization], { name: 'organizations' })
  getOrganizations(@Args() args?: FindManyOrganizationArgs) {
    return this.organizationService.getOrganizations(args);
  }

  @ResolveField(() => [Department])
  async departments(@Parent() { id }: Organization) {
    return this.departmentService.getDepartments({ where: { organization_id: { equals: id } } });
  }
}
