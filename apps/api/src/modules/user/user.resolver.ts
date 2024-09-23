import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindManyUserArgs, FindUniqueUserArgs, User } from '../../@generated/prisma-nestjs-graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { AssignUserRolesInput } from './inputs/assign-user-roles.input';
import { SetUserOrgChartAccessInput } from './inputs/set-user-org-chart-access.input';
import { UnassignUserRoleInput } from './inputs/unassign-user-role.input';
import { PaginatedUsersResponse } from './outputs/paginated-users-response.output';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles('super-admin')
  @Query(() => User, { name: 'assignUserRoles' })
  async assignUserRoles(@Args('data') data: AssignUserRolesInput) {
    const { id, roles } = data;

    const result = await this.userService.assignUserRoles(id, roles);

    return result;
  }

  @Roles('super-admin')
  @Query(() => [User], { name: 'users' })
  getUsers(@Args() args?: FindManyUserArgs) {
    return this.userService.getUsers(args);
  }

  @Roles('super-admin')
  @Query(() => PaginatedUsersResponse, { name: 'usersWithCount' })
  getUsersWithCount(@Args() args?: FindManyUserArgs) {
    return this.userService.getUsersWithCount(args);
  }

  @Roles('super-admin')
  @Query(() => User, { name: 'user' })
  getUser(@Args() args?: FindUniqueUserArgs) {
    return this.userService.getUser(args);
  }

  @Roles('super-admin')
  @Mutation(() => User)
  async setUserOrgChartAccess(@Args('data') data: SetUserOrgChartAccessInput) {
    const user = await this.userService.setUserOrgChartAccess(data);

    return user;
  }

  @Roles('super-admin')
  @Query(() => [User], { name: 'unassignUserRole' })
  unassignUserRole(@Args('data') data: UnassignUserRoleInput) {
    const { id, role } = data;

    return this.userService.unassignUserRole(id, role);
  }
}
