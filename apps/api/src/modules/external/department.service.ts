import { Injectable } from '@nestjs/common';
import { FindManyDepartmentArgs, FindUniqueDepartmentArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';

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

  async getDepartment(args?: FindUniqueDepartmentArgs) {
    return this.prisma.department.findUnique({
      ...args,
      include: { location: true, metadata: true, organization: true },
    });
  }
}
