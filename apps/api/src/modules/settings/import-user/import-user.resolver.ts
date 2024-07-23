import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../../../@generated/prisma-nestjs-graphql';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ImportUserService } from './import-user.service';
import { ImportUserSearchInput } from './inputs/import-user-search.input';
import { ImportUserInput } from './inputs/import-user.input';
import { ImportUserSearchResult } from './models/import-user-search-result.model';

@Resolver()
export class ImportUserResolver {
  constructor(private readonly importUserService: ImportUserService) {}

  @Query(() => [ImportUserSearchResult], { name: 'importUserSearch' })
  @Roles('super-admin')
  importUserSearch(@Args('data') data: ImportUserSearchInput) {
    const { email } = data;

    return this.importUserService.importUserSearch(email);
  }

  @Query(() => User, { name: 'importUser' })
  @Roles('super-admin')
  importUser(@Args('data') data: ImportUserInput) {
    const { id } = data;

    return this.importUserService.importUser(id);
  }
}
