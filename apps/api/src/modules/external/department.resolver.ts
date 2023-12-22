import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Department, FindManyDepartmentArgs, Organization } from '../../@generated/prisma-nestjs-graphql';
import { DepartmentService } from './department.service';
import { OrganizationService } from './organization.service';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(
    private readonly departmentService: DepartmentService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Query(() => [Department], { name: 'departments' })
  getDepartments(@Args() args?: FindManyDepartmentArgs) {
    return this.departmentService.getDepartments(args);
  }

  @ResolveField(() => Organization)
  organization(@Parent() { organization_id }: Department) {
    return this.organizationService.getOrganization({ where: { id: organization_id } });
  }
}
