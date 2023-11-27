import { Injectable } from '@nestjs/common';
import { FindManyOrganizationArgs, FindUniqueOrganizationArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrganizations({ where, ...args }: FindManyOrganizationArgs) {
    const profileOrganizations = await this.prisma.jobProfile.findMany({
      select: { organization_id: true },
      distinct: ['organization_id'],
    });

    return this.prisma.organization.findMany({
      where: {
        id: { in: profileOrganizations.map((p) => `${p.organization_id}`) },
        ...where,
      },
      ...args,
      include: {
        departments: true,
      },
    });
  }

  async getOrganization(args?: FindUniqueOrganizationArgs) {
    return this.prisma.organization.findUnique({
      ...args,
      include: {
        departments: true,
      },
    });
  }
}
