import { Args, Query, Resolver } from '@nestjs/graphql';
import { ImportUserService } from './import-user.service';
import { ImportUserSearchInput } from './inputs/import-user-search.input';
import { ImportUserSearchResult } from './models/import-user-search-result.model';

@Resolver()
export class ImportUserResolver {
  constructor(private readonly importUserService: ImportUserService) {}

  @Query(() => [ImportUserSearchResult], { name: 'importUserSearch' })
  importUserSearch(@Args('data') data: ImportUserSearchInput) {
    const { email } = data;

    return this.importUserService.importUserSearch(email);
  }
}
