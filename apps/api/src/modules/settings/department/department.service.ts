import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateDepartmentMetadataInput } from './inputs/update-department-metadata.input';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async updateDepartmentMetadata(data: UpdateDepartmentMetadataInput) {
    const { id, is_statutorily_excluded } = data;

    await this.prisma.departmentMetadata.update({
      where: { department_id: id },
      data: { is_statutorily_excluded },
    });

    return this.prisma.department.findUnique({ where: { id: id }, include: { metadata: true } });
  }
}
