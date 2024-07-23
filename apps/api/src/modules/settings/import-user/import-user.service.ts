import { Injectable } from '@nestjs/common';
import { guidToUuid } from '../../../utils/guid-to-uuid.util';
import { KeycloakService } from '../../keycloak/keycloak.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import { ImportUserSearchResult } from './models/import-user-search-result.model';

@Injectable()
export class ImportUserService {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async importUserSearch(email: string): Promise<ImportUserSearchResult[]> {
    const searchResultMap = new Map<string, ImportUserSearchResult>();

    for await (const user of await this.userService.getUsers({ where: { email: { contains: email } } })) {
      searchResultMap.set(user.id, {
        id: user.id,
        email: user.email,
        name: user.name,
        source: ['job-store'],
      });
    }

    for await (const user of await this.keycloakService.findUsers('email', email)) {
      const guid: string | null =
        user.attributes['idir_user_guid'].length > 0 ? user.attributes['idir_user_guid'][0] : null;

      if (guid != null) {
        const uuid = guidToUuid(guid);
        const existing = searchResultMap.get(uuid);

        searchResultMap.set(
          uuid,
          existing != null
            ? {
                ...existing,
                source: [...existing.source, 'keycloak'],
              }
            : {
                id: uuid,
                email: user.email,
                name: user.attributes['display_name'].length > 0 ? user.attributes['display_name'][0] : '',
                source: ['keycloak'],
              },
        );
      }
    }

    return Array.from(searchResultMap.values());
  }
}
