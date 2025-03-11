import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Cache } from 'cache-manager';
import { diff } from 'fast-array-diff';
import { FindManyUserArgs, FindUniqueUserArgs, User, UserUpdateInput } from '../../@generated/prisma-nestjs-graphql';
import { CACHE_USER_PREFIX } from '../auth/auth.constants';
import { CrmService } from '../external/crm.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { KeycloakService } from '../keycloak/keycloak.service';
import { PrismaService } from '../prisma/prisma.service';
import { SetUserOrgChartAccessInput } from './inputs/set-user-org-chart-access.input';
import { PaginatedUsersResponse } from './outputs/paginated-users-response.output';
import { UserSearchResponse } from './user.resolver';

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
    private readonly peoplesoftService: PeoplesoftService,
    private readonly prisma: PrismaService,
  ) {}

  private async getCrmMetadata(username: string) {
    return {
      account_id: await this.crmService.getAccountId(username),
      contact_id: await this.crmService.getContactId(username),
    };
  }

  private async getPeoplesoftMetadata(username: string) {
    const profile = await this.peoplesoftService.getProfileV2(username);
    const employee = profile ? await this.peoplesoftService.getEmployeeV2(profile.EMPLID) : undefined;

    // todo: how will potential null values here have downstream effects?
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

  /**
   * Identifies changes in a user's Peoplesoft metadata (position, department, organization).
   * Used in user synchronization to determine necessary updates in the system.
   */
  private getPeoplesoftMetadataChanges(
    existingUser?: User,
    peoplesoftMetadata?: Record<string, string | null>,
  ): PeoplesoftMetadataChangedType {
    const delta: PeoplesoftMetadataChangedType = [];

    // Destructure Peoplesoft metadata, defaulting to undefined if not provided
    const { department_id: psDeptId, organization_id: psOrgId, position_id: psPosId } = peoplesoftMetadata ?? {};

    // If no existing user, consider all fields as changed
    if (existingUser == null) {
      delta.push(POSITION, DEPARTMENT, ORGANIZATION);
    } else {
      // Compare existing user's Peoplesoft metadata with new metadata
      const { metadata } = existingUser;
      const { peoplesoft } = metadata ?? {};

      const {
        department_id: existingDeptId,
        organization_id: existingOrgId,
        position_id: existingPosId,
      } = peoplesoft ?? {};

      // Check each field and add to delta if changed
      if (psPosId !== existingPosId) delta.push(POSITION);
      if (psDeptId !== existingDeptId) delta.push(DEPARTMENT);
      if (psOrgId !== existingOrgId) delta.push(ORGANIZATION);
    }

    // Return array of changed fields
    return delta;
  }

  /**
   * Determines org chart department assignments for a user based on Peoplesoft metadata changes.
   * Used in user synchronization to update org chart access when Peoplesoft data changes.
   * Handles various scenarios of organization, department, and position changes.
   */
  private getOrgChartAssignmentsForUser(
    existingUser?: User | null,
    // todo: these can be nulls
    peoplesoftMetadata?: Record<string, string | null>,
  ): (string | null)[] {
    // Extract the department ID from the new Peoplesoft metadata
    const {
      department_id: psDeptId,
      // organization_id: psOrgId,
      // position_id: psPosId,
    } = peoplesoftMetadata ?? {};

    if (existingUser != null) {
      // Extract existing org chart metadata for the user
      const { metadata } = existingUser;
      const { org_chart } = metadata ?? {};
      const { department_ids } = org_chart ?? { department_ids: [] };

      // Determine what Peoplesoft metadata has changed
      const delta = this.getPeoplesoftMetadataChanges(existingUser, peoplesoftMetadata);

      // If ORGANIZATION or POSITION changes, reset assignments
      if (delta.includes(ORGANIZATION) || delta.includes(POSITION)) {
        return [psDeptId];
      }

      // If ORGANIZATION stays the same, department changes, position stays the same
      if (!delta.includes(ORGANIZATION) && delta.includes(DEPARTMENT) && !delta.includes(POSITION)) {
        // Return existing department_ids, and add the new department if necessary
        return Array.from(new Set(department_ids as (string | null)[]).add(psDeptId));
      }

      // All other cases, continue
      return department_ids;
    }

    // All users can access their base department
    return psDeptId != null ? [psDeptId] : [];
  }

  async assignUserRoles(id: string, roles: string[]) {
    let existing = await this.getUser({ where: { id } });
    if (!existing) {
      await this.syncUser(id);
      existing = await this.getUser({ where: { id } });
    }

    if (!existing) throw new Error('User not found');

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

  async getUsersWithCount({ skip = 0, take = 10, ...args }: FindManyUserArgs): Promise<PaginatedUsersResponse> {
    const result = await this.prisma.user.findManyAndCount({
      ...args,
      take,
      skip,
    });

    const [data, page, pageCount, pageSize, totalCount] = result;

    return new PaginatedUsersResponse(data, { page, pageCount, pageSize, totalCount });
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

  /**
   * Synchronizes a user's data from various sources and updates the local database.
   */
  async syncUser(id: string) {
    // console.log(`[syncUser] Starting sync for user ID: ${id}`);

    try {
      // Fetch the latest user data from Keycloak
      // console.log(`[syncUser] Fetching Keycloak data for user ID: ${id}`);
      const user = await this.keycloakService.getUser(id);
      // console.log('[syncUser] Keycloak user data:', {
      //   id: user.id,
      //   username: user.username,
      //   roles: user.roles,
      //   // Log other relevant user fields but exclude sensitive data
      // });

      // Retrieve CRM metadata for the user
      // console.log(`[syncUser] Fetching CRM metadata for username: ${user.username}`);
      const crmMetadata = await this.getCrmMetadata(user.username);
      // console.log('[syncUser] CRM metadata:', crmMetadata);

      // Fetch and extract Peoplesoft metadata for the user
      // console.log(`[syncUser] Fetching Peoplesoft metadata for username: ${user.username}`);
      const { metadata: peoplesoftMetadata } = await this.getPeoplesoftMetadata(user.username);
      // console.log('[syncUser] Peoplesoft metadata:', peoplesoftMetadata);

      // Get the existing user data from the local database
      // console.log(`[syncUser] Checking for existing user in local DB with ID: ${id}`);
      const existingUser: User | null = await this.getUser({ where: { id } });
      // console.log('[syncUser] Existing user found:', !!existingUser);
      if (existingUser) {
        // console.log('[syncUser] Existing user metadata:', existingUser.metadata);
      }

      // Determine org chart assignments
      // console.log('[syncUser] Calculating org chart assignments');
      const orgChartMetadata = {
        department_ids: this.getOrgChartAssignmentsForUser(existingUser, peoplesoftMetadata),
      };
      // console.log('[syncUser] Org chart metadata:', orgChartMetadata);

      // Combine all metadata
      const metadata = {
        crm: crmMetadata,
        org_chart: orgChartMetadata,
        peoplesoft: peoplesoftMetadata,
      };
      // console.log('[syncUser] Combined metadata:', metadata);

      // Update or create the user
      // console.log('[syncUser] Performing upsert operation');
      await this.upsertUser({
        ...user,
        deleted_at: null,
        metadata,
      });
      // console.log(`[syncUser] Successfully synced user ID: ${id}`);
    } catch (error) {
      // if (error instanceof Error) {
      //   console.error('[syncUser] Error during user sync:', {
      //     userId: id,
      //     error: error.message,
      //     stack: error.stack,
      //   });
      // } else {
      //   console.error(
      //     '[syncUser] Error during user sync:',
      //     {
      //       userId: id,
      //     },
      //     error,
      //   );
      // }
      throw error;
    }
  }

  async syncUsers() {
    const users = await this.keycloakService.getUsers();

    for (const user of users) {
      // todo: use Promise.all(users.map(user => this.syncUser(user.id)))?
      await this.syncUser(user.id);
    }

    // Previously, we removed users from the Job Store if they no longer exist in Keycloak.  This isn't totally correct,
    // as we want to show historic data inside the application.
    // --------------------------------------------------------
    // Delete active users which do not appear in the list of keycloak users
    // await this.prisma.user.updateMany({
    //   where: {
    //     AND: [
    //       // Users not in list of keycloak users
    //       { id: { notIn: users.map((user) => user.id) } },
    //       // Only update users who are not currently deleted
    //       { deleted_at: { equals: null } },
    //       // Ignore system user
    //       { name: { not: { equals: 'SYSTEM USER' } } },
    //     ],
    //   },
    //   data: {
    //     deleted_at: new Date().toISOString(),
    //     roles: [],
    //   },
    // });
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

  async searchUsers(search: string): Promise<UserSearchResponse> {
    // since we're searching the email field, we need to replace spaces with dots
    const searchTerm = search.replace(/\s+/g, '.');

    // Check if search is a number
    if (/^\d+$/.test(searchTerm)) {
      // Query peoplesoft for position number
      const employeesForPositions = await this.peoplesoftService.getEmployeesForPositions([searchTerm]);

      // Extract individual position/name pairs
      const results: Array<{ position_number: string; name: string }> = [];
      employeesForPositions.forEach((employees, positionNumber) => {
        employees.forEach((employee) => {
          results.push({
            position_number: positionNumber,
            name: employee.name,
          });
        });
      });

      return { numberOfResults: results.length, results: results };
    } else {
      // Search by name/email in Keycloak
      const keycloakResponse = await this.keycloakService.findUsers('email', searchTerm);

      // console.log('keycloakResponse: ', JSON.stringify(keycloakResponse, null, 2));

      // Extract IDIR usernames from Keycloak results and limit to 10
      let idirUsernames = keycloakResponse.map((user) => (user.attributes as any).idir_username[0]);
      const searchCount = idirUsernames.length;
      idirUsernames = idirUsernames.slice(0, 10);

      // console.log('idirUsernames: ', idirUsernames);

      // Get profiles for each IDIR username
      const profiles = await Promise.all(
        idirUsernames.map((username) => this.peoplesoftService.getProfileV2(username, null)),
      );

      // console.log('profiles: ', JSON.stringify(profiles, null, 2));

      // Filter out undefined profiles and get employee details
      const validProfiles = profiles.filter((profile) => profile !== undefined);
      const employeeDetails = await Promise.all(
        validProfiles.map((profile) => this.peoplesoftService.getEmployee(profile.EMPLID)),
      );

      // console.log('employeeDetails: ', JSON.stringify(employeeDetails, null, 2));

      // Compile final results
      const ret = employeeDetails
        .filter((detail) => detail?.data?.query?.rows?.[0])
        .map((detail) => {
          const employeeData = detail.data.query.rows[0];
          // console.log('employeeData: ', JSON.stringify(employeeData, null, 2));
          return {
            position_number: employeeData.POSITION_NBR,
            name: employeeData.NAME_DISPLAY,
          };
        });

      // console.log('ret: ', JSON.stringify(ret, null, 2));
      return { numberOfResults: searchCount, results: ret };
    }
  }

  // async assignUserRoles(id: string, roles: string[]) {
  //   await this.keycloakService.assignUserRoles(id, roles);
  //   await this.syncUser(id);

  //   const user = await this.getUser({ where: { id } });
  //   return user;
  // }
}
