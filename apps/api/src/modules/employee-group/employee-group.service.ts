import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployeeGroups() {
    return this.prisma.employeeGroup.findMany();
  }

  async getEmployeeGroup(id: string) {
    return this.prisma.employeeGroup.findUnique({ where: { id } });
  }
}
