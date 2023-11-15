import { Injectable } from '@nestjs/common';
import { FindManyOrganizationArgs, FindUniqueOrganizationArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrganizations(args?: FindManyOrganizationArgs) {
    return this.prisma.organization.findMany({
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
