import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FindManyUserArgs, FindUniqueUserArgs, User, UserUpdateInput } from '../../@generated/prisma-nestjs-graphql';
import { CrmService } from '../external/crm.service';
import { KeycloakService } from '../external/keycloak.service';
import { PeoplesoftV2Service } from '../external/peoplesoft-v2.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly crmService: CrmService,
    private readonly keycloakService: KeycloakService,
    private readonly peoplesoftService: PeoplesoftV2Service,
    private readonly prisma: PrismaService,
  ) {}

  async getUser(args: FindUniqueUserArgs) {
    const user = await this.prisma.user.findUnique(args);
    return user;
  }

  async getUsers({ where, orderBy = [{ name: { sort: 'asc' } }], take = 50, skip = 0, distinct }: FindManyUserArgs) {
    const users = await this.prisma.user.findMany({
      where,
      orderBy,
      take,
      skip,
      distinct,
    });

    return users;
  }

  async syncUsers() {
    const users = await this.keycloakService.getUsers();
    const matches = await this.prisma.user.findMany({ where: { id: { in: users.map((u) => u.id) } } });

    for await (const user of users) {
      // Get CRM Metadata
      const crmMetadata = {
        account_id: await this.crmService.getAccountId(user.username),
        contact_id: await this.crmService.getContactId(user.username),
      };

      // Get PeopleSoft Metadata
      const profile = await this.peoplesoftService.getProfile(user.username);
      const employee = profile ? await this.peoplesoftService.getEmployee(profile.EMPLID) : undefined;
      const peoplesoftMetadata = {
        department_id: employee ? employee.DEPTID : null,
        employee_id: profile ? profile.EMPLID : null,
        organization_id: employee ? employee.BUSINESS_UNIT : null,
        position_id: employee ? employee.POSITION_NBR : null,
      };

      const match: User | undefined = matches.find((m) => m.id === user.id);
      const orgChartMetadata = {
        department_ids: match?.metadata?.org_chart?.department_ids
          ? match?.metadata?.org_chart?.department_ids
          : employee
            ? [employee.DEPTID]
            : [],
      };

      const metadata = {
        crm: crmMetadata,
        org_chart: orgChartMetadata,
        peoplesoft: peoplesoftMetadata,
      };

      await this.upsertUser({
        ...user,
        deleted_at: null, // Undelete user if it is returned from Keycloak
        metadata,
      });
    }

    // Delete active users which do not appear in the list of keycloak users
    await this.prisma.user.updateMany({
      where: {
        AND: [
          // Users not in list of keycloak users
          { id: { notIn: users.map((user) => user.id) } },
          // Only update users who are not currently deleted
          { deleted_at: { equals: null } },
          // Ignore system user
          { name: { not: { equals: 'SYSTEM USER' } } },
        ],
      },
      data: {
        deleted_at: new Date().toISOString(),
        roles: [],
      },
    });
  }

  async upsertUser(user: UserUpdateInput) {
    const { id, ...rest } = user;

    await this.prisma.user.upsert({
      where: { id },
      create: { id, ...rest },
      update: { ...rest },
    } as any as Prisma.UserUpsertArgs);
  }
}
