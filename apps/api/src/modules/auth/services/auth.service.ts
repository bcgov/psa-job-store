import { Injectable, UnauthorizedException } from '@nestjs/common';
import { updatedDiff } from 'deep-object-diff';
import { User } from '../../../@generated/prisma-nestjs-graphql';
import { guidToUuid } from '../../../utils/guid-to-uuid.util';
import { CrmService } from '../../external/crm.service';
import { PeoplesoftV2Service } from '../../external/peoplesoft-v2.service';
import { KeycloakService } from '../../keycloak/keycloak.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import { KeycloakUserinfoResponse } from '../strategies/oidc.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly crmService: CrmService,
    private readonly keycloakService: KeycloakService,
    private readonly peoplesoftService: PeoplesoftV2Service,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  private async getPeoplesoftMetadata(idir: string) {
    const userProfile = await this.peoplesoftService.getProfileV2(idir);
    const employee = userProfile ? await this.peoplesoftService.getEmployee(userProfile.EMPLID) : undefined;

    return {
      department_id: employee ? employee.DEPTID : null,
      employee_id: userProfile ? userProfile.EMPLID : null,
      organization_id: employee ? employee.BUSINESS_UNIT : null,
      position_id: employee ? employee.POSITION_NBR : null,
    };
  }

  private async userPositionHasSubordinates(position_id: string) {
    const subordinates = (await this.peoplesoftService.getSubordinates(position_id)) ?? [];

    return subordinates.length > 0;
  }

  private async validateIDIRUserinfo(userinfo: KeycloakUserinfoResponse): Promise<Express.User> {
    const id = guidToUuid(userinfo.idir_user_guid);
    const existingUser = await this.userService.getUser({ where: { id } });

    const sessionUser: Express.User = {
      id: id,
      name: userinfo.display_name as string,
      given_name: userinfo.given_name as string,
      family_name: userinfo.family_name as string,
      email: userinfo.email,
      username: userinfo.idir_username as string,
      roles: (userinfo.client_roles ?? []) as string[],
      metadata: (existingUser?.metadata ?? {}) as Record<string, unknown>,
    };

    const crmMetadata =
      userinfo.idir_username != null
        ? {
            account_id: await this.crmService.getAccountId(userinfo.idir_username),
            contact_id: await this.crmService.getContactId(userinfo.idir_username),
          }
        : null;

    const peoplesoftMetadata = await this.getPeoplesoftMetadata(userinfo.idir_username);

    // If user doesn't exist, check for subordinates, apply roles, create user,
    // If user does exist, and nothing significant has changed (department_id, employee_id, organization_id, position_id), check roles, simply return
    // If user does exist, and something significant has changed (department_id, employee_id, organization_id, position_id), check roles, check for subordinates, apply roles, update user,

    if (!existingUser) {
      if (peoplesoftMetadata?.position_id != null) {
        // If user has subordinates, and doesn't currently have the `hiring-manager` role, assign it
        const hasSubordinates = this.userPositionHasSubordinates(peoplesoftMetadata.position_id);
        if (hasSubordinates && !(userinfo.client_roles ?? []).includes('hiring-manager')) {
          console.log('>>>> ASSIGNING ROLE');
          const { data } = (await this.keycloakService.assignUserRoles(id, ['hiring-manager'])) ?? { data: [] };
          // Update `sessionUser` to contain newly assigned roles
          sessionUser.roles = data.map((role) => role.name);
        }

        const orgChartMetadata = {
          department_ids: [peoplesoftMetadata.department_id],
        };

        sessionUser.metadata = {
          crm: crmMetadata,
          org_chart: orgChartMetadata,
          peoplesoft: peoplesoftMetadata,
        };
      }
    } else {
      // Check for differences between `existingUser.metadata.peoplesoft` and peoplesoftMetadata
      const metadataUpdates: Record<string, any> = this.getPeoplesoftMetadataUpdates(existingUser, peoplesoftMetadata);

      // Peoplesoft metadata has changed
      if (Object.keys(metadataUpdates).length > 0) {
        // If the organization_id or position_id has changed, reset org chart department associations
        if (Object.keys(metadataUpdates).some((key) => ['organization_id', 'position_id'].includes(key))) {
          sessionUser.metadata.org_chart.department_ids = [metadataUpdates.department_id];
        }

        if (
          Object.keys(metadataUpdates).every((key) => !['orgnization_id', 'position_id'].includes(key)) &&
          Object.keys(metadataUpdates).includes('department_id')
        ) {
          sessionUser.metadata.org_chart.department_ids = Array.from(
            new Set(sessionUser.metadata.org_chart.department_ids).add(metadataUpdates.deparment_id),
          );
        }

        // Implement once 'strategic-hr' role is conceptualized
        //
        // // If any of department_id, employee_id, organization_id, position_id change, recheck for subordinates and assign/unassigh hiring-manager role
        // if (
        //   Object.keys(metadataUpdates).some((key) => ['department_id', 'employee_id', 'organization_id', 'position_id'])
        // ) {
        //   // Check for subordinates
        //   const hasSubordinates = await this.userPositionHasSubordinates(
        //     metadataUpdates.position_id ?? sessionUser.metadata.peoplesoft.position_id,
        //   );
        //   if (hasSubordinates) {
        //     if (!sessionUser.roles.includes('hiring-manager')) {
        //       const { data } = (await this.keycloakService.assignUserRoles(id, ['hiring-manager'])) ?? { data: [] };
        //       // Update `sessionUser` to contain newly assigned roles
        //       sessionUser.roles = data.map((role) => role.name);
        //     }
        //   } else {
        //     const success = await this.keycloakService.unassignUserRole(id, 'hiring-manager');
        //     if (success) {
        //       sessionUser.roles = sessionUser.roles.filter((role) => role === 'hiring-manager');
        //     }
        //   }
        // }

        // If organization_id, position_id stays the same, but department changes
        // if (
        //   Object.keys(metadataUpdates).every((key) => !['orgnization_id', 'position_id'].includes(key)) &&
        //   Object.keys(metadataUpdates).includes('department_id')
        // ) {
        //   if (sessionUser.roles.includes('hiring-manager')) {
        //     sessionUser.metadata.org_chart.department_ids = Array.from(
        //       new Set(sessionUser.metadata.org_chart.department_ids).add(metadataUpdates.deparment_id),
        //     );
        //   } else {
        //     sessionUser.metadata.org_chart.department_ids = [metadataUpdates.department_id];
        //   }
        // }
      }

      const { name, email, username, roles, metadata } = sessionUser;

      await this.prisma.user.upsert({
        where: { id },
        create: {
          id,
          name,
          email,
          username,
          roles,
          metadata,
        },
        update: {
          name,
          email,
          username,
          roles,
          metadata,
        },
      });
    }

    return sessionUser;
  }

  private getPeoplesoftMetadataUpdates(existingUser: User, peoplesoftMetadata: Record<string, any>) {
    const existingPeoplesoftMetadata = ((existingUser.metadata ?? {}) as Record<string, any>)?.peoplesoft ?? {
      department_id: null,
      employee_id: null,
      organization_id: null,
      position_id: null,
    };

    return updatedDiff(existingPeoplesoftMetadata, peoplesoftMetadata);
  }

  async validateUserinfo(userinfo: KeycloakUserinfoResponse) {
    if (userinfo.identity_provider === 'idir') {
      return this.validateIDIRUserinfo(userinfo);
    } else {
      throw new UnauthorizedException();
    }
  }

  async getPeoplesoftDetails(idir: string) {
    const profile = await this.peoplesoftService.getProfileV2(idir);
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
}
