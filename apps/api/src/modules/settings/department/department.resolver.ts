import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Department } from '../../../@generated/prisma-nestjs-graphql';
import { Roles } from '../../auth/decorators/roles.decorator';
import { DepartmentService } from './department.service';
import { UpdateDepartmentMetadataInput } from './inputs/update-department-metadata.input';

@Resolver()
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => Department, { name: 'updateDepartmentMetadata' })
  @Roles('super-admin')
  updateDepartmentMetadata(@Args('data') data: UpdateDepartmentMetadataInput) {
    return this.departmentService.updateDepartmentMetadata(data);
  }
}
