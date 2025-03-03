import { Args, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { FindManyUserArgs, FindUniqueUserArgs, User } from '../../@generated/prisma-nestjs-graphql';
import { GqlCurrentUser } from '../auth/decorators/gql-current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { AssignUserRolesInput } from './inputs/assign-user-roles.input';
import { SetUserOrgChartAccessInput } from './inputs/set-user-org-chart-access.input';
import { UnassignUserRoleInput } from './inputs/unassign-user-role.input';
import { PaginatedUsersResponse } from './outputs/paginated-users-response.output';
import { UserService } from './user.service';

@ObjectType()
export class UserSearchResult {
  @Field(() => String)
  position_number: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class UserSearchResponse {
  @Field(() => Number)
  numberOfResults: number;

  @Field(() => [UserSearchResult])
  results: UserSearchResult[];
}

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles('super-admin')
  @Query(() => User, { name: 'assignUserRoles' })
  async assignUserRoles(@Args('data') data: AssignUserRolesInput, @GqlCurrentUser() user: Express.User) {
    const { id, roles } = data;

    const result = await this.userService.assignUserRoles(id, roles, user.id);

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
  @Query(() => User, { name: 'user', nullable: true })
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

  @Roles('hiring-manager')
  @Query(() => UserSearchResponse, { name: 'searchUsers' })
  searchUsers(@Args('search') search: string) {
    return this.userService.searchUsers(search);
  }

  @Roles('super-admin')
  @Query(() => User, { name: 'userByEmployeeId', nullable: true })
  getUserByEmployeeId(@Args('employeeId', { type: () => String, nullable: false }) employeeId: string) {
    return this.userService.getUserByEmployeeId(employeeId);
  }
}
