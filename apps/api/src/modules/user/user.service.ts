import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Cache } from 'cache-manager';
import { diff } from 'fast-array-diff';
import { FindManyUserArgs, FindUniqueUserArgs, User, UserUpdateInput } from '../../@generated/prisma-nestjs-graphql';
import { CACHE_USER_PREFIX } from '../auth/auth.constants';
import { CrmService } from '../external/crm.service';
import { PeoplesoftV2Service } from '../external/peoplesoft-v2.service';
import { KeycloakService } from '../keycloak/keycloak.service';
import { PrismaService } from '../prisma/prisma.service';
import { SetUserOrgChartAccessInput } from './inputs/set-user-org-chart-access.input';

enum PeoplesoftMetadataChanged {
  POSITION = 'POSITION',
  DEPARTMENT = 'DEPARTMENT',
  ORGANIZATION = 'ORGANIZATION',
}

type PeoplesoftMetadataChangedType = PeoplesoftMetadataChanged[];

const { POSITION, DEPARTMENT, ORGANIZATION } = PeoplesoftMetadataChanged;

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

  private getPeoplesoftMetadataChanges(
    existingUser?: User,
    peoplesoftMetadata?: Record<string, string>,
  ): PeoplesoftMetadataChangedType {
    const delta: PeoplesoftMetadataChangedType = [];

    const { department_id: psDeptId, organization_id: psOrgId, position_id: psPosId } = peoplesoftMetadata ?? {};

    if (existingUser == null) {
      delta.push(POSITION, DEPARTMENT, ORGANIZATION);
    } else {
      {
        const { metadata } = existingUser;
        const { peoplesoft } = metadata ?? {};

        const {
          department_id: existingDeptId,
          organization_id: existingOrgId,
          position_id: existingPosId,
        } = peoplesoft ?? {};

        if (psPosId !== existingPosId) delta.push(POSITION);
        if (psDeptId !== existingDeptId) delta.push(DEPARTMENT);
        if (psOrgId !== existingOrgId) delta.push(ORGANIZATION);
      }
    }

    return delta;
  }

  private getOrgChartAssignmentsForUser(existingUser?: User, peoplesoftMetadata?: Record<string, string>): string[] {
    const {
      department_id: psDeptId,
      // organization_id: psOrgId,
      // position_id: psPosId,
    } = peoplesoftMetadata ?? {};

    if (existingUser != null) {
      const { metadata } = existingUser;
      const { org_chart } = metadata ?? {};
      const { department_ids } = org_chart ?? { department_ids: [] };

      const delta = this.getPeoplesoftMetadataChanges(existingUser, peoplesoftMetadata);

      // If ORGANIZATION or POSITION changes, reset assignments
      if (delta.includes(ORGANIZATION) || delta.includes(POSITION)) {
        return [psDeptId];
      }

      // If ORGANIZATION stays the same, department changes, position stays the same
      if (!delta.includes(ORGANIZATION) && delta.includes(DEPARTMENT) && !delta.includes(POSITION)) {
        // Return existing department_ids, and add the new department if necessary
        return Array.from(new Set(department_ids as string[]).add(psDeptId));
      }

      // All other cases, continue
      return department_ids;
    }

    // All users can access their base department
    return psDeptId != null ? [psDeptId] : [];
  }

  async assignUserRoles(id: string, roles: string[]) {
    const existing = await this.getUser({ where: { id } });
    if (!existing) await this.syncUser(id);

    const { removed } = diff(existing.roles, roles);

    for await (const role of removed) {
      await this.keycloakService.unassignUserRole(id, role);
    }

    // Assign submitted roles
    await this.keycloakService.assignUserRoles(id, roles);
    await this.prisma.user.update({ where: { id }, data: { roles: roles } });

    const user = await this.getUser({ where: { id } });
    return user;
  }

  async getUser(args: FindUniqueUserArgs) {
    const user = await this.prisma.user.findUnique(args);

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
    const { metadata: peoplesoftMetadata } = await this.getPeoplesoftMetadata(user.username);

    const existingUser: User | undefined = await this.getUser({ where: { id } });

    const orgChartMetadata = {
      department_ids: this.getOrgChartAssignmentsForUser(existingUser, peoplesoftMetadata),
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

    for await (const user of users) {
      this.syncUser(user.id);
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
