import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Department,
  FindManyDepartmentArgs,
  FindUniqueDepartmentArgs,
} from '../../../@generated/prisma-nestjs-graphql';
import { Roles } from '../../auth/decorators/roles.decorator';
import { LocationService } from '../../external/location.service';
import { DepartmentService } from './department.service';
import { UpdateDepartmentMetadataInput } from './inputs/update-department-metadata.input';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(
    private readonly departmentService: DepartmentService,
    private readonly locationservice: LocationService,
  ) {}

  @Query(() => [Department], { name: 'departments' })
  getDepartments(@Args() args?: FindManyDepartmentArgs) {
    return this.departmentService.getDepartments(args);
  }

  @Query(() => Department, { name: 'department', nullable: true })
  getDepartment(@Args() args: FindUniqueDepartmentArgs) {
    return this.departmentService.getDepartment(args);
  }

  @Roles('super-admin')
  @Mutation(() => Department, { name: 'updateDepartmentMetadata' })
  updateDepartmentMetadata(@Args('data') data: UpdateDepartmentMetadataInput) {
    return this.departmentService.updateDepartmentMetadata(data);
  }

  @ResolveField(() => Location)
  location(@Parent() parent: Department) {
    return this.locationservice.getLocation({ where: { id: parent.location_id } });
  }
}
