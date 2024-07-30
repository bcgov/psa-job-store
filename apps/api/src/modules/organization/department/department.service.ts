import { Injectable } from '@nestjs/common';
import { FindManyDepartmentArgs, FindUniqueDepartmentArgs } from '../../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateDepartmentMetadataInput } from './inputs/update-department-metadata.input';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getDepartments(args?: FindManyDepartmentArgs) {
    return this.prisma.department.findMany({
      ...args,
      include: {
        metadata: true,
      },
    });
  }

  async getDepartment(args: FindUniqueDepartmentArgs) {
    return this.prisma.department.findUnique({
      ...args,
      include: { location: true, metadata: true, organization: true },
    });
  }

  async updateDepartmentMetadata(data: UpdateDepartmentMetadataInput) {
    const { department_id, is_statutorily_excluded } = data;

    await this.prisma.departmentMetadata.update({
      where: { department_id },
      data: { is_statutorily_excluded },
    });

    return this.getDepartment({ where: { id: department_id } });
  }
}
