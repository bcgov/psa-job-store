import { Injectable } from '@nestjs/common';
import { FindManyEmployeeGroupArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployeeGroups(args?: FindManyEmployeeGroupArgs) {
    return this.prisma.employeeGroup.findMany(args);
  }

  async getEmployeeGroup(id: string) {
    return this.prisma.employeeGroup.findUnique({ where: { id } });
  }
}
