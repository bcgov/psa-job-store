import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Department,
  FindManyOrganizationArgs,
  FindUniqueOrganizationArgs,
  Organization,
} from '../../../@generated/prisma-nestjs-graphql';
import { DepartmentService } from '../department/department.service';
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

  @Query(() => Organization, { name: 'organization', nullable: true })
  getOrganization(@Args() args: FindUniqueOrganizationArgs) {
    return this.organizationService.getOrganization(args);
  }

  @ResolveField(() => Department)
  department(@Parent() parent: Organization) {
    return this.departmentService.getDepartment({ where: { id: parent.id } });
  }
}
