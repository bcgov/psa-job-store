import {
  IDIRUserQuery,
  UserResponse,
  assignUserRoles,
  getIDIRUsers,
  getRoles,
  getUserRoles,
  getUsersWithRole,
  unassignUserRole,
} from '@bcgov/citz-imb-sso-css-api';
import { Injectable } from '@nestjs/common';
import { guidToUuid } from '../../utils/guid-to-uuid.util';
import { KeycloakUserAttributes } from './models/keycloak-user.model';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  roles: string[];
}

export type UserWithoutRoles = Omit<User, 'roles'>;

@Injectable()
export class KeycloakService {
  async assignUserRoles(id: string, roles: string[]) {
    await assignUserRoles(`${id}@idir`, roles);
  }

  async findUsers(field: keyof IDIRUserQuery, value: string) {
    const users = await getIDIRUsers({ [field]: value });
    return users.data;
  }

  async getAllUsersForRole(role: string) {
    // Loop through getUsersForRole to fetch all pages from API

    let fetchNextPage: boolean = true;
    let page: number = 1;
    let usersForRole: UserWithoutRoles[] = [];

    while (fetchNextPage) {
      const response = await this.getUsersForRole(role, page);
      if (response.data.length === 0) {
        fetchNextPage = false;
      } else {
        usersForRole = [
          ...usersForRole,
          ...response.data.map((user: UserResponse) => {
            const { email, attributes } = user;
            const { id, display_name, username } = {
              id: (attributes as KeycloakUserAttributes).idir_user_guid[0],
              display_name: (attributes as KeycloakUserAttributes).display_name[0],
              username: (attributes as KeycloakUserAttributes).idir_username[0],
            };
            return {
              id: guidToUuid(id),
              name: display_name,
              email,
              username,
            };
          }),
        ];

        // Increment page
        page = response.page + 1;
      }
    }

    return usersForRole;
  }

  async getUsersForRole(role: string, page: number = 1, maxCount: number = 50) {
    const response = await getUsersWithRole(role, page, maxCount);
    return response;
  }

  async getUsersForRoles(roles: string[]) {
    const usersByRole: Map<string, UserWithoutRoles[]> = new Map();

    for await (const role of roles) {
      const users = await this.getAllUsersForRole(role);
      usersByRole.set(role, users);
    }

    const merged = this.mergeUsers(usersByRole);

    return merged;
  }

  async getRoles(): Promise<string[]> {
    const response = await getRoles();
    return response.data.map((role) => role.name);
  }

  async getUsers(): Promise<User[]> {
    const roles = await this.getRoles();
    const users = await this.getUsersForRoles(roles);

    return users;
  }

  async getUser(id: string): Promise<User> {
    const matches = await this.findUsers('guid', id);
    const user = matches.length > 0 ? matches[0] : null;
    if (user == null) {
      throw new Error('Could not find user in keycloak');
    }

    const { email, attributes } = user;
    const roles = await getUserRoles(`${id}@idir`);
    const { display_name, username } = {
      display_name: (attributes as KeycloakUserAttributes).display_name[0],
      username: (attributes as KeycloakUserAttributes).idir_username[0],
    };

    return {
      id: guidToUuid(id),
      name: display_name,
      email,
      username,
      roles: roles.data.map((role) => role.name),
    };
  }

  async mergeUsers(roleUsers: Map<string, UserWithoutRoles[]>): Promise<User[]> {
    const merged: Map<string, User> = new Map();

    for (const [role, users] of Array.from(roleUsers.entries())) {
      users.forEach((user) => {
        const { id, name, email, username } = user;
        let match: User | undefined = merged.get(user.id);

        if (match == null) {
          // Create new entry
          match = {
            id: id,
            name: name,
            email: email,
            username: username,
            roles: [role],
          };
        } else {
          // Update existing entry
          const { roles, ...rest } = match;
          match = {
            ...rest,
            roles: [...roles, role],
          };
        }

        merged.set(id, match);
      });
    }

    return Array.from([...merged.values()]);
  }

  async unassignUserRole(id: string, role: string) {
    await unassignUserRole(`${id}@idir`, role);
  }
}
