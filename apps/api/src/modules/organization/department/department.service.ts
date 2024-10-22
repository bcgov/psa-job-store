import { Injectable } from '@nestjs/common';
import { FindManyDepartmentArgs, FindUniqueDepartmentArgs } from '../../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateDepartmentMetadataInput } from './inputs/update-department-metadata.input';
import { PaginatedDepartmentsResponse } from './models/paginated-departments-response.model';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getDepartments(args?: FindManyDepartmentArgs) {
    // console.log(new Date().toISOString().slice(11, -1) + ' ' + 'service.getDeps');
    const res = this.prisma.department.findMany({
      ...args,
      include: {
        metadata: true,
        organization: true,
      },
    });
    // console.log(new Date().toISOString().slice(11, -1) + ' ' + 'service.getDeps done');
    return res;
  }

  async getDepartmentsWithCount({
    take = 10,
    skip = 0,
    ...args
  }: FindManyDepartmentArgs): Promise<PaginatedDepartmentsResponse> {
    const result = await this.prisma.department.findManyAndCount({
      ...args,
      take,
      skip,
      include: {
        metadata: true,
        organization: true,
      },
    });

    const [data, page, pageCount, pageSize, totalCount] = result;

    return new PaginatedDepartmentsResponse(data, { page, pageCount, pageSize, totalCount });
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
