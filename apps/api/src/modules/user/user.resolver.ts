import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindManyUserArgs, FindUniqueUserArgs, User } from '../../@generated/prisma-nestjs-graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { AssignUserRolesInput } from './inputs/assign-user-roles.input';
import { SetUserOrgChartAccessInput } from './inputs/set-user-org-chart-access.input';
import { UnassignUserRoleInput } from './inputs/unassign-user-role.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'assignUserRoles' })
  @Roles('super-admin')
  assignUserRoles(@Args('data') data: AssignUserRolesInput) {
    const { id, roles } = data;

    return this.userService.assignUserRoles(id, roles);
  }

  @Query(() => [User], { name: 'users' })
  @Roles('super-admin')
  getUsers(@Args() args?: FindManyUserArgs) {
    return this.userService.getUsers(args);
  }

  @Query(() => User, { name: 'user' })
  @Roles('super-admin')
  getUser(@Args() args?: FindUniqueUserArgs) {
    return this.userService.getUser(args);
  }

  @Mutation(() => User)
  @Roles('super-admin')
  async setUserOrgChartAccess(@Args('data') data: SetUserOrgChartAccessInput) {
    const user = await this.userService.setUserOrgChartAccess(data);

    return user;
  }

  @Query(() => [User], { name: 'unassignUserRole' })
  @Roles('super-admin')
  unassignUserRole(@Args('data') data: UnassignUserRoleInput) {
    const { id, role } = data;

    return this.userService.unassignUserRole(id, role);
  }
}
