import { Args, Query, Resolver } from '@nestjs/graphql';
import { EmployeeGroup, FindManyEmployeeGroupArgs } from '../../@generated/prisma-nestjs-graphql';
import { EmployeeGroupService } from './employee-group.service';

@Resolver(() => EmployeeGroup)
export class EmployeeGroupResolver {
  constructor(private readonly employeeGroupService: EmployeeGroupService) {}

  @Query(() => [EmployeeGroup], { name: 'employeeGroups' })
  getEmployeeGroups(@Args() args?: FindManyEmployeeGroupArgs) {
    return this.employeeGroupService.getEmployeeGroups(args);
  }
}
