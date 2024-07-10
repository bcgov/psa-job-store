import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Cache } from 'cache-manager';
import { FindManyUserArgs, FindUniqueUserArgs, User, UserUpdateInput } from '../../@generated/prisma-nestjs-graphql';
import { AlexandriaError } from '../../utils/alexandria-error';
import { CACHE_USER_PREFIX } from '../auth/auth.constants';
import { CrmService } from '../external/crm.service';
import { PeoplesoftV2Service } from '../external/peoplesoft-v2.service';
import { KeycloakService } from '../keycloak/keycloak.service';
import { PrismaService } from '../prisma/prisma.service';
import { SetUserOrgChartAccessInput } from './inputs/set-user-org-chart-access.input';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly crmService: CrmService,
    private readonly keycloakService: KeycloakService,
    private readonly peoplesoftService: PeoplesoftV2Service,
    private readonly prisma: PrismaService,
  ) {}

  private async getCrmMetadata(username: string) {
    return {
      account_id: await this.crmService.getAccountId(username),
      contact_id: await this.crmService.getContactId(username),
    };
  }

  private async getPeoplesoftMetadata(username: string) {
    const profile = await this.peoplesoftService.getProfile(username);
    const employee = profile ? await this.peoplesoftService.getEmployee(profile.EMPLID) : undefined;

    return {
      profile,
      employee,
      metadata: {
        department_id: employee ? employee.DEPTID : null,
        employee_id: profile ? profile.EMPLID : null,
        organization_id: employee ? employee.BUSINESS_UNIT : null,
        position_id: employee ? employee.POSITION_NBR : null,
      },
    };
  }

  async assignUserRoles(id: string, roles: string[]) {
    await this.keycloakService.assignUserRoles(id, roles);
    await this.syncUser(id);

    const user = await this.getUser({ where: { id } });
    return user;
  }

  async getUser(args: FindUniqueUserArgs) {
    const user = await this.prisma.user.findUnique(args);
    if (!user) {
      throw AlexandriaError(`Could not find user: ${args}`);
    }

    return user;
  }

  async getUsers({ where, orderBy = [{ name: { sort: 'asc' } }], take = 1000, skip = 0, distinct }: FindManyUserArgs) {
    const users = await this.prisma.user.findMany({
      where,
      orderBy,
      take,
      skip,
      distinct,
    });

    return users;
  }

  async setUserOrgChartAccess({ id, department_ids }: SetUserOrgChartAccessInput) {
    await this.prisma.$queryRaw(Prisma.sql`
      UPDATE
        "user"
      SET
        metadata = jsonb_set(metadata, '{org_chart,department_ids}'::text[], ${JSON.stringify(department_ids)}::jsonb)
      WHERE
        id = ${id}::uuid`);

    await this.cacheManager.del(`${CACHE_USER_PREFIX}${id}`);
    return await this.getUser({ where: { id } });
  }

  async syncUser(id: string) {
    const user = await this.keycloakService.getUser(id);

    // Get CRM Metadata
    const crmMetadata = await this.getCrmMetadata(user.username);

    // Get Peoplesoft Metadata
    const { employee, metadata: peoplesoftMetadata } = await this.getPeoplesoftMetadata(user.username);

    const existingUser: User | undefined = await this.getUser({ where: { id: user.id } });

    const orgChartMetadata = {
      department_ids: existingUser?.metadata?.org_chart?.department_ids
        ? existingUser?.metadata?.org_chart?.department_ids
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

  async syncUsers() {
    const users = await this.keycloakService.getUsers();
    const matches = await this.prisma.user.findMany({ where: { id: { in: users.map((u) => u.id) } } });

    for await (const user of users) {
      // Get CRM Metadata
      const crmMetadata = await this.getCrmMetadata(user.username);

      // Get PeopleSoft Metadata
      const { employee, metadata: peoplesoftMetadata } = await this.getPeoplesoftMetadata(user.username);

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

  async unassignUserRole(id: string, role: string) {
    await this.keycloakService.unassignUserRole(id, role);
    await this.syncUser(id);

    const user = await this.getUser({ where: { id } });
    return user;
  }

  // async assignUserRoles(id: string, roles: string[]) {
  //   await this.keycloakService.assignUserRoles(id, roles);
  //   await this.syncUser(id);

  //   const user = await this.getUser({ where: { id } });
  //   return user;
  // }
}
