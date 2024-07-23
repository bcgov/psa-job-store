import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../../../@generated/prisma-nestjs-graphql';
import { ImportUserService } from './import-user.service';
import { ImportUserSearchInput } from './inputs/import-user-search.input';
import { ImportUserInput } from './inputs/import-user.input';
import { ImportUserSearchResult } from './models/import-user-search-result.model';

@Resolver()
export class ImportUserResolver {
  constructor(private readonly importUserService: ImportUserService) {}

  @Query(() => [ImportUserSearchResult], { name: 'importUserSearch' })
  importUserSearch(@Args('data') data: ImportUserSearchInput) {
    const { email } = data;

    return this.importUserService.importUserSearch(email);
  }

  @Query(() => User, { name: 'importUser' })
  importUser(@Args('data') data: ImportUserInput) {
    const { id } = data;

    return this.importUserService.importUser(id);
  }
}
