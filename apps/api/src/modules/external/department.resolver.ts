import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Department,
  FindManyDepartmentArgs,
  FindUniqueDepartmentArgs,
  Organization,
} from '../../@generated/prisma-nestjs-graphql';
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

  @Query(() => Department, { name: 'department' })
  getDepartment(@Args() args?: FindUniqueDepartmentArgs) {
    return this.departmentService.getDepartment(args);
  }

  @ResolveField(() => Organization)
  organization(@Parent() { organization_id }: Department) {
    return this.organizationService.getOrganization({ where: { id: organization_id } });
  }
}
